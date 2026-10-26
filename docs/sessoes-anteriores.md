<!-- Parte do CLAUDE.md, separada em 25/10/2026 (decisão do Alisson: "dividir por assunto"). Texto movido sem cortes. -->

## Indexação de 17/10/2026

- 🟢 **Pedidos aceitos (11, a cota cortou no 12º):**
  - os guias `presentes-friends` e `utensilios-de-cozinha`;
  - os 7 que tinham ficado de 16/10 (splash Obsessed, Integralmédica,
    Anabolic, Hydracare, Myskin, lip tint, demaquilante);
  - facas Tramontina e bowls Electrolux.
- 🔴 **Pedir em 18/10 e 19/10 (18 fichas, ~11 por dia):**
  - as 8 de cozinha que faltam: tábua `mlb67938813`, Keita `mlb27377854`,
    Aristus `mlb57662272`, afiador `mlb40761902`, ralador `mlb24650032`,
    tesouras `mlb29485786`, alho `mlb38614269`, Wellmix `mlb67835314`;
  - as 10 de Friends (ids 84 a 93), começando pelo Funko do Joey
    `mlb54150642`, onde a cota cortou.
- Hoje cada pedido levou ~1 min (ontem, ~15 s).

## Onde paramos — 17/10/2026 (guia de presentes de Friends)

- 🟢 **Quarto guia-card: `/guia/presentes-friends`**, ids 84 a 93,
  categoria nova `Presentes`. Pedido dele: "lista de produtos da série
  Friends".
  - **Regra aplicada: só marca licenciada.** Entraram Funko (distribuição
    Candide), Zona Criativa (canecas e almofada), Usare (luminária com a
    Warner no título) e Líder Fandom Box (loja oficial).
  - Ficaram de fora: canecas de estampa genérica (JF Brindes, JPS INFO),
    porta-chaves de MDF, boxes de DVD (risco de pirataria), o LEGO 21319
    (fora de linha, R$ 1.999 de revenda) e o Funko do Joey de Super-homem
    (vendedor `GR2025…`).
  - Friends vende pouco no Meli: os itens têm de 25 a 100+ vendas.
  - Erros de anúncio escritos na `analise`: a ficha da Rachel #703 traz
    "5963" e 500 g; a da Phoebe diz 15,88 cm, mas a descrição diz 11 cm.
- ⚠️ **A home agora tem 4 banners de guia antes do primeiro produto.**
  Perguntar a ele se quer agrupar os banners (ex.: uma fileira rolável)
  antes de entrar o 5º.

## Onde paramos — 16/10/2026 (guia de utensílios de cozinha)

- 🟢 **Terceiro guia-card: `/guia/utensilios-de-cozinha`**, ids 74 a 83,
  categoria `Casa`, pedido dele ("uns 10 utensílios… que facilitam").
  - Os itens: facas Tramontina Plenus, tábua Chef D, Multi Cortador Keita,
    kit de silicone Aristus, bowls Electrolux, afiador Tramontina Profio,
    ralador Tramontina, 2 tesouras Tramontina, espremedor de alho Mr. Ogro e
    processador manual Wellmix.
  - Fonte: mais vendidos `MLB436273` (Utensílios de Preparação) e
    subcategorias, mais a busca "Tramontina" quando o topo era de marca sem
    nome.
  - Reprovado: o mandolin profissional `MLB27072400` (vendedor `wtzbrmqc` e
    "de" de R$ 368).
  - Erros de anúncio escritos na `analise`: a ficha do Keita diz "não tem
    lâmina", e a do afiador diz "pedra/cerâmica" quando são rolos
    diamantados.
- 🟡 (parcial em 17/10, ver acima) **Indexação dos 11 novos (guia + 10 fichas) NÃO pedida.** A cota de
  16/10 já tinha acabado. Somados aos 7 de 17/10, são 18: isso dá 2 dias de
  cota. Pedir o guia primeiro.

## Indexação de 16/10/2026

- 🟢 **Pedidos aceitos (11, a cota cortou no 12º):**
  - os guias `suplementos-para-academia` e `wepink-skin-care-e-perfumes`;
  - Casio W-59, escova Mondial e escova Britânia (pendentes desde 13/10);
  - creatina Growth 250 g, whey Growth 100%, creatina Soldiers e Basic Whey;
  - sérum 10 em 1 e perfume Obsessed.
- 🟢 **Já estavam indexados:** whey Max Titanium, Cicaplast e Anthelios.
  Com isso, a pendência de 13–14/10 está fechada.
- 🔴 **Pedir em 17/10 (7):**
  - body splash Obsessed (`mlb24341317`);
  - creatina Integralmédica (`mlb39230611`);
  - Anabolic Mass (`mlb12406685`);
  - Hydracare (`mlb47015451`);
  - espuma Myskin (`mlb22444239`);
  - lip tint (`mlb20972757`);
  - demaquilante (`mlb45506260`).
- O laço `window.__insp(lista)` roda num `setTimeout` (a chamada volta na
  hora) e se lê por `window.__log`. Cada pedido levou ~15 s.

## Onde paramos — 15/10/2026 (guia WePink + Lupita)

- 🟢 **Guia-card `/guia/wepink-skin-care-e-perfumes`** (ids 67 a 73,
  categoria `Beleza`). Escolha dele por múltipla escolha: **"Só WePink"**
  (a marca da Virginia Fonseca), 7 a 8 produtos.
  - ⚠️ **Exceção à regra da loja oficial, decidida por ele:** a WePink **não
    tem loja oficial no Mercado Livre**, só revendedores (lista `/p/{id}/s`
    do sérum: LIPETECO, GT STORE, Beth Makeup…). Toda `analise` termina
    com o aviso de revenda.
  - Mesmo assim, buy box de conta com nome automático (`IB2025…`,
    `AF2026…`) reprovou o **protetor solar** (`MLB34066507`) e o **body
    cream VF Golden** (`MLB47067407`). Também saíram o **creme de olhos**
    (5 vendas e FPS contraditório), o **sérum noturno** (sem preço) e o
    perfume de 100 mL que não é o Obsessed.
  - Como não há ficha de fabricante, os produtos entram com `ficha: {}`.
  - O robô lê o `results[0]`: confira amanhã se os 7 seguem `disponivel`
    e com preço perto do cadastrado.
