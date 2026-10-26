<!-- Parte do CLAUDE.md, separada em 25/10/2026 (decisão do Alisson: "dividir por assunto"). Texto movido sem cortes. -->

## As frentes, e o estado de cada uma

⚠️ **A seção de retomada é a de cima.** Esta aqui guarda o estado das frentes
que não mudam todo dia — atualize quando uma delas virar.

**Meta:** uma venda até 03/11/2026. O gargalo é visita, não catálogo — mas em
16/09 entrou uma segunda aposta com prazo próprio: **a Black Friday de
27/11/2026** (seção própria abaixo).

**O ciclo diário combinado em 16/09**, que é como o catálogo cresce agora:
às ~14h o garimpo escreve a fila (até 20 candidatos) e abre a issue → às
16h12 a rotina na nuvem manda o e-mail com as URLs → ele gera os `meli.la`
no Linkbuilder e cola no chat → eu escrevo `descricao` e `analise` e publico.
**Ele topou até 20 links por dia.** Em 16/09 ele mandou 9 de uma vez e 8
viraram produto no mesmo dia.

🟢 **Em 17/09 o ciclo ficou bem mais rápido e eu toquei ele inteiro**: o
Linkbuilder **aceita a fila toda de uma vez, uma URL por linha** (ver "A
armadilha dos links"), então as 12 viraram 12 `meli.la` num clique só, e 7
viraram produto no mesmo dia. **Ele não precisa mais colar link por link** —
se estiver com o Chrome logado, dá para eu gerar e publicar na mesma sessão.

| Frente | Estado | De quem é a vez |
|---|---|---|
| Conversão (18/09) | 🟢 **Duas melhorias no ar, vindas de pesquisa**: a **barra fixa de oferta no celular** (`barra-de-oferta.tsx`, aparece só quando o botão principal sai da tela — estudo Contentsquare 2026, 58 M de sessões: +31%) e **"A escolha em 5 segundos"** no topo dos 7 comparativos (campo `escolha_rapida`). Os cliques entram separados na medição, como `barra-fixa` e `escolha-rapida` | Ninguém — é medir daqui a duas semanas no painel do Meli |
| Plano de retenção | 🟢 **Os três primeiros itens entraram em 18/09**: (a) **histórico em números** no topo da ficha (`historico-em-numeros.tsx` + `resumoDoHistorico`); (b) **zebra** na tabela do comparativo no desktop; (c) **`/quedas-de-preco`**, no sitemap e como primeiro atalho da home. **Indexação de `/quedas-de-preco` e do comparativo dos potes pedida em 18/09** e aceita | Ninguém. ⚠️ **O alerta de queda por e-mail/push foi recusado por ele em 19/09** — era o último item do plano e o único que não dependia do Google. **Não proponha de novo**: quem faz esse papel agora é o canal do WhatsApp, que entrega a queda na notificação sem infraestrutura nova |
| Indexação | 🟢 **29 páginas indexadas em 23/09** — eram 12 em 16/09 e 1 em 10/09. 38 não indexadas. As 4 de 20/09 foram resolvidas em 23/09 (2 já estavam dentro, 2 pedidas). ⚠️ O **comparativo do A17 não existe** (não está em `comparativos.json`); quando existir, pedir | Ninguém — reconferir em ~1 semana se as 2 pedidas entraram |
| SEO | 🟢 **As 4 frentes pedidas em 17/09 estão entregues.** O formato provado neste domínio é **guia de decisão** — foi o que indexou em ~1 dia e o que aparece em consulta real | Ninguém. O próximo guia é quando houver assunto, não por cota |
| HR Vidros | 🟢 **Fechado.** Migrado em 18/09 para `hrvidros.afdesousa.com.br` com 301, e o cliente avisado em 19/09 | Só resta remover o `ALIAS hrvidros` da zona por volta de mar/2027 |
| Links gerados e não publicados | 5 dos 12 de 17/09 foram **reprovados na curadoria**, mas os `meli.la` existem e os produtos estão na lista de recomendações do perfil: câmera `1tXvPsp`, mochila `1ehDCm4`, liquidificador Mondial `1go5SQY`, SSD Macrovip `32AwToA`, suporte de monitor `2u7P9CH`. ⚠️ **Não esvazie essa lista no Meli** sem tirar os produtos daqui | Ninguém — só se ele discordar de alguma reprovação |
| Lembrete dos links (16h12) | 🟢 Validado de ponta a ponta em 17/09. ⚠️ **O Gmail reescreve as URLs como `google.com/url?q=...` ao copiar** — coladas assim, o Linkbuilder não reconhece. Ou se copia só o texto, ou a rotina passa a mandar em texto puro (não feito) | **Dele**: dizer se quer o e-mail em texto puro |
| Perguntas nas fichas | 🟢 **Zerado: as 36 fichas têm perguntas** (a rotina das 4h fechou o JBL em 22/09) | Ninguém — a rotina pega até 5 por dia sozinha |
| Garimpo | 🔄 **Sem foco desde 11/09** — fila ordenada só por desconto. `MLB1055` segue na lista e rende celular | Ninguém. ⚠️ **Redmi 15C descartado em 16/09, por decisão dele**: tinha link gerado, mas a ficha da Xiaomi dá 403 e o anúncio não diz memória nem bateria. Não insista nele |
| Comparativos | 🟢 **8**: A36, G17, Edge 60 Fusion, DualSense, Moto G06, Monitor S3 27", kit de potes e **Galaxy A07** (20/09) | Ninguém — comparativo é sempre pedido explícito dele |
| Black Friday | 🟢 **`/black-friday` + 5 guias por categoria.** A página **acha os guias sozinha** pelo prefixo `vale-esperar-black-friday` do slug | Ninguém |
| Campanhas do Meli | 🔍 Conferido em 16/09: **"Campanhas exclusivas" e "Campanhas com incentivos" estão vazias**. As exclusivas são por convite (dependem de recomendar produto e **fazer vídeo**); nas de incentivo, só se participa de **uma campanha de todas as categorias por período** | Ninguém — reconferir em outubro, antes da BF |
| Gráfico de preço | 🟢 **Filtro Tudo/7/30/60/90 desde 16/09** (`produto/[slug]/grafico-precos.tsx`, client component). Período sem histórico fica desligado e liga sozinho | Ninguém |
| A36: dois cadastros | 🟢 **Resolvido, em duas etapas.** Em 17/09 o anúncio antigo (`MLB47115842`) saiu do ar e o verde-limão (`MLB47111438`) entrou; o comparativo **mantém a URL antiga** e tira preço e botão do anúncio vivo pelo campo `tambem`. Em **21/09 o antigo voltou a vender, a R$ 2.189** contra R$ 1.507 do verde — e foi marcado **`oculto: true`**, senão o robô o religaria e a vitrine mostraria o mesmo celular por dois preços | Ninguém |
| Catálogo | 🟢 **36 produtos, 33 visíveis.** Ocultos: SSD SanDisk (virou importado), A36 preto (voltou mais caro) e o suporte de monitor. O GameSir ficou visível com `importado: true` (23/09) | Ninguém — catálogo grande nunca foi meta |
| Instagram (formato) | 🔴 **15/09: ele não está feliz** — "perfil feio, fotos não viralizam, alcance melhor se for reels". **Nada agendado depois de 13/09**; `autoPublish: true` foi aceito por ele, mas a fila de 12 posts em foto **não** foi agendada por causa disso | **Decisão dele**: como fazer reels (ver seção Instagram). Não há `ffmpeg` nem `moviepy` na máquina |
| Pinterest | 🔴 **Apelação recusada em 11/09**. Revisão humana pedida no mesmo dia | Ninguém — ver a linha abaixo |
| Instagram | 🔴 **O 1º post não saiu sozinho em 12/09: a notificação do Metricool nunca chegou no celular dele.** Veja "A notificação que não chega", abaixo. A arte e a legenda do G17 foram entregues pelo chat pra ele publicar à mão — **não confirmado se chegou a sair: pergunte** | **Dele**: publicar o G17 se ainda não saiu, e conferir a permissão de notificação do app do Metricool — senão o A36 (13/09, 10h) para no mesmo lugar. ⚠️ **A trava do 3º celular caiu com a reabertura do escopo**: há 14 legendas prontas de todas as categorias, então o feed pode seguir sem aparelho novo — decidir com ele se agenda a partir do dia 3 |
| Pinterest (revisão humana) | Post publicado por ele em 11/09 na Business Community | Ninguém — esperar ~3 semanas. Sem resposta, o canal morreu |
| Os 3 guias de decisão de celular (`quanto-de-memoria`, `tela-amoled-ou-lcd`, `quantos-anos-de-atualizacao`) | No ar desde 10–11/09, **todos indexados em ~1 dia** — e o de memória já aparece em consulta real (ver "O primeiro retrato de busca"). **É a prova de qual formato funciona aqui** | Ninguém |
| Guia de faixa até R$ 2.500 | 🔴 **Parado**, e a razão importa | Decisão dele: ver abaixo |

🟢 **O guia até R$ 2.500 está destravado desde 16/09**: o Edge 60 Fusion
entrou no catálogo com ficha oficial conferida e já é coluna de comparativo.
Faltam 2 ou 3 nomes novos conferíveis pra ele valer a pena.

⚠️ **A ficha da Realme e a da Xiaomi não abrem** (404 e 403 em 15–16/09). O
Realme C73 entrou com o que o anúncio diz, e o **Redmi 15C ficou de fora**
mesmo com link gerado. A da Motorola abre e vem completa — é a fonte que
funciona.

🔴 **Não procure de novo a ficha do Realme C73: ela não existe no Brasil.**
Conferido em 17/09/2026, em cima da tentativa de escrever o comparativo dele.
`realme.com/br/realme-c73` e `/realme-c73-5g` dão **404**, e o site brasileiro
da Realme lista C33, C63 e C75 — não o C73. A única ficha oficial que existe é
a do **C73 5G indiano** (Dimensity 6300, 5G, câmera de 32 MP, IP64), que é
**outro aparelho**: o nosso anúncio diz 4 GB de RAM e não fala em 5G. Usar a
ficha indiana seria exatamente o erro que o `npm run fichas` nasceu para pegar.
**O C73 fica sem comparativo próprio** até a Realme publicar a página — ele
continua como coluna do comparativo do G06, com as células em "Não divulgado".

🟢 **Fontes de ficha que abrem bem por `WebFetch`, medido em 17/09:**
`samsung.com/br` (monitores, ficha completa com brilho, contraste, entradas e
VESA) e `aoc.com/pt` (a página do produto; a URL `/specification` dá 404).
Somadas à Motorola, são as três que funcionam. Samsung de **celular** continua
truncando a seção de especificações — o problema é por linha de produto, não
por marca.

🟢 **Mais fontes medidas em 20/09/2026**, ao escrever o comparativo do A07 e os
guias novos:

| Fonte | Como se comporta |
|---|---|
| `asus.com` **global** | 🟢 Abre a ficha inteira por `WebFetch` — inclusive a geração PCIe de cada slot M.2 |
| `asus.com/br` | 🔴 **Trunca**: diz "Suporta 2 x slots M.2" e omite o que cada um aceita. **Tire o `/br` da URL** |
| `kingston.com` | 🔴 403 no `WebFetch` direto; 🟢 o `WebSearch` com `allowed_domains` devolve a ficha |
| `oster.com.br`, `loja.electrolux.com.br` | 🟢 Ficha completa pelo `WebSearch` com domínio travado |
| `philco.com.br` | 🔴 Ver abaixo — o modelo que vendemos não existe lá |

⚠️ **A regra geral que saiu daí: quando o site brasileiro truncar, tente o
global antes de desistir.** Foi o que destravou a placa-mãe.

🔴 **Samsung de celular: a ficha existe, mas só depois de abrir os acordeões.**
Pelo Chrome, `document.querySelectorAll('[aria-expanded="false"]').forEach(b =>
b.click())` e então ler o `innerText` — aí vêm tela, processador, memória,
câmera, rede e o "Período de Atualizações de Segurança". **O `WebFetch` nunca
vai ver isso**, porque o conteúdo só entra no DOM ao clicar.

⚠️ **Nem tudo que está na página oficial é ficha.** Na página do A07 convivem
três coisas: a tabela de especificações (vale), o texto de marketing da
Samsung (vale — foi de um `alt` de imagem que saíram os **90 Hz**) e o
**"Resumo de avaliações por IA"**, que é feito de review de cliente e **não
vale como fonte**. O IP54 e os "6 anos" aparecem lá; só use se também
estiverem no texto da própria Samsung.

### 🟢 Nicho de ar-condicionado (03/10/2026)

Pedido dele: nicho em alta, split de 9.000 e 12.000 BTUs, só no Meli. Entraram
**7 aparelhos** (categoria nova `Ar-condicionado`, ids 40 a 46) e **2
comparativos**: o de 9.000 tem o Gree G-Top Auto como assunto (contra TCL
BreezeIN e LG Compact) e o de 12.000 tem o Midea AirVolution Lite (contra Elgin,
LG Voice e Samsung WindFree). Todos são só frio, inverter e 220 V.

- 🔴 **A Samsung WindFree 9k foi reprovada pelo vendedor.** O R$ 1.679 da busca
  era de `AS20260306075752`, conta com nome de cadastro automático, quase
  R$ 700 abaixo dos outros vendedores do mesmo aparelho. **Preço muito abaixo
  da faixa + vendedor sem nome = não entra.**
- ⚠️ **Catálogo que pede voltagem não mostra preço** (a página da Samsung 9k
  dizia "Voltagem: Escolha"): o robô cairia no `results[0]`, o defeito da
  Philco. Prefira o anúncio com voltagem fixa no título.
- **Busca do Meli com a janela minimizada:** a lista não renderiza. O que
  funciona é `fetch` da URL de busca e ler os blocos `"polycard":` do HTML
  (desescapando as aspas). O modelo exato de cada anúncio sai do mesmo jeito,
  pelo par `"Modelo","text":"..."`.
- **Fontes de ficha de ar-condicionado, medidas:** LG e Samsung abrem completas
  por `WebFetch`; **Elgin, Midea e TCL só pelo Chrome** (o `WebFetch` vê a
  página vazia); a Gree, pela **loja** (`loja.gree.com.br`), não pelo site
  institucional. ⚠️ **LG tem sufixo por lote** (S3-Q09AAQAC × S3-Q09AAQAK, com
  potência diferente): procure a página do código exato do anúncio.
- **Ninguém publica tudo:** ruído só LG e Samsung; IDRS só Gree, TCL e Samsung.
  A tabela diz "Não divulgado" e a nota explica que não é o mesmo que ser pior.
- ⚠️ **A Midea Lite é classe D** e a loja da Midea só informa garantia legal
  de 90 dias — está dito no comparativo, e é o ponto fraco do mais vendido.
- Toda `analise` lembra que **a instalação é à parte** e o custo não está no
  preço. Não tire: é a primeira surpresa de quem compra split.
- 🔴 **Comparação de preço escrita à mão envelhece igual a preço escrito**
  (08/10/2026). Eu tinha escrito "o classe A **mais barato** da tabela" (Gree),
  "o Elgin **custa perto** do Midea", "é o **mais caro** dos três" — e em 5
  dias o Gree virou o mais caro dos 9k e o Elgin ficou R$ 660 acima do Midea.
  Foram ~25 frases reescritas em `analise`, `veredito`, `escolha_rapida` e
  notas. **A regra de "nenhum preço no arquivo" inclui "mais barato", "mais
  caro", "custa perto", "por menos" e "o orçamento manda":** o texto diz o que
  o aparelho *tem* e manda comparar o preço do dia, que a tabela já mostra.
  Um `grep` por essas expressões antes de publicar comparativo resolve.
- 🔴 **Climatizador Ventisol CLIN 16 reprovado em 04/10**, por regra dele: só
  entraria perto dos R$ 399 do garimpo. No dia seguinte o catálogo estava a
  R$ 529 sem desconto e pedindo voltagem, e o anúncio mais barato de voltagem
  fixa (R$ 410,20) era **preço de Pix** — no cartão, R$ 500,25. **Preço de
  garimpo é de ontem: confira na página antes de prometer.**
- **Fmaxx FT24 (monitor 24") entrou em 04/10** sem ficha de fabricante (a
  marca não publica) — então **não vira comparativo**. A `analise` diz que o
  "de" do anúncio não foi confirmado e que o anúncio não fala em sintonizador,
  apesar do nome "TV-monitor".

### 🔴 Produto de varejo não tem ficha de fabricante (20/09/2026)

Terceiro caso da mesma armadilha, depois do Realme C73 e da Xiaomi. **A Smart
TV "Philco P32VIK" do nosso catálogo não existe no site da Philco** — lá a
linha Roku de 32 pol. é PTV32K34RKGB, PTV32G7PR2CGB e afins. O `P32VIK` só
aparece em Mercado Livre, OLX e sites de review: é **código de canal**, não
modelo oficial. O **Projetor HY320** é pior: marca genérica, fabricante
nenhum, e o nosso catálogo **nem registra quantos lumens ele tem**.

**A regra:** antes de prometer um guia ou comparativo, confira se os produtos
que ele vai citar têm ficha de fabricante. Se não tiverem, o texto ou muda de
ângulo ou não é escrito — nunca se preenche a tabela com dado de agregador.

⚠️ **Por que o guia até R$ 2.500 parou:** a faixa de R$ 1.500 a 2.500 quase não
tem aparelho com ficha oficial acessível (veja a armadilha do `WebFetch` em
"Comparativos"), e os que dá para conferir — A36, G86, Poco X7, Redmi Note 14
5G, G17 — **já são cinco dos seis do guia de até R$ 1.500**. Escrever daria
página quase duplicada, que é o oposto do que abre índice. O único nome novo
com ficha oficial conferida é o **Moto Edge 60 Fusion** (pOLED 6,7 pol.,
120 Hz, 4.500 nits, Dimensity 7300, 8/256 com microSD, 5.200 mAh · 68 W, 50 MP
Sony LYTIA 700C com OIS, IP68/IP69 + MIL-STD-810H; atualizações não
divulgadas). Retomar quando houver 3 ou 4 aparelhos novos conferíveis.

📁 **Os rascunhos de post moram em `rascunhos/`, fora do Git** (está no
`.gitignore`): `aquecimento-reddit.md` e `rascunhos-reddit.md`. ⚠️ **O repo é
público** — texto a publicar em nome do Alisson, nome de conta e plano de
aquecimento não sobem. Leia de lá antes de refazer garimpo nenhum.

⚠️ **O guia não vende sozinho, e isso é de propósito:** quatro dos seis
aparelhos não são nossos. Se ele trouxer visita e nenhum clique, o problema é
o catálogo ter só dois celulares, não o texto.
