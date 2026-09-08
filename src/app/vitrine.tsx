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
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          selecionada
            ? 'bg-white text-slate-900 shadow'
            : 'bg-white/5 text-slate-300 ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:text-white'
        }`}
      >
        {rotulo}
      </button>
    );
  };

  return (
    <>
      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
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
