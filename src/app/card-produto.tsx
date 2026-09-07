import Image from 'next/image';
import {
  formatarData,
  formatarReal,
  NOME_PLATAFORMA,
  type Produto,
} from '@/lib/produtos';

export function CardProduto({ produto }: { produto: Produto }) {
  const plataforma = NOME_PLATAFORMA[produto.plataforma] ?? produto.plataforma;

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg bg-slate-800 transition-shadow hover:shadow-xl">
      <div className="relative aspect-square bg-white">
        {produto.imagem ? (
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-slate-500">
            Sem foto do produto
          </div>
        )}
        <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-sm font-bold text-white">
          {produto.desconto_percentual}% off
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4">
        <p className="mb-1 min-w-0 truncate text-xs uppercase tracking-wide text-slate-400">
          {produto.categoria}
        </p>
        <h2 className="mb-2 min-w-0 text-lg font-semibold">{produto.nome}</h2>
        {produto.descricao && (
          <p className="mb-3 min-w-0 text-sm text-slate-300">{produto.descricao}</p>
        )}

        <div className="mb-3 mt-auto">
          <p className="text-slate-400 line-through">{formatarReal(produto.preco_original)}</p>
          <p className="text-3xl font-bold text-green-400">
            {formatarReal(produto.preco_atual)}
            {produto.preco_no_pix && (
              <span className="ml-2 align-middle text-base font-normal text-slate-300">no Pix</span>
            )}
          </p>
        </div>

        {/* Nota 0 = ninguém conferiu. Some, em vez de anunciar "Nota 0 de 5". */}
        {produto.avaliacao > 0 && (
          <p className="mb-1 text-sm text-slate-300">
            <span aria-hidden="true">⭐</span> Nota {produto.avaliacao} de 5
          </p>
        )}
        <p className="mb-3 text-xs text-slate-400">
          Preço conferido em {formatarData(produto.verificado_em)}
        </p>

        {produto.cupom && (
          <p className="mb-3 min-w-0 break-words rounded bg-blue-600 px-2 py-1 text-sm">
            Cupom: <strong>{produto.cupom}</strong>
          </p>
        )}

        <a
          href={produto.link_afiliado}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="block rounded bg-green-600 px-4 py-2 text-center font-bold text-white transition-colors hover:bg-green-700"
        >
          Ver no {plataforma}
        </a>
      </div>
    </article>
  );
}
