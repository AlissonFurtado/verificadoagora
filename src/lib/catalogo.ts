import fs from 'fs';
import path from 'path';
import type { Catalogo } from './produtos';
import type { Historico } from './historico';
import type { Comparativo, Comparativos } from './comparativos';
import type { Guia, Guias } from './guias';
import type { Decisao, Decisoes } from './decisoes';

/** Histórico de preço. Some quando o arquivo ainda não existe, sem quebrar a página. */
export function lerHistorico(): Historico {
  const caminho = path.join(process.cwd(), 'data', 'historico.json');
  if (!fs.existsSync(caminho)) return { atualizado_em: '', produtos: {} };
  return JSON.parse(fs.readFileSync(caminho, 'utf-8')) as Historico;
}

/** Lê o catálogo do disco. Fonte única de verdade da landing — não há painel. */
export function lerCatalogo(): Catalogo {
  const caminho = path.join(process.cwd(), 'data', 'produtos.json');
  // asserção de tipo: JSON externo, não validado em tempo de compilação
  return JSON.parse(fs.readFileSync(caminho, 'utf-8')) as Catalogo;
}

/**
 * Comparativos escritos à mão. Some sem quebrar nada quando o arquivo não
 * existe: comparativo é opcional, só alguns produtos ganham um.
 */
export function lerComparativos(): Comparativo[] {
  const caminho = path.join(process.cwd(), 'data', 'comparativos.json');
  if (!fs.existsSync(caminho)) return [];
  return (JSON.parse(fs.readFileSync(caminho, 'utf-8')) as Comparativos).comparativos;
}

/**
 * Guias de faixa escritos à mão. Some sem quebrar nada quando o arquivo não
 * existe — igual aos comparativos: guia é opcional.
 */
export function lerGuias(): Guia[] {
  const caminho = path.join(process.cwd(), 'data', 'guias.json');
  if (!fs.existsSync(caminho)) return [];
  return (JSON.parse(fs.readFileSync(caminho, 'utf-8')) as Guias).guias;
}

/**
 * Guias de decisão escritos à mão. Some sem quebrar nada quando o arquivo não
 * existe — igual aos guias e comparativos.
 */
export function lerDecisoes(): Decisao[] {
  const caminho = path.join(process.cwd(), 'data', 'decisoes.json');
  if (!fs.existsSync(caminho)) return [];
  return (JSON.parse(fs.readFileSync(caminho, 'utf-8')) as Decisoes).decisoes;
}
