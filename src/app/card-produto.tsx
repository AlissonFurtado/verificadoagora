import Image from 'next/image';
import Link from 'next/link';
import { formatarData, formatarReal, type Produto } from '@/lib/produtos';
import { caminhoDoProduto } from '@/lib/slug';
import type { Tendencia } from '@/lib/historico';
import { MiniGrafico } from './mini-grafico';

/**
 * Card do produto.
 *
 * **Deitado no celular, em pé a partir do `sm`.** Abaixo de 640px a vitrine
 * tem uma coluna só: com a foto em cima ocupando a largura inteira caberia um
 * produto por tela e a lista viraria um túnel de quinze rolagens. Com a foto
 * ao lado cabem três, e a altura de todos os cards passa a ser a mesma sem
 * truque nenhum — quem manda é o corpo do texto.
 *
 * Compacto de propósito. A descrição, a nota e o gráfico de preço moram na
 * página do produto — aqui só o que decide o clique: foto, desconto, preço.
 */
export function CardProduto({
  produto,
  selo,
  comparativo,
  tendencia,
}: {
  produto: Produto;
  /** "Menor preço em N dias", ou null quando não há histórico pra afirmar. */
  selo: string | null;
  /**
   * Quando o produto tem comparativo escrito, o card ganha um selo âmbar
   * sobre a foto e um anel da mesma cor. O selo é o único caminho pro
   * comparativo: qualquer coisa que ocupasse espaço no corpo deixaria este
   * card mais alto que os outros e desalinharia a grade por um produto só.
   */
  comparativo?: { caminho: string; rivais: number } | null;
  /** Como o preço andou. `null` até o robô ter dois dias do produto. */
  tendencia?: Tendencia | null;
}) {
  const economia = produto.preco_original - produto.preco_atual;
  const caminho = caminhoDoProduto(produto);

  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        comparativo
          ? 'ring-2 ring-amber-400'
          : 'ring-1 ring-slate-300 hover:ring-emerald-500/70'
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-row sm:flex-col">
        {/* A foto é o quadro: o link dela, o selo de desconto e o selo do
            comparativo ficam todos por cima, e nenhum deles empurra a altura
            do card. Foi assim que o card do comparativo deixou de ser 33px
            mais alto que os outros catorze. */}
        <div className="relative w-2/5 min-w-0 shrink-0 self-stretch bg-white sm:aspect-square sm:w-full sm:self-auto">
          <Link href={caminho} className="absolute inset-0 block">
            {produto.imagem ? (
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-4 transition duration-500 group-hover:scale-105 sm:p-5"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-4 text-center text-xs text-slate-400">
                Sem foto
              </div>
            )}
          </Link>

          <span className="pointer-events-none absolute left-2 top-2 flex items-center gap-1 rounded-full bg-red-500 py-1 pl-2 pr-2.5 text-xs font-black text-white shadow-md sm:left-3 sm:top-3">
            <span aria-hidden="true" className="text-sm leading-none">
              🔥
            </span>
            {produto.desconto_percentual}% OFF
          </span>

          {comparativo && (
            <Link
              href={comparativo.caminho}
              className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-amber-400 py-1 pl-2 pr-2.5 text-[10px] font-black uppercase tracking-wide text-amber-950 shadow-md transition-colors hover:bg-amber-300 sm:bottom-3 sm:left-3 sm:text-[11px]"
            >
              <span aria-hidden="true">⚖</span>
              Comparativo
              <span className="hidden sm:inline">· {comparativo.rivais} modelos</span>
            </Link>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2 border-l border-slate-100 p-4 sm:border-l-0 sm:border-t sm:p-5">
          {/* Altura mínima de duas linhas: título curto e título longo ocupam
              o mesmo espaço, e é o que mantém todos os cards do mesmo tamanho
              mesmo em linhas diferentes da grade. */}
          <h2 className="min-h-[2.5rem] min-w-0">
            <Link
              href={caminho}
              className="line-clamp-2 text-sm font-bold leading-snug text-slate-800 transition-colors hover:text-emerald-600"
            >
              {produto.nome}
            </Link>
          </h2>

          <div className="mt-auto min-w-0">
            {/* O traçado divide a linha do preço antigo, que é curta: é o
                único lugar do card onde ele entra sem mudar a altura. */}
            <div className="flex min-w-0 items-center justify-between gap-2">
              <p className="text-xs font-medium text-slate-400 line-through">
                {formatarReal(produto.preco_original)}
              </p>
              {tendencia && <MiniGrafico tendencia={tendencia} />}
            </div>
            <p className="flex flex-wrap items-baseline gap-x-2 text-2xl font-black tracking-tight text-emerald-600">
              {formatarReal(produto.preco_atual)}
              {produto.preco_no_pix && (
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  no Pix
                </span>
              )}
            </p>
          </div>

          {/* Reserva a linha mesmo sem selo, pelo mesmo motivo do título. */}
          <div className="flex min-h-[1.5rem] min-w-0 flex-wrap gap-1.5">
            {economia > 0 && (
              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                Economiza {formatarReal(economia)}
              </span>
            )}
            {selo && (
              <span className="flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">
                <span aria-hidden="true">📉</span> {selo}
              </span>
            )}
          </div>

          {/* O botão vai direto pra loja: caminho mais curto até a compra. A
              página do produto é porta de entrada de busca, não degrau do funil
              — quem chega por ela já está lá. */}
          <a
            href={produto.link_afiliado}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-3 text-center text-sm font-extrabold text-white transition-all hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg"
          >
            Ver oferta
            <span
              aria-hidden="true"
              className="text-lg leading-none transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>

          {/* Envolve em vez de cortar: no card deitado do celular a coluna de
              texto é estreita, e "Conferido em 08/09…" reticenciado tira
              justamente a data que dá credibilidade à página. */}
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-slate-200/60 pt-3 text-[10px] font-medium text-slate-400">
            <span className="min-w-0">Conferido em {formatarData(produto.verificado_em)}</span>
            <Link
              href={caminho}
              className="shrink-0 font-bold uppercase tracking-wider text-slate-400 transition-colors hover:text-emerald-600"
            >
              Detalhes
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
