/**
 * Histórico de preço por produto.
 *
 * O robô já visita a API todo dia; guardar o que ele viu custa quase nada e
 * gera a única afirmação que um concorrente não consegue copiar sem ter
 * rodado o mesmo robô pelo mesmo tempo: "menor preço em N dias".
 */

export type PontoDoHistorico = { dia: string; preco: number };

export type Historico = {
  atualizado_em: string;
  /** Chaveado por meli_id, que é estável mesmo se o catálogo for reordenado. */
  produtos: Record<string, PontoDoHistorico[]>;
};

/** Quantos dias de histórico o robô guarda. Passou disso, some. */
export const DIAS_GUARDADOS = 90;

/** Abaixo disso não dá pra afirmar nada sobre "menor preço" sem mentir. */
const DIAS_MINIMOS_PRA_AFIRMAR = 7;

const JANELA_MAXIMA = 30;

function diasAtras(dias: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - dias);
  return d.toISOString().slice(0, 10);
}

/**
 * O selo do card, ou `null` quando não há histórico suficiente.
 *
 * A janela se ajusta ao que existe: com 40 dias de dados fala em 30, com 12
 * fala em 12, com 3 não fala nada. Prometer "menor preço em 30 dias" tendo
 * observado 3 seria exatamente o tipo de mentira que esta página não conta.
 */
export function seloDeMenorPreco(
  pontos: PontoDoHistorico[] | undefined,
  precoDeHoje: number,
): string | null {
  if (!pontos || pontos.length < DIAS_MINIMOS_PRA_AFIRMAR) return null;

  const corte = diasAtras(JANELA_MAXIMA);
  const janela = pontos.filter((p) => p.dia >= corte);
  if (janela.length < DIAS_MINIMOS_PRA_AFIRMAR) return null;

  const menor = Math.min(...janela.map((p) => p.preco));
  if (precoDeHoje > menor) return null;

  const dias = Math.min(janela.length, JANELA_MAXIMA);
  return `Menor preço em ${dias} dias`;
}

/** Junta o ponto de hoje, sem duplicar se o robô rodar duas vezes no dia. */
export function registrarPreco(
  pontos: PontoDoHistorico[] | undefined,
  dia: string,
  preco: number,
): PontoDoHistorico[] {
  const semHoje = (pontos ?? []).filter((p) => p.dia !== dia);
  const corte = diasAtras(DIAS_GUARDADOS);
  return [...semHoje.filter((p) => p.dia >= corte), { dia, preco }].sort((a, b) =>
    a.dia < b.dia ? -1 : 1,
  );
}
