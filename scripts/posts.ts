/**
 * Gera a legenda dos posts do Instagram a partir do catálogo.
 *
 *   npm run posts
 *
 * Escreve `data/posts.json` e imprime pronto pra colar. **Não publica nada** —
 * post que sai sozinho em nome do Alisson não é aceitável, e a regra é a fila
 * de revisão do Metricool (veja "Instagram" no CLAUDE.md). Este script só
 * prepara a fila.
 *
 * É irmão de `scripts/pins.ts` e segue as mesmas regras de sempre. As três
 * diferenças que o Instagram impõe:
 *
 * ⚠️ **Link em legenda não é clicável no Instagram.** O único link que o
 * aplicativo abre é o da bio. Por isso a legenda diz "link na bio" e o destino
 * fica registrado no JSON pra quem for montar a bio — escrever a URL no meio
 * da legenda seria pedir pro leitor digitar à mão, que ninguém faz.
 *
 * ⚠️ **A arte é a quadrada, não a do pin.** `/pin/{slug}` é 2:3 (1000x1500), o
 * formato do Pinterest, e o feed do Instagram corta vertical em 4:5 — o rodapé
 * com o endereço do site sairia. `?formato=quadrado` devolve 1080x1080, que é
 * o único formato que o Instagram nunca corta. Escolha do Alisson em
 * 11/09/2026.
 *
 * ⚠️ **Post também não leva preço**, pela mesma razão do pin: o robô muda o
 * preço toda manhã e ninguém edita post publicado.
 */
import fs from 'fs';
import path from 'path';
import { produtosVisiveis, type Catalogo, type Produto } from '../src/lib/produtos';
import { caminhoDoProduto, gerarSlug } from '../src/lib/slug';

const SITE = 'https://www.verificadoagora.com.br';

/** Limite de legenda do Instagram. Passar disso e o resto simplesmente some. */
const MAX_LEGENDA = 2200;

type Post = {
  meli_id: string;
  /** A ordem da rotação: 1 é o primeiro dia. Celular primeiro, veja `ordenar`. */
  dia: number;
  legenda: string;
  /** A arte 1080x1080. É esta que sobe. */
  arte: string;
  /**
   * Pra onde o post manda. ⚠️ Não entra na legenda: o Instagram não torna
   * link de legenda clicável. Fica aqui pra montar a bio no dia do post.
   */
  destino: string;
  /** A foto crua do Meli, que a arte usa por dentro. Fica pra conferência. */
  imagem: string;
};

function cortar(texto: string, limite: number): string {
  if (texto.length <= limite) return texto;
  const corte = texto.slice(0, limite - 1);
  return `${corte.slice(0, corte.lastIndexOf(' '))}…`;
}

/**
 * A abertura repete a pergunta da arte ("vale a pena?") porque é a consulta
 * que já trouxe impressão neste domínio, medida no Search Console em
 * 10/09/2026. O que vale na busca vale na legenda: é como a pessoa pensa.
 */
function aberturaDe(produto: Produto): string {
  return `${produto.nome} vale a pena?`;
}

const PROMESSA =
  'Conferimos o preço todo dia e publicamos o histórico: dá pra ver se caiu de verdade ou se só o anúncio mudou.';

/** Exigência do programa de afiliados. Sai em toda legenda, sempre inteira. */
const DECLARACAO = 'Link de afiliado — você paga o mesmo preço.';

/** O Instagram não abre link de legenda. Dizer isso é o que faz o post render. */
const CHAMADA = 'Preço de hoje e o histórico completo no link da bio.';

/**
 * ⚠️ **O que é cortado é a análise, nunca o rodapé** — mesma regra do pin. A
 * declaração de afiliado é exigência do programa e não pode cair por excesso
 * de texto.
 */
function legendaDe(produto: Produto): string {
  // O primeiro parágrafo da análise é curadoria escrita à mão. É o que separa
  // o post de um anúncio repetido, e é o que o robô nunca escreve.
  const analise = Array.isArray(produto.analise) ? produto.analise[0] : produto.analise;
  const corpo = (analise ?? produto.descricao ?? '').trim();

  const rodape = `${PROMESSA}\n\n${CHAMADA}\n\n${DECLARACAO}`;
  const abertura = aberturaDe(produto);
  const espaco = MAX_LEGENDA - rodape.length - abertura.length - 4;

  return [abertura, cortar(corpo, espaco), rodape].filter(Boolean).join('\n\n');
}

/**
 * ⚠️ **Celular primeiro, e isso não é detalhe.** O perfil está zerado: os
 * primeiros posts é que dizem ao Instagram — e a quem chega — do que a conta
 * trata. O site é de celulares intermediários desde o brief de 09/09/2026; se
 * a rotação começar por cafeteira e aspirador, o assunto da conta nasce
 * errado, que é o mesmo problema de tópico que fez o filtro da vitrine perder
 * destaque para as categorias de fora do foco.
 */
function ordenar(produtos: Produto[]): Produto[] {
  return [...produtos].sort((a, b) => {
    const celularA = a.categoria === 'Celulares' ? 0 : 1;
    const celularB = b.categoria === 'Celulares' ? 0 : 1;
    if (celularA !== celularB) return celularA - celularB;
    return a.nome.localeCompare(b.nome, 'pt-BR');
  });
}

function main(): void {
  const raiz = process.cwd();
  const catalogo = JSON.parse(
    fs.readFileSync(path.join(raiz, 'data', 'produtos.json'), 'utf-8'),
  ) as Catalogo;

  const semImagem: string[] = [];
  const posts: Post[] = [];

  for (const produto of ordenar(produtosVisiveis(catalogo.produtos))) {
    // Post de feed é formato visual: sem foto não existe post. Avisa em vez de
    // gerar uma legenda que não dá pra publicar.
    if (!produto.imagem) {
      semImagem.push(produto.nome);
      continue;
    }

    posts.push({
      meli_id: produto.meli_id,
      dia: posts.length + 1,
      legenda: legendaDe(produto),
      arte: `${SITE}/pin/${gerarSlug(produto)}?formato=quadrado`,
      destino: `${SITE}${caminhoDoProduto(produto)}`,
      imagem: produto.imagem,
    });
  }

  fs.writeFileSync(
    path.join(raiz, 'data', 'posts.json'),
    `${JSON.stringify({ gerado_em: new Date().toISOString().slice(0, 10), total: posts.length, posts }, null, 2)}\n`,
    'utf-8',
  );

  for (const post of posts) {
    console.log(`\n\n### Dia ${post.dia}\n`);
    console.log(`arte:    ${post.arte}`);
    console.log(`destino: ${post.destino}  (bio, não legenda)`);
    console.log(`\n${post.legenda}\n`);
  }

  console.log(`\n${posts.length} post(s) em data/posts.json.`);
  if (semImagem.length > 0) {
    console.log(`Sem foto, então sem post: ${semImagem.join(', ')}`);
  }
}

main();
