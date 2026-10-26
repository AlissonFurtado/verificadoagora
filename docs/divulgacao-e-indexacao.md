<!-- Parte do CLAUDE.md, separada em 25/10/2026 (decisão do Alisson: "dividir por assunto"). Texto movido sem cortes. -->

## Divulgação: o plano até a primeira venda

Meta posta em 10/09/2026: **uma venda até 03/11/2026**. O gargalo nunca foi
catálogo, é visita — o site passou o primeiro mês no ar sem divulgação nenhuma.

| Canal | Prazo até render | Papel | Situação |
|---|---|---|---|
| **Fóruns / Reddit** | dias | Primeira visita, e o teste de se a página convence | aquecendo desde 10/09 |
| **Pinterest** | 2 a 6 semanas | Era o volume de novembro | 🔴 **morto por ora** — apelação recusada em 11/09, veja abaixo |
| **Google / SEO** | 3 a 6 meses | O ativo que compõe sozinho | sitemap + 1º guia, 10/09 |
| **Instagram** | meses | Antecipado do "fase 3" a pedido do Alisson | não começou |

⚠️ **SEO não chega a tempo de novembro, e isso está certo.** Com o Pinterest
bloqueado, quem ainda cabe no prazo é **fórum**. Não julgue o SEO pelo resultado
de novembro: é o único canal que não exige postar todo dia.

Cronograma original (semana 1 = 10/09): diagnóstico e fórum → Pinterest de pé →
volume, 1 comparativo/semana → Instagram → dobrar no que rendeu. **O bloqueio do
Pinterest tirou as semanas 2 a 4 do lugar.**

🔴 **Com a apelação recusada em 11/09, o plano até 03/11 ficou com dois canais e
meio**, e é preciso escolher o substituto em vez de esperar:

- **Fórum é o único que cabe no prazo.** Passa a ser a frente principal, não a
  primeira etapa. Depende do ritmo do Alisson: um comentário por dia, no
  máximo, pela regra 2 do sub.
- **SEO continua, e é o que compõe.** O formato que abre índice já está provado
  (guia e comparativo; ficha, não). É a frente que eu consigo tocar sozinho.
- 🟢 **O substituto escolhido é o Instagram, antecipado em 11/09.** Veja a
  seção "Instagram" — a fila de revisão do Metricool continua obrigatória.
- **A revisão humana do Pinterest foi pedida**, não é desistência: o rascunho
  do post na Business Community está em `rascunhos/pinterest-revisao-humana.md`.
  Se recusarem de novo ou não responderem em ~3 semanas, o canal morreu.
- ⚠️ **Os pins já prontos (`data/pins.json`, `npm run pins`, a arte em
  `/pin/{slug}`) não se perdem**: a arte 1000×1500 e o título "{nome} vale a
  pena?" servem igual em qualquer feed vertical. Só o destino muda.

### Regras que valem em qualquer canal

- **O destino é sempre uma página deste site**, nunca o link do Meli e **nunca
  `meli.la`** — encurtador em rede social é sinalizado como spam.
- **Fórum não é lugar de link solto.** Responde-se a pergunta de verdade,
  citando a página como fonte do preço. A skill `garimpar-foruns` acha as
  threads.
- ⚠️ **O sub é `r/CelularesBR`** (11,2 mil inscritos, ~10 pedidos de
  recomendação na faixa por semana). `r/celulares` não existe; `r/brasil` e
  `r/brdev` só dão menção solta de celular. Garimpado em 10/09/2026.
- **A conta do Reddit é `u/a_f_de_sousa`**, criada em 10/09/2026. Pessoal, não
  de marca: conta com nome do site entra marcada como anunciante e não
  consegue participar. A relação vai **declarada no texto** de todo comentário
  que cite o site — nunca escondida, que é o que o Reddit de fato bane.
  Convenção informal do Reddit: ~9 participações genuínas por 1 que cita algo
  seu. Por isso o aquecimento sem link antes.
- ⚠️ **Rascunho meu é ponto de partida, não texto final.** No aquecimento de
  10/09 o que o Alisson acrescentou foi o que funcionou: experiência pessoal
  ("comprei um de 128 GB porque era mais barato e me frustrei") vale mais que
  conselho bem escrito, e é o que ninguém copia de site de ficha técnica. Erro
  de digitação inclusive ajuda — texto perfeito demais soa a robô.
