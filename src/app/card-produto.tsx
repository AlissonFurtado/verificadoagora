import Image from 'next/image';
import Link from 'next/link';
import { formatarData, formatarReal, type Produto } from '@/lib/produtos';
import { caminhoDoProduto } from '@/lib/slug';

/**
 * Card branco sobre fundo escuro: a foto do Meli vem recortada em branco,
 * então o card some atrás do produto e é o produto que aparece.
 *
 * Compacto de propósito. A descrição, a nota e o gráfico de preço moram na
 * página do produto — aqui só o que decide o clique: foto, desconto, preço.
 */
export function CardProduto({
  produto,
  selo,
  comparativo,
}: {
  produto: Produto;
  /** "Menor preço em N dias", ou null quando não há histórico pra afirmar. */
  selo: string | null;
  /**
   * Quando o produto tem comparativo escrito, o card vira destaque: faixa
   * âmbar no topo, anel âmbar em volta e um segundo link, pra tabela. É o
   * único card da grade que aponta pra dois lugares — a loja e o comparativo.
   */
  comparativo?: { caminho: string; rivais: number } | null;
}) {
  const economia = produto.preco_original - produto.preco_atual;
  const caminho = caminhoDoProduto(produto);

  return (
    <article
      className={`group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        comparativo ? 'ring-2 ring-amber-400 shadow-md' : 'ring-1 ring-slate-200/80 shadow-sm hover:ring-emerald-400/60'
      }`}
    >
      {comparativo && (
        <Link
          href={comparativo.caminho}
          className="flex items-center justify-center gap-1.5 bg-amber-400 px-2 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-amber-950 hover:bg-amber-300 transition-colors"
        >
          <span aria-hidden="true">⚖</span>
          {/* No celular o card tem meia tela: o texto longo só entra a partir
              do sm, onde a coluna já é larga o bastante pra caber numa linha. */}
          Comparativo
          <span className="hidden sm:inline">· {comparativo.rivais} modelos</span>
        </Link>
      )}

      <Link href={caminho} className="relative block aspect-square bg-white">
        {produto.imagem ? (
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-5 transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-xs text-slate-400">
            Sem foto
          </div>
        )}

        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-red-500 py-1 pl-2 pr-2.5 text-xs font-black text-white shadow-md">
          <span aria-hidden="true" className="text-sm leading-none">🔥</span>
          {produto.desconto_percentual}% OFF
        </span>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5 border-t border-slate-100 p-5 bg-slate-50/30">
        <h2 className="min-w-0">
          <Link
            href={caminho}
            className="line-clamp-2 text-sm font-bold leading-snug text-slate-800 transition-colors hover:text-emerald-600"
          >
            {produto.nome}
          </Link>
        </h2>

        <div className="mt-auto min-w-0">
          <p className="text-xs font-medium text-slate-400 line-through">
            {formatarReal(produto.preco_original)}
          </p>
          <p className="flex flex-wrap items-baseline gap-x-2 text-2xl font-black tracking-tight text-emerald-600">
            {formatarReal(produto.preco_atual)}
            {produto.preco_no_pix && (
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">no Pix</span>
            )}
          </p>
        </div>

        <div className="flex min-w-0 flex-wrap gap-1.5 mb-1">
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
          className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-3 text-center text-sm font-extrabold text-white transition-all hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg animate-pulse-subtle"
        >
          Ver oferta
          <span aria-hidden="true" className="text-lg leading-none transition-transform group-hover:translate-x-1">→</span>
        </a>

        {comparativo && (
          <Link
            href={comparativo.caminho}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2.5 text-xs font-bold text-amber-800 ring-1 ring-inset ring-amber-200 transition-colors hover:bg-amber-100"
          >
            Comparar
            <span className="hidden sm:inline">com {comparativo.rivais} concorrentes</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}

        <div className="mt-2 flex items-center justify-between border-t border-slate-200/60 pt-3 text-[10px] text-slate-400 font-medium">
          <span>Conferido em {formatarData(produto.verificado_em)}</span>
          <Link href={caminho} className="font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-wider">
            Detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
