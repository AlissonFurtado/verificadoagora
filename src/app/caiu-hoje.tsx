import Image from 'next/image';
import Link from 'next/link';
import { formatarData, formatarReal } from '@/lib/produtos';
import type { Queda } from '@/lib/quedas';
import { caminhoDoProduto } from '@/lib/slug';

/**
 * A faixa fina de quedas no topo da home (pedido dele em 01/11/2026).
 *
 * É o motivo de voltar amanhã: a primeira coisa que muda de um dia para o
 * outro. Rola de lado para não empurrar a vitrine, e some em dia sem queda —
 * uma faixa vazia, ou preenchida com qualquer coisa, desmentiria o nome.
 *
 * ⚠️ O card leva à ficha, não ao Meli: quem clica quer ver a prova da queda.
 */
export function CaiuHoje({ quedas, hoje }: { quedas: Queda[]; hoje: string }) {
  if (quedas.length === 0) return null;

  const dia = quedas[0].para.dia;
  const titulo = dia === hoje ? 'Caiu hoje' : `Caiu em ${formatarData(dia).slice(0, 5)}`;

  return (
    <section aria-labelledby="titulo-caiu-hoje" className="mx-auto max-w-6xl px-4 pt-5 sm:pt-6">
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <h2
          id="titulo-caiu-hoje"
          className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-900"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lupita.svg" alt="" width={20} height={24} className="h-6 w-5 shrink-0" />
          {titulo}
        </h2>
        <Link
          href="/quedas-de-preco"
          className="shrink-0 text-xs font-bold text-marca underline underline-offset-2"
        >
          ver tudo que caiu
        </Link>
      </div>

      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
        {quedas.map(({ produto, para, reais, noMenor }) => (
          <li key={produto.id} className="w-[64%] min-w-0 shrink-0 snap-start sm:w-[260px]">
            <Link
              href={caminhoDoProduto(produto)}
              data-onde="home-caiu-hoje"
              className="flex h-full min-w-0 items-center gap-2.5 rounded-xl bg-white p-2 shadow-[0_2px_5px_rgba(0,0,0,0.05)] ring-1 ring-slate-200 transition-colors hover:ring-marca-acao"
            >
              <span className="relative block h-14 w-14 shrink-0">
                {produto.imagem && (
                  <Image
                    src={produto.imagem}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain"
                  />
                )}
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="line-clamp-1 text-xs font-bold text-slate-800">{produto.nome}</span>
                <span className="text-[17px] font-black leading-tight tracking-[-0.3px] text-marca">
                  {formatarReal(para.preco)}
                </span>
                <span className="line-clamp-1 text-[11px] font-bold text-economia">
                  <span aria-hidden="true">↓ </span>
                  caiu {formatarReal(reais)}
                  {noMenor && ' · menor preço'}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