- ⚠️ **Regra 2 do sub é ban permanente por spam.** Um comentário por dia, no
  máximo, e declaração de afiliado na resposta. Circula `meli.la` por lá com
  upvote — não imite: é o que a comunidade pune quando percebe, e a nossa
  regra de nunca usar encurtador em rede social continua valendo.
- ⚠️ **O `WebFetch` não abre `reddit.com`** ("unable to fetch"). Conferido em
  11/09/2026. Ou seja: não dá pra checar o estado de uma thread sem a sessão do
  navegador dele — e a sessão do navegador é justamente o que leva 429. Na
  prática, **quem confere thread é ele, no celular**, antes de postar.
- ⚠️ **A API JSON do Reddit corta em ~30 chamadas seguidas, com 429.**
  Buscar termo × sub em laço queima a cota antes de achar qualquer coisa. Use
  poucas queries, 4 a 6 segundos entre elas, e filtre no cliente.
- 🔴 **Rajada de requisição no Reddit é risco da conta do Alisson, não meu.**
  Em 10/09/2026 o garimpo rodou ~80 chamadas em segundos pela sessão do
  navegador dele e levou 429. Foi só leitura — nenhum voto, nenhum comentário
  — mas é o padrão que os algoritmos marcam, e quem paga o shadowban é ele.
  **Leia devagar ou peça a página aberta.** Postar, votar e criar conta
  continuam sendo dele, sempre e à mão.
- ⚠️ **A resposta honesta às vezes não é o nosso produto** — e é ela que faz o
  link valer. Num pedido de celular para jogos, o G86 ganha do A36 na nossa
  própria tabela; dizer isso é o ativo. Comentário que só empurra o catálogo é
  o que queima a conta.
- **Declaração de afiliado em toda legenda**, não só no rodapé do site.
- **O placar é `oferta_clicada` com a propriedade `onde`**, cruzado com o painel
  do Meli. Canal que não mexe nesse número em duas semanas não está funcionando.
  ⚠️ Evento personalizado não aparece no plano Hobby (veja "Medição"): até virar
  Pro, o placar real é o painel do Meli.

### O que o domínio já viveu

⚠️ **O domínio não é novo.** De 23/01 a ~julho/2026 rodou aqui um **WordPress**
com 4 páginas de análise. Placar em 16 meses: **581 impressões, 3 cliques,
posição 11,1**. O Wayback não arquivou nada — o texto delas não é recuperável.

| Página antiga | Impressões | Hoje |
|---|---|---|
| `/analise-philco-32-roku/` | 227 | mesmo produto no catálogo → **301 ativo** |
| `/kabum-smart-700/` · `/a16-vale-a-pena/` · `/analise-hy320/` | 82 · 77 · 11 | não vendemos → 404, e está certo |

🟢 **O HY320 entrou no catálogo em 17/09 e a URL antiga foi resgatada**:
`src/app/analise-hy320/page.tsx` devolve 308 com `Location` para a ficha nova
(medido). São 11 impressões de volta. Restam `/kabum-smart-700/` e
`/a16-vale-a-pena/` em 404 — e continuam certas assim, até o dia em que
vendermos aqueles dois produtos.

⚠️ **Redirect só quando o destino é o mesmo produto.** Mandar quem buscava o
A16 para o A36 é soft 404 pro Google e mentira pro visitante.

⚠️ **O formato "{modelo} vale a pena" é medição, não teoria.** As consultas que
renderam foram `samsung galaxy a16 vale a pena`, `samsung a16 vale a pena em
2026` e `robô aspirador kabum smart 700 é bom` — com 4 páginas e zero
autoridade. É o alvo dos comparativos, e agora tem prova neste domínio.

⚠️ **E o índice de hoje confirma:** em 10/09/2026, **1 página indexada e 8
"rastreada, mas não indexada"** — todas fichas de produto de commodity. Não é
lentidão do Google, é recusa. **Mais produto no mesmo molde piora.** Quem abre
índice é comparativo e guia. **Página de julgamento ranqueia; ficha, não.**

### 🔴 O primeiro retrato de busca, medido em 17/09/2026

Lido no Search Console, janela de 28 dias. **É o número que diz onde o site
está de verdade**, e ele é duro:

| | |
|---|---|
| Cliques | **0** |
| Impressões | 26 |
| Posição média | 16,8 (página 2) |
| Indexadas | 12 · não indexadas 23 |

