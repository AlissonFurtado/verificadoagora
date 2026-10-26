<!-- Parte do CLAUDE.md, separada em 25/10/2026 (decisão do Alisson: "dividir por assunto"). Texto movido sem cortes. -->

## 🟢 A virada de 18–19/09: canal no WhatsApp, e o reel como isca

**Decisão do Alisson em 18/09/2026**, depois de ver funcionar com ele mesmo:
entrou num grupo de ofertas por um reel e comprou. A conta que fechou o
argumento, pesquisada no mesmo dia:

| Caminho | Para render ~R$ 500/mês | Prazo |
|---|---|---|
| Site por busca | 3.000 a 6.000 visitas/mês | 3 a 6 meses (hoje: **0 cliques**) |
| Canal no WhatsApp | **200 a 300 pessoas engajadas** | semanas |

⚠️ **O reel que o converteu era "Patrocinado"** — anúncio, não alcance
orgânico. Ele mandou o print. Isso é permitido (mídia paga em rede social, de
conta cadastrada), **mas exige verba**; o caminho sem dinheiro é um reel por
dia e medir.

### O que os Termos permitem, lido na fonte em 19/09

- 🟢 **Grupo/canal de WhatsApp é Mídia prevista**: os Termos definem
  "Afiliados Divulgadores de Ofertas" como quem recomenda ofertas "via perfis
  de suas redes sociais, **grupos de whatsapp, telegram** e/ou sites".
- 🔴 **Cláusula 1.3**: só conta o que foi informado ao ML **antes**; o resto
  "não será considerado para fins de participação no Programa e **não gerará
  pagamento**". O painel tem o campo **"Otra red"** (onde o site já está) —
  **é lá que o link do canal precisa entrar, antes do primeiro link postado**.
- 🔴 **Cláusula 1.4**: proibido "oferecer qualquer recompensa ou benefício
  direto" a quem cumpre condição, **sorteio incluído**. A tática mais comum de
  encher grupo está vedada por contrato. O que resta é dar motivo real.
- **1.3.1**: mídia paga só em rede social (Instagram/TikTok/Facebook/Pinterest
  Ads), de conta do próprio afiliado já cadastrada. **Google Ads não conta.**

### Canal, não grupo — e por quê

Decidido em 18/09: **canal agora, grupo pequeno depois**. Grupo trava em 1.024
membros e **expõe o telefone de todos para todos**; canal é ilimitado, só o
dono publica e os seguidores não se veem. ⚠️ **O canal vai no número separado
do Alisson, não no pessoal** — canal fica amarrado ao número e não tem volta.

**Só ele pode criar o canal** (é o app dele, no número dele). Enquanto o link
não existe, `data/canal.json` fica com `link: ""` e a `/entrar` mostra "o canal
abre nas próximas horas" em vez de um botão morto.

### `/entrar` — a página de captação

`src/app/entrar/page.tsx`, `noindex`. É o destino do link na bio e dos reels.

