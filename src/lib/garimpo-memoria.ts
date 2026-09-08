/**
 * Memória do garimpo.
 *
 * Sem isso, rodar todo dia nas mesmas categorias devolve quase a mesma lista:
 * os "mais vendidos" do Meli mudam devagar. A memória é o que transforma
 * "diário" em "dez produtos novos por dia" em vez de "a mesma fila sete vezes
 * por semana".
 */

export type Visto = {
  sugerido_em: string;
  /** Preço no dia em que foi sugerido. É a régua pra decidir se vale repetir. */
  preco_sugerido: number;
  vezes: number;
};

export type Memoria = {
  atualizado_em: string;
  vistos: Record<string, Visto>;
};

/** Depois disso o produto volta a ser candidato: o mercado mudou, a oferta é outra. */
const DIAS_ATE_ESQUECER = 60;

/** Repetir antes da hora só se ficou bem mais barato — aí é notícia nova. */
const QUEDA_QUE_JUSTIFICA_REPETIR = 0.15;

function diasEntre(de: string, ate: string): number {
  return Math.round((Date.parse(ate) - Date.parse(de)) / 86_400_000);
}

export type Veredito =
  | { sugerir: true; motivo: 'inédito' | 'esquecido' | 'ficou mais barato' }
  | { sugerir: false; motivo: 'já está no catálogo' | 'já sugerido' };

/**
 * Decide se um produto entra na fila de hoje.
 *
 * Produto que já está no catálogo nunca volta. Produto já sugerido e ignorado
 * só volta se o preço caiu de verdade ou se passou tempo suficiente pra que a
 * oferta seja outra — silêncio do Alisson conta como "não", e repetir o que
 * ele já descartou é justamente o que faria ele parar de olhar a fila.
 */
export function avaliar(
  meliId: string,
  precoDeHoje: number,
  memoria: Memoria,
  jaNoCatalogo: Set<string>,
  hoje: string,
): Veredito {
  if (jaNoCatalogo.has(meliId)) return { sugerir: false, motivo: 'já está no catálogo' };

  const visto = memoria.vistos[meliId];
  if (!visto) return { sugerir: true, motivo: 'inédito' };

  if (diasEntre(visto.sugerido_em, hoje) >= DIAS_ATE_ESQUECER) {
    return { sugerir: true, motivo: 'esquecido' };
  }

  const queda = (visto.preco_sugerido - precoDeHoje) / visto.preco_sugerido;
  if (queda >= QUEDA_QUE_JUSTIFICA_REPETIR) {
    return { sugerir: true, motivo: 'ficou mais barato' };
  }

  return { sugerir: false, motivo: 'já sugerido' };
}

export function registrar(memoria: Memoria, meliId: string, preco: number, hoje: string): void {
  const anterior = memoria.vistos[meliId];
  memoria.vistos[meliId] = {
    sugerido_em: hoje,
    preco_sugerido: preco,
    vezes: (anterior?.vezes ?? 0) + 1,
  };
}