- 🟢 **A Lupita substituiu o "✓ verificado"** (pedido dele em 15/10, por
  causa de strike na Meta). Escolhas dele: nos 3 lugares (favicon, capa do
  link `opengraph-image.tsx` e ao lado do título no topo da home); os selos
  "✓ menor preço" ficam. Os ✓ das garantias do topo viraram "•".
  - O desenho vem de `github.com/AlissonFurtado/afdesousa-personagens`
    (tag `v0.2.0`, pose `parado(0)`). Ficou congelado em SVG em
    `src/lib/lupita.ts` (o `next/og` usa como data URI) e em
    `public/lupita.svg` (a home).
  - ⚠️ O modo automático bloqueou "código de fora" ao copiar do repo, e ele
    liberou no chat. Se o desenho mudar, gere o SVG de novo.
  - A capa antiga do link segue em cache no WhatsApp e no Instagram por um
    tempo.

## Onde paramos — 15/10/2026 (guia-card de suplementos)

- 🟢 **Plano novo dele: "guia de tema" que vira UM card na vitrine.** O
  primeiro é `/guia/suplementos-para-academia`. Os produtos dele **saem da
  grade da home** e aparecem dentro do guia, e o robô continua conferindo
  todos. Escolhas dele, por múltipla escolha:
  - todos os produtos entram no catálogo, conferidos todo dia;
  - aparecem como card de guia na vitrine;
  - o critério é preço por dose + marca/loja oficial + mais vendidos.
- **Como funciona:** o guia em `guias.json` ganha `vitrine: { chamada }`.
  Com isso, `idsEmGuiaDeVitrine()` (`src/lib/guias.ts`) tira os `meli_id`
  dos perfis da grade, e `card-guia.tsx` (escuro da marca, anel âmbar, 3 fotos + "+N") entra
  na grade **do tamanho de um produto e na data `escrito_em`** (desde 25/10,
  pedido dele: "linha do tempo, caindo um pouco"), só no filtro "Tudo",
  e também na `/entrar`, logo depois da busca (link do Instagram).
  A prévia do link (WhatsApp) é `/capa-guia/{slug}` (1200×630, fotos dos
  produtos, sem preço), ligada no `openGraph.images` de todo guia de faixa. Os cliques no card levam
  `data-onde="card-guia"`. **Tema novo = guia novo com `vitrine`**; não
  precisa de código.
- **Marcador `{custo}`:** o perfil ganha `rende: { gramas, de }`, e o
  marcador vira "R$ X por grama de creatina/proteína", recalculado com o
  preço do dia.
  - ⚠️ **Não escreva "mais barato por grama" no texto.** Em 15/10, o Basic
    Whey (pote barato, 10 g/30 g) saiu o **mais em conta por grama de
    proteína** (R$ 0,22, contra R$ 0,27 do Growth 100%), e corrigi uma frase
    que dizia o contrário.
- **Entraram os ids 61 a 66** (Soldiers 500 g, Growth 250 g, Integralmédica
  2×300 g, Growth 100% 900 g, Basic Whey, Anabolic Mass), mais o whey Max
  Titanium (id 60).
  - Todos são de catálogo, com loja oficial na buy box (`official_store_id`
    no HTML de `/p/{id}/s`).
  - Comissão de suplemento: 12%.
- **Reprovados no guia:** Black Skull e Dark Lab, porque o anúncio não traz
  a proteína por dose e só agregador publica.
  - ⚠️ O "Isolate Fuse" da Dark Lab é **blend** (soja, albumina, caseína),
    não isolado.
- Fonte da pesquisa: `mercadolivre.com.br/mais-vendidos/MLB438178`,
  lida com `get_page_text`. Os ids saem dos links da página.
- **Instagram (carrossel): ele faz as fotos com outra IA. Eu só mexo no
  site.** No fim mando a lista de links num bloco de código.
- 🟢 **Linkbuilder com a janela oculta:** o clique em `Gerar` por JS
  (`button.click()`) funciona. Não precisa de coordenada.

## Onde paramos — 15/10/2026 (achados)

