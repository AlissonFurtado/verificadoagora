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
  /** Agrupador do Meli, pra reconhecer o mesmo produto sob outro id. */
  familia?: string;
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
  familia: string,
  precoDeHoje: number,
  memoria: Memoria,
  jaNoCatalogo: Set<string>,
  familiasNoCatalogo: Set<string>,
  hoje: string,
): Veredito {
  if (jaNoCatalogo.has(meliId)) return { sugerir: false, motivo: 'já está no catálogo' };

  // O mesmo aparelho existe sob mais de um id no Meli. A família é o que
  // impede de sugerir hoje o que já está na página com outro número.
  if (familia && familiasNoCatalogo.has(familia)) {
    return { sugerir: false, motivo: 'já está no catálogo' };
  }

  const porFamilia = familia
    ? Object.values(memoria.vistos).find((v) => v.familia === familia)
    : undefined;
  const visto = memoria.vistos[meliId] ?? porFamilia;
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

export function registrar(
  memoria: Memoria,
  meliId: string,
  familia: string,
  preco: number,
  hoje: string,
): void {
  const anterior = memoria.vistos[meliId];
  memoria.vistos[meliId] = {
    sugerido_em: hoje,
    familia: familia || anterior?.familia,
    preco_sugerido: preco,
    vezes: (anterior?.vezes ?? 0) + 1,
  };
}
