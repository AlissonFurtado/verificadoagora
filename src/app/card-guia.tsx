import Link from 'next/link';
import type { Guia } from '@/lib/guias';
import type { Produto } from '@/lib/produtos';

/**
 * O card de um guia, no topo da grade de produtos.
 *
 * Nasceu em 15/10/2026, pedido do Alisson: um tema (suplementos) aparece na
 * home como **um card só**, e os produtos dele moram dentro do guia.
 *
 * ⚠️ **É um banner da largura da grade, no escuro da marca** — decisão dele no
 * mesmo dia, com print do celular na mão. A primeira versão tinha o tamanho de
 * um card de produto, com um mosaico 2×2: no celular as fotos ficaram
 * pequenas e cortadas, e o card não se destacava. Agora as fotos vêm numa fila
 * de quadrados brancos: 3 grandes no celular (~100 px, a terceira com "+N";
 * com 4 elas caíam para 59 px) e todas do `sm` pra cima.
 */
export function CardGuia({ guia, produtos }: { guia: Guia; produtos: Produto[] }) {
  const fotos = produtos.filter((p) => p.imagem);

  return (
    <Link
      href={`/guia/${guia.slug}`}
      data-onde="card-guia"
      className="faixa-noturna group block min-w-0 overflow-hidden rounded-2xl p-4 text-white shadow-[0_8px_24px_rgba(11,18,32,0.25)] ring-2 ring-amber-400 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
    >
      <span className="inline-block rounded bg-amber-400 px-2 py-0.5 text-[11px] font-black uppercase tracking-wide text-slate-900">
        Guia · {produtos.length} produtos
      </span>
      <h3 className="mt-2 text-xl font-black leading-tight sm:text-2xl">{guia.titulo}</h3>
      {guia.vitrine && (
        <p className="mt-1 text-sm leading-snug text-slate-300 sm:text-[15px]">
          {guia.vitrine.chamada}
        </p>
      )}

      <ul className="mt-4 grid min-w-0 grid-cols-3 gap-2 sm:grid-cols-7 sm:gap-3">
        {fotos.map((p, i) => (
          <li
            key={p.meli_id}
            className={`relative min-w-0 overflow-hidden rounded-xl bg-white p-2 ${i >= 3 ? 'hidden sm:block' : ''}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.imagem}
              alt={p.nome}
              className="aspect-square w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            {/* No celular cabem 3 fotos grandes: a terceira avisa quantas faltam. */}
            {i === 2 && fotos.length > 3 && (
              <span className="absolute inset-0 flex items-center justify-center bg-noite/60 text-2xl font-black text-white sm:hidden">
                +{fotos.length - 3}
              </span>
            )}
          </li>
        ))}
      </ul>

      <span className="mt-4 block rounded-lg bg-marca-acao py-3 text-center text-sm font-extrabold uppercase tracking-wider text-white transition-colors group-hover:bg-marca sm:mx-auto sm:max-w-sm">
        Ver os {produtos.length} produtos →
      </span>
    </Link>
  );
}
