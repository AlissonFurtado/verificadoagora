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
  // o seguidor a ignorar.
  //
  // 🔴 O limiar era `3% ou R$ 20`, e o `ou` deixava passar exatamente o que a
  // regra proíbe: o liquidificador gerou "Caiu R$ 6,00" (3,17% sobre R$ 189)
  // em 21/09, o GameSir "Caiu R$ 7,99" (3,1%) no mesmo dia, e o JBL "Caiu
  // R$ 10,91" (3,1%) em 23/09 — as três puladas à mão. Desde 23/09/2026 são
  // **as duas condições juntas: 3% E pelo menos R$ 15** (decisão do Alisson).
  // Percentual sozinho não protege produto barato; valor sozinho não protege
  // produto caro.
  const QUEDA_MINIMA_PORCENTO = 0.03;
  const QUEDA_MINIMA_REAIS = 15;
  const queda = anterior !== null ? anterior - produto.preco_atual : 0;

  // 🔴 **Zigue-zague não é queda: é correção manual voltando ao lugar.**
  // Em 24/09/2026 o Aspirador Electrolux gerou "Caiu R$ 57,04 de um dia para o
  // outro" — e a loja já cobrava R$ 199,90 desde 22/09. O que subiu e desceu
  // foi o preço que **o site mostrava**: ele ficou travado em R$ 256,94
  // enquanto o suspeito esperava revisão, e voltou ao valor certo quando
  // alguém aplicou à mão. Como o histórico grava o que o site mostra (e é
  // certo que grave), a correção vira uma "queda" no dia seguinte.
  //
  // O sinal é o preço de **anteontem** ser igual ao de hoje: o preço não foi
  // a lugar nenhum, só a nossa página é que tinha se perdido.
  const anteontem = pontos.length > 2 ? pontos[pontos.length - 3].preco : null;
  const voltouAoQueEra = anteontem !== null && Math.abs(anteontem - produto.preco_atual) < 0.01;

  const caiuHoje =
    anterior !== null &&
    !voltouAoQueEra &&
    queda / anterior >= QUEDA_MINIMA_PORCENTO &&
    queda >= QUEDA_MINIMA_REAIS;
  // ⚠️ **"Menor preço que já vi" exige ter visto alguma coisa.** Com um ou dois
  // pontos no histórico qualquer preço é o menor, e o selo vira enfeite: em
  // 22/09/2026 o JBL tinha exatamente dois pontos iguais e levaria a manchete
  // — sendo que o site o anunciara dois dias antes por R$ 164,10, mais barato
  // que o "menor preço" da mensagem. ⚠️ Produto recém-cadastrado só entra no
  // histórico na primeira rodada do robô, então o preço com que ele estreou na
  // vitrine não está lá.
  //
  // 🔴 **E exige que o preço tenha se movido alguma vez.** Em 24/09/2026 o
  // DualSense levaria "MENOR PREÇO QUE JÁ VI — acompanho há 8 dias" com os
  // oito pontos idênticos (R$ 430). A frase é verdadeira e vazia: numa série
  // plana todo dia é o menor. O selo só significa alguma coisa quando existe
  // um preço maior para comparar.
  const variou = new Set(pontos.map((p) => p.preco)).size > 1;
  const noMenor =
    menor !== null && pontos.length >= 3 && variou && produto.preco_atual <= menor.preco;

  const jaFoi = publicados.itens[produto.meli_id];

  // 🔴 **Produto que já foi ao canal e ficou MAIS CARO não volta.** Repetir uma
  // oferta para dizer que ela piorou não serve a ninguém e gasta a paciência
  // de quem segue — o canal promete queda de preço, não boletim de variação.
  if (jaFoi && produto.preco_atual > jaFoi.preco) return null;

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
    // ⚠️ Só vale dizer "está acima" quando a diferença significa alguma coisa.
    // Em 22/09/2026 o G17 gerou "Já vi por R$ 887,77 — hoje está acima disso"
    // com **um centavo** de diferença: a frase é verdadeira e ridícula, e
    // desanima a compra por nada. Régua: 3% **ou** R$ 20.
    //
    // ⚠️ **A assimetria com o limiar da queda é de propósito, não esquecimento.**
    // A manchete "CAIU HOJE" exige as duas condições juntas (3% E R$ 15) porque
    // ela grita no celular de alguém; este aviso mantém o `ou` porque erra para
    // o lado seguro — avisar demais que o preço já esteve menor custa uma venda,
    // esconder isso custa a confiança, que é o único ativo do canal.
    const acima = p.preco_atual - menor.preco;
    if (acima / menor.preco >= 0.03 || acima >= 20) {
      linhas.push(`Já vi por ${real(menor.preco)} em ${dia(menor.dia)} — hoje está acima disso.`, '');
    } else {
      linhas.push(`Está praticamente no menor preço que já vi (${real(menor.preco)}, em ${dia(menor.dia)}).`, '');
    }
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

// 🔴 **Produto que a última rodada não conferiu não vai para o canal.** Quando
// o robô marca um preço como suspeito, ele devolve o produto ao valor de
// ontem e deixa `verificado_em` para trás — o site mostra um preço que pode
// já não existir na loja. Isso é tolerável numa ficha, que diz a data da
// conferência do lado; é inaceitável numa mensagem que grita "MENOR PREÇO QUE
// JÁ VI" no celular de alguém. Em 22/09/2026 dois dos cinco da fila estavam
// nessa situação (DualSense, parado desde 20/09, e o GameSir G7 SE).
const conferidoEm = catalogo.metadata.ultima_atualizacao;

const avaliados = catalogo.produtos
  .filter((p) => p.disponivel && !p.oculto && p.verificado_em === conferidoEm)
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
