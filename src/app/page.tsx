import { lerCatalogo, lerComparativos, lerHistorico } from '@/lib/catalogo';
import { ordenarPorRecencia, produtosVisiveis } from '@/lib/produtos';
import { resumirTendencia, seloDeMenorPreco } from '@/lib/historico';
import { acharComparativo, quantosRivais } from '@/lib/comparativos';
import { caminhoDoComparativo } from '@/lib/slug';
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

export default function Home() {
  const { produtos: todos, metadata } = lerCatalogo();
  const produtos = ordenarPorRecencia(produtosVisiveis(todos));
  const historico = lerHistorico();
  const comparativos = lerComparativos();
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
          <p className="mt-3 hidden max-w-xl text-lg font-medium text-sky-100/70 sm:block">
            Achadinhos de tecnologia com desconto de verdade — e o preço conferido no dia,
            não no mês passado.
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

      <section className="mx-auto max-w-6xl px-4 py-5 sm:py-12">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 sm:mb-8">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            {produtos.length} {produtos.length === 1 ? 'achado' : 'achados'} desta semana
          </h2>
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            A loja muda preço a qualquer hora — vale conferir antes de comprar.
          </p>
        </div>

        <Vitrine
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
