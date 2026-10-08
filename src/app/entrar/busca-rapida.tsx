'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export type ItemDaBusca = {
  nome: string;
  categoria: string;
  caminho: string;
  preco: string;
  desconto: number;
  imagem: string;
};

/** Tira acento e caixa: quem digita "iphone" tem que achar "iPhone". */
function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

/**
 * "Qual produto você viu?" — a busca da página de entrada.
 *
 * Existe porque quem chega pelo link da bio quase sempre veio atrás de **um**
 * produto que viu num post, e até 08/10/2026 a página só oferecia o canal: o
 * caminho até o produto era um link pequeno no rodapé. Aqui a pessoa digita
 * duas letras ou toca numa categoria e cai na ficha.
 *
 * É componente de cliente, e por isso recebe só o que mostra (nome, preço já
 * formatado, foto, caminho) — nunca o catálogo inteiro com análise e
 * perguntas.
 */
export function BuscaRapida({ itens }: { itens: ItemDaBusca[] }) {
  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState('');

  const categorias = useMemo(
    () => itens.reduce<string[]>((acc, i) => (acc.includes(i.categoria) ? acc : [...acc, i.categoria]), []),
    [itens],
  );

  const termos = normalizar(texto).split(/\s+/).filter(Boolean);
  const buscando = termos.length > 0 || categoria !== '';

  const achados = buscando
    ? itens.filter((item) => {
        if (categoria && item.categoria !== categoria) return false;
        const alvo = normalizar(`${item.nome} ${item.categoria}`);
        return termos.every((t) => alvo.includes(t));
      })
    : [];
  const mostrados = achados.slice(0, 6);

  return (
    <section aria-labelledby="titulo-da-busca" className="min-w-0 rounded-2xl bg-white p-4 text-slate-900 shadow-lg shadow-black/30">
      <h2 id="titulo-da-busca" className="text-base font-black">
        Qual produto você viu?
      </h2>

      <label className="mt-3 flex min-w-0 items-center gap-2 rounded-xl border-2 border-slate-200 bg-slate-50 px-3 focus-within:border-marca-acao">
        <span aria-hidden="true" className="text-slate-400">
          🔍
        </span>
        <span className="sr-only">Nome do produto</span>
        <input
          type="search"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="iPhone, ar-condicionado, fone…"
          autoComplete="off"
          enterKeyHint="search"
          className="min-w-0 flex-1 bg-transparent py-3 text-base font-medium outline-none placeholder:text-slate-400"
        />
      </label>

      {/* Tira que rola de lado, como os atalhos da home: quebrar linha
          empurraria os resultados para fora da tela. */}
      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategoria(categoria === c ? '' : c)}
            aria-pressed={categoria === c}
            className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-bold transition-colors ${
              categoria === c
                ? 'bg-marca-acao text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {buscando && (
        <div className="mt-3 min-w-0" aria-live="polite">
          {mostrados.length > 0 ? (
            <ul className="flex min-w-0 flex-col divide-y divide-slate-100">
              {mostrados.map((item) => (
                <li key={item.caminho} className="min-w-0">
                  <Link href={item.caminho} className="flex min-w-0 items-center gap-3 py-2.5">
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
                      {item.imagem && (
                        <Image src={item.imagem} alt="" fill sizes="48px" className="object-contain p-1" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-2 text-sm font-bold leading-tight text-slate-800">
                        {item.nome}
                      </span>
                      <span className="mt-0.5 flex items-baseline gap-2">
                        <span className="text-[15px] font-black text-marca">{item.preco}</span>
                        {item.desconto > 0 && (
                          <span className="text-[11px] font-black text-desconto">{item.desconto}% OFF</span>
                        )}
                      </span>
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-lg font-black text-marca-acao">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-2 text-sm text-slate-600">
              Não achei esse aqui.{' '}
              <Link href="/" className="font-bold text-marca underline">
                Veja todos os produtos
              </Link>
              .
            </p>
          )}

          {achados.length > mostrados.length && (
            <Link href="/" className="mt-1 inline-block text-sm font-bold text-marca underline">
              Mais {achados.length - mostrados.length} na vitrine completa →
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