- ⏸️ **Achados EM PAUSA, por pedido dele** ("pensando bem… dê uma pausa, mas
  guarde os produtos"). Ele vai dizer **como quer a organização** antes de
  publicar. Ele tinha pedido "quantidade em vez de qualidade, para postar".
  A primeira versão também tinha: fontes = garimpo largo, ofertas do dia,
  links que ele mandar e mais vendidos; uma frase + preço; 20/dia.
- **Tudo guardado no branch LOCAL `pausa/achados`** (commit `3896e9a`, não
  enviado ao GitHub, `main` intacta):
  - página `/achados` (`noindex`, fora do sitemap, "preço visto em DD/MM");
  - `data/achados.json` com os **20 da fila de 15/10** e os `meli.la` já
    gerados;
  - link no rodapé da home e na `/entrar`;
  - garimpo com piso de R$ 10 e Brinquedos, Animais, Bebês e Ferramentas.

  Medido no dev: 200, `noindex`, 20 botões, 0 no sitemap. Para retomar:
  `git checkout pausa/achados` e ajustar ao que ele decidir.
- Truque que funcionou: a URL completa (com slug) que o Linkbuilder exige
  sai do `canonical` de `fetch('/p/{id}')` numa aba do Meli. Com 20 URLs
  no textarea (setter nativo + `input`), um clique em Gerar devolveu os 20.
- 🔴 **O robô de 15/10 tem 4 suspeitos** (commit `ccdf2f6`), que ainda não
  foram conferidos.

## Onde paramos — 14/10/2026

- 🟢 **Decidido por ele em 14/10: roupa só entra com página de catálogo**
  (`/p/MLB…`, conferida pelo robô). Anúncio avulso não entra, nem sem
  conferência. Assunto encerrado.
- 🟢 **Fila de 14/10 (20 candidatos): quase tudo lixo**, como previsto: 5
  suplementos (o topo de `MLB1276` Esportes é suplemento) e acessório sem
  marca (mousepad, webcam, pen drive, teclado, controle, luz LED). Ele
  escolheu "só os de marca"; dos 4, **entrou só o Whey Pro Max Titanium**
  (id 60, categoria nova `Esportes`, `meli.la/1FNTDQe`, buy box da loja
  oficial Saúde Vitae, **comissão 12%** — suplemento não é 16%). Reprovados,
  com o motivo:
  - **Elseve**: o vendedor é ELMI_DIVERSIDADES, não a L'Oréal. Cosmético de
    vendedor pequeno.
  - **Creatina Growth**: o catálogo foi fundido em `MLB66637233`, e a buy box
    era uma conta de nome automático (`MN2026…`, 25 vendas, entrega em 3
    semanas).
  - **Fone Dapon H02D**: o título diz 22 h de bateria e a ficha, 35 h.
- 🟢 **Suspeitos de 13 e 14/10 conferidos na página (lista `/p/{id}/s`) e
  aplicados à mão**; PRs fechados e branches 12, 13 e 14 apagados. GameSir T4
  R$ 233,10 (loja oficial), Moto G67 R$ 1.599 (a promoção de R$ 1.068 acabou),
  TCL 9k R$ 2.060,10, mixer R$ 109, DualSense R$ 459 (nacional; o do robô é
  dos EUA). ⚠️ **O kit de potes (id 35) vai virar suspeito todo dia**: a
  oferta mais barata (R$ 47,90) é de revenda com entrega em 3 semanas, e a
  Rishon, fabricante, segue a R$ 97,62. É o caso do `results[0]` da Philco.
  🟢 **A lista `/p/{id}/s` mostra todos os vendedores com preço no cartão e
  prazo**, e resolve suspeito em uma navegação.
- 🟢 **Garimpo: Esportes trocado por subcategoria** (decisão dele em 14/10):
  `MLB1338` Fitness e Musculação, `MLB1292` Ciclismo, `MLB123103` Monitores
  Esportivos. Suplemento (`MLB438178`) ficou fora de propósito.
- 🟢 (resolvido em 16/10) **Indexação NÃO confirmada**: whey, Casio W-59, Cicaplast, Anthelios,
  escova Mondial e escova Britânia. O laço rodou e a aba do Search Console
  travou no meio, sem dizer quais pedidos saíram. **Reinspecionar as 6** e
  pedir as que não estiverem "Indexação solicitada". ⚠️ Bug do laço antigo:
  `/está no Google/` casa com "não está no Google". Use `^O URL está`.

## Onde paramos — 13/10/2026

🟢 **Ele limpou a conversa no fim de 13/10. Retomada, em ordem:**
1. 🟢 Roupa: resolvido em 14/10 (só catálogo).
2. 🔴 **Pedir a indexação das 5 que a cota cortou:** Casio W-59, Cicaplast,
   Anthelios, escova Mondial e escova Britânia.
3. 🔴 **Os 7 suspeitos do robô de 13/10** (PR do branch
   `robo/precos-2026-10-13`): conferir na página, aplicar à mão, fechar o
   PR sem merge e apagar o branch.
4. 🔴 **Conferir o robô e o garimpo de 14/10:** os 7 produtos novos seguem
   `disponivel`? O Havaianas Top segue perto de R$ 36? Quantos candidatos
   a fila trouxe com as 4 categorias novas, e quanto é lixo?
5. Pendências antigas dele, sem resposta: cor das etiquetas novas, enxugar
   este arquivo, e as da lista de 12/10.

O detalhe de cada item está abaixo.


🟢 **O canal do WhatsApp NÃO é mais afazer meu (dito por ele em 13/10).** Ele
publica todo dia, com vídeos feitos por outro agente. **Não listar o canal
como pendência, não rodar `canal.mjs` nem oferecer publicar** — só se ele
pedir. As seções sobre o canal abaixo ficam como referência técnica; as
frases "parado desde 02/10" e "2 seguidores" estão velhas.

🟢 **Moda, beleza e relógios entraram no SITE, não só no canal** — decisão dele
em 13/10, revertendo a de 24/09 ("roupa só no canal"). Motivo: ele perguntou
por que não havia novidade nem link para gerar.
- **A causa da fila vazia, medida:** a memória do garimpo esgotou as mesmas 10
  categorias — 10 candidatos/dia em setembro, 1 ou 2 desde 18/09 (e 12/10 nem
  rodou). **Corrigido no `data/garimpo.json`:** entraram `MLB1430` (Calçados,
  Roupas e Bolsas), `MLB1246` (Beleza), `MLB3937` (Joias e Relógios) e
  `MLB1276` (Esportes), e o piso caiu de R$ 100 para **R$ 30**. 🔴 **Conferir
  a fila de 14/10**: quantos vieram, e se o topo de Esportes (suplemento) e de
  Beleza (papel higiênico) não está só enchendo de lixo.
- **7 produtos cadastrados (ids 53 a 59, são 59; 56 na vitrine):** Havaianas Top branco
  (`Moda`), Casio W-59, G-Shock GA-2100-4A e Redmi Watch 5 Lite (`Relógios`),
  Cicaplast B5+ 40 mL, Anthelios FPS 80 e escova rotativa Mondial ERB-01
  (`Beleza`). A escova Britânia perdeu o `so_no_canal`. Links gerados por mim
  no Linkbuilder, os 7 de uma vez.
- 🟢 **Comissão lida na barra "GANHOS" da página, logado:** **16%** em chinelo,
  dermocosmético e escova; **12%** no G-Shock. Confirma a tabela de 24/09.
- 🔴 **Só entra produto de CATÁLOGO (id sem hífen) — PROVADO em 13/10.** Ele
  pediu para destravar anúncio avulso; cadastrei 3 ocultos (Kappa Park
  `MLB-4049279695`, kit Lupo `MLB-1010954920`, Havaianas Power
  `MLB-1858445728`, todos de loja oficial) e rodei o workflow à mão (#45):
  **`/items/{id}` respondeu 403 `access_denied` nos três.** A API não deixa o
  nosso app ler anúncio de terceiro. Os três saíram do catálogo no mesmo dia.
  Os `meli.la` existem: `1heBuRd` (Kappa), `25PTriH` (Lupo), `31sutnG`
  (Power) — estão na lista de recomendações do perfil. `MLBU…` o robô nem
  conhece. **Não tente de novo por `/items/`.** Roupa só entra se tiver página
  `/p/MLB…`, ou se ele aceitar produto sem conferência diária (decisão dele,
  pendente — contradiz o nome do site).
- 🟢 **Um produto com erro não derruba mais a rodada** (`conferir-precos.ts`,
  `MAXIMO_DE_FALHAS_ISOLADAS = 3` e 10% do catálogo): falha isolada vira
  `::warning::Não conferido` na Action e o resto publica. Provado na rodada
  #45: 3 falhas, e os commits de preço e histórico saíram. ⚠️ A #45 terminou
  vermelha mesmo assim — pelo que o workflow mostra, é o `gh pr create` da
  segunda rodada do dia (o PR do branch `robo/precos-2026-10-13` já existia);
  **não li o log para confirmar**.
- 🟢 **O robô leu os 7 de catálogo na mesma rodada** e já corrigiu preço:
  Mondial R$ 132 (de R$ 258), GA-2100 R$ 403, W-59 R$ 115,66, Redmi R$ 309.
- ⚠️ **`foraDoIndice()`** (`src/lib/produtos.ts`): categoria `Moda` e
  `so_no_canal` ficam com `noindex` e fora do sitemap (sem ficha de
  fabricante). `Beleza` e `Relógios` indexam. Medido no dev local.
- ⚠️ **Havaianas Slim reprovado:** a página só mostrava o preço do Pix
  (R$ 37,92), sem o "em outros meios". E o Havaianas Top tem "Tamanho:
  Escolha" — é o risco do `results[0]`; **conferir no robô de 14/10** se ele
  segue `disponivel` e com preço perto de R$ 36.
- **Ler a página do Meli em lote, o que funcionou:** navegar, extrair por JS
  e acumular em `sessionStorage`; no fim, trocar o `body` por um
  `<article><pre>` com o JSON e ler com `get_page_text` (o retorno do
  `javascript_tool` corta em ~1.000 caracteres). 12 páginas, sem CAPTCHA.
- 🟡 **Indexação de 13/10: a cota cortou no 5º pedido** (aviso "A cota foi
  excedida" lido na tela; os pedidos de 12/10 contam na mesma janela).
  **Aceitos (4):** `/guia/monitor-full-hd`, ficha do micro-ondas, G-Shock
  GA-2100 e Redmi Watch 5 Lite. 🔴 **Pedir em 14/10 (5):** Casio W-59,
  Cicaplast, Anthelios, escova Mondial e escova Britânia (deixou de ser
  `noindex`). As 9 respondiam 200 sem `noindex` em produção. ⚠️ A ficha do
  micro-ondas apareceu como "o Google não reconhece o URL", não mais
  "cópia" — lido uma vez só.
- 🔴 **Não feito em 13/10:** os **7 suspeitos** do robô do dia (não conferidos
  — a vitrine está com o preço de ontem neles). **Decisão dele pendente:**
  cor da etiqueta de `Moda`, `Beleza` e `Relógios` (saem no cinza de reserva).

## Onde paramos — 12/10/2026

🟢 **Resumo da sessão de 12/10, para quem chega sem memória** (ele limpou a
conversa em seguida). O catálogo tem **52 produtos, 48 na vitrine**, 10
comparativos e **6 guias de categoria** (5 novos, perenes). Feito no dia:
- **Indexação:** 7 pedidos refeitos + 4 guias novos; a cota cortou no 12º.
  🔴 **Pedir amanhã:** `/guia/monitor-full-hd` e a ficha
  `/produto/micro-ondas-electrolux-mto30-20l-220-v-mlb6309816`.
- **Guias perenes** de ar 9k e 12k, monitor, fone e controle, e o campo
  `substituto` (ver "Endereço perene").
- **Home:** só 3 atalhos no topo e os guias em seção depois da vitrine (ver
  "A home no celular"). Ele confere no monitor e no celular.
- **Preços:** robô de 12/10 disparado à mão às 15h52 (o agendador não tinha
  rodado). Mixer a R$ 92; DualSense segue falso positivo; Moto G67 caiu 20%
  de verdade (R$ 1.068,87, loja oficial) — **bom para o canal**.
- **Micro-ondas Electrolux MTO30 20 L 220 V** cadastrado (id 52).
- **Instagram:** restrição de links até 10/11; nome voltou a
  `verificadoagorabr`. Duas opções de bio foram entregues no chat e se
  perderam com a limpeza — se ele pedir, gerar de novo (só o campo "Bio",
  nunca "Links").
- **Não regerado:** `data/posts.json` e `data/pins.json` (texto velho do
  P30i). **Não provado:** a causa das 3 páginas "cópia" (ler o HTML
  rastreado, com a página recarregada e uma inspeção só; reinspecionar ~17/10).
- **Pendências dele, sem resposta:** como enxugar este arquivo; apelação do
  Instagram e conferir o Metricool; ocultar o Elgin 12k?; regra da Philco;
  A36 preto × verde; cor da etiqueta `Ar-condicionado`; Shopee.

### O estado de 10/10, que segue valendo

**Em 10/10 o catálogo tinha 51 produtos (47 na vitrine) e 10 comparativos.** Ocultos de
propósito: SSD SanDisk (importado), A36 preto e o suporte de monitor. Só no
canal: a escova Britânia. Entre 29/09 e 08/10 entraram o Moto G67, o
ventilador Britânia, **7 ar-condicionados** com 2 comparativos, o monitor
Fmaxx, o **iPhone 17** e o **iPhone 17e**.

**Em 10/10 entraram o Galaxy A57 5G e o mouse Redragon Cobra M711**, do garimpo
de 08 a 10/10. Reprovados na mesma triagem, com o motivo: **AOC 22" 120 Hz**
(o garimpo viu R$ 376; no dia custava R$ 470, 5% de desconto), **LG 20" HD+**
(R$ 285 virou R$ 348,50; "de" de R$ 833 inflado; ficha diz painel TN com 178°
de visão), **ViewPro 19"** (marca sem ficha) e o **Moto G17 de outra cor**
(duplicata). Fonte nova: a ficha de celular Samsung abre pelo Chrome em
`samsung.com/br/smartphones/galaxy-a/<modelo-cor-sku>/` — a URL curta dá 404; o
`WebSearch` com `allowed_domains: samsung.com` acha a URL certa.

**Preços conferidos na página em 10/10** e aplicados à mão: DualSense R$ 478,
kit de potes de borossilicato R$ 94,90, LG Compact 9k R$ 2.289 e Elgin 12k
R$ 2.999,90. O **iPhone 17e saiu da vitrine por um dia** ("sem oferta ativa",
404 passageiro da API) e voltou sozinho na rodada manual.
- 🔴 **O DualSense vira suspeito todo dia** como "oferta importada" (API
  R$ 426,65): a página mostra vendedor nacional a R$ 478. É o falso positivo de
  `ehImportado` previsto em 23/09 — ignorar, ou afinar a função.
- ⚠️ **O Elgin 12k passou a ser vendido por conta de nome automático**
  (`LD20250502074418`) a R$ 2.999,90, sem desconto. Não é golpe de preço baixo,
  mas a oferta deixou de valer: **não anunciar no canal**; se continuar assim,
  perguntar a ele se oculta.
- ⚠️ **O LG Compact 9k do vídeo voltou a R$ 2.289** — o link mandado em 08/10
  citava R$ 1.889. Se o vídeo ainda não saiu, o preço da arte está velho.

**Em 12/10 entrou o micro-ondas Electrolux MTO30 20 L, só a versão 220 V**
(id 52, `MLB6309816`), do garimpo de 11/10, por decisão dele. São 52 produtos.
- ⚠️ **O garimpo trouxe o id do 127 V (`MLB6309815`) com o preço do 220 V**
  (R$ 435,18). Na página, o 127 V custava R$ 799 sem desconto, de outro
  vendedor (FERSTORE5); o 220 V, R$ 435,18 pela loja oficial Electrolux. Os
  dois catálogos mostram "Voltagem: Escolha" — é o risco do `results[0]` (a
  Philco). 🟢 **A rodada manual de 12/10 manteve R$ 435,18 e
  `disponivel: true`**: o robô lê o 220 V certo. O agendador não tinha
  rodado até 15h50; disparei à mão. Só o DualSense voltou suspeito (PR
  fechado, branch apagado).
- Nome, `descricao`, 1º parágrafo da `analise` e a 1ª pergunta dizem 220 V.
- 🔴 **Falta pedir a indexação da ficha** (cota de 12/10 estourada), junto
  com a do `/guia/monitor-full-hd`.
- Reprovado na mesma triagem: **monitor 3Green 20" HD 75 Hz** (marca sem
  ficha conferida, HD — mesmo caso do ViewPro e do LG 20").
- **Suspeitos de 11/10, conferidos na página:** mixer Elgin R$ 79,23 → R$ 92
  (aplicado); DualSense segue R$ 478 nacional (falso positivo de novo). O
  **Moto G67 caiu 20%** (R$ 1.339 → R$ 1.068,87) e o robô aplicou sozinho:
  conferido, loja oficial Motorola, sem importação. PR 55 fechado sem merge.
- ⚠️ O Linkbuilder recusou a URL curta `/p/MLB…` ("Não foi possível gerar
  seu link") e aceitou a URL completa com o slug. O repositório é
  `github.com/AlissonFurtado/verificadoagora`; branch de PR fechado se apaga
  com `git push origin --delete`.

🔴 **Instagram restringiu a conta em 11/10/2026: "Você não pode compartilhar
links", até 10/11/2026.** Motivo dado: a conta "pode estar enganando outras
pessoas para tirar dinheiro" (práticas comerciais proibidas).
- **Só existe uma conta, e é a oficial.** Ele trocou o nome de usuário de
  `verificadoagorabr` para `verificadoagora.com.br` (gostou da ideia de usar o
  domínio como nome, vista em outro projeto dele), e a restrição veio em
  seguida. Gatilho provável, não provado: nome em formato de domínio com
  "verificado" no meio — o desenho do golpe de selo de verificação.
- 🟢 **Decisão dele em 11/10: voltar o nome para `verificadoagorabr`.** É o
  nome que está nas "Contas vinculadas" do Meli (cláusula 1.3: mídia não
  declarada não gera pagamento) e no Metricool. **Quem troca é ele, no app.**
  🟢 **Feito no mesmo dia** (print do "Editar perfil": nome de usuário
  `verificadoagorabr`). ⚠️ Não conferido: se o Metricool segue conectado.
- A restrição é de **adicionar** links por 30 dias, e **o link da bio
  continua lá** (o perfil mostra "Links: 1"). 🔴 **Não remover nem editar esse
  link até 10/11**: se sair, não dá para pôr de volta. Voltar o nome não
  desfaz a restrição.
- A apelação existe: Status da conta → "Recursos que você não pode usar" →
  tocar em "Você não poderá adicionar links por 30 dias". É dele.
- A bio ainda diz "35 produtos" (são 47 na vitrine). Texto da bio não é link,
  mas mexer no perfil durante a restrição fica para depois da apelação.
- **Não contornar**: nada de encurtador, outro domínio ou conta nova para
  postar o mesmo link — é o que transforma 30 dias em banimento.
- Contestar é dele (Status da conta no app). Enquanto durar: reel com o **ID
  do produto na tela** não precisa de link; o canal do WhatsApp não é afetado.

🟡 **O canal do WhatsApp segue com 2 seguidores** (visto em 01/10). Últimas
publicações: 5 em 29/09, 5 em 01/10 e 5 em 02/10 — **nada desde então**. O
número que importa continua sendo o de seguidores: divulgar muda, publicar
mais não.

🔴 **Ele pediu para enxugar este arquivo (05/10) e ficou de pensar em como.**
Tem ~2.500 linhas e ~150 KB, uns 45 mil tokens por sessão. As três opções
postas: **(a) dividir por assunto** — este arquivo com ~300 linhas (retomada,
regras de toda sessão, índice) e o resto em `docs/` lido sob demanda
(recomendada: não perde regra e corta ~85% do custo); (b) dividir e condensar;
(c) cortar aqui mesmo para ~700 linhas. **Não mexa sem ele escolher** — e
pergunte logo no começo da próxima sessão.

### O que fazer na próxima sessão, em ordem

| O quê | De quem é |
|---|---|
| 🔴 **Conferir o robô**: existe commit `Preços de <hoje>` na `main` depois das ~15h? Algum produto **cadastrado ontem** virou `disponivel: false` ("sumiu do Meli")? Suspeito do dia: conferir na página do Meli e aplicar à mão (preço + ponto de hoje no `historico.json`); fechar o PR sem merge e apagar o branch (`/pull/N` → `Close pull request` → `Delete branch`, por JS pelo texto do botão) | Minha |
| **Indexação**: 🟢 **a fila zerou em 08/10** — tudo o que estava fora do índice foi pedido. Falta só **reconferir em ~1 semana** quais entraram, e pedir toda página nova no dia em que ela nasce (a cota é de ~11 pedidos por dia) | Minha |
| 🔴 **Canônica do cassino**: 3 páginas apareceram como "cópia" de sites sem relação com a gente. A `/black-friday` **já voltou** (indexada, relida em 04/10). Faltam o guia de controle de videogame (última leitura 18/09) e a ficha do micro-ondas (leitura de 02/10): **reinspecionar as duas** e ver se saíram do estado de cópia. Ver "páginas nossas como cópia de sites alheios" | Minha para conferir; **dele** a decisão de denunciar |
| 🟢 **Fichas "no Google, mas com problemas"**: era a nota sem contagem (`aggregateRating`), tirada do JSON-LD em 08/10. **Rodar o teste ao vivo de uma ficha com nota** e confirmar que "Snippets de avaliação" sumiu | Minha |
| 🟡 **Samsung WindFree 12k**: caiu de R$ 3.051,58 para R$ 2.473,99 em 08/10, em duas rodadas do robô (−8% e −12%, nenhuma bateu a trava de 15%). **Não foi conferido na página** — conferir vendedor e origem antes de anunciar no canal | Minha |
| **Vídeo**: em 08/10 ele pediu dois links para **outro agente dele** criar um vídeo. Mandei as fichas do **iPhone 17** (ID `HDDAJQ-JMUD`) e do **LG Compact 9k** (R$ 1.889, queda de R$ 400 conferida na página). O ID do LG não foi buscado. Perguntar se o vídeo saiu e onde foi publicado | **Dele** |
| **Conferir no celular**: o card compacto da vitrine (04/10), a galeria dos dois iPhones (05/10) e a `/entrar` nova (08/10) — tudo foi medido numa `iframe` de 390 px, não num aparelho | **Dele** |
| **Enxugar o `CLAUDE.md`** — escolher entre as três opções acima | **Dele** |
| **Shopee**: cadastrar dados bancários e fiscais no painel (PF ou PJ). A comissão só é paga 60 dias depois da aprovação | **Dele** |
| **Philco vira suspeita todo dia** com o preço certo na vitrine (`results[0]` não é a buy box). Ignorar até ele decidir mudar a regra para todos | **Decisão dele** |
| **A36 preto (oculto) × verde (visível)**: em 23/09 o oculto estava mais barato. Reconferir os dois preços e perguntar qual fica | **Decisão dele** |
| 🟢 **Guias perenes de ar-condicionado (12/10)**: `/guia/ar-condicionado-12000-btus` e `-9000-btus`, mais `monitor-full-hd`, `fone-de-ouvido` e `controle-de-videogame`. 🔴 **Falta pedir a indexação de `/guia/monitor-full-hd`**: a cota cortou no 12º pedido de 12/10. As outras quatro foram pedidas no dia; reconferir em ~1 semana. Ver "Endereço perene" | Minha |
| **Comparativo iPhone 17 × 17e** — oferecido em 05/10; a Apple publica a ficha completa dos dois | Só se ele pedir |
| **Cor da etiqueta `Ar-condicionado`** no card (hoje sai no cinza de reserva) — perguntado em 04/10, sem resposta | **Decisão dele** |
| **Instagram**: a conta está parada desde setembro. O que ele pesquisou comigo em 07/10 está em "Instagram: link de compra" abaixo | **Dele** |
| Reddit, e o resto que já era dele | **Dele** |
| ⚠️ **CAPTCHA do Meli**: não apareceu de 23/09 a 08/10, com 2 s entre navegações e até ~12 por sessão | — |

### Instagram: link de compra (pesquisado em 07/10/2026)

Ele mandou o print de um reel patrocinado com botão "Comprar agora", "ID: …
no mercado livre" na tela e "comenta EUQUERO" na legenda. São três mecanismos:

- **Botão "Comprar agora"**: só existe em **anúncio pago**. Aquele era anúncio
  de parceria com o Mercado Livre assinando junto — o programa de criadores
  pede **mais de 10 mil seguidores** (fonte: blog, não o Meli). Sem convite, o
  botão sai impulsionando um reel próprio pelo Meta Ads.
- **ID na tela**: de graça, e leva ao mesmo destino do link (ver "O contrato do
  `produtos.json`"). ⚠️ Falta provar que a venda pelo ID conta comissão.
- **Comentário → link por DM**: automação pela API oficial. **ManyChat grátis
  caiu para 25 contatos/mês** (era 1.000 até mar/2026; pago desde US$ 14);
  CreatorFlow diz 500 DMs/mês grátis; Youze (brasileira) desde R$ 29,90. Os
  dois últimos números vêm do site dos próprios fabricantes.
- **Minha recomendação, dada a ele:** o gargalo é o vídeo, não a ferramenta —
  um reel no formato "mão + produto real" com o ID na tela, e automação só
  quando um vídeo começar a receber comentário.

### O que entrou de 29/09 a 08/10, e onde está escrito

| O quê | Seção |
|---|---|
| 🔴 **O robô caiu 2 dias** por um `confere_por` que dava 403 (30/09–01/10) | "pega o vendedor errado" |
| 🔴 **Id de catálogo com 10 dígitos** era lido como anúncio: iPhones 3 dias fora da vitrine | "Id de catálogo com 10 dígitos" |
| 🔴 **Um cassino como canônica** de páginas nossas no Google | "um site de apostas é a canônica" |
| 🔴 **Comparação de preço escrita envelhece** ("mais barato da tabela") | "Nicho de ar-condicionado" |
| 🟢 **Foto na prévia do WhatsApp**: só enviar com a foto carregada | "Publicar no canal" |
| 🟢 **Card compacto no celular** e **como medir layout por `iframe` de 390 px** | "A home no celular" |
| 🟢 **`imagens`**: galeria de fotos na ficha | "O contrato do `produtos.json`" |
| 🟢 **ID do produto** e a barra "GANHOS X%" (comissão por produto, na fonte) | idem |
| 🟢 **`/entrar` reescrita**: canal + busca + destaques + barra fixa | "`/entrar`" |
| 🟢 **Laço de indexação** que funciona, e a cota de ~11 pedidos/dia | "Pedidos de indexação" |
| 🟢 **GitHub liberado na extensão**: dá para fechar PR e rodar workflow | "O robô de preços" |
| 🟡 **Shopee aceita** como segunda loja; nada integrado ainda | "Shopee" |
| **Fontes de ficha**: Apple abre completa por `WebFetch` (`apple.com/br/<modelo>/specs/`); ar-condicionado, ver o nicho | "Nicho de ar-condicionado" |

### O que a conferência de 23/09 ensinou

Os 5 travados foram conferidos um a um na página navegada e aplicados à mão
na `main` (o PR do dia seria mergeado em cima de um catálogo velho, a regra de
sempre). O que ficou de regra:

- 🟢 **A trava `ehImportado()` pegou o primeiro caso real: o GameSir G7 SE.**
  Ela nasceu do SanDisk em 19/09 sem poder ser testada contra a API, e
  funcionou — a página confirmou *"Envio de EUA"*, *"o produto vem do exterior
  e será importado"* e *"este preço não inclui impostos de importação"*.
  ⚠️ **Decisão dele, diferente da do SanDisk: manter na vitrine com
  `importado: true`**, e a `analise` ganhou um parágrafo final avisando da
  importação — o card não tem onde dizer isso, então quem só vê a vitrine não
  fica sabendo. Se a dúvida voltar, é este o precedente: ocultar não é
  obrigatório, avisar é.
- 🔴 **Suspeito abaixo de 15% quase sempre é importado, não variação.** Dos 4
  do dia, dois (GameSir +2,4%, DualSense −0,7%) não bateriam no limiar de
  variação — só o caminho `virouImportado` explica. **Variação pequena num
  suspeito é sinal de troca de origem do vendedor, e a página resolve em uma
  navegação.** (O DualSense deu falso positivo: a página não tinha pista
  nenhuma de importação e o preço estava certo. Se ele repetir todo dia, é em
  `ehImportado` que se afina.)
- ⚠️ **Preço da API × preço da página divergem em centavos a reais**, e isso é
  normal (GameSir: API R$ 256,90, página R$ 269,05; DualSense: R$ 428,59 contra
  R$ 430). **Aplique o da API onde as duas veem a mesma oferta** — o robô
  reescreveria o outro na manhã seguinte. A exceção é produto que a API não
  enxerga, como o OPPO.
- 🔴 **O bug do snippet de produto não tinha sido corrigido no comparativo.**
  Em 16/09 o guia foi consertado (aparelho de fora vira `Thing`, não `Product`
  sem `offers`) e **a mesma linha continuou errada em
  `comparativo/[slug]/page.tsx`**: o `about` transformava *toda* coluna em
  `Product` sem preço, inclusive as do próprio catálogo. O Search Console
  acusou **"Snippet do produto: 5 itens inválidos detectados"** na inspeção do
  comparativo do A07 — somando os 8 comparativos eram ~31 entidades inválidas.
  Corrigido em 23/09, medido com o dev local em todos eles: zero.
  ⚠️ **A lição é sobre a correção, não sobre o schema:** quando um defeito
  desses for corrigido num tipo de página, **procure o mesmo `'@type':
  'Product'` nas outras** — `grep` resolve em segundos e foi o que faltou.
- ⚠️ **O estado de indexação se lê antes de pedir.** Das 4 páginas de 20/09,
  duas já estavam indexadas — e o próprio Google diz que reenviar não muda a
  prioridade. **Inspecione, leia "Indexação das páginas", e só peça para
  "Rastreada, mas não indexada" ou "Detectada".**
- ⚠️ **O campo de inspeção não tem `placeholder`, e sim `aria-label`**
  ("Inspecionar qualquer URL de verificadoagora.com.br"). Procurar por
  `placeholder` devolve "campo não achado". O resto do laço de 20/09 continua
  valendo, com uma correção: **`Escape` dispensa o balão** e o teste em tempo
  real leva **~1 minuto**, não 9 segundos — e durante ele `Indexação
  solicitada` some e volta, então confirme por screenshot, não por regex.
- 🟢 **`verificadoagora.vercel.app` responde 200 e aparece no Search Console
  como "Página de referência"** — mas declara `canonical` para o domínio
  próprio e aponta o sitemap de lá. **Não é conteúdo duplicado; não mexa.**
- 🔴 **`git fetch` antes de commitar, sempre — e confira o log.** Nesta sessão
  o primeiro fetch devolveu um `origin/main` velho (sem a rodada do robô do
  próprio dia) e o commit saiu em cima dele. **O sintoma é o mesmo do container
  da rotina das 8h**: `git log --oneline -3 origin/main` contra o que este
  arquivo diz que já está no ar. Refazer o fetch e reaplicar resolveu sem
  perda, porque as mudanças eram pontuais e estavam num script.

### 🔴 O preço que está certo e engana: oferta importada (19/09/2026)

**O caso que criou a regra.** O robô viu o SSD SanDisk cair de R$ 945 para
R$ 562,18 (−40%) e segurou como suspeito. Conferido na página do Meli, o
número estava certo e o sentido, errado: **a buy box tinha passado para um
vendedor dos EUA**. A própria página avisa *"Envio de EUA… o produto vem do
exterior e será importado. Estará sujeito à declaração de importação e a
impostos federais e estaduais"* — e a **loja oficial da SanDisk, nacional,
cobrava R$ 1.215 no mesmo dia**. Quem clicasse no nosso "R$ 562,18" pagaria
perto do dobro.

**A regra que fica:** *queda grande sem motivo aparente = confira a origem do
vendedor antes de aplicar.* É irmã da regra do preço no Pix — nos dois casos a
API devolve um número real que não é o que a pessoa paga.

O que foi feito, e por quê:

- **O SanDisk saiu da vitrine** (`oculto: true`), por decisão dele. O card não
  tem espaço para explicar imposto de importação, e a alternativa (manter o
  preço e avisar só na ficha) deixaria a vitrine e o canal mentindo. A ficha
  ficou no ar com um parágrafo final explicando a decisão e a data.
- **O preço foi aplicado assim mesmo** (R$ 562,18), com `preco_original` igual
  e **`desconto_percentual: 0`** — a buy box não anuncia desconto nenhum, e
  53% contra o preço antigo seria desconto inventado. ⚠️ A ficha sempre mostra
  o riscado e o selo "% OFF", então 0% é o único valor honesto ali.
- **Campo `importado` no produto** (`src/lib/produtos.ts`): a curadoria dizendo
  "eu sei, e a análise explica". Marcado, o robô para de avisar sobre ele.
- **Trava no robô**: `ehImportado()` em `src/lib/meli.ts` lê `tags`
  (`cbt_item`, `international_delivery`), `international_delivery_mode` e o
  país do `seller_address`. Qualquer pista positiva basta — errar para "é
  importado" custa um PR a conferir; errar para o outro lado põe preço falso
  na vitrine. Em `conferir-precos.ts`, oferta importada que o produto ainda
  não admite vira **suspeito mesmo sem o preço ter mudado**, e o corpo do PR
  passa a dizer o motivo.
- ⚠️ **A trava não pôde ser testada contra a API real** — rodar o robô nesta
  máquina invalida o refresh token da Action. As pistas vieram da documentação
  e da página. **Se um importado passar batido, é em `ehImportado` que se
  acrescenta a pista que faltou.**
- 🔴 **O PR 17 deve ser fechado sem merge**: o branch é anterior aos produtos
  novos e mergear apagaria os publicados em 18–19/09. O valor dele já está
  aplicado à mão na `main`.

### O que o canal ensinou ao publicar as 5 de 19/09

O método do clipboard (`Set-Clipboard` + `ctrl+v`) continua sendo o que
funciona, com duas correções medidas nesse dia:

- 🔴 **`Get-Content` sem `-Encoding UTF8` estraga acento e emoji** no
  PowerShell 5.1 — "PREÇO" virou "PREÃ‡O" no clipboard. Sempre
  `Get-Content -Raw -Encoding UTF8`.
- 🔴 **`\r\n` do Windows vira quebra dupla no editor do WhatsApp.** A primeira
  colagem saiu com linhas em branco a mais. Normalize antes:
  `(Get-Content …) -replace "`r`n","`n"`.
- ⚠️ **O `innerText` do campo infla as quebras** (mostra `\n\n\n\n\n` onde há
  uma linha em branco só): **não dá para conferir formatação por ele**. Use
  `replace(/\n{2,}/g,'\n')` para conferir o *conteúdo*, e um screenshot para
  conferir o *espaçamento* — comparado com uma mensagem já publicada.
- ⚠️ **Clicar no item do canal por JS não abre**: o WhatsApp ignora `.click()`
  na lista lateral. Tem que ser clique real (`computer`).
- 🔴 **E o clique por `ref` também não abre** (medido em 20/09): o `find`
  acha o botão "Canal Verificado agora", o clique é aceito e o campo de
  mensagem não aparece. **O que funciona é clicar por coordenada em cima do
  nome do canal** — por volta de `(170, 117)` com a lista no topo. Clicar mais
  à direita, na área do item, também falha: seleciona sem abrir.
- ⚠️ **`.message-out` não encontra as mensagens do canal** — o seletor devolve
  0 mesmo com tudo publicado. Para confirmar que saiu, o screenshot é a prova.
- **Volume:** ele pediu "publica as que faltam" (22) e escolheu **5**, depois
  do aviso de que 22 notificações num canal de 1 dia é o que faz gente
  silenciar ou sair. O ritmo de 5/dia do script continua valendo.
