import type { Tendencia } from '@/lib/historico';

/**
 * O traçado do preço no card, do tamanho de uma palavra.
 *
 * Mora na linha do preço antigo, que é curta e sobra espaço: é o único lugar
 * do card onde ele cabe **sem alterar a altura**. Todos os cards têm a mesma
 * altura de propósito, e só sete dos quinze produtos têm histórico suficiente
 * pra mostrar linha — se o traçado empurrasse qualquer coisa, a grade
 * desalinharia justamente nos que têm.
 *
 * O número vem junto com a linha porque cor não pode ser a única informação:
 * quem não distingue verde de cinza lê "−5%" do mesmo jeito.
 */
export function MiniGrafico({ tendencia }: { tendencia: Tendencia }) {
  const precos = tendencia.pontos.map((p) => p.preco);
  const min = Math.min(...precos);
  const max = Math.max(...precos);
  const amplitude = max - min || 1;
  const largura = 28;
  const altura = 10;

  const caminho = tendencia.pontos
    .map((ponto, i) => {
      const x = (i / (tendencia.pontos.length - 1)) * largura;
      // Preço igual em todos os dias vira uma reta no meio, não uma no chão.
      const y = max === min ? altura / 2 : altura - ((ponto.preco - min) / amplitude) * (altura - 2) - 1;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const caiu = tendencia.porcento < 0;
  const cor = caiu ? 'text-emerald-600' : 'text-slate-500';
  const sinal = tendencia.porcento > 0 ? '+' : '';

  return (
    <span
      title={tendencia.descricao}
      className={`flex shrink-0 items-center gap-1 rounded px-1 text-[10px] font-black leading-none ${cor}`}
    >
      <svg
        width={largura}
        height={altura}
        viewBox={`0 0 ${largura} ${altura}`}
        role="img"
        aria-label={tendencia.descricao}
        className="overflow-visible"
      >
        <path
          d={caminho}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {sinal}
      {tendencia.porcento}%
    </span>
  );
}
