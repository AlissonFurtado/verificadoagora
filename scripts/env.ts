import fs from 'fs';
import path from 'path';

/** Lê o .env da raiz, se existir. Na Action as variáveis já vêm do ambiente. */
export function carregarEnv(): void {
  const caminho = path.join(process.cwd(), '.env');
  if (!fs.existsSync(caminho)) return;

  for (const linha of fs.readFileSync(caminho, 'utf-8').split('\n')) {
    const limpa = linha.trim();
    if (!limpa || limpa.startsWith('#')) continue;
    const corte = limpa.indexOf('=');
    if (corte < 1) continue;
    const chave = limpa.slice(0, corte).trim();
    if (process.env[chave] !== undefined) continue;
    process.env[chave] = limpa.slice(corte + 1).trim().replace(/^["']|["']$/g, '');
  }
}

export function exigir(chave: string): string {
  const valor = process.env[chave];
  if (!valor) {
    throw new Error(
      `Falta a variável ${chave}. No seu PC, ponha no .env da raiz; no GitHub, em Settings > Secrets and variables > Actions.`,
    );
  }
  return valor;
}
