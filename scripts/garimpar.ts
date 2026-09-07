/**
 * Garimpa os mais vendidos do Mercado Livre e monta a fila da semana.
 *
 *   npm run garimpar
 *
 * Escreve data/candidatos.json: produtos que passaram no filtro, com o link
 * da página do produto pronto pra colar no Linkbuilder. **Não** escreve no
 * catálogo — candidato só vira produto depois que alguém gera o link de
 * afiliado, que é o passo que o Meli não deixa automatizar.
 */
import fs from 'fs';
import path from 'path';
import { carregarEnv } from './env';
import { obterAcesso } from './acesso';
import { buscarProduto, pedir, urlDoProduto, type TipoDeId } from '../src/lib/meli';

type Config = {
  categorias: string[];
  por_categoria: number;
  filtros: { desconto_minimo: number; preco_minimo: number; preco_maximo: number };
};

type Candidato = {
  meli_id: string;
  tipo: TipoDeId;
  nome: string;
  categoria: string;
  preco: number;
  preco_original: number;
  desconto_percentual: number;
  imagem: string;
  url_do_produto: string;
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

carregarEnv();

async function main(): Promise<void> {
  const raiz = process.cwd();
  const config = JSON.parse(
    fs.readFileSync(path.join(raiz, 'data', 'garimpo.json'), 'utf-8'),
  ) as Config;
  const hoje = new Date().toISOString().slice(0, 10);
  const accessToken = await obterAcesso();

  const categoriasDoMeli = (await pedir('/sites/MLB/categories', accessToken)) as {
    id: string;
    name: string;
  }[];

  const alvos: { id: string; nome: string }[] = [];
  for (const procurado of config.categorias) {
    const achada = categoriasDoMeli.find((c) => achatar(c.name) === achatar(procurado))
      ?? categoriasDoMeli.find((c) => achatar(c.name).includes(achatar(procurado)));
    if (!achada) {
      console.error(`Categoria "${procurado}" não existe no Meli. As que existem:`);
      console.error(categoriasDoMeli.map((c) => `  ${c.name}`).join('\n'));
      process.exit(1);
    }
    alvos.push({ id: achada.id, nome: achada.name });
  }

  const candidatos: Candidato[] = [];
  const descartados = { sem_desconto: 0, fora_de_preco: 0, indisponivel: 0, erro: 0 };

  for (const alvo of alvos) {
    const destaques = (await pedir(`/highlights/MLB/category/${alvo.id}`, accessToken)) as {
      content?: { id: string; type: string }[];
    };
    const lista = destaques.content ?? [];
    if (lista.length === 0) {
      console.error(`[garimpo] ${alvo.nome}: /highlights não devolveu "content". Veio:`,
        Object.keys(destaques).join(','));
      continue;
    }

    const daCategoria: Candidato[] = [];
    for (const destaque of lista) {
      const tipo: TipoDeId = destaque.type === 'PRODUCT' ? 'produto' : 'anuncio';
      let dados;
      try {
        dados = await buscarProduto(destaque.id, accessToken, tipo);
      } catch (err) {
        descartados.erro += 1;
        console.error('[garimpo]', destaque.id, err instanceof Error ? err.message : err);
        continue;
      }

      if (!dados.disponivel) {
        descartados.indisponivel += 1;
        continue;
      }
      if (dados.preco < config.filtros.preco_minimo || dados.preco > config.filtros.preco_maximo) {
        descartados.fora_de_preco += 1;
        continue;
      }
      // Sem preço de antes não dá pra afirmar que é desconto — e a página não
      // anuncia desconto que ninguém consegue provar.
      if (!dados.precoOriginal || dados.precoOriginal <= dados.preco) {
        descartados.sem_desconto += 1;
        continue;
      }

      const desconto = Math.floor((1 - dados.preco / dados.precoOriginal) * 100);
      if (desconto < config.filtros.desconto_minimo) {
        descartados.sem_desconto += 1;
        continue;
      }

      daCategoria.push({
        meli_id: destaque.id,
        tipo,
        nome: dados.nome,
        categoria: alvo.nome,
        preco: dados.preco,
        preco_original: dados.precoOriginal,
        desconto_percentual: desconto,
        imagem: dados.imagem,
        url_do_produto: dados.permalink || urlDoProduto(destaque.id, tipo),
        garimpado_em: hoje,
      });
    }

    daCategoria.sort((a, b) => b.desconto_percentual - a.desconto_percentual);
    candidatos.push(...daCategoria.slice(0, config.por_categoria));
    console.log(`${alvo.nome}: ${daCategoria.length} passaram, ficaram ${Math.min(daCategoria.length, config.por_categoria)}`);
  }

  fs.writeFileSync(
    path.join(raiz, 'data', 'candidatos.json'),
    `${JSON.stringify({ garimpado_em: hoje, total: candidatos.length, candidatos }, null, 2)}\n`,
    'utf-8',
  );

  console.log(`\nFila da semana: ${candidatos.length} candidato(s).`);
  console.log(`Descartados — sem desconto: ${descartados.sem_desconto}, fora da faixa de preço: ${descartados.fora_de_preco}, indisponíveis: ${descartados.indisponivel}, erro: ${descartados.erro}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
