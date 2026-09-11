import { lerCatalogo, lerComparativos, lerDecisoes, lerGuias, lerHistorico } from '@/lib/catalogo';
import { ordenarPorRecencia, produtosVisiveis } from '@/lib/produtos';
import { resumirTendencia, seloDeMenorPreco } from '@/lib/historico';
import { acharComparativo, quantosRivais } from '@/lib/comparativos';
import { caminhoDoComparativo } from '@/lib/slug';
import Link from 'next/link';
import { CardProduto } from './card-produto';
import { Vitrine } from './vitrine';
import { SeloDeConferencia } from './selo-de-conferencia';
import { descreverConferencia } from '@/lib/relogio';

export const revalidate = 3600; // o preço envelhece: revalida de hora em hora

/**
 * Os motivos pra confiar na página, ditos sem enrolação.
 *
 * Eram três caixas empilhadas e ocupavam 365px no celular — mais da metade
 * do cabeçalho, com o primeiro card começando em 936px numa tela de 844px:
 * quem abria pelo Instagram não via produto nenhum sem rolar. Viraram uma
 * faixa de uma linha, e a explicação de cada uma só aparece do `sm` pra cima.
 *
 * O aviso de link de afiliado saiu daqui em 08/09/2026 e vive no rodapé,
 * onde continua sendo declarado — veja "Dinheiro" no CLAUDE.md.
 */
const GARANTIAS = [
  ['Preço conferido todo dia', 'um robô confere na API do Mercado Livre toda manhã'],
  ['Histórico de verdade', 'guardamos o preço de cada dia, por isso sabemos qual é o menor'],
] as const;

/**
 * O foco do site desde 09/09/2026: celulares intermediários.
 *
 * O que já estava no catálogo fora dessa faixa continua no ar e continua
 * sendo conferido — mas não recebe produto novo, e o filtro deixa de dar a
 * ele o mesmo peso. Dois assuntos com o mesmo destaque atrapalham a leitura
 * de tópico do buscador.
 */
const CATEGORIA_FOCO = 'Celulares';

export default function Home() {
  const { produtos: todos, metadata } = lerCatalogo();
  const produtos = ordenarPorRecencia(produtosVisiveis(todos));
  const historico = lerHistorico();
  const comparativos = lerComparativos();
  const guias = lerGuias();
  // Os dois formatos de guia entram na mesma fileira: da home, a diferença
  // entre "por perfil" e "por pergunta" não importa a ninguém. O título do
  // guia de decisão é longo de propósito (é a busca inteira), então no botão
  // entra só a parte antes dos dois-pontos.
  const atalhosDeGuia = [
    ...guias.map((g) => ({ slug: g.slug, rotulo: g.titulo, icone: '☰' })),
    ...lerDecisoes().map((d) => ({
      slug: d.slug,
      rotulo: d.titulo.split(':')[0],
      icone: '?',
    })),
  ];
  const conferencia = descreverConferencia(metadata.conferido_em, new Date());

  return (
    <main className="min-h-screen bg-fundo">
      {/* A faixa noturna, cortada por uma linha ciano. É o contraste dela com
          o corpo claro que separa a vitrine de um blog — foi assim que o
          Alisson escolheu em 08/09/2026, entre três cortes de topo. */}
      <header className="faixa-noturna border-b-4 border-corte">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-14">
          <div className="mb-2">
            {conferencia && (
              <SeloDeConferencia
                conferidoEm={metadata.conferido_em}
                inicial={conferencia}
                sobre="escuro"
              />
            )}
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Verificado <span className="text-marca-claro">Agora</span>
          </h1>
          {/* Some no celular: no espaço que ele ocupa cabe metade de um card,
              e o título já diz o que a página é. */}
          <p className="mt-2 max-w-xl text-sm font-semibold text-marca-claro sm:mt-3 sm:text-lg">
            Celulares intermediários, de R$ 800 a R$ 2.500.
          </p>
          <p className="mt-2 hidden max-w-xl text-lg font-medium text-sky-100/70 sm:block">
            O preço de cada um é conferido por robô toda manhã, e a gente guarda o valor de todo
            dia — por isso dá pra dizer quando está barato de verdade.
          </p>

          <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-sky-100/65 sm:mt-6 sm:text-sm">
            {GARANTIAS.map(([titulo, texto]) => (
              <div key={titulo} className="flex min-w-0 items-baseline gap-1.5">
                <dt className="font-bold text-sky-50">
                  <span aria-hidden="true" className="mr-1 font-black text-corte">
                    ✓
                  </span>
                  {titulo}
                </dt>
                <dd className="hidden min-w-0 sm:block">— {texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Guia acima da grade porque ele responde a dúvida de quem ainda não
          escolheu — e a vitrine sozinha só serve quem já sabe o que quer. */}
      {atalhosDeGuia.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-5 sm:pt-12">
          <ul className="flex min-w-0 flex-wrap gap-3">
            {atalhosDeGuia.map((guia) => (
              <li key={guia.slug} className="min-w-0">
                <Link
                  href={`/guia/${guia.slug}`}
                  className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-marca/30 hover:text-marca hover:shadow-md"
                >
                  <span aria-hidden="true" className="font-black text-marca">
                    {guia.icone}
                  </span>
                  <span className="min-w-0">{guia.rotulo}</span>
                  <span aria-hidden="true" className="text-marca">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-5 sm:py-12">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 sm:mb-8">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            {produtos.length} {produtos.length === 1 ? 'achado conferido' : 'achados conferidos'}
          </h2>
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            A loja muda preço a qualquer hora — vale conferir antes de comprar.
          </p>
        </div>

        <Vitrine
          foco={CATEGORIA_FOCO}
          produtos={produtos}
          cards={produtos.map((produto) => {
            const comparativo = acharComparativo(comparativos, produto.meli_id);
            return (
              <CardProduto
                key={produto.id}
                produto={produto}
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
            );
          })}
        />
      </section>

      {/* O rodapé usa a mesma faixa do topo: a página abre e fecha no mesmo
          escuro, e a vitrine clara fica emoldurada entre as duas. */}
      <footer className="faixa-noturna mt-4 border-t-4 border-corte">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-8 text-center text-xs text-sky-100/50">
          <p className="text-base font-black tracking-tight text-white">
            Verificado <span className="text-marca-claro">Agora</span>
          </p>
          {/* Encurtado em 08/09/2026, não removido: o programa de afiliados
              exige a declaração e a regra 1 do projeto diz "nunca tire". Uma
              linha cumpre a exigência sem virar parede de texto. */}
          <p>
            <Link
              href="/como-conferimos"
              className="font-bold text-marca-claro underline decoration-marca-claro/40 underline-offset-4 transition-colors hover:text-white"
            >
              Como conferimos os preços
            </Link>
          </p>
          <p className="text-sky-100/75">Links de afiliado · você paga o mesmo preço</p>
          <p>
            © 2026 A F DE SOUSA ·{' '}
            <a
              className="font-medium underline transition-colors hover:text-white"
              href="mailto:contato@afdesousa.com.br"
            >
              contato@afdesousa.com.br
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
