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

  const botao = (rotulo: string, valor: string | null) => {
    const selecionada = ativa === valor;
    return (
      <button
        key={rotulo}
        type="button"
        onClick={() => setAtiva(valor)}
        aria-pressed={selecionada}
        className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
          selecionada
            ? 'border-green-500 bg-green-600 font-semibold text-white'
            : 'border-slate-600 text-slate-300 hover:border-slate-400'
        }`}
      >
        {rotulo}
      </button>
    );
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {botao(`Tudo (${produtos.length})`, null)}
        {categorias.map((c) =>
          botao(`${c} (${produtos.filter((p) => p.categoria === c).length})`, c),
        )}
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {produtos.map((produto, i) =>
          ativa === null || produto.categoria === ativa ? (
            <div key={produto.id} className="min-w-0">
              {cards[i]}
            </div>
          ) : null,
        )}
      </div>
    </>
  );
}
