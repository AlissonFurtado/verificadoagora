'use client';

import { useEffect, useState } from 'react';
import { descreverConferencia, type Conferencia } from '@/lib/relogio';

/**
 * O relógio da página: há quanto tempo o robô conferiu os preços.
 *
 * ⚠️ **O texto sai pronto do servidor.** O primeiro render no navegador usa o
 * mesmo valor que veio no HTML — senão a hidratação acusa diferença, porque o
 * relógio do servidor e o de quem abre a página nunca batem no milissegundo.
 * Só depois de montado ele passa a contar com o relógio de verdade, de minuto
 * em minuto.
 *
 * Isso também é o que faz o rastreador de IA ler "Conferido há 7 horas" no
 * HTML, sem precisar executar JavaScript — que é a aposta do projeto.
 */
export function SeloDeConferencia({
  conferidoEm,
  inicial,
}: {
  conferidoEm: string;
  /** Calculado no servidor, pra hidratação não divergir. */
  inicial: Conferencia;
}) {
  const [agora, setAgora] = useState<Conferencia>(inicial);

  useEffect(() => {
    const recalcular = () => {
      const novo = descreverConferencia(conferidoEm, new Date());
      if (novo) setAgora(novo);
    };
    recalcular();
    const relogio = setInterval(recalcular, 60_000);
    return () => clearInterval(relogio);
  }, [conferidoEm]);

  return (
    <p
      className={`inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
        agora.atrasado
          ? 'bg-amber-50 text-amber-800 ring-amber-600/20'
          : 'bg-emerald-50 text-emerald-700 ring-emerald-600/15'
      }`}
    >
      <span className="flex items-center gap-1.5">
        {/* O ponto pulsa só quando o preço está fresco: animação em cima de
            um dado velho seria enfeite dizendo o contrário do texto. */}
        <span
          aria-hidden="true"
          className={`flex h-2 w-2 shrink-0 rounded-full ${
            agora.atrasado ? 'bg-amber-500' : 'animate-pulse bg-emerald-500'
          }`}
        />
        <span className="font-bold uppercase tracking-wide">Preço conferido {agora.faz}</span>
      </span>
      <span className="font-medium opacity-70">
        {agora.quando}
        {agora.proxima && ` · ${agora.proxima}`}
      </span>
    </p>
  );
}
