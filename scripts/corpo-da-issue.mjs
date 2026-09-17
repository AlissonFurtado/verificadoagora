// Monta o texto da issue semanal com a fila garimpada.
import fs from 'fs';

const { garimpado_em, candidatos } = JSON.parse(fs.readFileSync('data/candidatos.json', 'utf-8'));
const real = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const l = [];
l.push(`Garimpo de ${garimpado_em}: **${candidatos.length} candidato(s)** novos.`, '');
l.push('O que falta é o único passo que o Meli não deixa automatizar: gerar o link');
l.push('de afiliado no Linkbuilder. Cole a URL do produto lá e devolva o `meli.la`.', '');

let cat = null;
for (const c of candidatos) {
  if (c.categoria !== cat) { cat = c.categoria; l.push(`### ${cat}`, ''); }
  l.push(`- **${c.nome}**`);
  l.push(`  ${real(c.preco)} (era ${real(c.preco_original)}, −${c.desconto_percentual}%) · \`${c.meli_id}\` · ${c.motivo ?? 'inédito'}`);
  l.push(`  ${c.url_do_produto}`);
}
// Bloco pra abrir tudo de uma vez: ele gera os links no PC, e caçar URL no
// meio do texto formatado é o passo chato. Aqui elas vêm cruas, uma por linha.
l.push('', '### Só as URLs, pra copiar de uma vez', '', '```');
for (const c of candidatos) l.push(c.url_do_produto);
l.push('```', '');
l.push('Devolva os `meli.la` na mesma ordem, ou diga o nome junto — o que for mais rápido.');
l.push('', 'Nada disso entrou no site: candidato só vira produto com link de afiliado.');
l.push('Fila completa em `data/candidatos.json`. O que já foi sugerido antes não');
l.push('volta a aparecer, a não ser que fique 15% mais barato ou passem 60 dias.');

process.stdout.write(l.join('\n') + '\n');
