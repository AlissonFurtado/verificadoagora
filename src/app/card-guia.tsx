import Link from 'next/link';
import type { Guia } from '@/lib/guias';
import type { Produto } from '@/lib/produtos';

/**
 * O card de um guia, no topo da grade de produtos.
 *
 * Nasceu em 15/10/2026, pedido do Alisson: um tema (suplementos) aparece na
 * home como **um card só**, e os produtos dele moram dentro do guia.
 *
 * ⚠️ **Ocupa uma casa da grade, como um produto** (decisão dele em
 * 25/10/2026). Foi banner da largura da grade de 15 a 25/10: no PC mostrava
 * os 7 a 10 produtos e "inchava". Agora são sempre 3 fotos grandes, a
 * terceira com "+N", e o card estica até a altura da linha. No celular a
 * grade tem uma coluna, então ele continua da largura da tela.
 *
 * A posição na grade é a data do guia (`escrito_em`): veja `page.tsx`.
 */
export function CardGuia({ guia, produtos }: { guia: Guia; produtos: Produto[] }) {
  const fotos = produtos.filter((p) => p.imagem);

  return (
    <Link
      href={`/guia/${guia.slug}`}
      data-onde="card-guia"
      className="faixa-noturna group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl p-4 text-white shadow-[0_8px_24px_rgba(11,18,32,0.25)] ring-2 ring-amber-400 transition-transform duration-300 hover:-translate-y-1"
    >
      <span className="inline-block rounded bg-amber-400 px-2 py-0.5 text-[11px] font-black uppercase tracking-wide text-slate-900">
        Guia · {produtos.length} produtos
      </span>
      <h3 className="mt-2 text-lg font-black leading-tight">{guia.titulo}</h3>
      {guia.vitrine && (
        <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-300">
          {guia.vitrine.chamada}
        </p>
      )}

      <ul className="my-3 grid min-w-0 grid-cols-3 gap-2">
        {fotos.map((p, i) => (
          <li
            key={p.meli_id}
            className={`relative min-w-0 overflow-hidden rounded-xl bg-white p-2 ${i >= 3 ? 'hidden' : ''}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.imagem}
              alt={p.nome}
              className="aspect-square w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            {/* Cabem 3 fotos grandes: a terceira avisa quantas faltam. */}
            {i === 2 && fotos.length > 3 && (
              <span className="absolute inset-0 flex items-center justify-center bg-noite/60 text-2xl font-black text-white">
                +{fotos.length - 3}
              </span>
            )}
          </li>
        ))}
      </ul>

      <span className="mt-auto block rounded-lg bg-marca-acao py-3 text-center text-sm font-extrabold uppercase tracking-wider text-white transition-colors group-hover:bg-marca">
        Ver os {produtos.length} produtos →
      </span>
    </Link>
  );
}
