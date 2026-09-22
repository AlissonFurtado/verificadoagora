/**
 * O robô. Reconfere no Mercado Livre o preço de cada produto do catálogo e
 * reescreve o data/produtos.json.
 *
 *   npm run precos:conferir
 *
 * Escreve também um relatorio.json (não versionado) que a Action lê pra
 * decidir se commita direto na main ou se abre PR pro Alisson olhar.
 *
 * A regra que dá sentido a tudo: **a página nunca fica com preço que o robô
 * não conseguiu confirmar.** Na dúvida, o produto sai do ar em vez de mentir.
 */
import fs from 'fs';
import path from 'path';
import { carregarEnv } from './env';
import { obterAcesso } from './acesso';
import { buscarProduto } from '../src/lib/meli';
import type { Catalogo, Produto } from '../src/lib/produtos';
import { registrarPreco, type Historico } from '../src/lib/historico';

/** Acima disso o preço não vai pro ar sozinho: vira PR. */
const VARIACAO_SUSPEITA = 0.15;

type Mudanca = {
  id: number;
  nome: string;
  de: number;
  para: number;
  variacao: number;
  /** Por que virou suspeito, quando não foi só o tamanho da variação. */
  motivo?: string;
};
type Relatorio = {
  rodado_em: string;
  conferidos: number;
  mudancas: Mudanca[];
  suspeitos: Mudanca[];
  desligados: { id: number; nome: string; motivo: string }[];
  sem_id: { id: number; nome: string }[];
  falhas: { id: number; nome: string; erro: string }[];
};

function hoje(): string {
  return new Date().toISOString().slice(0, 10);
}

function arredondar(valor: number): number {
  return Math.round(valor * 100) / 100;
}

function descontoEntre(original: number, atual: number): number {
  return Math.max(0, Math.floor((1 - atual / original) * 100));
}

carregarEnv();