**Das 10 consultas listadas, 7 eram do `hrvidros`** — `vidraçaria em
parauapebas`, `box de banheiro`, `janelas de vidro`. ⚠️ **Essas somem do
relatório agora que o subdomínio migrou** (18/09): se as impressões caírem de
26 para ~3 na semana que vem, **não é queda nossa, é a mudança de endereço do
cliente**. Não interprete como regressão.

**As três consultas que são nossas dizem qual formato funciona:**

- `o que significa 256 gb no celular`
- `quantos gigas`
- `celular meu an500`

**Duas das três caem no guia de decisão de memória.** Nenhuma consulta caiu em
ficha de produto. É medição, não teoria: **o formato que traz gente aqui é o
guia que responde pergunta de especificação** — o mesmo que já tinha indexado
em ~1 dia. É por isso que os próximos dois guias escolhidos são de decisão.

⚠️ **O relatório atrasa dias.** Em 17/09 ele dizia "última atualização
13/09", e por isso os pedidos de indexação de 16/09 ainda não apareciam. **Não
peça indexação de novo nem conclua nada olhando o painel no mesmo dia** —
espere uma semana.

🟢 **Em 16/09/2026 o quadro virou: 12 indexadas** (era 1 em 10/09). Entraram
**os 4 guias** — inclusive os três de decisão, indexados em ~1 dia — e **6
fichas de produto**. Ou seja: ficha não é recusada para sempre; o que
destravou foi o site ganhar páginas de julgamento que linkam para elas
(`guias-relacionados`), mais o pedido de indexação à mão.

As 23 não indexadas de 16/09, e o que cada grupo quer dizer:

| Motivo | Quantas | O que são |
|---|---|---|
| Detectada, **nunca rastreada** | 9 | Fila do Google, não recusa. Inclui `/como-conferimos`, o **comparativo do A36** e a ficha do A36 |
| Rastreada, não indexada | 8 | Só 1 é página nossa de verdade: o **comparativo do G17** (rastreado em 15/09). O resto é lixo do WordPress antigo, o `hrvidros.`, a rota `/icon` e o apex em `http` |
| 404 | 5 | WordPress antigo. Está certo assim |
| Redirecionamento | 1 | O apex → `www`. Certo assim |

**Indexação pedida à mão em 16/09** para 5 URLs: comparativo do A36,
`/como-conferimos` e as fichas do Edge 60 Fusion, Realme C73 e OPPO A6t.
⚠️ **O primeiro pedido foi RECUSADO** com "problemas de indexação detectados
no teste em tempo real" — bastou clicar em *Ver o teste em tempo real* e pedir
de novo, que aceitou. Se recusar, é isso: rodar o teste ao vivo antes.

⚠️ **O atalho `?id=` da Inspeção de URL não existe** (dá 404 do Google). O
caminho é o campo "Inspecionar qualquer URL" no topo do Search Console.

⚠️ **Pedir indexação pelo Chrome funciona, mas o campo é teimoso** (medido em
18/09/2026, duas URLs pedidas com sucesso):

- **A primeira URL entra normalmente** clicando no campo e digitando. **A
  segunda não**: o campo ignora a digitação e a inspeção continua na URL
  anterior — e aí o botão vira "Solicitar novamente", que reenvia a **mesma**
  página. Confira sempre qual URL está na tela antes de clicar.
- **O que destrava**: preencher o campo por JS com o setter nativo de
  `HTMLInputElement.value`, disparar `input` e um `Enter` sintético. Depois
  disso a inspeção troca.
- **Clicar no botão por coordenada falha quando a página entra em zoom** (o
  mesmo defeito visto no GitHub). Clicar pelo elemento (`botao.click()`)
  resolve.
- 🟢 **A trava dos dois pedidos não é cota — era o modo de preencher o campo.**
  Em 20/09/2026 saíram **6 pedidos seguidos, sem recusa nenhuma**, usando o
  setter nativo em todas as URLs (não só na segunda) e este laço:
  **Dispensar o balão → setter + `input` + `Enter` → esperar ~10 s → achar o
  `SOLICITAR INDEXAÇÃO` pelo texto e chamar `.click()` no ancestral clicável →
  esperar ~9 s → conferir que a tela diz "Indexação solicitada"**. Nunca
  digitando, nunca por coordenada.
