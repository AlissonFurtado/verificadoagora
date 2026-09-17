import { permanentRedirect } from 'next/navigation';
import { lerCatalogo } from '@/lib/catalogo';
import { caminhoDoProduto } from '@/lib/slug';

/**
 * Segundo endereço do site antigo resgatado, em 17/09/2026.
 *
 * O WordPress que rodou aqui de jan a jul/2026 tinha uma análise do projetor
 * HY320: 11 impressões no Google. Ela era 404 desde então — e estava certo,
 * porque não vendíamos o produto. **Isso mudou quando o HY320 entrou no
 * catálogo**, e aí a condição do redirect passa a valer: o destino é o mesmo
 * produto.
 *
 * ⚠️ **A regra não mudou: só existe rota assim quando o destino é o mesmo
 * produto.** `/kabum-smart-700/` e `/a16-vale-a-pena/` continuam 404, porque
 * mandar quem buscava o A16 para outro aparelho é soft 404 pro Google e
 * mentira pro visitante. Se um deles entrar no catálogo um dia, o molde é
 * este arquivo.
 *
 * O destino sai de `caminhoDoProduto`, não escrito à mão: o `nome` é curadoria
 * e muda, e um slug fixo aqui viraria um 301 pra lugar nenhum.
 *
 * ⚠️ **`force-dynamic` é o que faz o redirect valer pro Google.** Prerenderada,
 * a rota devolve 308 sem cabeçalho `Location` — o Next assa o desvio como
 * payload de cliente, e crawler não segue isso.
 */
export const dynamic = 'force-dynamic';

const MELI_ID = 'MLB48959123';

export default function AnaliseHy320(): never {
  const produto = lerCatalogo().produtos.find((p) => p.meli_id === MELI_ID);
  permanentRedirect(produto ? caminhoDoProduto(produto) : '/');
}
