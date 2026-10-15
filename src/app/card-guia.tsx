import Link from 'next/link';
import type { Guia } from '@/lib/guias';
import type { Produto } from '@/lib/produtos';

/**
 * O card de um guia, no meio da grade de produtos.
 *
 * Nasceu em 15/10/2026, pedido do Alisson: um tema (suplementos) aparece na
 * home como **um card só**, e os produtos dele moram dentro do guia. A foto é
 * um mosaico dos quatro primeiros perfis, para o card dizer "vários
 * produtos" antes de qualquer texto. Âmbar, como o anel do comparativo:
 * é a cor de "página de julgamento" na vitrine.
 */
export function CardGuia({ guia, produtos }: { guia: Guia; produtos: Produto[] }) {
  const fotos = produtos.filter((p) => p.imagem).slice(0, 4);

  return (
    <Link
      href={`/guia/${guia.slug}`}
      data-onde="card-guia"
      className="group flex h-full min-w-0 flex-row overflow-hidden rounded-xl bg-white shadow-[0_2px_5px_rgba(0,0,0,0.05)] ring-2 ring-amber-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] sm:flex-col"
    >
      <div className="grid w-[34%] shrink-0 grid-cols-2 gap-px bg-slate-100 sm:w-full">
        {fotos.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.meli_id}
            src={p.imagem}
            alt=""
            loading="lazy"
            className="aspect-square h-full w-full bg-white object-contain p-1.5"
          />
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
        <span className="self-start rounded bg-amber-400 px-2 py-0.5 text-[11px] font-black uppercase tracking-wide text-slate-900">
          Guia · {produtos.length} produtos
        </span>
        <h3 className="mt-2 text-[15px] font-extrabold leading-snug text-slate-900 sm:text-base">
          {guia.titulo}
        </h3>
        {guia.vitrine && (
          <p className="mt-1 line-clamp-3 text-xs leading-snug text-slate-600 sm:text-sm">
            {guia.vitrine.chamada}
          </p>
        )}
        <span className="mt-auto block rounded-lg bg-marca-acao px-2 py-2.5 pt-2.5 text-center text-xs font-extrabold uppercase tracking-wider text-white sm:mt-3">
          Ver os {produtos.length} produtos
        </span>
      </div>
    </Link>
  );
}
