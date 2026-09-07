// Vira mensagem de commit e corpo de PR. É .mjs porque roda solto na Action,
// sem passar pelo tsx.
import fs from 'fs';

const r = JSON.parse(fs.readFileSync('relatorio.json', 'utf-8'));
const real = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const pct = (v) => `${v > 0 ? '+' : ''}${Math.round(v * 100)}%`;

const linhas = [];
const titulo =
  r.suspeitos.length > 0
    ? `Preços de ${r.rodado_em}: ${r.suspeitos.length} com variação grande`
    : `Atualiza os preços conferidos em ${r.rodado_em}`;

linhas.push(titulo, '');
linhas.push(`Conferidos ${r.conferidos} produto(s) na API do Mercado Livre.`, '');

if (r.suspeitos.length > 0) {
  linhas.push('Variação acima de 15% — é por isso que isto veio como PR:');
  for (const m of r.suspeitos) linhas.push(`- ${m.nome}: ${real(m.de)} -> ${real(m.para)} (${pct(m.variacao)})`);
  linhas.push('');
}

const normais = r.mudancas.filter((m) => !r.suspeitos.some((s) => s.id === m.id));
if (normais.length > 0) {
  linhas.push('Mudanças dentro do esperado:');
  for (const m of normais) linhas.push(`- ${m.nome}: ${real(m.de)} -> ${real(m.para)} (${pct(m.variacao)})`);
  linhas.push('');
}

if (r.desligados.length > 0) {
  linhas.push('Saíram da página (não dá pra anunciar o que não existe):');
  for (const d of r.desligados) linhas.push(`- ${d.nome}: ${d.motivo}`);
  linhas.push('');
}

if (r.sem_id.length > 0) {
  linhas.push('Sem meli_id, então ninguém conferiu:');
  for (const p of r.sem_id) linhas.push(`- ${p.nome}`);
  linhas.push('');
}

linhas.push('Robô de preços — .github/workflows/conferir-precos.yml');

process.stdout.write(linhas.join('\n') + '\n');
