import type { Produto } from './produtos';

/**
 * Endereço de um produto no site.
 *
 * O slug leva o `meli_id` no fim de propósito: o `nome` é curadoria e muda
 * quando o Alisson reescreve o título. Sem o id, reescrever um nome quebraria
 * a URL que já está indexada no Google e citada por aí. Com ele, o texto pode
 * mudar à vontade que o endereço continua válido.
 */
export function gerarSlug(produto: Produto): string {
  const texto = produto.nome
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');

  return produto.meli_id ? `${texto}-${produto.meli_id.toLowerCase()}` : texto;
}

export function caminhoDoProduto(produto: Produto): string {
  return `/produto/${gerarSlug(produto)}`;
}

export function acharPorSlug(produtos: Produto[], slug: string): Produto | undefined {
  return produtos.find((p) => gerarSlug(p) === slug);
}
