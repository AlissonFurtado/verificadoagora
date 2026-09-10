import { permanentRedirect } from 'next/navigation';
import { lerCatalogo } from '@/lib/catalogo';
import { caminhoDoProduto } from '@/lib/slug';

/**
 * Endereço do site antigo, resgatado.
 *
 * Este domínio rodou um WordPress de jan a jul/2026, e esta URL foi a página
 * mais vista dele: 227 impressões e 2 cliques no Google. O produto é o mesmo
 * que está no catálogo hoje, então o 308 devolve esse histórico à página nova.
 *
 * ⚠️ **Só existe rota assim quando o destino é o mesmo produto.** As outras
 * três URLs do site antigo (`/kabum-smart-700/`, `/a16-vale-a-pena/`,
 * `/analise-hy320/`) são de produtos que não vendemos: mandá-las pra outro
 * aparelho é soft 404 pro Google e mentira pro visitante. Elas ficam 404, e
 * isso está certo.
 *
 * O destino sai de `caminhoDoProduto`, não escrito à mão: o `nome` é curadoria
 * e muda, e um slug fixo aqui viraria um 301 pra lugar nenhum.
 */
const MELI_ID = 'MLB63036814';

export default function AnalisePhilco32Roku(): never {
  const produto = lerCatalogo().produtos.find((p) => p.meli_id === MELI_ID);
  permanentRedirect(produto ? caminhoDoProduto(produto) : '/');
}
