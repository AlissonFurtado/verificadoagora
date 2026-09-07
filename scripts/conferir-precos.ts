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

/** Acima disso o preço não vai pro ar sozinho: vira PR. */
const VARIACAO_SUSPEITA = 0.15;

type Mudanca = { id: number; nome: string; de: number; para: number; variacao: number };
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

  for (const produto of catalogo.produtos) {
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
        relatorio.desligados.push({ id: produto.id, nome: produto.nome, motivo: 'sumiu do Meli' });
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

    if (novo !== anterior) {
      const mudanca: Mudanca = {
        id: produto.id,
        nome: produto.nome,
        de: anterior,
        para: novo,
        variacao: arredondar((novo - anterior) / anterior),
      };
      relatorio.mudancas.push(mudanca);
      if (Math.abs(mudanca.variacao) > VARIACAO_SUSPEITA) relatorio.suspeitos.push(mudanca);
    }
  }

  catalogo.metadata.ultima_atualizacao = hoje();
  catalogo.metadata.total_produtos = catalogo.produtos.length;

  fs.writeFileSync(caminho, `${JSON.stringify(catalogo, null, 2)}\n`, 'utf-8');
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
