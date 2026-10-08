'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Os dois caminhos da página — canal e produtos — sempre ao alcance do dedo.
 *
 * Só aparece quando os botões grandes do topo saem da tela, pela mesma razão
 * da barra de oferta da ficha: repetir o botão enquanto ele ainda está visível
 * só come altura. `alvo` é o `id` do bloco de botões lá de cima.
 */
export function BarraDupla({ alvo, linkDoCanal }: { alvo: string; linkDoCanal: string }) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = document.getElementById(alvo);
    if (!el) return;
    // Pela posição na rolagem, e não por `IntersectionObserver`: é uma conta
    // só por evento, e funciona igual com a aba em segundo plano — que é como
    // esta página é testada daqui.
    const conferir = () => setVisivel(el.getBoundingClientRect().bottom < 0);
    conferir();
    window.addEventListener('scroll', conferir, { passive: true });
    window.addEventListener('resize', conferir);
    return () => {
      window.removeEventListener('scroll', conferir);
      window.removeEventListener('resize', conferir);
    };
  }, [alvo]);

  return (
    <div
      aria-hidden={!visivel}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-noite/95 px-3 pt-2.5 backdrop-blur transition-transform duration-300 [padding-bottom:max(0.625rem,env(safe-area-inset-bottom))] ${
        visivel ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-lg gap-2">
        {linkDoCanal && (
          <a
            href={linkDoCanal}
            target="_blank"
            rel="noopener noreferrer"
            data-onde="entrar-canal-barra"
            tabIndex={visivel ? 0 : -1}
            className="flex min-w-0 flex-1 items-center justify-center rounded-xl bg-[#25D366] px-3 py-3 text-center text-sm font-black text-[#062b16]"
          >
            Canal no WhatsApp
          </a>
        )}
        <Link
          href="/"
          tabIndex={visivel ? 0 : -1}
          className="flex min-w-0 flex-1 items-center justify-center rounded-xl bg-marca-acao px-3 py-3 text-center text-sm font-black text-white"
        >
          Todos os produtos
        </Link>
      </div>
    </div>
  );
}
