/**
 * Quando a rodada inteira falha, testa outras rotas da API com o mesmo token
 * e grava em `diagnostico-api.json` quais respondem.
 *
 * Nasceu em 26/11/2026: desde 23/11 o Meli devolve 403
 * `PA_UNAUTHORIZED_RESULT_FROM_POLICIES` para todo produto, com o token
 * renovando normalmente, e o log da Action não é legível daqui (GitHub
 * deslogado). O arquivo vai para a main, então:
 *
 * ⚠️ **O repo é público.** Resposta que deu certo não é gravada, só o status e
 * os nomes dos campos: `/users/me` traz dado pessoal. De erro grava o começo do
 * corpo, que é a mensagem do Meli.
 */
import fs from 'fs';
import path from 'path';

const API = 'https://api.mercadolibre.com';

type Resultado = { rota: string; status: number; campos?: string[]; erro?: string };

async function testar(rota: string, accessToken: string): Promise<{ r: Resultado; json: unknown }> {
  try {
    const resposta = await fetch(`${API}${rota}`, {
      headers: { Authorization: `Bearer ${accessToken}`, accept: 'application/json' },
    });
    const corpo = await resposta.text();
    if (!resposta.ok) return { r: { rota, status: resposta.status, erro: corpo.slice(0, 200) }, json: null };
    const json = JSON.parse(corpo) as unknown;
    const campos = json && typeof json === 'object' ? Object.keys(json).slice(0, 15) : [];
    return { r: { rota, status: resposta.status, campos }, json };
  } catch (err) {
    return { r: { rota, status: 0, erro: String(err).slice(0, 200) }, json: null };
  }
}

export async function diagnosticarApi(accessToken: string, meliId: string): Promise<void> {
  const resultados: Resultado[] = [];
  const rotas = [
    '/users/me',
    `/products/${meliId}`,
    `/products/${meliId}/items`,
    `/sites/MLB/search?product_id=${meliId}`,
    `/products/search?status=active&site_id=MLB&q=ar%20condicionado`,
    '/highlights/MLB/category/MLB1051',
  ];
  let itemId = '';
  for (const rota of rotas) {
    const { r, json } = await testar(rota, accessToken);
    resultados.push(r);
    if (rota === `/products/${meliId}` && json && typeof json === 'object') {
      const vencedor = (json as Record<string, unknown>).buy_box_winner as Record<string, unknown> | undefined;
      if (typeof vencedor?.item_id === 'string') itemId = vencedor.item_id;
    }
  }
  if (itemId) {
    resultados.push((await testar(`/items/${itemId}`, accessToken)).r);
    resultados.push((await testar(`/items?ids=${itemId}`, accessToken)).r);
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'diagnostico-api.json'),
    `${JSON.stringify({ rodado_em: new Date().toISOString(), meli_id: meliId, resultados }, null, 2)}\n`,
    'utf-8',
  );
  console.log('Diagnóstico da API gravado em diagnostico-api.json');
}
