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
}: {
  produto: Produto;
  /** "Menor preço em N dias", ou null quando não há histórico pra afirmar. */
  selo: string | null;
}) {
  const economia = produto.preco_original - produto.preco_atual;
  const caminho = caminhoDoProduto(produto);

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-white/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl">
      <Link href={caminho} className="relative block aspect-square bg-white">
        {produto.imagem ? (
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-xs text-slate-400">
            Sem foto
          </div>
        )}

        <span className="absolute left-0 top-3 rounded-r-full bg-red-600 py-1 pl-3 pr-2 text-xs font-extrabold text-white shadow">
          {produto.desconto_percentual}% OFF
        </span>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2 border-t border-slate-100 p-4">
        <h2 className="min-w-0">
          <Link
            href={caminho}
            className="line-clamp-2 text-sm font-bold leading-snug text-slate-900 hover:text-emerald-700"
          >
            {produto.nome}
          </Link>
        </h2>

        <div className="mt-auto min-w-0">
          <p className="text-xs text-slate-400 line-through">
            {formatarReal(produto.preco_original)}
          </p>
          <p className="flex flex-wrap items-baseline gap-x-2 text-2xl font-extrabold tracking-tight text-emerald-600">
            {formatarReal(produto.preco_atual)}
            {produto.preco_no_pix && (
              <span className="text-xs font-semibold text-slate-500">no Pix</span>
            )}
          </p>
        </div>

        <div className="flex min-w-0 flex-wrap gap-1.5">
          {economia > 0 && (
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700">
              economiza {formatarReal(economia)}
            </span>
          )}
          {selo && (
            <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[11px] font-bold text-amber-700">
              {selo}
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
          className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-emerald-700"
        >
          Ver oferta
          <span aria-hidden="true">→</span>
        </a>

        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span>Conferido em {formatarData(produto.verificado_em)}</span>
          <Link href={caminho} className="font-semibold text-slate-500 hover:text-emerald-700">
            detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}
