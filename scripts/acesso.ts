import fs from 'fs';
import path from 'path';
import { renovarAcesso } from '../src/lib/meli';
import { exigir } from './env';

const ARQUIVO_REFRESH = '.meli-refresh';

/**
 * Renova o acesso e **guarda o refresh_token novo antes de qualquer outra
 * coisa**. O do Meli é de uso único: se a rodada morrer no meio sem ter
 * guardado, a automação fica sem como voltar e alguém tem que refazer o login
 * na mão.
 *
 * Guarda em dois lugares porque são dois mundos: o `.meli-refresh` é o que a
 * Action lê pra reescrever o segredo do GitHub; o `.env` é pra próxima rodada
 * aqui na máquina funcionar sem você fazer nada.
 */
export async function obterAcesso(): Promise<string> {
  const { accessToken, novoRefreshToken } = await renovarAcesso({
    clientId: exigir('ML_CLIENT_ID'),
    clientSecret: exigir('ML_CLIENT_SECRET'),
    refreshToken: exigir('ML_REFRESH_TOKEN'),
  });

  fs.writeFileSync(path.join(process.cwd(), ARQUIVO_REFRESH), novoRefreshToken, 'utf-8');

  const env = path.join(process.cwd(), '.env');
  if (fs.existsSync(env)) {
    const conteudo = fs.readFileSync(env, 'utf-8');
    fs.writeFileSync(
      env,
      /^ML_REFRESH_TOKEN=/m.test(conteudo)
        ? conteudo.replace(/^ML_REFRESH_TOKEN=.*$/m, `ML_REFRESH_TOKEN=${novoRefreshToken}`)
        : `${conteudo.replace(/\n*$/, '')}\nML_REFRESH_TOKEN=${novoRefreshToken}\n`,
      'utf-8',
    );
  }

  return accessToken;
}
