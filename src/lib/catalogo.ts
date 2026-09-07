import fs from 'fs';
import path from 'path';
import type { Catalogo } from './produtos';

/** Lê o catálogo do disco. Fonte única de verdade da landing — não há painel. */
export function lerCatalogo(): Catalogo {
  const caminho = path.join(process.cwd(), 'data', 'produtos.json');
  // asserção de tipo: JSON externo, não validado em tempo de compilação
  return JSON.parse(fs.readFileSync(caminho, 'utf-8')) as Catalogo;
}
