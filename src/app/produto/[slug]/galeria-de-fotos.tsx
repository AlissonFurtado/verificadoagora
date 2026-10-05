'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * A foto grande da ficha com miniaturas embaixo, para produto que tem
 * `imagens` além da `imagem` principal.
 *
 * É componente de cliente só por causa da troca de foto. A primeira foto é a
 * mesma `imagem` do card e da capa do link, e é ela que carrega com
 * prioridade: as outras só são pedidas quando alguém toca na miniatura.
 *
 * ⚠️ **A foto nunca é a única informação.** Tudo o que importa para decidir a
 * compra está escrito na página; a galeria só mostra o aparelho.
 */
export function GaleriaDeFotos({ fotos, nome }: { fotos: string[]; nome: string }) {
  const [atual, setAtual] = useState(0);

  return (
    <div className="min-w-0">
      <div className="relative aspect-square min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md">
        <Image
          key={fotos[atual]}
          src={fotos[atual]}
          alt={atual === 0 ? nome : `${nome} — foto ${atual + 1} de ${fotos.length}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-6 sm:p-8"
          priority={atual === 0}
        />
      </div>

      {/* Tira que rola de lado no celular, pelo mesmo motivo dos atalhos de
          guia da home: quebrar linha empurraria o preço para fora da tela. */}
      <ul className="-mx-1 mt-3 flex min-w-0 gap-2 overflow-x-auto px-1 pb-1">
        {fotos.map((foto, i) => (
          <li key={foto} className="shrink-0">
            <button
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
              aria-current={i === atual}
              className={`relative block h-14 w-14 overflow-hidden rounded-lg bg-white transition sm:h-20 sm:w-20 ${
                i === atual
                  ? 'ring-2 ring-marca-acao'
                  : 'opacity-70 ring-1 ring-slate-200 hover:opacity-100 hover:ring-slate-400'
              }`}
            >
              {/* `eager` de propósito: são poucas miniaturas de 80px, e com
                  lazy elas ficavam em branco dentro da tira que rola. */}
              <Image
                src={foto}
                alt=""
                fill
                sizes="80px"
                loading="eager"
                className="object-contain p-1.5"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
