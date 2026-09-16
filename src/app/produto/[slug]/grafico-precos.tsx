'use client';

import { useMemo, useState } from 'react';
import { formatarData, formatarReal } from '@/lib/produtos';
import type { PontoDoHistorico } from '@/lib/historico';

/**
 * Linha do tempo do preço, com filtro de período.
 *
 * SVG na mão: um gráfico não vale uma dependência.
 *
 * ⚠️ **Período sem dado fica desligado, e diz por quê.** O histórico começou
 * em 07/09/2026 — pedir "90 dias" e receber a mesma linha de 10 dias é o tipo
 * de promessa vazia que este site existe pra não fazer. Quando o robô
 * acumular dias, os botões ligam sozinhos.
 */
const PERIODOS = [7, 30, 60, 90] as const;
/** "tudo" existe porque o histórico pode ter 10 dias: 7 esconderia três. */
type Periodo = (typeof PERIODOS)[number] | 'tudo';

function diasEntre(inicio: string, fim: string): number {
  const ms = new Date(`${fim}T00:00:00Z`).getTime() - new Date(`${inicio}T00:00:00Z`).getTime();
  return Math.round(ms / 86_400_000);
}

export function GraficoDePrecos({ pontos }: { pontos: PontoDoHistorico[] }) {
  const observados = pontos.length >= 2 ? diasEntre(pontos[0].dia, pontos[pontos.length - 1].dia) + 1 : 0;

  // Só liga o período que o histórico cobre de verdade.
  const disponiveis = PERIODOS.filter((p) => observados >= p);
  const [periodo, setPeriodo] = useState<Periodo>('tudo');

  const visiveis = useMemo(() => {
    if (pontos.length < 2 || periodo === 'tudo') return pontos;
    const fim = pontos[pontos.length - 1].dia;
    return pontos.filter((p) => diasEntre(p.dia, fim) < periodo);
  }, [pontos, periodo]);

  if (pontos.length < 2) return null;

  const precos = visiveis.map((p) => p.preco);
  const min = Math.min(...precos);
  const max = Math.max(...precos);
  const amplitude = max - min || 1;
  const largura = 600;
  const altura = 120;

  const coordenadas = visiveis.map((p, i) => ({
    x: visiveis.length === 1 ? largura / 2 : (i / (visiveis.length - 1)) * largura,
    // Preço igual em todos os dias vira uma reta no meio, não uma no chão.
    y: max === min ? altura / 2 : altura - ((p.preco - min) / amplitude) * (altura - 16) - 8,
    ponto: p,
  }));

  const caminho = coordenadas
    .map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
    .join(' ');

  // Até 4 datas no eixo, sempre incluindo a primeira e a última.
  const quantasDatas = Math.min(4, visiveis.length);
  const marcas = Array.from({ length: quantasDatas }, (_, i) => {
    const indice = Math.round((i / Math.max(1, quantasDatas - 1)) * (visiveis.length - 1));
    return visiveis[indice];
  });

  const legenda = `Variação de preço em ${visiveis.length} dias, de ${formatarReal(min)} a ${formatarReal(max)}`;

  return (
    <section className="min-w-0 rounded-2xl bg-white border border-slate-200/60 p-6 shadow-sm">
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <span aria-hidden="true" className="text-marca">📈</span>
          Como o preço se comportou
        </h2>

        <div className="flex flex-wrap gap-1" role="group" aria-label="Período do gráfico">
          {(['tudo', ...PERIODOS] as const).map((p) => {
            const ligado = p === 'tudo' || disponiveis.includes(p);
            const atual = p === periodo;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPeriodo(p)}
                disabled={!ligado}
                aria-pressed={atual}
                title={
                  p === 'tudo'
                    ? 'Todo o histórico que temos'
                    : ligado
                      ? `Últimos ${p} dias`
                      : `Ainda não temos ${p} dias de histórico`
                }
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
                  atual
                    ? 'bg-marca text-white'
                    : ligado
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                }`}
              >
                {p === 'tudo' ? 'Tudo' : `${p} dias`}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mb-4 text-xs text-slate-500 font-medium">
        {visiveis.length} {visiveis.length === 1 ? 'dia observado' : 'dias observados'} · menor{' '}
        <span className="text-marca font-bold">{formatarReal(min)}</span> · maior{' '}
        <span className="text-slate-700 font-bold">{formatarReal(max)}</span>
      </p>

      <svg viewBox={`0 0 ${largura} ${altura}`} className="h-28 w-full" role="img" aria-label={legenda}>
        <path d={caminho} fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinejoin="round" />
        {coordenadas.map((c) => (
          <circle key={c.ponto.dia} cx={c.x} cy={c.y} r="4" fill="#1d4ed8">
            <title>{`${formatarData(c.ponto.dia)}: ${formatarReal(c.ponto.preco)}`}</title>
          </circle>
        ))}
      </svg>

      <div className="mt-2 flex justify-between text-[11px] text-slate-400 font-semibold">
        {marcas.map((m, i) => (
          <span key={`${m.dia}-${i}`}>{formatarData(m.dia)}</span>
        ))}
      </div>

      {disponiveis.length < PERIODOS.length && (
        <p className="mt-3 text-[11px] text-slate-400">
          Os períodos maiores ligam sozinhos conforme o robô acumula dias: começamos a guardar o
          preço deste produto em {formatarData(pontos[0].dia)}.
        </p>
      )}
    </section>
  );
}