async function main(): Promise<void> {

  const caminho = path.join(process.cwd(), 'data', 'produtos.json');
  const catalogo = JSON.parse(fs.readFileSync(caminho, 'utf-8')) as Catalogo;

  const caminhoHistorico = path.join(process.cwd(), 'data', 'historico.json');
  const historico: Historico = fs.existsSync(caminhoHistorico)
    ? (JSON.parse(fs.readFileSync(caminhoHistorico, 'utf-8')) as Historico)
    : { atualizado_em: '', produtos: {} };

  const relatorio: Relatorio = {
    rodado_em: hoje(),
    conferidos: 0,
    mudancas: [],
    suspeitos: [],
    desligados: [],
    sem_id: [],
    falhas: [],
  };

  const accessToken = await obterAcesso();

  // Como cada produto estava antes da rodada. É o que volta pra main quando a
  // variação é suspeita: só ele espera no PR, o resto do catálogo publica.
  const antes = new Map<number, Produto>();

  for (const produto of catalogo.produtos) {
    antes.set(produto.id, structuredClone(produto));

    if (!produto.meli_id) {
      relatorio.sem_id.push({ id: produto.id, nome: produto.nome });
      continue;
    }

    let dados;
    try {
      dados = await buscarProduto(produto.meli_id, accessToken);
    } catch (err) {
      const erro = err instanceof Error ? err.message : String(err);
      console.error('[conferir]', produto.meli_id, erro);

      // 404 é produto que deixou de existir: desliga. Qualquer outro erro pode
      // ser instabilidade da API — nesse caso não se mexe em nada.
      if (/ respondeu 404/.test(erro)) {
        produto.disponivel = false;
        // ⚠️ Guarda a rota: em 16/09/2026 o A36 e o OPPO A6t foram desligados
        // por 404 e os dois estavam à venda normalmente no site do Meli. Sem
        // saber se o 404 veio de /products/{id} ou de /products/{id}/items,
        // não dá pra saber se o produto sumiu ou se só ficou sem oferta.
        // 404 em /products/{id}/items é produto de catálogo sem nenhuma oferta
        // ativa — a página existe, ninguém está vendendo. 404 na rota principal
        // é o produto ter deixado de existir. São coisas diferentes, e só a
        // segunda é definitiva.
        const rota = erro.match(/\[meli\] (\S+) respondeu 404/)?.[1] ?? 'rota desconhecida';
        relatorio.desligados.push({
          id: produto.id,
          nome: produto.nome,
          motivo: rota.endsWith('/items') ? 'sem oferta ativa no Meli' : `sumiu do Meli (404 em ${rota})`,
        });
      } else {
        relatorio.falhas.push({ id: produto.id, nome: produto.nome, erro });
      }
      continue;
    }

    relatorio.conferidos += 1;

    if (!dados.disponivel) {
      produto.disponivel = false;
      relatorio.desligados.push({ id: produto.id, nome: produto.nome, motivo: 'fora do ar no Meli' });
      continue;
    }

    const anterior = produto.preco_atual;
    const novo = arredondar(dados.preco);

    produto.disponivel = true;
    produto.verificado_em = hoje();
    produto.preco_atual = novo;
    // O preço da API é o de tabela, não o do Pix: só o card sabe dizer "no Pix",
    // e ele só pode dizer isso quando alguém conferiu na página.
    produto.preco_no_pix = false;
    if (dados.precoOriginal && dados.precoOriginal > novo) {
      produto.preco_original = arredondar(dados.precoOriginal);
    }
    produto.desconto_percentual = descontoEntre(produto.preco_original, novo);
    if (dados.imagem) produto.imagem = dados.imagem;
    // Preenche a família em quem entrou antes de o campo existir.
    if (!produto.familia && dados.familia) produto.familia = dados.familia;

    // ⚠️ A buy box troca de vendedor sem o produto trocar de id, e o preço de
    // um vendedor de fora do Brasil não inclui o imposto de importação que a
    // pessoa ainda vai pagar. Em 19/09/2026 o SSD SanDisk "caiu" 40% assim: a
    // oferta vencedora passou a vir dos EUA a R$ 562,18 enquanto a loja
    // oficial nacional cobrava R$ 1.215. A variação sozinha não distingue
    // queda de preço de troca de origem — só este campo distingue.
    const virouImportado = dados.importado && !produto.importado && !produto.oculto;

    if (novo !== anterior || virouImportado) {
      const mudanca: Mudanca = {
        id: produto.id,
        nome: produto.nome,
        de: anterior,
        para: novo,
        variacao: anterior > 0 ? arredondar((novo - anterior) / anterior) : 0,
      };
      if (novo !== anterior) relatorio.mudancas.push(mudanca);

      // Produto oculto não aparece na vitrine: preço estranho nele não engana
      // ninguém e não segura a rodada.
      if (virouImportado) {
        mudanca.motivo =
          'a oferta vencedora passou a vir de fora do Brasil — o preço não inclui o imposto de importação';
        relatorio.suspeitos.push(mudanca);
      } else if (Math.abs(mudanca.variacao) > VARIACAO_SUSPEITA && !produto.oculto) {
        relatorio.suspeitos.push(mudanca);
      }
    }

    // 🔴 **O histórico grava o preço que o site MOSTRA, não o que a API disse.**
    // Até 22/09/2026 ele era escrito antes desta decisão, e por isso todo
    // produto suspeito deixava no gráfico um ponto que nunca existiu para o
    // visitante: o Wap GTW 10 ficou com R$ 370,77 em 21/09 enquanto a página
    // mostrava R$ 279,90, e no dia seguinte o canal ia anunciar uma queda de
    // R$ 97,87 que não aconteceu (a real foi de R$ 7,00). Como o suspeito volta
    // ao preço de ontem no `produtos.json`, é esse o valor que entra aqui.
    // Contaminava tudo o que se apoia no histórico: o gráfico da ficha, o selo
    // de menor preço, a /quedas-de-preco e as mensagens do canal.
    const ehSuspeito = relatorio.suspeitos.some((s) => s.id === produto.id);
    historico.produtos[produto.meli_id] = registrarPreco(
      historico.produtos[produto.meli_id],
      hoje(),
      ehSuspeito ? anterior : novo,
    );
  }

  catalogo.metadata.ultima_atualizacao = hoje();
  // A hora que a rodada realmente terminou, não a agendada: o cron do GitHub
  // atrasa horas quando a fila deles enche, e é este instante que a página
  // mostra pra quem chega.
  catalogo.metadata.conferido_em = new Date().toISOString();
  catalogo.metadata.total_produtos = catalogo.produtos.length;

  // ⚠️ Até 15/09/2026 um único suspeito mandava a rodada inteira pro PR: em
  // 14/09 o suporte de monitor (oculto!) caiu 58% e o A36 ficou dois dias na
  // página a R$ 1.435 com a loja cobrando R$ 1.499. Agora são dois arquivos:
  // produtos.json vai pra main com os suspeitos no estado de ontem, e
  // produtos-com-suspeitos.json (não versionado) é o que a Action põe no PR.
  const seguro: Catalogo = {
    ...catalogo,
    produtos: catalogo.produtos.map((p) =>
      relatorio.suspeitos.some((s) => s.id === p.id) ? antes.get(p.id)! : p,
    ),
  };
  fs.writeFileSync(caminho, `${JSON.stringify(seguro, null, 2)}\n`, 'utf-8');
  fs.writeFileSync(
    path.join(process.cwd(), 'produtos-com-suspeitos.json'),
    `${JSON.stringify(catalogo, null, 2)}\n`,
    'utf-8',
  );

  // ⚠️ Este arquivo já foi esquecido uma vez. Entre 07/09 e 08/09/2026 o robô
  // lia o histórico, acumulava o preço do dia na memória e terminava a rodada
  // sem gravar — o gráfico da página do produto e o selo de "menor preço"
  // nunca apareceram, e cada dia conferido se perdia. Se um dia esta linha
  // sumir, é isso que volta a acontecer, calado.
  historico.atualizado_em = hoje();
  fs.writeFileSync(caminhoHistorico, `${JSON.stringify(historico, null, 2)}\n`, 'utf-8');

  fs.writeFileSync(
    path.join(process.cwd(), 'relatorio.json'),
    `${JSON.stringify(relatorio, null, 2)}\n`,
    'utf-8',
  );

  const resumo = (produtos: { nome: string }[]) => produtos.map((p) => p.nome).join(', ') || '—';
  console.log(`Conferidos: ${relatorio.conferidos} de ${catalogo.produtos.length}`);
  console.log(`Preço mudou: ${relatorio.mudancas.length} (suspeitos: ${relatorio.suspeitos.length})`);
  console.log(`Desligados: ${resumo(relatorio.desligados)}`);
  console.log(`Sem meli_id: ${resumo(relatorio.sem_id)}`);
  console.log(`Falhas: ${resumo(relatorio.falhas)}`);

  // Falha de API não pode passar batido: a Action precisa ficar vermelha.
  if (relatorio.falhas.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