- ⚠️ **O `id=` da URL da aba mente**: depois de um pedido ele às vezes volta ao
  da inspeção anterior. **Não conclua nada por ele** — quem diz a verdade é a
  URL escrita acima do título "Inspeção de URL" (e um screenshot confirma).
- **Reenviar a mesma página não muda a prioridade dela**, segundo o próprio
  Google — o balão de confirmação diz isso em letras miúdas.

### 🔴 04/10/2026: um site de apostas é a "canônica" de duas páginas nossas

🟡 **Atualização de 08/10/2026 — não é alguém copiando o site.**
- A **`/black-friday` voltou**: relida pelo Google em 04/10 (dia do pedido),
  hoje "A página está indexada". Pedir novo rastreamento **resolve**.
- A **ficha do micro-ondas** tem como canônica do Google
  **`https://www.marcustheatres.com/`** — uma rede de cinemas dos EUA —, numa
  leitura de **02/10**, também com "canônico declarado: Nenhum". Um cassino e
  um cinema, sem nada nosso e em hospedagens diferentes (o cinema está na
  Cloudflare): **a hipótese de site de spam copiando a gente caiu.**
- O servidor devolve a página certa, com `canonical`, para navegador, para
  `curl` e para o user-agent do Googlebot (medido em 08/10).
- O **teste ao vivo** da ficha do micro-ondas em 08/10 diz "É possível indexar
  a página": hoje o Google a enxerga certo. A leitura ruim é a antiga.
- **Hipótese que sobra, não provada:** naquelas leituras o Google renderizou
  uma página de erro genérica (o texto padrão de erro do Next.js é idêntico em
  milhares de sites, e é o tipo de coisa que agrupa páginas sem relação como
  "cópias"). Para provar: na inspeção, **Ver a página rastreada → HTML e
  captura de tela** de uma URL que ainda esteja como cópia. ⚠️ O painel de HTML
  mostrou a página da inspeção **anterior** quando li por script — confira o
  `<title>` antes de acreditar nele.
- **O que fazer quando aparecer "Cópia sem página canônica selecionada pelo
  usuário":** pedir novo rastreamento e reconferir em alguns dias. Não é caso
  de denúncia de spam.

Na inspeção, **`/black-friday`** e **`/guia/vale-esperar-black-friday-controle-de-videogame`**
estão como **"Cópia sem página canônica selecionada pelo usuário"**, e na
`/black-friday` o **"URL canônico selecionado pelo Google" é
`https://www.747live.bet/`** — um cassino. A última leitura do Google é de
**18/09**, e ela registra "canônico declarado: Nenhum", embora a página declare
canônica própria desde 16/09 (conferido no HTML de produção em 04/10: as duas
apontam para si mesmas, `index, follow`).
- Visto de fora, `747live.bet` **não** espelha nada nosso (todo caminho dá
  "Page Not Found"). O padrão bate com **cloaking**: site de spam servindo
  cópia só para o IP do Google. **Não deu para provar daqui.**
- Feito: **novo rastreamento pedido para as duas** em 04/10.
- **A conferir em ~1 semana:** se a canônica do Google voltou a ser a nossa.
  Se continuar no cassino, o caminho é o **relatório de spam do Google** e/ou
  pedido de remoção por direito autoral — **decisão dele**.
- ⚠️ Vale inspecionar as outras páginas indexadas atrás de "canônica do Google
  ≠ a própria URL". O regex do laço não pegou esse campo (saía vazio); só a
  leitura da `/black-friday` feita à mão mostrou o domínio.

### Pedidos de indexação de 04/10/2026, e o laço que funciona

**Cota: o Google cortou no 11º pedido** ("cota foi excedida"). Pedidos aceitos
em 04/10: comparativos do Gree 9k, do Midea 12k e do G17 (este já estava
indexado — desperdício da 1ª versão do laço), `/black-friday`, guias de fone e
de controle, e as fichas dos ar-condicionados Gree, Midea e TCL.
`/guia/meu-pc-aceita-ssd-nvme` **já está indexado** (rastreado em 02/10).

**Segunda rodada, 05/10/2026 — a cota cortou no 12º pedido.** Aceitos (11):
iPhone 17, Elgin 12k, LG Compact 9k, LG Voice 12k, Moto G67, A36 verde, A17,
Fmaxx, monitor S3 24", SSD Kingston e micro-ondas. **Já estavam indexados**
(a inspeção poupou o pedido): Samsung WindFree 12k, A07, G06, ventilador,
monitor S3 27", placa-mãe e JBL.