🟢 **Reescrita em 08/10/2026, a pedido dele** ("o link da bio só tem um botão
grande para o canal; quem quer ver produto só acha no rodapé — me surpreenda").
Agora serve aos **dois caminhos**, nesta ordem: dois botões grandes (canal e
"ver as ofertas em destaque") → **busca rápida** "Qual produto você viu?"
(`busca-rapida.tsx`, com chips de categoria) → **oferta principal** com foto
grande → **carrossel** de até 8 destaques → "ver todos os N produtos" → os
números de prova. A **barra fixa** (`barra-dupla.tsx`) traz os dois botões de
volta quando os do topo saem da tela.
- **Destaque = queda medida, na ordem do canal**: caiu entre as duas últimas
  conferências, depois caiu na semana, depois maior desconto anunciado. Selo
  verde só para queda de **3% E R$ 15** (a barra da manchete do canal), sempre
  com a data ("Era R$ X em DD/MM"); o resto leva o "% OFF" vermelho da loja.
- Os cliques entram como `entrar-principal`, `entrar-carrossel`,
  `entrar-canal` e `entrar-canal-barra`.
- ⚠️ A barra fixa mede pela **posição na rolagem**, não por
  `IntersectionObserver`: com a aba do Chrome em segundo plano o observer não
  dispara, e é assim que a página é testada daqui (iframe de 390 px).
- Medido na iframe: sem rolagem lateral, os dois botões na primeira tela, a
  busca acha por nome sem acento e por categoria.

⚠️ **O modelo do mercado promete número; nós prometemos prova.** As landings
de grupo anunciam "+40.000 membros" — não temos isso e não vamos inventar. A
prova social daqui é **dado real**: quantos produtos, há quantos dias
conferimos, o que caiu hoje. Quem chega vê o serviço funcionando antes de
entrar.

### Os reels: como são feitos

- **`/reel/{slug}?cena=gancho|produto|prova|chamada`** — quatro cenas
  1080×1920 em `next/og`, mesma paleta do site.
- **`node scripts/reel.mjs <slug>`** baixa as cenas e monta um MP4 de ~15s com
  zoom lento e crossfade. Saída em **`rascunhos/reels/`**, fora do Git.
- 🟢 **`ffmpeg` foi instalado em 19/09** com
  `winget install --id Gyan.FFmpeg -e --scope user` — **não pediu
  administrador**. Se sumir do PATH, o script acha sozinho na pasta do winget.
- ⚠️ **O reel leva preço, ao contrário do pin e do post** — e por isso **a
  data fica gravada na arte**. Reel de oferta é do dia; o pin vive meses.
- ⚠️ **Sai sem áudio de propósito**: a trilha entra no app na hora de publicar,
  e o catálogo de áudios em alta é metade do alcance de um reel.
- ⚠️ **Renderizar é lento** (preset `slow`, ~2 a 4 min por vídeo, 1 GB de RAM).
  Gere em lote e em segundo plano, não um a um esperando.
- As legendas prontas ficam em `rascunhos/reels/LEGENDAS.md`.

### A fila do canal: 5 por dia

`node scripts/canal.mjs` escolhe os 5 do dia e escreve as mensagens;
`--marcar` registra como publicados. **Ele não publica nada** — publicar é o
Chrome logado, pelo método do clipboard (abaixo).

- **A ordem não é a do catálogo:** quem caiu de preço hoje passa na frente,
  depois quem está no menor valor já visto, depois o maior desconto.
- 🟢 **Uma das 5 vagas é reservada para produto novo** (desde 20/09/2026), e
  não é detalhe de ordenação. Disputando só por nota, a estreia perdia sempre
  — queda de preço vale 100 pontos, piso histórico vale 40, e um produto
  recém-cadastrado não tem nem um nem outro. Na prática **o canal nunca
  anunciaria novidade**, que é justamente o que o seguidor não descobre
  sozinho. Produto novo entra com o cabeçalho **🆕 NOVO NO SITE** e a frase
  que promete o serviço em vez de um desconto que ainda não dá para julgar:
  *"Entrou hoje no site. Daqui pra frente eu confiro o preço dele todo dia."*
- `data/canal-publicados.json` guarda **quem já foi e por quanto**. Produto só
  volta se o preço tiver mudado — mesma lógica da memória do garimpo, e pela
  mesma razão: repetir a mesma oferta é o que faz alguém sair do canal.
  🔴 **E só volta se tiver ficado mais barato** (desde 22/09): repetir para
  dizer que a oferta piorou não serve a ninguém.
- 🔴 **Produto que a última rodada não conferiu não entra na fila** (22/09).
  Suspeito fica com o preço de ontem e `verificado_em` atrasado — tolerável na
  ficha, que mostra a data do lado, inaceitável numa mensagem que grita "MENOR
  PREÇO QUE JÁ VI" no celular de alguém. O filtro compara `verificado_em` com
  `metadata.ultima_atualizacao`.
- 🔴 **Oferta importada avisa na mensagem, não só na ficha** (trava desde
  25/09). O GameSir G7 SE apareceu na fila por R$ 271,65 sem uma palavra sobre
  vir dos EUA: a `analise` explicava, mas **quem lê o canal decide pelo preço
  grande no celular e pode nunca abrir o link**. A série mostra a virada —
  R$ 249,90 com a buy box nacional, R$ 270,61 depois que passou para fora —,
  então sem o aviso o canal anunciaria o preço **pior** como se fosse a mesma
  oferta de antes. A mensagem agora carrega *"⚠️ Vem do exterior: o preço não
  inclui o imposto de importação"*. ⚠️ **Campo de curadoria que muda o sentido
  do preço precisa chegar à mensagem** — `canal.mjs` não lia `importado`
  nenhum até esse dia.
- 🔴 **Corrigir preço à mão cria uma manchete falsa no dia seguinte** (trava
  desde 24/09). O histórico grava o que o **site** mostra — e isso é certo —,
  então um suspeito destravado à mão aparece como queda enorme na manhã
  seguinte: em 24/09 o Aspirador gerou *"Caiu R$ 57,04 de um dia para o
  outro"*, e a loja já cobrava R$ 199,90 **desde 22/09**. O sinal é o preço de
  **anteontem ser igual ao de hoje**: o preço não foi a lugar nenhum, só a
  nossa página tinha se perdido. ⚠️ **Isto é irmão do bug de 22/09, não o
  mesmo**: lá o histórico gravava um preço que ninguém viu; aqui ele grava
  certo e a *comparação* é que mente.
- ⚠️ **"Menor preço que já vi" exige 3 pontos de histórico e que o preço tenha
  se movido alguma vez.** Com um ou dois pontos, qualquer preço é o menor.
  **E numa série plana todo dia é o menor**: em 24/09 o DualSense levaria o
  selo com oito pontos idênticos de R$ 430. O selo só diz alguma coisa quando
  existe um preço maior para comparar.
- ⚠️ **"Está acima do menor preço" só aparece se a diferença for de 3% **ou**
  R$ 20.** O G17 gerou *"Já vi por R$ 887,77 — hoje está acima disso"* com **um
  centavo** de diferença; agora diz que está praticamente no menor preço.
  ⚠️ **O `ou` daqui contra o `E` da manchete é assimetria de propósito, não
  esquecimento** (está comentado no código para ninguém "corrigir"): a
  manchete grita no celular de alguém e precisa de barra alta; este aviso erra
  para o lado seguro — avisar demais que o preço já esteve menor custa uma
  venda, esconder isso custa a confiança, que é o único ativo do canal.
- ⚠️ **Queda de R$ 6 não é manchete.** Só vira "🔻 CAIU HOJE" com **3% E pelo
  menos R$ 15** — as duas condições juntas, decisão do Alisson em 23/09/2026.
  O limiar era `3% ou R$ 20`, e o `ou` deixava passar exatamente o que a regra
  proíbe: liquidificador "Caiu R$ 6,00" (3,2%) e GameSir "Caiu R$ 7,99" (3,1%)
  em 21/09, JBL "Caiu R$ 10,91" (3,1%) em 23/09 — as três puladas à mão.
  Percentual sozinho não protege produto barato; valor sozinho não protege
  produto caro.
  ⚠️ **A rotina das 8h roda `canal.mjs` antes do robô do dia** (que costuma
  sair à tarde, ver "Toda manhã, não às 8h"), então o e-mail da manhã compara
  a véspera outra vez. O sinal é `data/historico.json.atualizado_em` ainda
  igual ao dia anterior. **Quem lê o e-mail da manhã confere essa data antes
  de confiar em qualquer "CAIU HOJE"** — e por isso a fila se gera depois
  das ~15h.
- Quando não houver nada novo, o script diz isso — e **é uma resposta
  legítima**, na mesma linha da `/quedas-de-preco` que admite quando nada caiu.

### Publicar no canal pelo WhatsApp Web (funciona, com um truque)

Feito pela primeira vez em 19/09/2026, com autorização explícita dele. O
WhatsApp Web Business está logado; Canais → "Verificado agora" → campo
"Digite uma atualização".

🔴 **O editor do WhatsApp recusa texto com quebra de linha injetado por JS.**
`execCommand('insertText')` cola tudo grudado numa linha só, e
`insertLineBreak` é ignorado — é Lexical, que intercepta os comandos. Digitar
com `shift+Enter` insere quebras a mais, imprevisível.

🟢 **O que funciona: área de transferência.** `Set-Clipboard` no PowerShell
com o texto (here-string `@'...'@`, que preserva acento e emoji) e depois
`ctrl+v` no campo. A formatação sai exata e o preview do link carrega sozinho
— e o preview usa a `og:image` da ficha, que fica ótimo.

🟢 **Plano B, e é melhor que o A: evento de `paste` sintético.** Descoberto em
21/09/2026, quando o `Set-Clipboard` passou a falhar com *"A operação de Área
de Transferência solicitada não foi bem-sucedida"* (alguma aplicação segurando
o clipboard; 5 tentativas com espera não resolveram, nem a API do WinForms,
nem `navigator.clipboard.writeText`, que dá `NotAllowedError` no contexto da
extensão). O que funcionou:

