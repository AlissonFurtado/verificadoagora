/**
 * Guias de faixa: os intermediários de uma faixa de preço, ordenados por
 * **perfil de quem compra**, não por nota.
 *
 * Existe porque a ficha não ranqueia e o comparativo só alcança quem já sabe
 * o nome do aparelho. Em 10/09/2026 o índice do domínio era 1 página aceita
 * contra 8 recusadas, todas fichas de produto — e as consultas que já tinham
 * rendido eram de julgamento ("X vale a pena"). Quem digita "melhor celular
 * até 1500" ainda não sabe qual especificação importa pra ele: o guia
 * responde isso, e manda pro comparativo quem quiser a tabela.
 *
 * **Guia é curadoria, como o comparativo.** Nenhum robô escreve um.
 *
 * Sem `fs` aqui de propósito, igual a `produtos.ts` e `comparativos.ts`: quem
 * lê o disco é o `catalogo.ts`.
 */

import { preencher } from './comparativos';
import type { Produto } from './produtos';

export type PerfilDoGuia = {
  /** Chave curta e estável: vira o âncora `#` da seção na página. */
  chave: string;
  /** A pergunta que a pessoa faz, na língua dela: "Quero que dure anos". */
  perfil: string;
  /** O aparelho recomendado para esse perfil. */
  aparelho: string;
  /**
   * Preenchido só quando o aparelho está no `produtos.json`. É o que dá ao
   * perfil preço conferido, botão e link pro comparativo — lido do catálogo
   * na hora, nunca copiado pra cá, pra o robô de preços continuar mandando.
   */
  meli_id: string;
  /** Por que ele ganha esse perfil. Uma frase por motivo. */
  porque: string[];
  /**
   * Quando **não** comprar. Obrigatório: guia que só elogia não convence e
   * não merece citação — é a mesma regra da tabela que mostra onde o produto
   * perde.
   */
  quando_nao: string;
  /**
   * A ficha que sustenta o parágrafo, campo por campo. **Copiada dos
   * comparativos, palavra por palavra**, e conferida pelo `npm run fichas`:
   * número novo aqui é número que ninguém verificou na fonte do fabricante.
   */
  ficha: Record<string, string>;
};

export type Guia = {
  /** Endereço da página: `/guia/{slug}`. Fixo — URL indexada não muda. */
  slug: string;
  titulo: string;
  resumo: string;
  /** O teto da faixa, em reais. Aparece no texto e no título da página. */
  teto: number;
  perfis: PerfilDoGuia[];
  /** Fecha o guia dizendo o que fazer se nenhum perfil for o da pessoa. */
  veredito: string;
  fontes: { titulo: string; url: string }[];
  /** Ficha técnica não muda, mas o texto envelhece: a data aparece na página. */
  escrito_em: string;
};

export type Guias = { guias: Guia[] };

export function acharGuia(guias: Guia[], slug: string): Guia | undefined {
  return guias.find((g) => g.slug === slug);
}

/**
 * Resolve `{preco}` e companhia em cada perfil, contra o produto daquele
 * perfil.
 *
 * Diferente do comparativo, que tem um produto só: aqui cada seção fala de um
 * aparelho, e o marcador de um não pode vazar pro texto do outro. Perfil sem
 * produto no catálogo fica com o texto como está — e é por isso que esses
 * perfis não escrevem preço nenhum.
 */
export function comTextoDeHoje(guia: Guia, porMeliId: Map<string, Produto>): Guia {
  return {
    ...guia,
    perfis: guia.perfis.map((p) => {
      const produto = porMeliId.get(p.meli_id);
      if (!produto) return p;
      const t = (texto: string) => preencher(texto, produto);
      return { ...p, porque: p.porque.map(t), quando_nao: t(p.quando_nao) };
    }),
  };
}

/** Quantos aparelhos do guia a gente acompanha o preço de verdade. */
export function quantosAcompanhados(guia: Guia, porMeliId: Map<string, Produto>): number {
  return guia.perfis.filter((p) => porMeliId.has(p.meli_id)).length;
}