**Terceira rodada, 08/10/2026 — a fila zerou, sem bater na cota.** Aceitos
(10): iPhone 17e, GameSir G7 SE, Roku, HY320, aspirador Electrolux, cafeteira,
mixer, liquidificador e os dois kits de potes. O GameSir T4 já estava indexado.
**Os dois comparativos de ar-condicionado estão indexados** (o do Gree foi
relido no próprio dia do pedido, 04/10; o do Midea em 06/10) — comparativo
continua sendo o formato que entra rápido. A ficha do iPhone 17, pedida em
05/10, ainda aparece como "o Google não reconhece o URL".

**Quarta rodada, 10/10/2026.** Pedidos aceitos: **Galaxy A57** e **mouse
Redragon** (as duas fichas do dia) e, de novo, a ficha do **iPhone 17**.
Reinspeção, sem pedir: **iPhone 17e indexado** (lido em 10/10) e **Moto G67
indexado** (06/10) — ficha nova entra em ~5 dias com o pedido.
- 🔴 **A ficha do iPhone 17 seguia como "o Google não reconhece o URL"** cinco
  dias depois do pedido de 05/10. Ela ficou `disponivel: false` de 06 a 08/10
  (o bug do id de 10 dígitos) e, com isso, **fora do sitemap** — o pedido
  antigo deve ter se perdido aí. **Produto que sai e volta da vitrine precisa
  de pedido novo.**
- 🟡 **Ainda como "cópia"**, sem nova leitura do Google: o guia
  `vale-esperar-black-friday-controle-de-videogame` (lido em 18/09) e a ficha
  do micro-ondas (02/10). Os pedidos de 04 e 05/10 não foram atendidos ainda;
  **reenviar não muda a prioridade** — reinspecionar por volta de 17/10.
- A ficha do Gree 9k (pedida em 04/10) segue "Detectada, mas não indexada".

**Quinta rodada, 12/10/2026.** O relatório "Páginas" (dados de 08/10) dizia
**47 indexadas, 31 fora** — eram 29 em 23/09. Toda página nossa fora do índice
já tinha pedido; reinspecionei as 18 e refiz 7 pedidos, todos aceitos: guia de
fone, Gree 9k, LG Voice 12k e mixer (pedidos de 04 a 08/10 que seguiam sem
leitura) e as três "cópias" (HY320, micro-ondas, guia de controle).
- **Entraram no índice:** Galaxy A57 (em 2 dias), Fmaxx, SSD Kingston e os
  dois kits de potes. **Seguem "Detectada":** aspirador Electrolux, cafeteira,
  GameSir G7 SE e Roku. **Liquidificador:** lido em 10/10 e "Rastreada, mas
  não indexada" (julgamento, não fila). iPhone 17 e mouse Redragon: sem
  leitura ainda.
- 🔴 **A "cópia" não é leitura velha: o HY320 foi lido em 10/10 e caiu nela.**
  Mesmo padrão — "canônico declarado: Nenhum", canônica do Google
  `marcustheatres.com`, "busca de página: com êxito". Ou seja, **o rastreador
  de indexação ainda recebe, às vezes, uma página sem o nosso `canonical`**,
  embora o teste ao vivo veja a página certa. São 3 páginas afetadas hoje.
  **Próximo passo, não feito:** abrir "Ver a página rastreada" de uma delas e
  ler o HTML que o Google guardou. ⚠️ Tentei em 12/10 e o painel devolveu o
  HTML do **Fmaxx** (inspeção anterior) — a mesma armadilha de 08/10; precisa
  ser feito com a página recarregada e uma inspeção só.
- A "Página de referência" dessas fichas é `verificadoagora.vercel.app/…`.
- 🟢 **Laço novo, mais simples** (`window.__insp(lista, pedir)`): com a aba
  **em primeiro plano** cada inspeção leva ~10–20 s e cada pedido ~40 s.
  ⚠️ O estado "O Google não reconhece o URL" às vezes é só a tela ainda
  carregando: o mixer saiu assim na 1ª passada e "Detectada" na 2ª. **Não
  conclua nada de um "não reconhece" lido uma vez só.**

