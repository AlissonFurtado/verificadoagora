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

import { formatarData, formatarReal, type Produto } from './produtos';

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

/**
 * Marcadores que o texto do comparativo pode usar no lugar de um número.
 *
 * O preço do produto muda todo dia às 8h. Sem isso, a tabela dizia "42%" e o
 * texto ao lado continuava dizendo "44%" até alguém lembrar de voltar no
 * arquivo — o mesmo erro do preço velho, só que escrito por extenso.
 */
const MARCADORES: Record<string, (produto: Produto) => string> = {
  preco: (p) => formatarReal(p.preco_atual),
  preco_original: (p) => formatarReal(p.preco_original),
  desconto: (p) => String(p.desconto_percentual),
  economia: (p) => formatarReal(p.preco_original - p.preco_atual),
  data: (p) => formatarData(p.verificado_em),
};

/**
 * Troca `{preco}` e companhia pelo valor de hoje.
 *
 * Marcador que não existe fica na página como está escrito, visível. É feio
 * de propósito: erro de digitação que aparece alguém conserta; erro que some
 * calado vira frase sem sentido no ar.
 */
export function preencher(texto: string, produto: Produto): string {
  return texto.replace(/\{(\w+)\}/g, (inteiro, chave: string) =>
    MARCADORES[chave] ? MARCADORES[chave](produto) : inteiro,
  );
}

/** O comparativo com todo texto já resolvido contra o produto do catálogo. */
export function comTextoDeHoje(comparativo: Comparativo, produto: Produto): Comparativo {
  const t = (texto: string) => preencher(texto, produto);
  return {
    ...comparativo,
    titulo: t(comparativo.titulo),
    resumo: t(comparativo.resumo),
    veredito: t(comparativo.veredito),
    a_favor: comparativo.a_favor.map(t),
    contra: comparativo.contra.map(t),
    linhas: comparativo.linhas.map((l) => ({ ...l, nota: t(l.nota) })),
  };
}

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
