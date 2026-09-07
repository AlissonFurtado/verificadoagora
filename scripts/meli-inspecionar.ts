/**
 * Mostra cru o que a API do Meli devolve pra um id. Serve pra quando a
 * conferência falar "resposta sem preço": olhar antes de chutar.
 *
 *   npm run meli:inspecionar -- MLB24076624
 */
import { carregarEnv } from './env';
import { inspecionar } from '../src/lib/meli';
import { obterAcesso } from './acesso';

carregarEnv();

const meliId = process.argv[2];
if (!meliId) {
  console.error('Uso: npm run meli:inspecionar -- <MLB...>');
  process.exit(1);
}

async function main(): Promise<void> {
  console.log(JSON.stringify(await inspecionar(meliId, await obterAcesso()), null, 2));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