🔴 **"O URL está no Google, mas tem problemas" era a nota sem contagem**
(08/10). A ficha declarava `aggregateRating` só com `ratingValue`; o Google
exige `ratingCount`, e o teste ao vivo acusava **"Snippets de avaliação: 1
item inválido"** em toda ficha com `avaliacao > 0` (24 das 49). Corrigido
tirando o `aggregateRating` do JSON-LD: não guardamos a contagem e a nota é
dos compradores do Meli, não nossa. A nota segue no texto visível. **Se alguém
quiser devolver a estrela ao resultado de busca, precisa guardar a quantidade
de avaliações junto** — e conferir a política do Google para nota de terceiro.

⚠️ **Dois achados da rodada de 05/10 — os dois explicados em 08/10** (a
cópia, na seção do cassino; o "tem problemas", logo acima):
- **A ficha do micro-ondas também está como "Cópia sem página canônica
  selecionada pelo usuário"** — é a 3ª página com o sintoma do cassino (ver
  acima). Novo rastreamento pedido. Não é mais caso isolado de guia.
- **5 fichas aparecem como "O URL está no Google, mas tem problemas"**
  (Samsung WindFree, A07, ventilador, placa-mãe, JBL): estão indexadas, e o
  "problema" costuma ser aviso de snippet de produto. **Abrir uma delas e ler
  qual é o aviso** antes de concluir qualquer coisa.

**Como o laço precisa ser, medido nesse dia:**
- 🔴 **A tela não limpa entre inspeções.** Ler o status logo depois do `Enter`
  pega o resultado da URL **anterior** — foi assim que o G17 (indexado) levou um
  pedido. O que funciona: esperar a URL do topo (a linha acima de "Inspeção de
  URL") ser a nova **e** o bloco do resultado mudar (até 15 s; se não mudar, o
  estado é igual ao anterior e a leitura vale).
- **Rode o laço dentro da página** (`(async()=>{...})()` guardando em
  `window.__log`) e acompanhe com `await` de ~42 s por chamada: uma chamada
  longa estoura o limite de 45 s do CDP, e várias esperas dentro de um
  `browser_batch` travaram.
- Cada pedido leva **~2 min** (inspeção + teste em tempo real); só inspecionar
  também leva ~1–2 min com a janela minimizada.
- **Com a aba em segundo plano os temporizadores quase param** (10/10): o laço
  fica minutos sem andar e as chamadas com `await` longo estouram os 45 s.
  **Um `screenshot` acorda a aba**; intercale print + espera curta em vez de
  `await` de 40 s, e leia `window.__log` em chamadas sem espera.

🔴 **Snippet de produto: o guia gerava 6 entidades inválidas** — todo perfil
virava `Product` sem `offers`, e 4 dos 6 aparelhos não são nossos, então não
têm preço. Corrigido em 16/09: aparelho do catálogo vira `Product` com
`offers`; **aparelho de fora vira `Thing`**. Vale para qualquer página nova
que liste aparelho que não vendemos.

⚠️ **"Detectada, mas não indexada" não é o mesmo problema que "rastreada, mas
não indexada".** A primeira é fila de rastreamento (o Google ainda nem olhou);
a segunda é julgamento. Só a segunda mede qualidade — e hoje ela está quase
vazia de página nossa.

⚠️ **Não confunda os dois motivos no painel.** No mesmo dia havia 12 páginas
não indexadas: 8 recusadas (as fichas, o problema real) e **4 "não encontrado
(404)", que são as páginas do WordPress antigo e estão certas assim**. Só o
primeiro número mede alguma coisa.

**Solicitar indexação à mão acelera página nova**: Inspeção de URL → Solicitar
indexação põe na fila prioritária. Feito para `/guia/celulares-ate-1500` em
10/09/2026, no mesmo dia em que ela subiu. Vale para toda página de julgamento
nova; repetir na mesma URL não adianta nada.

⚠️ **Parte das impressões não é desta página:** `vidraçaria parauapebas`, `box
banheiro` e afins somam 184 impressões e vêm do `hrvidros.` — do cliente. Há
busca real por vidraçaria em Parauapebas: informação do projeto **Vidraceiro**,
que some do relatório quando o subdomínio migrar.

### 🔴 Pinterest: bloqueado, apelação recusada

