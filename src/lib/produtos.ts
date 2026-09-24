/** Tipos e formatação do catálogo. Sem acesso a disco: roda no servidor e no cliente. */

export type Produto = {
  id: number;
  nome: string;
  categoria: string;
  preco_original: number;
  preco_atual: number;
  desconto_percentual: number;
  preco_no_pix: boolean;
  avaliacao: number;
  link_afiliado: string;
  cupom: string;
  descricao: string;
  imagem: string;
  plataforma: string;
  /** Id do Meli (`MLB24076624` catálogo, `MLB-7547729432` anúncio). Vazio = o robô não confere. */
  meli_id: string;
  /** O robô desliga quando o produto sai do ar. Produto desligado não aparece na página. */
  disponivel: boolean;
  /**
   * Curadoria tirou da vitrine, mesmo estando à venda.
   *
   * ⚠️ **Existe porque `disponivel` é do robô.** Em 09/09/2026 o suporte de
   * monitor foi desligado à mão por ter caído pra 10% de desconto — e a
   * rodada do dia seguinte viu que ele continuava à venda e religou. O robô
   * manda em `disponivel`; só a curadoria mexe aqui, e ele nunca toca.
   */
  oculto?: boolean;
  /**
   * Produto que vale a pena mandar no canal do WhatsApp, mas não no site.
   *
   * ⚠️ **Existe porque o canal e o site vendem de jeitos diferentes.** O canal
   * é oferta com preço e link: funciona com roupa, beleza, brinquedo de Natal.
   * O site vive de guia e comparativo, que exigem **ficha de fabricante** — e
   * roupa não tem. Somar essas categorias à vitrine seria mais URL fina num
   * domínio onde o Google já recusa dezenas (a regra do *thin affiliate*).
   *
   * Decisão do Alisson em 24/09/2026, depois da pesquisa que mostrou a
   * comissão do afiliado: **16% em calçados/roupas/bolsas, beleza e esportes
   * contra 5% em eletrônicos, celulares e informática** — o catálogo inteiro
   * estava na pior faixa.
   *
   * O que o campo faz: tira da vitrine, do sitemap e de toda página do site,
   * **mantém na fila do canal**, e põe `noindex` na ficha — que continua no ar
   * porque é o destino do link da mensagem. Nunca mandamos `meli.la` no canal.
   *
   * ⚠️ **Não é o mesmo que `oculto`**: oculto some do canal também. Um produto
   * nunca deve ter os dois.
   */
  so_no_canal?: boolean;
  /**
   * A curadoria já sabe que a oferta vencedora vem de fora do Brasil.
   *
   * ⚠️ **Existe porque o preço da API não conta a história toda.** Em
   * 19/09/2026 o SSD SanDisk "caiu" de R$ 945 para R$ 562,18: a buy box tinha
   * passado para um vendedor dos EUA, e quem comprasse pagaria imposto de
   * importação por cima — a loja oficial nacional cobrava R$ 1.215. O número
   * estava certo e o sentido, errado.
   *
   * O robô marca a rodada como suspeita quando vê uma oferta importada que
   * este campo ainda não admite. Marcar aqui é a curadoria dizendo "eu sei, e
   * a `analise` explica" — a partir daí o robô para de avisar.
   */
  importado?: boolean;
  /** Agrupador do Meli, usado pra não sugerir de novo o que já está aqui com outro id. */
  familia: string;
  data_adicionado: string;
  verificado_em: string;
  /**
   * Dois ou três parágrafos escritos à mão sobre o produto: pra quem serve e
   * quando **não** comprar.
   *
   * ⚠️ **Não é opcional pra produto novo.** Página com preço e botão e mais
   * nada é o que a política de spam do Google chama de *thin affiliate* — e a
   * partir de 09/09/2026 nenhum produto entra no catálogo sem isto, mesmo que
   * o robô tenha achado uma oferta ótima.
   *
   * A frase sobre o histórico de preço **não vem daqui**: ela é gerada do
   * `historico.json` por `fraseDoHistorico`, pra nunca envelhecer.
   */
  analise: string[];
  /**
   * As perguntas que alguém faz antes de comprar **este** produto, com a
   * resposta curta. Opcional, e curadoria — o robô nunca escreve uma.
   *
   * Entrou em 10/09/2026. A ficha de produto já tinha `analise` escrita à
   * mão, e ainda assim o Google recusava as fichas de commodity ("rastreada,
   * mas não indexada"): mais parágrafo dizendo o mesmo não resolveria. O que
   * falta na ficha é **julgamento em formato de pergunta** — que é o que a
   * pessoa digita, o que vira `FAQPage` e o que assistente de IA cita.
   *
   * ⚠️ Pergunta precisa ser a que alguém faria de verdade ("serve para
   * academia?"), e a resposta pode ser "não". FAQ que só elogia é o mesmo
   * problema do comparativo que só elogia.
   */
  perguntas?: { pergunta: string; resposta: string }[];
};

export type Catalogo = {
  produtos: Produto[];
  metadata: {
    ultima_atualizacao: string;
    /**
     * Instante em que o robô terminou de conferir, em ISO com fuso.
     *
     * É data **e hora** de propósito: o cron do GitHub é melhor esforço e
     * atrasa horas quando a fila deles enche — em 08/09/2026 a rodada das 8h
     * saiu às 11h51. A página mostra a hora que aconteceu, não a agendada.
     *
     * Vazio enquanto o robô nunca rodou: aí o selo do relógio some.
     */
    conferido_em: string;
    total_produtos: number;
    comissao_media_ml: number;
    moeda: string;
  };
};

export const NOME_PLATAFORMA: Record<string, string> = {
  'mercado-livre': 'Mercado Livre',
  shopee: 'Shopee',
  amazon: 'Amazon',
};

export function formatarReal(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarData(iso: string): string {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

/**
 * Só o que pode ser mostrado: produto fora do ar some da página em vez de
 * mentir. `so_no_canal` também fica de fora — é produto de outra categoria,
 * que existe para a mensagem do WhatsApp e não para a vitrine.
 *
 * ⚠️ **É o ponto único de visibilidade do site**, e é de propósito: vitrine,
 * sitemap, `/black-friday`, `/entrar`, `/instagram`, guias e comparativos
 * passam todos por aqui. Filtro novo entra nesta linha, não espalhado.
 */
export function produtosVisiveis(produtos: Produto[]): Produto[] {
  return produtos.filter((p) => p.disponivel && !p.oculto && !p.so_no_canal);
}

/**
 * Mais recente primeiro. O que entrou hoje aparece no topo, porque é o que a
 * pessoa que já visitou ontem ainda não viu.
 *
 * Dentro do mesmo dia, desempata pelo maior desconto — a ordem de entrada no
 * arquivo é acidente do garimpo, e deixaria a oferta mais fraca do dia no
 * topo da página.
 */
export function ordenarPorRecencia(produtos: Produto[]): Produto[] {
  return [...produtos].sort((a, b) =>
    a.data_adicionado === b.data_adicionado
      ? b.desconto_percentual - a.desconto_percentual
      : a.data_adicionado < b.data_adicionado
        ? 1
        : -1,
  );
}

/** Categorias na ordem em que aparecem no catálogo, sem repetir. */
export function categoriasDe(produtos: Produto[]): string[] {
  return produtos.reduce<string[]>((acc, p) => (acc.includes(p.categoria) ? acc : [...acc, p.categoria]), []);
}
