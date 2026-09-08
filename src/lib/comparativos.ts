/**
 * Comparativos: a ficha técnica de um produto do catálogo ao lado dos rivais.
 *
 * Existe por um motivo de tráfego, não de vaidade: quem digita "A36 vale a
 * pena" ainda não decidiu, e é essa pessoa que a vitrine sozinha não alcança.
 *
 * **Comparativo é sempre pedido do Alisson.** Nenhum robô escreve um: a
 * escolha dos rivais e o veredito são curadoria, e curadoria assinada por um
 * robô é justamente o que tira a autoridade da página.
 *
 * Sem `fs` aqui de propósito — o mesmo motivo de `produtos.ts`: quem lê o
 * disco é o `catalogo.ts`.
 */

export type ColunaDoComparativo = {
  /** Identificador curto usado como chave nas linhas: 'a36', 'g17'. */
  chave: string;
  nome: string;
  /**
   * Preenchido só quando o modelo está no `produtos.json`. É o que dá à
   * coluna preço conferido e botão de compra — e é lido do catálogo na hora,
   * nunca copiado pra cá, pra que o robô de preços continue mandando.
   */
  meli_id: string;
};

export type LinhaDoComparativo = {
  campo: string;
  /** Valor por chave de coluna. Chave ausente vira travessão. */
  valores: Record<string, string>;
  /** Quem ganha a linha. Vazio quando é empate ou quando não dá pra cravar. */
  vencedores: string[];
  /** Por que essa linha importa pra quem vai comprar. Sem isso é só tabela. */
  nota: string;
};

export type Comparativo = {
  /** O produto do catálogo que é o assunto. Tem que existir em produtos.json. */
  meli_id: string;
  titulo: string;
  resumo: string;
  colunas: ColunaDoComparativo[];
  linhas: LinhaDoComparativo[];
  a_favor: string[];
  contra: string[];
  veredito: string;
  fontes: { titulo: string; url: string }[];
  /** Ficha técnica não muda, mas o texto envelhece: a data aparece na página. */
  escrito_em: string;
};

export type Comparativos = { comparativos: Comparativo[] };

export function acharComparativo(
  comparativos: Comparativo[],
  meliId: string,
): Comparativo | undefined {
  return comparativos.find((c) => c.meli_id === meliId);
}

/** Quantos rivais o produto enfrenta — é o número que o card anuncia. */
export function quantosRivais(comparativo: Comparativo): number {
  return Math.max(0, comparativo.colunas.length - 1);
}
