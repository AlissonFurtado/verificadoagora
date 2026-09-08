'use client';

import { useState } from 'react';
import { categoriasDe, type Produto } from '@/lib/produtos';

/**
 * Filtro por categoria. Os cards já vêm renderizados do servidor: o cliente só
 * decide quais ficam visíveis, então nada de produto é montado no navegador.
 */
export function Vitrine({
  produtos,
  cards,
}: {
  produtos: Produto[];
  cards: React.ReactNode[];
}) {
  const categorias = categoriasDe(produtos);
  const [ativa, setAtiva] = useState<string | null>(null);

  const visiveis = produtos.filter((p) => ativa === null || p.categoria === ativa);

  const botao = (rotulo: string, valor: string | null) => {
    const selecionada = ativa === valor;
    return (
      <button
        key={rotulo}
        type="button"
        onClick={() => setAtiva(valor)}
        aria-pressed={selecionada}
        className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
          selecionada
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:scale-[1.02]'
            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 shadow-sm'
        }`}
      >
        {rotulo}
      </button>
    );
  };

  return (
    <>
      <div className="sticky top-0 z-30 -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 py-4 sm:mx-0 sm:flex-wrap sm:px-0 bg-slate-50/85 backdrop-blur-md border-b border-slate-200/40">
        {botao(`Tudo (${produtos.length})`, null)}
        {categorias.map((c) =>
          botao(`${c} (${produtos.filter((p) => p.categoria === c).length})`, c),
        )}
      </div>

      <div className="grid min-w-0 grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {produtos.map((produto, i) =>
          ativa === null || produto.categoria === ativa ? (
            <div key={produto.id} className="min-w-0">
              {cards[i]}
            </div>
          ) : null,
        )}
      </div>

      {visiveis.length === 0 && (
        <p className="py-12 text-center text-slate-400">
          Nada nesta categoria agora. Volte na segunda — a lista é refeita toda semana.
        </p>
      )}
    </>
  );
}
