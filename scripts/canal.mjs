// Monta as mensagens do dia para o canal do WhatsApp.
//
//   node scripts/canal.mjs            → mostra as 5 do dia
//   node scripts/canal.mjs --marcar   → mostra e registra como publicadas
//
// ⚠️ **Ele não publica nada.** Publicar é feito com o Chrome logado, colando
// pela área de transferência (ver "Publicar no canal pelo WhatsApp Web" no
// CLAUDE.md). Este script só escolhe e escreve.
//
// A ordem não é o catálogo: é **quem merece o dia**. Produto que caiu de preço
// hoje passa na frente, depois quem está no menor valor já visto, depois o
// maior desconto. Quem já foi publicado só volta se o preço tiver mudado — a
// mesma regra da memória do garimpo, pelo mesmo motivo: repetir a mesma oferta
// é o que faz alguém sair do canal.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const POR_DIA = 5;
const ESTADO = 'data/canal-publicados.json';

const catalogo = JSON.parse(readFileSync('data/produtos.json', 'utf8'));
const historico = JSON.parse(readFileSync('data/historico.json', 'utf8')).produtos;
const publicados = existsSync(ESTADO)
  ? JSON.parse(readFileSync(ESTADO, 'utf8'))
  : { _leia: 'Quem já foi ao canal, e por quanto. Volta só se o preço mudar.', itens: {} };

const real = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace(/ /g, ' ');
const dia = (d) => d.split('-').reverse().slice(0, 2).join('/');

function avaliar(produto) {
  const pontos = historico[produto.meli_id] ?? [];
  const anterior = pontos.length > 1 ? pontos[pontos.length - 2].preco : null;
  const menor = pontos.length ? pontos.reduce((a, b) => (b.preco < a.preco ? b : a)) : null;
  // ⚠️ **Queda de R$ 6 não é notícia.** A primeira versão anunciava "CAIU
  // HOJE" para 2% de variação — e canal que grita por qualquer centavo ensina
  // o seguidor a ignorar. Só vira manchete a partir de 3% ou R$ 20.
  const queda = anterior !== null ? anterior - produto.preco_atual : 0;
  const caiuHoje =
    anterior !== null && (queda / anterior >= 0.03 || queda >= 20);
  const noMenor = menor !== null && produto.preco_atual <= menor.preco;

  const jaFoi = publicados.itens[produto.meli_id];

  // ⚠️ **Produto recém-cadastrado não tem histórico, e sem isto ele nunca
  // entrava na fila** — não caiu de preço nem está "no menor que já vi",
  // então competia só pelo desconto anunciado e perdia para o catálogo
  // inteiro. Novidade é motivo legítimo de mensagem: é o que o seguidor não
  // tem como saber sozinho.
  const estreia = !jaFoi && pontos.length <= 1;

  // Peso: queda de hoje vale mais que tudo — é a única coisa que o canal
  // promete. Depois o piso histórico, a estreia, e só então o desconto.
  let nota = produto.desconto_percentual;
  if (estreia) nota += 30;
  if (noMenor) nota += 40;
  if (caiuHoje) nota += 100 + Math.round(((anterior - produto.preco_atual) / anterior) * 100);

  if (jaFoi) {
    if (jaFoi.preco === produto.preco_atual) return null; // nada novo a dizer
    nota -= 20; // repetição só entra se for claramente melhor que o resto
  }

  return {
    produto,
    pontos,
    anterior,
    menor,
    caiuHoje,
    noMenor,
    estreia,
    nota,
    repetido: Boolean(jaFoi),
  };
}

function escrever({ produto, pontos, anterior, menor, caiuHoje, noMenor, estreia, repetido }) {
  const p = produto;
  const linhas = [];

  if (caiuHoje) linhas.push('🔻 CAIU HOJE', '');
  else if (noMenor && !estreia) linhas.push('✅ MENOR PREÇO QUE JÁ VI', '');
  else if (estreia) linhas.push('🆕 NOVO NO SITE', '');

  linhas.push(p.nome, `${real(p.preco_original)} → ${real(p.preco_atual)} (${p.desconto_percentual}% OFF)`, '');

  if (caiuHoje) {
    linhas.push(
      `Ontem estava ${real(anterior)}. Caiu ${real(anterior - p.preco_atual)} de um dia para o outro.`,
      '',
    );
  } else if (estreia) {
    // Sem histórico ainda não dá para dizer se o desconto é bom. O que dá
    // para prometer é o que vem depois — que é justamente o serviço.
    linhas.push(
      'Entrou hoje no site. Daqui pra frente eu confiro o preço dele todo dia e aviso se cair.',
      '',
    );
  } else if (noMenor && pontos.length > 2) {
    linhas.push(`Acompanho esse preço há ${pontos.length} dias, e hoje está no menor que já vi.`, '');
  } else if (menor && menor.preco < p.preco_atual) {
    linhas.push(`Já vi por ${real(menor.preco)} em ${dia(menor.dia)} — hoje está acima disso.`, '');
  }

  if (repetido) linhas.push('(já mandei esse aqui antes, mas o preço mudou)', '');

  linhas.push(p.descricao, '', `https://www.verificadoagora.com.br/produto/${gerarSlug(p)}`);
  return linhas.join('\n');
}

function gerarSlug(p) {
  const base = p.nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${base}-${p.meli_id.toLowerCase()}`;
}

const avaliados = catalogo.produtos
  .filter((p) => p.disponivel && !p.oculto)
  .map(avaliar)
  .filter(Boolean)
  .sort((a, b) => b.nota - a.nota);

// ⚠️ **Uma vaga é reservada para produto novo, e isso não é detalhe de
// ordenação.** Disputando só por nota, a estreia perde sempre: uma queda de
// preço real vale 100 pontos e um piso histórico vale 40, então um produto
// recém-cadastrado só apareceria no canal num dia em que nada tivesse
// acontecido no catálogo inteiro. O resultado prático era o canal nunca
// anunciar novidade — que é a única coisa que o seguidor não descobre sozinho
// olhando o site. Uma vaga basta: o resto da fila continua sendo mérito.
const estreante = avaliados.find((a) => a.estreia);
const escolhidos = estreante
  ? [estreante, ...avaliados.filter((a) => a !== estreante).slice(0, POR_DIA - 1)]
  : avaliados.slice(0, POR_DIA);

if (escolhidos.length === 0) {
  console.log('Nada novo para mandar hoje — e isso é uma resposta legítima.');
  process.exit(0);
}

escolhidos.forEach((item, i) => {
  console.log(`\n═══════════ ${i + 1}/${escolhidos.length} · ${item.produto.nome} ═══════════\n`);
  console.log(escrever(item));
});

if (process.argv.includes('--marcar')) {
  const hoje = new Date().toISOString().slice(0, 10);
  for (const { produto } of escolhidos) {
    publicados.itens[produto.meli_id] = { preco: produto.preco_atual, em: hoje };
  }
  writeFileSync(ESTADO, JSON.stringify(publicados, null, 2) + '\n');
  console.log(`\n✓ ${escolhidos.length} marcados como publicados em ${ESTADO}`);
}
