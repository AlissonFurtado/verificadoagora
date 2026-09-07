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
  data_adicionado: string;
  verificado_em: string;
};

export type Catalogo = {
  produtos: Produto[];
  metadata: {
    ultima_atualizacao: string;
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

/** Só o que pode ser mostrado: produto fora do ar some da página em vez de mentir. */
export function produtosVisiveis(produtos: Produto[]): Produto[] {
  return produtos.filter((p) => p.disponivel);
}

/** Categorias na ordem em que aparecem no catálogo, sem repetir. */
export function categoriasDe(produtos: Produto[]): string[] {
  return produtos.reduce<string[]>((acc, p) => (acc.includes(p.categoria) ? acc : [...acc, p.categoria]), []);
}
