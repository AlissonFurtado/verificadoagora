/**
 * Garimpa os mais vendidos do Mercado Livre e monta a fila do dia.
 *
 *   npm run garimpar
 *
 * Escreve data/candidatos.json: produtos que passaram no filtro e que o
 * Alisson ainda não viu, com o link da página pronto pro Linkbuilder. **Não**
 * escreve no catálogo — candidato só vira produto depois que alguém gera o
 * link de afiliado, que é o passo que o Meli não deixa automatizar.
 */
import fs from 'fs';
import path from 'path';
import { carregarEnv } from './env';
import { obterAcesso } from './acesso';
import { buscarProduto, pedir, urlDoProduto, type TipoDeId } from '../src/lib/meli';
import type { Catalogo } from '../src/lib/produtos';
import { avaliar, registrar, type Memoria } from '../src/lib/garimpo-memoria';

type Config = {
  categorias: string[];
  limite_diario: number;
  filtros: { desconto_minimo: number; preco_minimo: number; preco_maximo: number };
};

type Candidato = {
  meli_id: string;
  familia: string;
  tipo: TipoDeId;
  nome: string;
  categoria: string;
  preco: number;
  preco_original: number;
  desconto_percentual: number;
  imagem: string;
  url_do_produto: string;
  motivo: string;
  garimpado_em: string;
};

/** Tira acento e caixa: "Eletrônicos" e "eletronicos" viram a mesma coisa. */
function achatar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

function lerJson<T>(caminho: string, vazio: T): T {
  return fs.existsSync(caminho) ? (JSON.parse(fs.readFileSync(caminho, 'utf-8')) as T) : vazio;
}

carregarEnv();

