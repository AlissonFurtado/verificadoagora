/**
 * Aplica no catálogo os preços lidos à mão no Chrome (página `/p/{id}/s`).
 *
 *   npx tsx scripts/aplicar-conferencia.ts <lido.json> [--aplicar]
 *
 * Nasceu em 26/11/2026: o Meli fechou para o nosso app toda rota de preço da
 * API (ver CLAUDE.md), e o robô parou. `lido.json` é a saída do laço no
 * Chrome: `[{ id, n, lin: [[preco, original, vendedor, internacional], ...] }]`,
 * com a 1ª linha sendo a buy box.
 *
 * Mesmas regras do robô: importado não vale (usa a 1ª oferta nacional),
 * variação acima de 15% não entra sozinha, e o histórico grava o preço que o
 * site mostra. Sem `--aplicar` só mostra o que faria.
 */
import fs from 'fs';
import path from 'path';
import type { Catalogo } from '../src/lib/produtos';
import { registrarPreco, type Historico } from '../src/lib/historico';

type Linha = [number | null, number | null, string, boolean];
type Lido = { id: string; n?: number; lin?: Linha[]; erro?: string };

const VARIACAO_SUSPEITA = 0.15;
const hoje = new Date().toISOString().slice(0, 10);
const r2 = (v: number) => Math.round(v * 100) / 100;

const [arquivo] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const aplicar = process.argv.includes('--aplicar');
// Suspeitos já conferidos na lista de vendedores: `--forcar=7,15,25`.
const forcados = new Set(
  (process.argv.find((x) => x.startsWith('--forcar=')) ?? '').slice(9).split(',').filter(Boolean).map(Number),
);
const lidos = JSON.parse(fs.readFileSync(arquivo, 'utf-8')) as Lido[];
const porId = new Map(lidos.map((l) => [l.id, l]));

const caminho = path.join(process.cwd(), 'data', 'produtos.json');
const catalogo = JSON.parse(fs.readFileSync(caminho, 'utf-8')) as Catalogo;
const caminhoH = path.join(process.cwd(), 'data', 'historico.json');
const historico = JSON.parse(fs.readFileSync(caminhoH, 'utf-8')) as Historico;

const saida = { aplicados: [] as string[], suspeitos: [] as string[], sem_oferta: [] as string[], sem_leitura: [] as string[] };

for (const p of catalogo.produtos) {
  if (!p.meli_id || p.oculto) continue;
  const lido = porId.get(p.confere_por || p.meli_id);
  if (!lido || lido.erro) {
    saida.sem_leitura.push(`${p.id} ${p.nome} (${lido?.erro ?? 'não lido'})`);
    continue;
  }
  const nacional = (lido.lin ?? []).find((l) => l[0] && !l[3]);
  if (!nacional) {
    saida.sem_oferta.push(`${p.id} ${p.nome} (${lido.n ?? 0} ofertas, nenhuma nacional com preço)`);
    continue;
  }
  const novo = r2(nacional[0]!);
  const anterior = p.preco_atual;
  const variacao = anterior > 0 ? (novo - anterior) / anterior : 0;
  if (Math.abs(variacao) > VARIACAO_SUSPEITA && !forcados.has(p.id)) {
    saida.suspeitos.push(`${p.id} ${p.nome}: ${anterior} -> ${novo} (${Math.round(variacao * 100)}%, ${nacional[2]})`);
    continue;
  }
  p.preco_atual = novo;
  p.preco_no_pix = false;
  p.disponivel = true;
  p.verificado_em = hoje;
  if (nacional[1] && nacional[1] > novo) p.preco_original = r2(nacional[1]);
  if (p.preco_original < novo) p.preco_original = novo;
  p.desconto_percentual = Math.max(0, Math.floor((1 - novo / p.preco_original) * 100));
  historico.produtos[p.meli_id] = registrarPreco(historico.produtos[p.meli_id], hoje, novo);
  if (novo !== anterior) saida.aplicados.push(`${p.id} ${p.nome}: ${anterior} -> ${novo}`);
}

console.log(JSON.stringify(saida, null, 2));
console.log(`mudaram ${saida.aplicados.length}, suspeitos ${saida.suspeitos.length}, sem oferta ${saida.sem_oferta.length}, sem leitura ${saida.sem_leitura.length}`);

if (aplicar) {
  catalogo.metadata.ultima_atualizacao = hoje;
  catalogo.metadata.conferido_em = new Date().toISOString();
  historico.atualizado_em = hoje;
  fs.writeFileSync(caminho, `${JSON.stringify(catalogo, null, 2)}\n`, 'utf-8');
  fs.writeFileSync(caminhoH, `${JSON.stringify(historico, null, 2)}\n`, 'utf-8');
  console.log('gravado');
}