```js
const dt = new DataTransfer();
dt.setData('text/plain', txt);            // txt com \n de verdade
campo.dispatchEvent(new ClipboardEvent('paste',
  { clipboardData: dt, bubbles: true, cancelable: true }));
```

**A formatação sai idêntica à do `ctrl+v`** — quebra de linha, acento, emoji e
preview do link. É o mesmo Lexical que ignora `execCommand('insertText')`, mas
ele escuta o evento de `paste`. **Não depende do clipboard do Windows**, então
é o caminho mais confiável dos dois.

🔴 **A foto da prévia só carrega com a aba VISÍVEL** (medido em 01/10/2026).
Com o Chrome minimizado, coberto ou a tela bloqueada, `document.visibilityState`
é `hidden`: a prévia traz título e descrição, mas **a foto nunca chega** — e os
5 posts de 29/09 saíram assim. O print também trava (timeout de 30 s), que é o
sintoma que denuncia. **Antes de colar, confira `document.visibilityState ===
'visible'`; se não for, peça a ele para deixar a janela à vista.** Depois
disso, **só envie quando a foto estiver carregada**: o `img` com
`naturalWidth > 0` dentro do bloco cujo texto começa com `"{nome} por R$"`
(sobe 6 pais a partir do título). Leva 2 a 5 s com a aba visível. ⚠️ Em 02/10 a foto carregou mesmo com a aba `hidden` — o
estado oculto atrasa ou impede, não impede sempre. **Quem decide é a checagem
da foto, não a visibilidade.**

