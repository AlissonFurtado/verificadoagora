/**
 * Guias de decisão: a página que responde uma **pergunta de especificação**,
 * não "qual aparelho comprar".
 *
 * Existe porque o guia de faixa (`guias.ts`) é por perfil → um aparelho, e há
 * pergunta que não tem aparelho como resposta: "128 ou 256 GB?", "4, 6 ou
 * 8 GB de RAM?". Encaixar isso no molde de faixa repetiria os mesmos dois
 * celulares em cada seção — a página ficaria falando de produto quando a
 * pessoa ainda está decidindo a configuração.
 *
 * É topo de funil de propósito: quem digita isso não sabe o nome de nenhum
 * aparelho ainda. O catálogo aparece **uma vez só, no fim**, e é a mesma
 * regra de sempre — a resposta honesta vem antes do produto.
 *
 * **Guia de decisão é curadoria.** Nenhum robô escreve um.
 *
 * Sem `fs` aqui de propósito, igual a `produtos.ts`, `comparativos.ts` e
 * `guias.ts`: quem lê o disco é o `catalogo.ts`.
 */

import { preencher } from './comparativos';
import type { Produto } from './produtos';

export type Opcao = {
  /** A configuração em si: "128 GB", "8 GB de RAM". Vira o rótulo da coluna. */
  rotulo: string;
  /** Para quem essa opção é a certa, na língua de quem pergunta. */
  para_quem: string;
  /** Por que, em uma ou duas frases. */
  explicacao: string;
};

export type Pergunta = {
  /** Chave curta e estável: vira o âncora `#` da seção. */
  chave: string;
  /** A pergunta como a pessoa digita: "128 GB ou 256 GB?". */
  pergunta: string;
  /**
   * A resposta em uma frase, antes de qualquer explicação. É o que assistente
   * de IA cita e o que resolve a dúvida de quem só leu o índice — texto
   * visível ganha de JSON-LD, então ela fica na página em destaque.
   */
  resposta_curta: string;
  opcoes: Opcao[];
  /** Os parágrafos que sustentam a resposta. */
  detalhe: string[];
  /**
   * A armadilha desta pergunta: o que costuma ser dito por aí e não se
   * sustenta. Obrigatório — página que só concorda não merece citação, é a
   * mesma regra do `quando_nao` do guia de faixa.
   */
  cuidado: string;
};

export type ExemploDaDecisao = {
  /** Produto do catálogo que ilustra a decisão. Preço e botão saem do JSON. */
  meli_id: string;
  /** Como ele se encaixa nas respostas acima. Aceita os marcadores de preço. */
  nota: string;
  /**
   * A ficha que sustenta a nota, campo por campo. **Copiada dos
   * comparativos, palavra por palavra**, e conferida pelo `npm run fichas`.
   * Vazio quando a nota não cita nenhuma grandeza.
   */
  ficha: Record<string, string>;
};

export type Decisao = {
  /** Endereço da página: `/guia/{slug}`, o mesmo espaço do guia de faixa. */
  slug: string;
  titulo: string;
  resumo: string;
  perguntas: Pergunta[];
  exemplos: ExemploDaDecisao[];
  /** Fecha dizendo o que fazer com tudo isso junto. */
  veredito: string;
  fontes: { titulo: string; url: string }[];
  escrito_em: string;
};

export type Decisoes = { decisoes: Decisao[] };

export function acharDecisao(decisoes: Decisao[], slug: string): Decisao | undefined {
  return decisoes.find((d) => d.slug === slug);
}

/**
 * Resolve `{preco}` e companhia nas notas dos exemplos.
 *
 * Só as notas: o corpo da página não fala de preço nenhum de propósito — a
 * resposta a "quanto de RAM" não muda quando o robô mexe no catálogo de
 * manhã.
 */
export function comTextoDeHoje(decisao: Decisao, porMeliId: Map<string, Produto>): Decisao {
  return {
    ...decisao,
    exemplos: decisao.exemplos.map((e) => {
      const produto = porMeliId.get(e.meli_id);
      return produto ? { ...e, nota: preencher(e.nota, produto) } : e;
    }),
  };
}