Perfil **Verificado Agora**, conta de empresa, site reivindicado em 10/09/2026
pela meta tag `p:domain_verify` no `layout.tsx` (⚠️ não apague: o Pinterest
reconfere, e sem ela a reivindicação cai).

**Mas nenhum link para `verificadoagora.com.br` pode virar pin.** O campo de
destino responde *"Esse link está bloqueado porque pode não atender às nossas
políticas de conteúdo"*; vale para o domínio inteiro, e `wikipedia.org` passa no
mesmo campo. Testado no comparativo do A36 com o gesto certo (foco no seletor de
pasta). **Apelação enviada em 10/09/2026** (Central de Ajuda → Apresentar um
recurso → O Pinterest bloqueou meu site), com print anexado, argumentando que o
WordPress de afiliados saiu em julho e o projeto atual é outro conteúdo.

🔴 **A apelação foi RECUSADA em 11/09/2026, 07:42 UTC** — e-mail de
`pinbot@legal.pinterest.com`, assunto "A suspensão do seu domínio": *"Analisamos
sua contestação e decidimos não desbloquear seu site (verificadoagora.com.br)"*.
Nenhum motivo, só o link das diretrizes de spam. O código da campanha no rodapé
do e-mail é `DOMAIN_BLOCKED_SPAM_APPEAL_REJECTED`. **Pare de reconferir o campo
de destino** — não é mais espera, é decisão nova.

⚠️ **A recusa é automática, e isso é padrão do Pinterest, não azar nosso.** Em
setembro/2026 a Pinterest Business Community tem dezenas de casos idênticos:
domínio reivindicado por DNS, bloqueado como spam, **duas** apelações recusadas
pelo mesmo texto genérico, sem motivo. O único caminho que essas pessoas
encontram é **postar na própria Business Community pedindo revisão humana**
(`community.pinterest.biz`, seção Help ou Creators). Segunda apelação pela
Central de Ajuda é o mesmo robô: não gasta o tempo dele.

⚠️ **Trocar de domínio não é contorno.** O bloqueio é do domínio, e subdomínio
dele herda — `hrvidros.verificadoagora.com.br` é a prova de que o apex manda no
resto. Levantar domínio novo só pra passar no Pinterest joga fora a
propriedade do Search Console e o pouco de autoridade que este já tem, por um
canal que ainda pode recusar o domínio novo pelo mesmo conteúdo.

⚠️ **A validação do link só dispara quando o foco vai pro seletor de pasta.**
Sair do campo clicando na imagem não checa nada — ler esse silêncio como
"aceita" produziu um diagnóstico errado por três URLs. Para testar: digite e
**clique no seletor de pasta**.

⚠️ **Não instale a "tag do Pinterest"** oferecida depois de reivindicar. É de
anúncio pago, que não existe aqui, e **usa cookie** — traria de volta o banner
de consentimento que o Vercel Analytics foi escolhido pra evitar.

**Os pins já estão prontos pro dia em que liberar.** `npm run pins` lê o
catálogo e escreve `data/pins.json` com título, descrição, destino, pasta e a
arte. Não publica nada — o Pinterest não abre API pra conta nova, e post
automático em nome do Alisson é a mesma regra do Instagram.

- ⚠️ **Pin não leva preço** — nem no texto, nem na arte. Pin vive meses e o robô
  muda o preço toda manhã; ninguém edita 15 pins por dia. Mesma razão do
  comparativo não escrever preço no arquivo.
- ⚠️ **Título é `{nome} vale a pena?`**, pela medição acima. Descrição cabe em
  **800** caracteres (contador do pin-builder; 500 era chute) e **o que se corta
  é a análise, nunca a declaração de afiliado**.
- ⚠️ **Pasta é faixa de preço, mas só vira "Celulares até R$ X" se for
  celular** — a primeira versão pôs uma Smart TV de R$ 998 em "Celulares até
  R$ 1.500". Pasta que mente faz o Pinterest parar de distribuir o perfil.
- ⚠️ **A arte sai do site**, em `/pin/{slug}` (`src/app/pin/[slug]/route.tsx`):
  1000×1500. A foto crua do Meli não serve — chega quadrada e pequena (a do A36
  tem 389px de largura, contra os 1000 que o Pinterest pede). **Edge não enxerga
  disco:** o catálogo entra por `import` do JSON, não por `lerCatalogo()`.
- Produto sem `imagem` não vira pin, e o script avisa quais ficaram de fora.