⚠️ **`canal.mjs` escreve "Ontem estava…" mesmo quando o ponto anterior é de
dias atrás** — em 01/10 o robô tinha ficado 2 dias fora e a manchete diria
"de um dia para o outro" sobre uma queda de 29/09. Corrigido à mão na
mensagem ("Em 29/09 estava…"). 🟢 **Corrigido no script em 02/10**: com
buraco no histórico a manchete passa a dizer "Em DD/MM estava…".

⚠️ **Confira o campo antes de enviar** (`innerText` do
`div[contenteditable][role=textbox]`): resíduo de tentativa anterior fica lá e
vai junto.

⚠️ **O WhatsApp avisa, no topo do canal, que "canais no seu país são
obrigados a identificar o conteúdo gerado por IA".** Vale para os reels se
algum dia usarmos vídeo gerado — a arte do `/reel` é gerada, mas mostra dado
real e não simula pessoa; se entrar vídeo de IA de verdade, tem que rotular.

### 🔴 Vídeo com IA: onde está a linha (19/09/2026)

Ele pediu um reel "com rosto gerado". **A resposta é não, e a razão é de
alcance, não de gosto:** em setembro/2026 o Instagram passou a **reduzir as
recomendações** de conteúdo com figura sintética que parece pessoa real e não
se identifica — some do Reels e do Explore para quem não segue. Quem usa IA só
na arte, na edição ou na legenda **não é atingido**.

