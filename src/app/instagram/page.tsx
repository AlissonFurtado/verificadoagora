import type { Metadata } from 'next';
import Link from 'next/link';
import posts from '../../../data/posts.json';
import { lerCatalogo, lerComparativos, lerHistorico } from '@/lib/catalogo';
import { produtosVisiveis, type Produto } from '@/lib/produtos';
import { resumirTendencia, seloDeMenorPreco } from '@/lib/historico';
import { acharComparativo, quantosRivais } from '@/lib/comparativos';
import { caminhoDoComparativo } from '@/lib/slug';
import { descreverConferencia } from '@/lib/relogio';
import { CardProduto } from '../card-produto';
import { SeloDeConferencia } from '../selo-de-conferencia';

export const revalidate = 3600; // o preço envelhece: revalida de hora em hora

/**
 * O destino do link da bio do Instagram.
 *
 * Existe por uma limitação do próprio Instagram: **link em legenda não é
 * clicável**, e o único que o aplicativo abre é o da bio. Sem esta página
 * sobravam duas saídas ruins — mandar todo mundo pra home, e aí quem veio do
 * post do G17 cai numa vitrine de quinze produtos e tem que caçar; ou trocar
 * o link da bio a cada post, o que conserta hoje e quebra ontem, porque o
 * post de terça passa a apontar pro produto de quarta.
 *
 * ⚠️ **A ordem é a mesma de `data/posts.json`**, que é a ordem em que os
 * posts saem (`npm run posts`, celular primeiro). Assim o produto do post de
 * hoje está sempre no topo desta página, sem ninguém editar nada: o que muda
 * a página é gerar a fila, não mexer aqui.
 *
 * ⚠️ **`data-onde` é `instagram`**, não `vitrine`. É a propriedade que
 * responde "esse canal rendeu?" no evento `oferta_clicada` — misturar com a
 * home apagaria a única medição que o canal tem. (Continua valendo que evento
 * personalizado não aparece no plano Hobby: até virar Pro, o placar real é o
 * painel do Meli.)
 *
 * ⚠️ **Fora do índice de propósito.** É uma lista de produtos que já existem
 * na vitrine — exatamente o tipo de página fina que o Google vem recusando
 * neste domínio. Ela serve a quem chega pela bio, não à busca: `noindex`, e
 * fora do `sitemap.ts`, que sai do catálogo.
 */
export const metadata: Metadata = {
  title: 'Do Instagram · Verificado Agora',
  description:
    'Os produtos que aparecem no @verificadoagorabr, com o preço conferido hoje e o histórico de cada um.',
  robots: { index: false, follow: true },
};

/** O catálogo na ordem da fila de posts. Produto fora da fila fica de fora. */
function naOrdemDosPosts(produtos: Produto[]): Produto[] {
  const visiveis = new Map(produtosVisiveis(produtos).map((p) => [p.meli_id, p] as const));

  return posts.posts
    .map((post) => visiveis.get(post.meli_id))
    .filter((p): p is Produto => p !== undefined);
}

export default function DoInstagram() {
  const { produtos: todos, metadata: meta } = lerCatalogo();
  const produtos = naOrdemDosPosts(todos);
  const historico = lerHistorico();
  const comparativos = lerComparativos();
  const conferencia = descreverConferencia(meta.conferido_em, new Date());

  return (
    <main className="min-w-0">
      <header className="faixa-noturna px-4 py-8 text-white sm:py-10">
        <div className="mx-auto min-w-0 max-w-4xl">
          <p className="text-[13px] font-semibold uppercase tracking-wider text-corte">
            Você veio do Instagram
          </p>
          <h1 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
            Os produtos que aparecem por lá, com o preço de hoje
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-300">
            O post não leva preço de propósito: um robô confere o preço de cada produto toda
            manhã, e o que está no anúncio hoje não é o que estava quando o post saiu. Aqui
            está o valor conferido agora, e o histórico de cada um.
          </p>
          {conferencia && (
            <div className="mt-4">
              <SeloDeConferencia
                conferidoEm={meta.conferido_em}
                inicial={conferencia}
                sobre="escuro"
              />
            </div>
          )}
        </div>
      </header>

      <div className="mx-auto min-w-0 max-w-4xl px-4 py-8">
        <ul className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
          {produtos.map((produto) => {
            const comparativo = acharComparativo(comparativos, produto.meli_id);

            return (
              <li key={produto.id} className="min-w-0">
                <CardProduto
                  produto={produto}
                  onde="instagram"
                  selo={seloDeMenorPreco(historico.produtos[produto.meli_id], produto.preco_atual)}
                  tendencia={resumirTendencia(historico.produtos[produto.meli_id])}
                  comparativo={
                    comparativo
                      ? {
                          caminho: caminhoDoComparativo(produto),
                          rivais: quantosRivais(comparativo),
                        }
                      : null
                  }
                />
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-sm text-slate-500">
          Procurando outra coisa?{' '}
          <Link href="/" className="font-semibold text-marca underline">
            Ver o catálogo inteiro
          </Link>{' '}
          ou{' '}
          <Link href="/como-conferimos" className="font-semibold text-marca underline">
            entender como conferimos o preço
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
