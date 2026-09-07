/**
 * Troca o `code` do login do Mercado Livre pelo primeiro refresh_token.
 *
 * Roda uma vez só, na máquina do Alisson — o client_secret não sai daqui.
 *
 *   npm run meli:autorizar -- <code>
 *
 * O passo anterior é abrir no navegador (logado no Meli):
 *   https://auth.mercadolivre.com.br/authorization?response_type=code
 *     &client_id=SEU_APP_ID&redirect_uri=SUA_REDIRECT_URI
 * e copiar o `code=` que aparece na URL de volta.
 */
import { carregarEnv, exigir } from './env';

carregarEnv();

const code = process.argv[2];
if (!code) {
  console.error('Uso: npm run meli:autorizar -- <code>');
  process.exit(1);
}

const corpo = new URLSearchParams({
  grant_type: 'authorization_code',
  client_id: exigir('ML_CLIENT_ID'),
  client_secret: exigir('ML_CLIENT_SECRET'),
  code,
  redirect_uri: exigir('ML_REDIRECT_URI'),
});

async function main(): Promise<void> {
  const resposta = await fetch('https://api.mercadolibre.com/oauth/token', {
    method: 'POST',
    headers: { accept: 'application/json', 'content-type': 'application/x-www-form-urlencoded' },
    body: corpo,
  });

  const texto = await resposta.text();
  if (!resposta.ok) {
    console.error(`Meli respondeu ${resposta.status}:`, texto);
    console.error('\nO code vale poucos minutos e serve uma vez só. Se expirou, refaça o login.');
    process.exit(1);
  }

  const dados = JSON.parse(texto) as { refresh_token?: string; user_id?: number };
  console.log('\nDeu certo. Usuário', dados.user_id);
  console.log('\nGuarde este refresh_token no segredo ML_REFRESH_TOKEN do GitHub:\n');
  console.log(dados.refresh_token);
  console.log('\nEle é de uso único e o robô troca por um novo a cada rodada — por isso');
  console.log('a Action precisa poder reescrever o segredo (é o que o GH_PAT faz).');
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