- ✅ **Pode**: arte gerada, vídeo de mãos/objeto/tela, texto e legenda com IA.
- 🔴 **Não pode**: rosto sintético dando depoimento ("entrei nesse canal e
  economizei"). Junta dois problemas — alcance cortado e depoimento falso, que
  é o oposto do que a marca vende.

**O formato recomendado, que é o padrão do nicho e não tem risco:** close nas
mãos segurando o celular, vista de cima, luz de janela, sem rosto.

**Onde ele gera:** app do **Gemini** (Android/iOS), opção *Vídeo* — incluído no
Google AI Pro dele, **3 vídeos por dia, 720p, até 8 s**. Para projeto maior,
`labs.google/flow`. O prompt que funciona está no histórico de 19/09.

### Editar gravação de tela do celular (o que funcionou)

Ele grava a tela rolando o site e eu edito. Feito em 19/09/2026
(`scratchpad/editar3.py` é o molde; o resultado foi para
`rascunhos/reels/tela/`).

**A receita:** recortar 1168×2386 → `scale=1080:-2,crop=1080:1920`, cortar em
4 trechos, zoom crescente em cada um, legenda sobreposta, capa na frente com
crossfade. As legendas são **PNG desenhados com ImageMagick** (pílula
arredondada, Segoe UI Black, palavra-chave em `#38bdf8`) — muito melhor que o
`drawtext` com faixa preta dura.

🔴 **Cinco armadilhas do ffmpeg que custaram caro, todas medidas:**

1. **`zoompan` com `d` maior que 1 repete cada quadro** — em vídeo isso estica
   a duração: um trecho de 3 s virou minutos e o arquivo passou de **190 MB**.
   Para vídeo é sempre `d=1`, com o zoom em função de `on`.
2. **`fps` dentro do `zoompan`** faz o vídeo sair em câmera lenta quando a
   fonte é 60 fps. O `fps=30` vai **antes**, na cadeia do trecho.
3. **Vírgula dentro de expressão de filtro mata o comando** — no ffmpeg a
   vírgula separa filtros. Nada de `min(a, b)` dentro de `overlay=y=...`.
4. **Um stream de entrada só é consumido uma vez**: para usar o mesmo vídeo em
   4 trechos, `split=4` antes.
5. **PNG do ImageMagick Q16 sai em 16 bits** e o `xfade` recusa; converta com
   `-depth 8 PNG24:`. E **timebase diferente também derruba o `xfade`** —
   `settb=1/30` nos dois lados resolve. O sintoma é sempre o mesmo e não diz
   nada: *"Could not open encoder before EOF"*.
6. **PNG estático entra como um quadro só**: `fade` com alpha zera esse quadro
   e a legenda **some**. Precisa de `-loop 1 -t <duração>` no input.

### A rotina da manhã (8h)

**`trig_0183exgfjXFZgMU9ZKufsdyf`**, todo dia às **8h de Brasília**
(`0 11 * * *` em UTC). Criada em 19/09 às 4h e **movida para as 8h no mesmo
dia, a pedido dele**. Painel:
<https://claude.ai/code/routines/trig_0183exgfjXFZgMU9ZKufsdyf>

Ela roda `scripts/canal.mjs` e **manda por e-mail as 5 mensagens do dia
prontas para colar no canal**, escreve as `perguntas` que faltam em até 5
produtos, roda `npm run verificar` e commita se passar.

⚠️ **O container nasce sem `node_modules`** (medido em 19/09): `npm run
verificar` falha com `Cannot find module 'react'/'next'` se não rodar `npm ci`
antes — não é erro de tipo, é dependência nunca instalada. `npm ci` primeiro
resolve, leva ~10s.

🔴 **E às vezes nasce com a branch `main` local desatualizada** (medido em
22/09/2026): o `HEAD` do container estava numa versão recente e correta, mas
a ref local `main` (e `origin/main` em cache) apontava para um commit de
~16/09 — histórico sem ancestral comum com o `HEAD` atual, sinal de que o
repo já passou por uma reescrita de histórico em algum momento. `git fetch
origin main` mostra a verdade (`origin/main` real do GitHub), e como a
`main` local não tinha nenhum commit próprio de valor (era só a ref velha),
`git reset --hard origin/main` resolveu sem perder nada. **Sempre confira
`git log --oneline -3` contra o que o CLAUDE.md diz que já está no ar** antes
de commitar — se a data não bater, é isso.

🔴 **Ela não gera vídeo, e isso não tem conserto pelo lado dela**: roda na
nuvem, sem a máquina do Alisson, sem ffmpeg e sem o site local. Vídeo só sai
em sessão aberta, na máquina dele.

## Instagram: agora é o canal de volume

🟢 **Antecipado em 11/09/2026, por decisão do Alisson**, quando a apelação do
Pinterest foi recusada. O Pinterest era o volume previsto para novembro; sem
ele, sobravam fórum (que cabe no prazo mas depende do ritmo dele) e SEO (que
não chega a tempo). O Instagram entrou nesse lugar.

O que **não** mudou com a antecipação, e é o essencial:

- **Nada sai sem ele aprovar.** A regra da fila de revisão do Metricool
  continua valendo inteira — veja abaixo.
- **O destino é sempre uma página deste site**, nunca `meli.la`, nunca o link
  do Meli direto.
- **Declaração de afiliado em toda legenda.**
- ⚠️ **Pin não leva preço, e post também não** — pelo mesmo motivo: o robô
  muda o preço toda manhã e ninguém edita post publicado.

**O perfil é `@verificadoagorabr`**, já conectado ao **Metricool** desde
28/08/2026 (brandId `6800489`, fuso `America/Sao_Paulo`). Em 11/09 a fila
estava vazia — nenhum post agendado, nenhum publicado.

⚠️ **A arte do pin NÃO servia como estava.** `/pin/{slug}` é 2:3 (1000×1500),
o formato do Pinterest, e o feed do Instagram corta vertical em 4:5 — o rodapé
com o endereço do site sairia. A rota ganhou **`?formato=quadrado`**, que
devolve **1080×1080**: escolha do Alisson em 11/09/2026, por ser o único
formato que o Instagram nunca corta, e a conta é nova demais pra apostar num
recorte. Os dois formatos saem do mesmo arquivo, com as medidas em `MEDIDAS`
— formato quadrado não é o vertical espremido: a foto encolhe e os tipos
descem junto, senão o nome do produto empurra o rodapé pra fora.

⚠️ **Link em legenda não é clicável no Instagram.** O único link que o
aplicativo abre é o da bio. Por isso a legenda diz "link na bio" e o `destino`
fica só no JSON — escrever a URL no meio da legenda é pedir pro leitor digitar
à mão, que ninguém faz.

**Ele perguntou de novo em 12/09/2026 ("consigo colocar link no post?") e a
resposta ficou decidida: só a bio.** O mapa completo, pra ninguém refazer a
pergunta — legenda ❌, comentário ❌, bio ✅ (cabem até 5 links), **adesivo de
link no story ✅** (liberado pra qualquer conta desde 2021, sem mínimo de
seguidor), mensagem direta ✅. As duas alternativas reais foram postas na mesa
e recusadas: **story com adesivo de link** dá clique num toque só, mas dura 24h
e é mais um passo manual por dia; **vários links na bio** (fixo + produto do
dia) tem o mesmo defeito de trocar o link a cada post — conserta hoje e quebra
ontem. Fica a bio apontando pra `/instagram`, que já resolve por ordem de
`posts.json`. ⚠️ Não conferido: se o Metricool do plano grátis agenda story
**com** adesivo de link (a API não expõe campo pra isso — provável que o
adesivo só entre à mão na hora de publicar).

**O link da bio é `/instagram`** (`src/app/instagram/page.tsx`, no ar em
11/09/2026). As duas alternativas foram descartadas com motivo: mandar pra
home faz quem veio do post do G17 cair numa vitrine de quinze produtos e ter
que caçar; trocar o link da bio a cada post conserta hoje e quebra ontem,
porque o post de terça passa a apontar pro produto de quarta — e é trabalho
manual diário.

- **A ordem da página é a de `data/posts.json`**, a mesma em que os posts
  saem. O produto do post de hoje está sempre no topo sem ninguém editar nada.
- **`data-onde` é `instagram`**, não `vitrine` — `CardProduto` ganhou a prop
  `onde` pra isso. É o que responde "esse canal rendeu?".
- ⚠️ **`noindex`, e fora do sitemap.** É uma lista de produtos que já existem
  na vitrine: exatamente a página fina que o Google vem recusando neste
  domínio. Serve a quem chega pela bio, não à busca.

**`npm run posts`** (`scripts/posts.ts`, irmão de `pins.ts`) lê o catálogo e
escreve `data/posts.json`: legenda, arte quadrada, destino pra bio. 14 posts
em 11/09/2026. **Não publica nada.**

⚠️ **A rotação começa pelos celulares, e isso não é detalhe.** O perfil está
zerado: os primeiros posts é que dizem ao Instagram — e a quem chega — do que
a conta trata. Começar por cafeteira e aspirador faria o assunto da conta
nascer errado, o mesmo problema de tópico que tirou as categorias de fora do
foco do destaque na vitrine.

🔴 **A fila de revisão do Metricool não existe no plano gratuito.** Tentada em
11/09/2026: a API responde 403 *"Cannot get approval data on FREE user"*. O
mecanismo que ficou no lugar, e que protege a mesma coisa, é
**`autoPublish: false`** — o post fica agendado no horário certo, mas em vez
de publicar sozinho manda **notificação pro app do Metricool no celular**, e o
Alisson conclui com um toque. ⚠️ **Depende do app instalado**: sem o app, o
post simplesmente não sai. Se ele reclamar que um post não saiu, é a primeira
coisa a checar.

### 🔴 A notificação que não chega — e o "Sent" que mente

**Aconteceu no primeiro post, em 12/09/2026.** O G17 estava agendado pras 10h
com `autoPublish: false`; às 17h ele mandou print do Metricool mostrando faixa
verde **"Sent"** e perguntou por que não aparecia no Instagram. Não aparecia
porque nunca foi publicado: **a notificação não chegou no celular dele.**

⚠️ **`status: "PUBLISHED"` na API não quer dizer publicado.** Em modo
notificação o Metricool marca o post como enviado quando **despacha a
notificação**, e não tem como saber se o Alisson concluiu dentro do Instagram.
O `getScheduledPosts` devolvia `"status":"PUBLISHED","detailedStatus":
"Published"` pra um post que não existia em lugar nenhum. **Nunca leia esse
campo como prova de que saiu** — a única prova é o feed.

⚠️ **E não dá pra conferir o feed daqui.** `curl` em
`instagram.com/verificadoagorabr` devolve 200 com 625 KB de muro de login:
nenhum `og:description`, nenhuma contagem de post. Quem confere se o post
existe é ele, no aplicativo.

**O que fica pendente, e é a causa raiz:** a permissão de notificação do app do
Metricool no celular dele. Sem resolver, todo post agendado em modo
notificação morre igual. A saída, se não resolver, é `autoPublish: true` — mas
isso é decisão dele, porque troca "ele conclui cada post" por "o Metricool
publica sozinho", e a regra de nada sair sem ele ver é dele.

**O plano B que funcionou:** publicar à mão. A arte sai do próprio site
(`/pin/{slug}?formato=quadrado`, 1080×1080 — conferido, o `curl` devolve
`image/png` e o cabeçalho PNG diz 1080x1080) e a legenda sai de
`data/posts.json`. Mandei o PNG pelo `SendUserFile` e a legenda em bloco de
código, que é o que ele consegue copiar do celular.

**Dois posts agendados em 11/09/2026**, os dois celulares do catálogo:
G17 em 12/09 às 10h e A36 em 13/09 às 10h (fuso São Paulo). **10h é o melhor
horário medido** pelo Metricool para essa conta, em todos os dias da semana;
18h é o segundo.

⚠️ **A primeira semana parou em dois posts de propósito.** O catálogo só tem
dois celulares: do dia 3 em diante a rotação cai em aspirador, cafeteira e
controle, e o perfil nasceria falando de outra coisa — o mesmo problema de
tópico que tirou as categorias de fora do foco do destaque na vitrine. Decisão
do Alisson em 11/09, sabendo do risco de perfil parado. **Destravar depende do
terceiro celular**, que depende do garimpo (foco corrigido no mesmo dia) e de
ele gerar o link de afiliado no PC.

A arte é aceita pelo Metricool direto da URL com query string
(`?formato=quadrado`): ele baixa e re-hospeda em `static.metricool.com`. Não
precisa subir arquivo à mão.

Existe um plano de postagem diária escrito pelo Alisson — rotação de produtos,
logs, state em JSON. **Ele ainda não foi ligado**, e o primeiro passo não é
automação: é ter post que preste saindo pela mão dele.

A regra continua: post que
sai sozinho, sem o Alisson ver antes, não é aceitável: é publicação em nome
dele.

Reconfirmado em 07/09/2026, quando surgiu a ideia de postar automático. O
argumento que decidiu: se o robô também **escolhe** o produto, publicar
sozinho vira "um robô decide o que anunciar no seu nome e anuncia". São dois
riscos empilhados, não um. Aprovar a fila pelo celular leva segundos.
