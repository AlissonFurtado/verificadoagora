'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { categoriasDe, type Produto } from '@/lib/produtos';

/**
 * `useLayoutEffect` roda antes do navegador pintar; no servidor ele não
 * existe. Trocar por `useEffect` no servidor é o que evita o aviso do React
 * sem perder o quadro — e o quadro importa aqui, veja `CardQueEntra`.
 */
const usarEfeitoDeLayout = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * O card sobe e aparece quando entra na tela.
 *
 * ⚠️ **Ele nasce visível de propósito.** O HTML que sai do servidor mostra
 * todos os cards; só depois, já no navegador e antes da primeira pintura, os
 * que estão fora da tela são escondidos. Se começasse invisível, um
 * rastreador que não executa JavaScript leria a página inteira com
 * `opacity: 0` — e ser lido por buscador e por IA é a aposta do projeto.
 *
 * Quem desligou animação no sistema não vê nada disso: os cards já ficam onde
 * têm que ficar.
 */
function CardQueEntra({ atraso, children }: { atraso: number; children: React.ReactNode }) {
  const alvo = useRef<HTMLDivElement>(null);
  const [escondido, setEscondido] = useState(false);

  usarEfeitoDeLayout(() => {
    const elemento = alvo.current;
    if (!elemento) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Já está na tela quando a página abre: entra sem esconder antes.
    if (elemento.getBoundingClientRect().top < window.innerHeight) return;

    setEscondido(true);
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          setEscondido(false);
          observador.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={alvo}
      style={{ transitionDelay: `${atraso}ms` }}
      className={`min-w-0 transition-[opacity,transform] duration-500 ease-out ${
        escondido ? 'translate-y-5 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {children}
    </div>
  );
}

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
            ? 'bg-marca text-white shadow'
            : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-300 hover:bg-slate-100 hover:text-marca'
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

      {/* Uma coluna no celular: o card fica deitado e cabem três por tela. */}
      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {produtos.map((produto, i) =>
          ativa === null || produto.categoria === ativa ? (
            // O atraso é a posição na linha, não no catálogo: assim a cascata
            // corre da esquerda pra direita a cada linha e o último card não
            // espera um segundo pra existir.
            <CardQueEntra key={produto.id} atraso={(i % 4) * 70}>
              {cards[i]}
            </CardQueEntra>
          ) : null,
        )}
      </div>

      {visiveis.length === 0 && (
        <p className="py-12 text-center text-slate-500">
          Nada nesta categoria agora. Volte na segunda — a lista é refeita toda semana.
        </p>
      )}
    </>
  );
}
