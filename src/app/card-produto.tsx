import Image from 'next/image';
import {
  formatarData,
  formatarReal,
  NOME_PLATAFORMA,
  type Produto,
} from '@/lib/produtos';

/**
 * Card branco sobre fundo escuro: a foto do Meli vem recortada em branco, então
 * o card some atrás do produto e é o produto que aparece. É o que faz a página
 * parecer vitrine e não lista.
 */
export function CardProduto({ produto }: { produto: Produto }) {
  const plataforma = NOME_PLATAFORMA[produto.plataforma] ?? produto.plataforma;
  const economia = produto.preco_original - produto.preco_atual;

  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-white/10 transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-square bg-white">
        {produto.imagem ? (
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-6 transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm text-slate-400">
            Sem foto do produto
          </div>
        )}

        <span className="absolute left-0 top-5 rounded-r-full bg-red-600 py-1.5 pl-4 pr-3 text-sm font-extrabold tracking-tight text-white shadow-md">
          {produto.desconto_percentual}% OFF
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 border-t border-slate-100 p-5">
        <div className="min-w-0">
          <p className="mb-1 truncate text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            {produto.categoria}
          </p>
          <h2 className="line-clamp-2 text-base font-bold leading-snug text-slate-900">
            {produto.nome}
          </h2>
          {produto.descricao && (
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-slate-500">
              {produto.descricao}
            </p>
          )}
        </div>

        <div className="mt-auto min-w-0">
          <p className="text-sm text-slate-400 line-through">
            {formatarReal(produto.preco_original)}
          </p>
          <p className="flex flex-wrap items-baseline gap-x-2 text-3xl font-extrabold tracking-tight text-emerald-600">
            {formatarReal(produto.preco_atual)}
            {produto.preco_no_pix && (
              <span className="text-sm font-semibold text-slate-500">no Pix</span>
            )}
          </p>
          {economia > 0 && (
            <p className="mt-2 inline-block rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
              Você economiza {formatarReal(economia)}
            </p>
          )}
        </div>

        {produto.avaliacao > 0 && (
          <p className="text-sm text-slate-600">
            <span aria-hidden="true">⭐</span> Nota {produto.avaliacao} de 5
          </p>
        )}

        {produto.cupom && (
          <p className="min-w-0 break-words rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800">
            Cupom: <strong>{produto.cupom}</strong>
          </p>
        )}

        <a
          href={produto.link_afiliado}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-center font-bold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        >
          Ver no {plataforma}
          <span aria-hidden="true">→</span>
        </a>

        <p className="text-center text-[11px] text-slate-400">
          Preço conferido em {formatarData(produto.verificado_em)}
        </p>
      </div>
    </article>
  );
}