async function main(): Promise<void> {
  const raiz = process.cwd();
  const hoje = new Date().toISOString().slice(0, 10);

  const config = lerJson<Config>(path.join(raiz, 'data', 'garimpo.json'), {
    categorias: [],
    limite_diario: 10,
    filtros: { desconto_minimo: 20, preco_minimo: 100, preco_maximo: 2000 },
  });

  const caminhoMemoria = path.join(raiz, 'data', 'garimpo-memoria.json');
  const memoria = lerJson<Memoria>(caminhoMemoria, { atualizado_em: '', vistos: {} });

  const catalogo = lerJson<Catalogo>(path.join(raiz, 'data', 'produtos.json'), {
    produtos: [],
    metadata: { ultima_atualizacao: '', total_produtos: 0, comissao_media_ml: 0, moeda: 'BRL' },
  });
  const jaNoCatalogo = new Set(catalogo.produtos.map((p) => p.meli_id).filter(Boolean));
  const familiasNoCatalogo = new Set(catalogo.produtos.map((p) => p.familia).filter(Boolean));

  const accessToken = await obterAcesso();

  const categoriasDoMeli = (await pedir('/sites/MLB/categories', accessToken)) as {
    id: string;
    name: string;
  }[];

  const alvos: { id: string; nome: string }[] = [];
  for (const procurado of config.categorias) {
    const achada =
      categoriasDoMeli.find((c) => achatar(c.name) === achatar(procurado)) ??
      categoriasDoMeli.find((c) => achatar(c.name).includes(achatar(procurado)));

    // Nome errado avisa e segue. Derrubar a rodada inteira por causa de uma
    // categoria mal escrita seria perder as outras cinco por nada.
    if (!achada) {
      console.error(`[garimpo] categoria "${procurado}" não existe no Meli — pulando.`);
      continue;
    }
    alvos.push({ id: achada.id, nome: achada.name });
  }

  if (alvos.length === 0) {
    console.error('Nenhuma categoria válida. As que o Meli tem:');
    console.error(categoriasDoMeli.map((c) => `  ${c.name}`).join('\n'));
    process.exit(1);
  }

  const encontrados: Candidato[] = [];
  const descartes = {
    ja_no_catalogo: 0,
    ja_sugerido: 0,
    sem_desconto: 0,
    fora_de_preco: 0,
    indisponivel: 0,
    erro: 0,
  };

  for (const alvo of alvos) {
    const destaques = (await pedir(`/highlights/MLB/category/${alvo.id}`, accessToken)) as {
      content?: { id: string; type: string }[];
    };
    const lista = destaques.content ?? [];
    if (lista.length === 0) {
      console.error(
        `[garimpo] ${alvo.nome}: /highlights não devolveu "content". Veio:`,
        Object.keys(destaques).join(','),
      );
      continue;
    }

    let passaram = 0;
    for (const destaque of lista) {
      const tipo: TipoDeId = destaque.type === 'PRODUCT' ? 'produto' : 'anuncio';

      // Produto que já está na página não precisa nem de consulta: sai antes
      // de gastar uma chamada de API.
      if (jaNoCatalogo.has(destaque.id)) {
        descartes.ja_no_catalogo += 1;
        continue;
      }

      let dados;
      try {
        dados = await buscarProduto(destaque.id, accessToken, tipo);
      } catch (err) {
        descartes.erro += 1;
        console.error('[garimpo]', destaque.id, err instanceof Error ? err.message : err);
        continue;
      }

      if (!dados.disponivel) {
        descartes.indisponivel += 1;
        continue;
      }
      if (dados.preco < config.filtros.preco_minimo || dados.preco > config.filtros.preco_maximo) {
        descartes.fora_de_preco += 1;
        continue;
      }
      // Sem preço de antes não dá pra afirmar que é desconto — e a página não
      // anuncia desconto que ninguém consegue provar.
      if (!dados.precoOriginal || dados.precoOriginal <= dados.preco) {
        descartes.sem_desconto += 1;
        continue;
      }

      const desconto = Math.floor((1 - dados.preco / dados.precoOriginal) * 100);
      if (desconto < config.filtros.desconto_minimo) {
        descartes.sem_desconto += 1;
        continue;
      }

      const veredito = avaliar(
        destaque.id,
        dados.familia,
        dados.preco,
        memoria,
        jaNoCatalogo,
        familiasNoCatalogo,
        hoje,
      );
      if (!veredito.sugerir) {
        descartes.ja_sugerido += 1;
        continue;
      }

      passaram += 1;
      encontrados.push({
        meli_id: destaque.id,
        familia: dados.familia,
        tipo,
        nome: dados.nome,
        categoria: alvo.nome,
        preco: dados.preco,
        preco_original: dados.precoOriginal,
        desconto_percentual: desconto,
        imagem: dados.imagem,
        url_do_produto: dados.permalink || urlDoProduto(destaque.id, tipo),
        motivo: veredito.motivo,
        garimpado_em: hoje,
      });
    }

    console.log(`${alvo.nome}: ${lista.length} olhados, ${passaram} novos`);
  }

  // Melhor desconto primeiro: se sobrar gente de fora do limite, que fique de
  // fora a oferta mais fraca.
  encontrados.sort((a, b) => b.desconto_percentual - a.desconto_percentual);
  const candidatos = encontrados.slice(0, config.limite_diario);

  for (const c of candidatos) registrar(memoria, c.meli_id, c.familia, c.preco, hoje);
  memoria.atualizado_em = hoje;

  fs.writeFileSync(
    path.join(raiz, 'data', 'candidatos.json'),
    `${JSON.stringify({ garimpado_em: hoje, total: candidatos.length, candidatos }, null, 2)}\n`,
    'utf-8',
  );
  fs.writeFileSync(caminhoMemoria, `${JSON.stringify(memoria, null, 2)}\n`, 'utf-8');

  console.log(`\nFila de hoje: ${candidatos.length} (de ${encontrados.length} que passaram)`);
  console.log(
    `Descartados — no catálogo: ${descartes.ja_no_catalogo}, já sugeridos: ${descartes.ja_sugerido}, ` +
      `sem desconto: ${descartes.sem_desconto}, fora da faixa: ${descartes.fora_de_preco}, ` +
      `indisponíveis: ${descartes.indisponivel}, erro: ${descartes.erro}`,
  );
  console.log(`Memória: ${Object.keys(memoria.vistos).length} produtos já vistos.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
