# verificadoagora

Site de **tecnologia** (celular, eletrônico, casa, games) com o preço conferido
por robô toda manhã, link de afiliado do Mercado Livre.

⚠️ **O escopo foi e voltou, e a história importa pra ninguém refazer a volta.**
Em 09/09/2026 um brief estreitou tudo para **celulares intermediários de R$ 800
a R$ 2.500**, pelo argumento de que dois assuntos com o mesmo peso atrapalham a
leitura de tópico do buscador. Em **11/09/2026 o Alisson reabriu para
tecnologia em geral**: com dois celulares no catálogo a vitrine parecia vazia,
e "parece pouco" foi a razão dada. O aviso sobre o custo em SEO foi dado antes
da decisão, com as alternativas na mesa (encher a faixa; alargar só um degrau,
para acessório de celular) — ele escolheu abrir. **Se o índice do Google piorar
daqui pra frente, esta é a variável que mudou.**

O que saiu junto do foco, tudo em 11/09: o destaque de `Celulares` no filtro da
vitrine (`CATEGORIA_FOCO`), o `foco`/`desconto_minimo_do_foco` do
`data/garimpo.json`, e o título e a descrição do site.

- Next.js 14 (App Router) + TypeScript + Tailwind, na **raiz do repo**
- Dados em `data/produtos.json` — sem banco, sem API, sem backend
- No ar em **verificadoagora.com.br** — `git push` na `main` publica
- O domínio próprio entrou em 07/09/2026. Veja "O nó do domínio"

## Quem faz

É da **A F DE SOUSA**, empresa do Alisson. Contato:
**contato@afdesousa.com.br**.

> As regras de como trabalhar comigo moram no `CLAUDE.md` pessoal
> (`~/.claude/CLAUDE.md`) e valem em todos os projetos. O padrão técnico
> compartilhado entre eles está na skill `padrao-afdesousa`.

⚠️ **O lado comercial da empresa saiu deste repo em 12/09/2026.** Cliente,
preço, proposta e prospecção moram em `C:\projetos\afdesousa-comercial`, que
é privado — este aqui é público. Se a conversa virar "como ganhar dinheiro",
"conseguir cliente" ou "quanto cobrar", **é lá**, e não aqui: o nicho, os
pacotes e as regras de LGPD da prospecção estão escritos naquele arquivo.

Dois relatórios de pesquisa de 11–12/09/2026 embasaram aquilo, e valem uma
leitura antes de opinar sobre o futuro desta landing:

- **Seis rotas até o primeiro real** — a conta de que este site precisa de
  6.500 a 11.500 visitas/mês para render R$ 1.000, e o que mais existe ao
  alcance dele: <https://claude.ai/code/artifact/cce97c0b-5eec-40d2-8465-65158b65f34a>
- **Vender sem sair de casa** — o plano comercial:
  <https://claude.ai/code/artifact/df4e549b-355a-4b17-b283-e483170bc937>
- **O ativo é o histórico** (18/09/2026) — o diagnóstico com os números reais do
  Search Console, a pesquisa de conversão que gerou a barra fixa e a "escolha em
  5 segundos", e o plano por ordem de retorno:
  <https://claude.ai/artifact/WfSJ9nzQ1E12jDBgGckUAN>

⚠️ **O que isso significa para este projeto:** ele continua, mas rebaixado a
**ativo de 6 a 12 meses que compõe sozinho** — não é a fonte de renda de 2026.
Um guia ou comparativo por semana, sem esperar que resolva o mês. Decisão dele
em 11/09/2026, depois da pesquisa.

## Onde paramos — 19/09/2026 (noite)

🟢 **O canal do WhatsApp está no ar e é a frente principal agora.**
`https://whatsapp.com/channel/0029VbDDES76BIEZIB1xRZ2o` — **9 produtos
publicados em 19/09**, o reel foi ao ar no Instagram, e o perfil foi arrumado
(foto, bio e link). A conta que decidiu isso: canal com 200–300 pessoas
engajadas rende o que o site renderia com 3.000–6.000 visitas/mês, e o site
tem **0 cliques** de busca.

| O que ficou pendente | De quem é |
|---|---|
| 🔴 **PR 17 do robô: o SSD SanDisk caiu 40%** (R$ 945 → R$ 562,18) e está segurado como suspeito. Não conferi na fonte (o Chrome travou). **Confira e aplique à mão** — e não mergeie o branch, que é anterior aos produtos novos | Minha, na próxima sessão |
| Publicar 5 por dia no canal — faltam **23 produtos** | Minha, quando ele abrir sessão. A rotina das 8h manda os textos por e-mail |
| Fixar mensagem no canal | 🚫 **Não existe**: canal do WhatsApp não tem "fixar", é recurso de grupo. Quem faz esse papel é a descrição do canal |
| Divulgar o canal de graça | **Dele**: status do WhatsApp pessoal (o de maior retorno), busca do app, comentário fixado no reel, diretórios de canais, troca com canais pequenos. ⚠️ **Nunca jogar link em grupo alheio** — é como o número é marcado como spam |
| Rótulo "X (Twitter)" no cadastro do canal no Meli | Ninguém. Tentamos os dois, o painel classifica errado sozinho — **ele também tentou e deu o mesmo**. A URL está declarada, que é o que a cláusula 1.3 exige |

## Onde paramos — 18/09/2026 (madrugada)

Atualize esta seção sempre; é por ela que a próxima sessão sabe retomar.

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
| Plano de retenção | 🟢 **Os três primeiros itens entraram em 18/09**: (a) **histórico em números** no topo da ficha (`historico-em-numeros.tsx` + `resumoDoHistorico`); (b) **zebra** na tabela do comparativo no desktop; (c) **`/quedas-de-preco`**, no sitemap e como primeiro atalho da home. **Indexação de `/quedas-de-preco` e do comparativo dos potes pedida em 18/09** e aceita | **Decisão dele**: alerta de queda por e-mail/push — único item do plano que precisa de infraestrutura nova, e o único que funciona sem depender do Google |
| Indexação ainda pendente | 🟡 Não consegui pedir na mesma sessão (o painel para de trocar de URL depois de dois pedidos): **comparativo do monitor**, **comparativo do A17**… quando existir, a **ficha do A17** e as **4 páginas de Black Friday** | **De quem pegar primeiro** — é 1 minuto por URL no Search Console, e o método pelo Chrome está descrito em "Ser achado" |
| **SEO: 4 frentes escolhidas, 1 entregue** | Ele pediu **todas as quatro** em 17/09. 🟢 Feita: `guias-relacionados` passou a cobrir toda categoria. 🔴 **Faltam três**: (a) 2 guias de decisão — *"SSD SATA ou NVMe: qual serve no seu PC?"* e *"Quantos lumens um projetor precisa ter?"*, que puxam SSD NV3, SanDisk e HY320; (b) 2 guias de Black Friday — projetor/TV e eletrodoméstico; (c) comparativo do **Galaxy A07** contra G06, C73, G15 e A16 (as fichas desses quatro já estão nos comparativos, é só copiar palavra por palavra) | **Minha** — é só retomar, não depende dele |
| HR Vidros | 🟢 **Migrado em 18/09** para `hrvidros.afdesousa.com.br`, com 301 no antigo. Ver "A migração do HR Vidros" | **Dele**: avisar o cliente para trocar o link no Instagram, no Google Meu Negócio e em cartão |
| Links gerados e não publicados | 5 dos 12 de 17/09 foram **reprovados na curadoria** (ver "O que reprova um candidato"), mas os `meli.la` existem e os produtos estão na lista de recomendações do perfil: câmera `1tXvPsp`, mochila `1ehDCm4`, liquidificador Mondial `1go5SQY`, SSD Macrovip `32AwToA`, suporte de monitor `2u7P9CH` | Ninguém — só se ele discordar de alguma reprovação |
| Lembrete dos links | 🟢 **Funcionou de verdade em 17/09**: o e-mail das 16h12 chegou, com os 12 candidatos e o bloco de URLs. A rotina está validada de ponta a ponta. ⚠️ **Mas o Gmail reescreve as URLs como `google.com/url?q=...` ao copiar** — coladas assim, o Linkbuilder não reconhece. Ou se copia só o texto, ou a rotina passa a mandar o e-mail em texto puro (não feito) | **Dele**: dizer se quer que eu ajuste a rotina para texto puro |
| Perguntas nas fichas | 🟡 **30 de 35 fichas têm, desde 19/09** (rotina das 4h): A36 verde, A07, A17 e os dois kits de potes ganharam perguntas nesse dia. **Faltam 5**: Projetor HY320, Placa-mãe Asus, SSD Externo SanDisk, Liquidificador Oster, Micro-ondas Electrolux | Ninguém — a rotina das 4h pega até 5 por dia sozinha |
| Conferir no celular | 🟡 Pendente de 16/09: os **3 comparativos novos**, o **filtro do gráfico**, a **tabela da `/black-friday`** (rola de lado). De 17/09: o **comparativo do monitor** (10 linhas de ficha — é o maior até agora nos blocos do celular) e as **perguntas nas fichas** | **Dele**: olhar no aparelho. Daqui não dá — o `resize_window` não funciona |
| Reddit `r/CelularesBR` | Conta `u/a_f_de_sousa` criada; **aquecimento completo — dias 1, 2 e 3 postados** (dia 3 em 12/09, na thread "Celular gamer de até 2.500"). A conta tem histórico: o rascunho 1 está liberado | **Dele**: o **primeiro comentário com link** — rascunho 1 de `rascunhos/rascunhos-reddit.md` ("Indicação com urgência", leva o comparativo e a declaração de afiliado). É a primeira vez que o site aparece no Reddit |
| Guia `/guia/celulares-ate-1500` | No ar, medido, indexação pedida no Search Console | Ninguém — é esperar o Google, semanas |
| Garimpo | 🔄 **Sem foco desde 11/09** — fila ordenada só por desconto. `MLB1055` segue na lista e rende celular | Ninguém. ⚠️ **Redmi 15C descartado em 16/09, por decisão dele**: tinha link gerado, mas a ficha da Xiaomi dá 403 e o anúncio não diz memória nem bateria. Não insista nele |
| Comparativos | 🟢 **6 desde 17/09**: A36, G17, **Edge 60 Fusion** (contra A36, Poco X7, G86), **DualSense** (contra os dois GameSir), **Moto G06** (contra G17, C73, G15, A16) e **Monitor S3 27" 120 Hz** (contra o S3 24" do catálogo, o S3 de 100 Hz e o AOC 27B35HM) — o primeiro fora de celular e controle | **Dele**: pedir indexação do comparativo do monitor |
| Black Friday | 🟢 **`/black-friday` + 3 guias por categoria no ar em 16/09** (ver seção própria). Em **17/09** a página passou a **linkar os 3 guias** e cada guia a linkar de volta pela trilha, e a tabela passou a dizer **quantos dias de preço cada produto tem** | **Dele**: pedir indexação das 4 quando quiser acelerar |
| Campanhas do Meli | 🔍 Conferido em 16/09: **"Campanhas exclusivas" e "Campanhas com incentivos" estão vazias**. As exclusivas são por convite (dependem de recomendar produto e **fazer vídeo**); nas de incentivo, só se participa de **uma campanha de todas as categorias por período** | Ninguém — reconferir em outubro, antes da BF |
| Gráfico de preço | 🟢 **Filtro Tudo/7/30/60/90 desde 16/09** (`produto/[slug]/grafico-precos.tsx`, client component). Período sem histórico fica desligado e liga sozinho | Ninguém |
| A36: dois cadastros | 🟢 **Resolvido em 17/09.** O anúncio antigo (`MLB47115842`) saiu do ar e ficou `disponivel: false`; o novo, verde-limão (`MLB47111438`), entrou a R$ 1.544,32. O comparativo **mantém a URL antiga** (a que o Google conhece) e tira preço, botão e foto do anúncio vivo, via o campo `tambem` — ver "Quando o anúncio morre e a página fica" | Ninguém |
| Catálogo | 🟢 **32 produtos desde 17/09** — entraram A36 verde, Galaxy A07, Projetor HY320, Placa-mãe Asus TUF B550M-PLUS, SSD Externo SanDisk 1TB, Liquidificador Oster e Micro-ondas Electrolux, todos com `analise` escrita à mão e ficha lida no anúncio. **Os 7 estão sem `perguntas`** | Ninguém — perguntas quando sobrar fôlego |
| Instagram (formato) | 🔴 **15/09: ele não está feliz** — "perfil feio, fotos não viralizam, alcance melhor se for reels". **Nada agendado depois de 13/09**; `autoPublish: true` foi aceito por ele, mas a fila de 12 posts em foto **não** foi agendada por causa disso | **Decisão dele**: como fazer reels (ver seção Instagram). Não há `ffmpeg` nem `moviepy` na máquina |
| Pinterest | 🔴 **Apelação recusada em 11/09**. Revisão humana pedida no mesmo dia | Ninguém — ver a linha abaixo |
| Instagram | 🔴 **O 1º post não saiu sozinho em 12/09: a notificação do Metricool nunca chegou no celular dele.** Veja "A notificação que não chega", abaixo. A arte e a legenda do G17 foram entregues pelo chat pra ele publicar à mão — **não confirmado se chegou a sair: pergunte** | **Dele**: publicar o G17 se ainda não saiu, e conferir a permissão de notificação do app do Metricool — senão o A36 (13/09, 10h) para no mesmo lugar. ⚠️ **A trava do 3º celular caiu com a reabertura do escopo**: há 14 legendas prontas de todas as categorias, então o feed pode seguir sem aparelho novo — decidir com ele se agenda a partir do dia 3 |
| Pinterest (revisão humana) | Post publicado por ele em 11/09 na Business Community | Ninguém — esperar ~3 semanas. Sem resposta, o canal morreu |
| Os 3 guias de decisão de celular (`quanto-de-memoria`, `tela-amoled-ou-lcd`, `quantos-anos-de-atualizacao`) | No ar desde 10–11/09, indexação pedida em 11/09, **todos indexados em ~1 dia** — e o de memória já aparece em consulta real (ver "O primeiro retrato de busca") | Ninguém |
| Guia de faixa até R$ 2.500 | 🔴 **Parado**, e a razão importa | Decisão dele: ver abaixo |
| Comparativo no celular | Blocos por critério no ar desde 11/09 (era tabela deslizante com a coluna fixa vazando por cima do texto) | **Dele**: conferir no aparelho |
| Home no celular | Atalhos viraram tira que rola de lado em 11/09 | **Dele**: conferir no aparelho |

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

## Economia de contexto

O Alisson paga por token e o limite dele já apertou uma vez. **Esta seção vale
tanto quanto as regras técnicas.**

O que custa caro, em ordem: o histórico da conversa, screenshot, arquivo
grande relido, resposta longa.

Como trabalhar barato aqui:

- **Verifique medindo, não olhando.** `curl` e uma linha de `node` provam a
  mesma coisa que um screenshot por uma fração do preço. Screenshot só quando
  o assunto for de fato visual e não der pra medir.
- 🔴 **Não dá pra conferir layout de celular daqui, e isso não é falta de
  tentar.** Em 11/09/2026 o `resize_window` do Chrome respondeu "sucesso" três
  vezes e o `innerWidth` continuou 1920 — a janela dele não redimensiona.
  **Quem confere visual no aparelho é ele**, sempre. Diga isso em voz alta em
  vez de entregar como verificado.
- **Para provar que o HTML saiu certo**, sem screenshot: `npx next dev -p 3111`
  (a 3000 costuma estar ocupada), `curl` a página para um arquivo e `grep` as
  classes e os textos esperados. Foi assim que os blocos do comparativo foram
  conferidos. ⚠️ `$TMPDIR` vem vazio no Bash daqui: use o caminho do
  scratchpad por extenso, ou o redirecionamento falha com *Permission denied*.
- ⚠️ **Escrever arquivo com acento pelo heredoc do Bash quebra.** Gere o texto
  num `.py` no scratchpad e rode com `python`, ou os acentos somem do que o
  visitante lê — aconteceu em 11/09/2026 e teve que ser desfeito à mão.
- **Resposta curta por padrão.** Diga o que mudou, o que não funcionou e o que
  falta. Sem recapitular o que ele acabou de ler.
- **Uma pergunta boa em vez de três.** A regra de perguntar em múltipla
  escolha (`~/.claude/CLAUDE.md`) continua valendo — o Alisson gosta dela.
  Guarde-a pro que muda dinheiro, dado ou visual; no resto, decida e diga o
  que decidiu.
- **Junte o trabalho.** Várias edições e uma verificação no fim custam menos
  que verificar a cada passo.

### ⚠️ Antes do `/clear`, despeje o aprendizado aqui

**O Alisson limpa a conversa o tempo todo, de propósito, pra economizar
token.** Conte com isso: é **este arquivo que atravessa o `/clear`**, e nada
mais atravessa. Rascunho em pasta temporária, resultado de comando, o que foi
combinado no meio do caminho — tudo isso morre.

Então, ao fim de qualquer trabalho que descubra algo, escreva aqui: a
armadilha encontrada, a decisão tomada e o porquê. Se ele disser que vai
limpar, ofereça isso antes.

**Quando ele pedir "atualize o CLAUDE.md", são três coisas, nesta ordem:**

1. **Gravar o que foi aprendido** — regra, decisão, armadilha. Com o porquê.
2. **Deixar a retomada pronta** — o que ficou pendente e de quem é a vez. A
   próxima sessão começa sem memória nenhuma da conversa: se não estiver
   escrito aqui, ela vai perguntar de novo o que ele já respondeu.
3. **Enxugar sem perder contexto** — juntar o que ficou repetido, cortar
   história, manter toda regra. Na dúvida entre encurtar e preservar, preserve:
   o custo de reler uma linha a mais é centavos, o de refazer uma decisão é a
   sessão inteira.

Escreva a regra, não a história. "O robô não gravava o histórico entre 07 e
08/09" vale uma linha; o relato de como foi descoberto, nenhuma. **Data e
número ficam** — são eles que provam a regra depois.

## O domínio

Endereço oficial: **`www.verificadoagora.com.br`**. O apex redireciona pra ele
(308). Saiu ao contrário do planejado e ficou assim porque funciona igual — o
que importa é existir uma versão canônica só. Pra inverter: Settings → Domains
da Vercel, apex como *Primary Domain*. Não mexe em DNS.

Nameservers na **Hostinger**. Nenhum endereço fica escrito no código: o
`metadataBase` sai de `VERCEL_PROJECT_PRODUCTION_URL`.

⚠️ **Não use `VERCEL_URL`.** É o endereço do deploy, protegido por login,
responde 302 — a capa do link no Instagram saía sem imagem. Só dava pra ver em
produção.

**Search Console**: propriedade tipo *Domínio*, verificada em 09/09/2026 por
`TXT` no `@`. Não apague esse TXT; TXT novo entra como registro adicional.

### A zona DNS carrega outros projetos

| Registro | Serve | Situação |
|---|---|---|
| `A @` → `216.198.79.1` | redireciona pro `www` | ativo |
| `CNAME www` | esta landing (Vercel) | ativo, é o oficial |
| `TXT @` | Search Console | ativo, **não apague** |
| `ALIAS hrvidros` | **301 para `hrvidros.afdesousa.com.br`** | 🟡 ativo só como redirect — tirar em ~mar/2027 |
| `ALIAS api-licitacoes`, `CNAME licitacoes` | nada | mortos, podem sair |
| `A ftp` → `45.132.157.6` | o servidor da hospedagem | auditado em 17/09 |

⚠️ **`hrvidros.verificadoagora.com.br` é a página de um cliente real** (a
vidraçaria de Parauapebas). **Não apague esse registro** — e agora menos ainda:
ele vai virar um 301 (veja abaixo).

🟢 **A institucional da A F DE SOUSA voltou ao ar** em `afdesousa.com.br`
("Site e WhatsApp para construção civil em Parauapebas"), conferido em
17/09/2026. O `CLAUDE.md` dizia que ela estava sem endereço desde 09/09 —
estava desatualizado.

### A migração do HR Vidros para `hrvidros.afdesousa.com.br` (17/09/2026)

Decisão do Alisson: tirar o site do cliente do domínio do verificadoagora.
**Escolhido: novo no ar + 301 do antigo, mantendo o antigo uns 6 meses.** A
razão está medida: no Search Console de 28 dias, **7 das 10 consultas do
domínio são do HR Vidros** (`vidraçaria em parauapebas`, `box de banheiro`,
`janelas de vidro`) — cortar seco jogaria fora a posição do cliente.

O que já está feito:

- 🟢 Subdomínio **`hrvidros.afdesousa.com.br` criado** no hPanel, pasta
  `/home/u278485813/domains/afdesousa.com.br/public_html/hrvidros`.
- 🟢 **Site copiado**: o `index.html` de **26.749 bytes** (conferido byte a
  byte contra o original). ⚠️ **O site é um arquivo só** — a pasta `assets/`
  está vazia e não há nenhuma URL do domínio antigo dentro do HTML (sem
  canonical, sem og:url), então nada precisa ser reescrito.

- 🟢 **DNS e SSL: não precisou de nada.** Criar o subdomínio no hPanel já
  escreveu sozinho o `ALIAS hrvidros → hrvidros.afdesousa.com.br.cdn.hstgr.net`
  na zona, e o certificado saiu automático. ⚠️ **O aviso do painel pedindo
  "adicione um Registro A" é genérico e estava errado** — não caia nele.
- 🟢 **301 no ar em 18/09/2026**, e medido:
  `https://hrvidros.verificadoagora.com.br/` → 301 →
  `https://hrvidros.afdesousa.com.br/` (200, os mesmos 26.749 bytes), e
  **o caminho é preservado** (`/contato` → `/contato`). A landing principal
  seguiu intacta: `www` 200, apex 308 para o `www`.

**Como o 301 foi feito, e por que não pelo painel:** por um `.htaccess` na
pasta do subdomínio antigo, com `RewriteRule ^(.*)$
https://hrvidros.afdesousa.com.br/$1 [R=301,L]`. 🔴 **A tela Domínios →
Redirecionamentos não serve aqui**: o seletor de origem **volta sozinho para
`verificadoagora.com.br`** depois de escolher o subdomínio, e o valor do campo
não é legível para conferir — criar às cegas arriscava redirecionar a landing
inteira para o site do cliente. O `.htaccess` é explícito e reversível (apagar
o arquivo desfaz).

O que falta: só **remover o `ALIAS hrvidros` desta zona depois de ~6 meses**,
quando o Google já tiver movido as posições. Antes disso, não mexa.

⚠️ **Duas armadilhas do painel, medidas nesse dia:**

- **O diálogo "Copy" do gerenciador de arquivos não sai da raiz do site.** Não
  dá para copiar de `verificadoagora.com.br/public_html` para
  `afdesousa.com.br/public_html` por ele, mesmo abrindo "todos os arquivos do
  plano". O que funcionou: baixar por HTTP (`curl` na página pública, que é
  estática) e subir pelo upload do gerenciador, conferindo o tamanho em bytes.
- 🔴 **O Editor de Zona DNS trava** ao abrir o seletor "Tipo" do formulário de
  novo registro: a aba deixa de responder a screenshot e a script, e recarregar
  não resolve. Foi por isso que o passo 1 ficou para o Alisson fazer à mão.

## Stack, e onde ela diverge do padrão

Em 07/09/2026 as três divergências abertas foram decididas e já estão
aplicadas:

| Assunto | Como ficou |
|---|---|
| Router | **App Router** (`src/app/`), como nos outros projetos. Migrado enquanto só existia uma página |
| Chaves do JSON | **Sem acento** (`preco_atual`, `avaliacao`, `descricao`) |
| Deploy | **Vercel pela integração com o GitHub** — `git push` na `main` publica. A Action `deploy.yml` foi removida: era redundante e pedia três segredos que não existem. A Action que sobrou (`conferir-precos.yml`) não publica site nenhum, só mexe no catálogo |
| Backend | **Não tem, e não vai ter.** O próprio padrão diz que landing de afiliados não precisa de Express nem Postgres |

Estrutura:

```
src/app/
  layout.tsx            ← metadata, Open Graph
  page.tsx              ← a vitrine (Server Component)
  produto/[slug]/       ← uma página por produto, com schema.org e gráfico
  sitemap.ts, robots.ts ← gerados do catálogo
  card-produto.tsx      ← o card, com next/image
  vitrine.tsx           ← 'use client': só o filtro de categoria
  icon.tsx              ← favicon gerado (next/og, runtime edge)
  opengraph-image.tsx   ← capa do link gerada (next/og, runtime edge)
  oauth/meli/page.tsx   ← retorno do login do Meli: só mostra o code na tela
src/lib/
  produtos.ts           ← tipos e formatação. Sem fs: roda no cliente também
  historico.ts          ← preço por dia e o selo de "menor preço em N dias"
  slug.ts               ← endereço de cada produto no site
  catalogo.ts           ← lerCatalogo(), único lugar que toca o disco
  meli.ts               ← API do Mercado Livre. Único lugar que fala com o Meli
scripts/                ← o robô de preços (TypeScript, roda com tsx)
data/produtos.json
```

**A separação `produtos.ts` / `catalogo.ts` é de propósito.** `vitrine.tsx` é
client component; se importasse o módulo que faz `import fs`, o bundle do
navegador quebrava. Tipo e formatação de um lado, disco do outro.

**`next/og` só compila com `export const runtime = 'edge'`.** Sem isso o build
morre no Windows com `TypeError: Invalid URL` em `fileURLToPath`. E a fonte
padrão do next/og não tem o glifo `✓` — na imagem ele é *desenhado* com
bordas, senão sai um quadradinho. Na página HTML o caractere pode ser usado
normalmente.

⚠️ **Rota de redirect precisa de `export const dynamic = 'force-dynamic'`.**
Prerenderada, ela devolve 308 **sem cabeçalho `Location`**: o Next assa o
desvio como payload de cliente e nenhum crawler segue. Só se descobre medindo
em produção — o `tsc` e o build passam iguais. Veja
`src/app/analise-philco-32-roku/page.tsx`.

O que **não** diverge e não deve divergir: pt-BR no domínio e na interface,
`tsc --noEmit` antes de entregar, cor nunca como única informação, `min-w-0`
no container **e nos filhos** de qualquer grade nova.

O Tailwind chegou a existir só no `package.json`: a página usava as classes
sem `tailwind.config.js`, `postcss.config.js`, `globals.css` nem layout, e saía
sem estilo nenhum. Se alguma dessas peças sumir de novo, é isso que aconteceu.

## O visual

Fechado em 08/09/2026, depois de duas rodadas de comparação lado a lado com
os produtos reais. As cores são **tokens no `tailwind.config.js`** — não
espalhe hex pelo código.

| Token | Cor | Onde |
|---|---|---|
| `fundo` | `#eef2f8` | o corpo claro da vitrine |
| `noite` → `noite-meio` | `#0b1220` → `#172554` | faixa do topo e do rodapé (`.faixa-noturna`) |
| `corte` | `#38bdf8` | a linha de 4px que separa o escuro do claro |
| `marca` | `#1d4ed8` | preço, links, coluna do produto no comparativo |
| `marca-acao` | `#2563eb` | botão de compra |
| `economia` | `#047857` | quanto se economiza, e o traçado quando o preço cai |
| `desconto` | `#d00000` | o selo de % OFF |

**A faixa escura no topo é o que separa a página de um blog.** Ela abre e o
rodapé fecha com o mesmo gradiente, e a vitrine clara fica emoldurada entre as
duas. Antes disso o cabeçalho era branco sobre cinza e o Alisson resumiu bem:
"parece um blog não chamativo".

### A home no celular: o que empurra o produto pra fora da tela

⚠️ **Os atalhos de guia são uma tira que rola de lado, não uma grade que quebra
linha.** Com 4 guias de rótulo longo, o `flex-wrap` empilhava 4 botões de 48px
e o primeiro card começava fora da tela — reclamação dele em 11/09/2026. A tira
custa uma linha e **não cresce** quando entrar o 5º guia, que vai entrar:
publicar guia é a frente de SEO. Do `sm` pra cima volta a quebrar linha.

⚠️ **O rótulo do guia de decisão não corta no dois-pontos.** No guia de faixa
cortar é bom ("Melhor celular até R$ 1.500: qual comprar em 2026" vira um
rótulo limpo). Na decisão estraga: "Tela de celular: AMOLED ou LCD?" virava
"Tela de celular", que não diz pergunta nenhuma.

**O orçamento da dobra, pra quem for mexer:** cabeçalho ~175px + atalhos ~50px
+ título da vitrine ~80px + filtro ~74px. Tudo que entrar acima da grade sai do
espaço do primeiro card.

⚠️ **Verde e azul não são a mesma coisa aqui.** Azul é a marca; verde é
semântica de "isto é bom" — economia, queda de preço, o selo *Melhor* na
tabela do comparativo. Trocar o verde por azul apagaria essa distinção.

⚠️ **Nunca use `#3483fa` nem `#00a650`.** São o azul e o verde de marca do
**Mercado Livre**. A paleta que originou este visual trazia os dois, e foram
recusados: uma página de afiliado vestida com as cores da loja parece
propriedade oficial dela — problema com o programa de afiliados, e quem clica
achando que está no Meli perde a confiança que a marca "Verificado" existe
pra construir. O azul daqui é próximo o bastante para agradar e distante o
bastante para não confundir.

O card também nasceu dessa paleta — tag de categoria colorida, preço antigo e
atual colados, preço em 26px peso 900, botão em caixa alta. O que **não** veio
de lá foi o card vertical com foto grande: ele devolveria o problema de um
produto por tela. Veja `card-produto.tsx`.

Duas ideias da paleta original ficaram de fora de propósito: o **cronômetro
regressivo** (a página não sabe quando a oferta acaba — quem muda o preço é a
loja) e o **banner com vermelho de urgência**. As duas contradizem o nome do
site.

## Medição

Entrou em 08/09/2026. Até então o site estava no ar havia uma semana e
**ninguém sabia quantas pessoas entravam** — nem se alguém tinha clicado num
link de afiliado uma vez sequer.

**Vercel Analytics**, escolhido por não usar cookie: sem cookie não precisa de
banner de consentimento, e banner seria a primeira coisa que o visitante veria
no celular, em cima da vitrine que custou trabalho pra caber na tela.

Três eventos, em `src/app/medicao.tsx`:

| Evento | Responde |
|---|---|
| `oferta_clicada` | quantas visitas viram clique, em quais produtos e a partir de qual página |
| `comparativo_aberto` | se o comparativo puxa gente ou é enfeite |
| `filtro_usado` | que categoria as pessoas procuram de verdade |

**`oferta_clicada` é o único que liga o site ao dinheiro.** É o número pra
cruzar com os cliques que o painel de afiliado do Mercado Livre já mostra: se
os dois baterem, o caminho está inteiro; se a página contar mais cliques que o
Meli, alguma coisa quebra no meio.

**`filtro_usado` realimenta o robô.** A categoria mais filtrada é a que
deveria estar no `data/garimpo.json`.

O clique é capturado por **delegação num só lugar** (`MedirCliques`, montado no
`layout.tsx`), lendo `data-oferta`, `data-categoria`, `data-preco` e
`data-onde` do link. Foi assim pra os cards continuarem sendo componentes de
servidor — envolver cada botão num componente cliente mandaria o catálogo
inteiro pro navegador. Link novo que precise ser medido só precisa dos
atributos.

⚠️ **Nenhum dado pessoal vai nos eventos.** Só nome de produto e de onde saiu
o clique — o que já está público na própria página.

⚠️ **Evento personalizado não existe no plano Hobby da Vercel.** Conferido na
documentação em 08/09/2026: o grátis dá visita por página, 50 mil eventos por
mês e janela de relatório de **1 mês** — a contagem nunca para, mas só se
enxerga os últimos 30 dias. Os três eventos acima são enviados e descartados
até o projeto virar Pro.

⚠️ **No máximo 2 propriedades por evento**, mesmo no Pro. `oferta_clicada`
chegou a mandar quatro e foi cortado pra `produto` e `onde`: categoria e preço
dá pra descobrir no catálogo a partir do nome, `onde` não dá.

## O contrato do `data/produtos.json`

É a fonte única de verdade da página. **Editar esse arquivo é publicar
produto** — não existe painel, não existe CMS. A página lê do disco no build
(`lerCatalogo`) e revalida de hora em hora (`export const revalidate`).

```
{ "produtos": [ ... ], "metadata": { ... } }
```

Cada produto: `id` (número, único e estável), `nome`, `categoria`,
`preco_original`, `preco_atual`, `desconto_percentual` (inteiro),
`preco_no_pix` (booleano), `avaliacao`, `link_afiliado`, `cupom`, `descricao`,
`imagem`, `plataforma`, `meli_id`, `disponivel`, `data_adicionado`,
`verificado_em`.

**As chaves são sem acento** — foram normalizadas em 07/09/2026, quando eram
5 produtos. É JSON legal escrever `preço_atual`, mas obriga a carregar acento
em nome de propriedade no código e implica em ferramenta que espere
identificador ASCII — inclusive a automação de Instagram, que vai ler este
arquivo. Não volte atrás. O tipo `Produto` mora em `src/lib/produtos.ts` e é a
referência de quais campos existem.

Regras do arquivo:

- `cupom` é **cupom de desconto de verdade**, e nada mais. O painel de
  afiliados também mostra um "ID do produto" (tipo `HDDAJQ-17AY`), que serve
  pra colar no buscador do Meli — **não é cupom**. O catálogo original tinha
  esse ID no campo `cupom` e a página anunciava "Cupom: HDDAJQ-ZYTV" pra quem
  nunca conseguiria usar. Não repita.
- `cupom` e `imagem` são string vazia quando não tem. Nunca `null`, nunca
  ausente. Sem `imagem`, o card mostra "Sem foto do produto" e continua de pé.
- `desconto_percentual` é o que a loja anuncia. Pode dar 1 ponto de diferença
  do cálculo `1 - atual/original` porque o Meli arredonda pra baixo; mais que
  isso é erro e a página passa a mentir pro visitante.
- `preco_no_pix: true` quando o preço só vale no Pix — o card escreve "no Pix"
  do lado. Sem isso a página promete o que a loja não cumpre no cartão.
- `verificado_em` é a data em que **alguém abriu o link e olhou o preço**, e
  aparece no card. Não é a data em que o arquivo foi mexido.
- `meli_id` é o que o robô usa pra conferir: `MLB24076624` (produto de
  catálogo, o da URL `/p/`) ou `MLB-7547729432` (anúncio). Vazio significa
  "ninguém confere este preço" — e o robô diz isso em voz alta a cada rodada.
- `oculto: true` é a curadoria tirando da vitrine um produto que **continua à
  venda** — desconto que caiu abaixo do piso, por exemplo. Some da grade e do
  sitemap; a página fica no ar. ⚠️ **É campo separado porque `disponivel` é do
  robô:** em 09/09/2026 o suporte foi desligado à mão e a rodada do dia
  seguinte religou, porque a loja ainda o vendia. O robô nunca toca em
  `oculto`.
- `disponivel: false` tira o produto **da vitrine e do sitemap**, mas a página
  dele continua respondendo, dizendo que a oferta acabou e mostrando o
  histórico. Até 09/09/2026 ela devolvia 404, porque `generateStaticParams`
  usava `produtosVisiveis` — e URL que morre joga fora o que já tinha sido
  indexado. Sem oferta não há botão de compra nem declaração de afiliado: o
  caminho vira a vitrine. É o robô que liga e desliga; mexer na mão só se
  souber por quê.
  🔴 **O comparativo tinha exatamente o mesmo defeito, e só foi descoberto em
  17/09/2026**, quando o A36 saiu de verdade: `/comparativo/{slug}` passou a
  responder **404** — e essa URL estava na fila de indexação pedida em 16/09.
  Corrigido no mesmo dia (`generateStaticParams` e `buscar` usam o catálogo
  inteiro, como a ficha), e o comparativo ganhou o aviso "Esta oferta acabou"
  no lugar do botão de compra. **Concorrente do catálogo que ainda está à
  venda continua clicável na mesma página** — a comissão por outro caminho não
  se perde. ⚠️ **Se aparecer uma terceira página que liste produto por slug,
  confira isso nela antes de publicar**: o sintoma só aparece no dia em que um
  produto é desligado.
- `plataforma` em kebab-case (`mercado-livre`) — vira rótulo no botão.
- Datas em ISO (`2026-08-31`), e `metadata.ultima_atualizacao` acompanha.
- `metadata.conferido_em` é ISO **com hora** (`2026-09-08T14:51:05Z`): o
  instante em que a rodada do robô terminou. É a fonte do relógio que aparece
  no topo das três páginas — "Preço conferido há 7 horas · hoje às 11h51".
  Vazio faz o relógio sumir, em vez de inventar um horário.

### A armadilha dos links do Mercado Livre

Gerar o link **adiciona o produto à lista "Minhas recomendações"** do Perfil
Social, e o `meli.la/...` resultante cai em `mercadolivre.com.br/social/`:
leva ao **perfil**, com o produto em destaque e um botão "Ir para produto".
Um clique a mais, e a comissão é creditada.

**E não existe alternativa.** Testado em 07/09/2026 direto no gerador: o
"Gerador de produtos recomendados" é a ferramenta oficial, e tanto o link
curto quanto o "link completo" apontam pra `/social/`. Quem procurar de novo
vai gastar o mesmo tempo pra chegar na mesma resposta.

⚠️ **Daí o modo de falhar:** produto que sai da lista "Minhas recomendações"
deixa o link apontando pro perfil sem ele — foi o que aconteceu com o robô
aspirador (id 1), cujo link caía num perfil vazio. Não esvazie a lista no Meli
sem tirar os produtos correspondentes daqui.

O lado bom: a `og:image` dessas páginas do Meli é a foto do produto em
destaque, e foi de lá que saíram as primeiras imagens do JSON.

## O robô de preços

Toda manhã, `conferir-precos.yml` reconfere cada produto na API do Meli.
Rodar na mão: `npm run precos:conferir`.

⚠️ **Ele escreve três arquivos**: `produtos.json`, `historico.json` e o
`relatorio.json` que a Action lê. Entre 07 e 08/09/2026 faltava o
`writeFileSync` do histórico — o script acumulava na memória e não gravava, o
`git add` não via mudança e ninguém reclamava. Resultado: um ponto por
produto, gráfico e selo de menor preço nunca apareceram. **Se o gráfico sumir,
é a primeira coisa a checar.**

⚠️ **"Toda manhã", não "às 8h".** O cron pede 11:00 UTC, mas o agendador do
GitHub atrasa horas: em 08/09 saiu às 14:51 UTC. Por isso o robô grava
`metadata.conferido_em` com data e hora, e é essa hora que a página mostra.
Nunca prometa horário cravado ao visitante.

⚠️ **Actions não abrem pull request por padrão** — falha com *"GitHub Actions
is not permitted to create or approve pull requests"*. A opção foi ligada em
10/09/2026 em Settings → Actions → General → Workflow permissions. Se voltar a
falhar, é ali. O branch fica íntegro e dá pra mergear à mão.

**Por que API e não raspagem.** Pedir a página por HTTP puro devolve
*suspicious traffic*, mesmo de IP residencial — num runner do GitHub é
certeza. A API responde de qualquer lugar, com token.

⚠️ **O refresh_token do Meli é de uso único.** Cada renovação mata o anterior.
Por isso `scripts/acesso.ts` grava o novo **antes de qualquer outra coisa** e o
passo que reescreve o segredo roda com `if: always()`.

⚠️ **Quem é dono do refresh token é a Action.** Rodar
`npm run precos:conferir` na máquina **invalida o que o GitHub tem** e quebra
a rodada seguinte. Se rodar local, refaça a autorização e recadastre
`ML_REFRESH_TOKEN`.

Segredos (Settings → Secrets → Actions): `ML_CLIENT_ID`, `ML_CLIENT_SECRET`,
`ML_REFRESH_TOKEN` e um `GH_PAT` com permissão de escrever segredos — sem o
PAT o token não rotaciona e o robô funciona exatamente uma vez.

As travas, que são o motivo de ele poder commitar sozinho:

| Situação | O que ele faz |
|---|---|
| Preço mudou até 15% | Aplica e commita na `main` |
| Mudou mais que 15% | **Só esse produto** vai pro PR; o resto da rodada publica na main. Produto `oculto` nunca é suspeito |
| Pausado, sem estoque ou 404 | `disponivel: false`, some da página |
| 404 em `/products/{id}/items` | "sem oferta ativa" — a página existe, ninguém vende |
| API instável ou erro | **Não mexe em nada** e a Action fica vermelha |
| Sem `meli_id` | Não confere, avisa no relatório |

🔴 **404 da API não prova que o produto acabou.** Em 16/09 a rodada das 15h
desligou o **A36** e o **OPPO A6t** dizendo "sumiu do Meli", e os dois estavam
à venda — o A36 a R$ 1.649, conferido no navegador. Rodada nova no mesmo dia
(`workflow_dispatch`, pelo GitHub) trouxe o A36 de volta com o preço certo:
**foi falha passageira da API**. O OPPO ficou de fora por 404 em
`/products/{id}/items`, que é outra coisa — catálogo sem nenhuma oferta ativa.
**Se um produto sumir da vitrine sem motivo, rode o workflow à mão antes de
mexer no JSON**: a rodada seguinte costuma corrigir sozinha.

⚠️ **Em 17/09 o mesmo A36 caiu de novo — e desta vez o robô estava certo.**
A rodada das 15h24 UTC desligou o aparelho; a rodada #13, disparada à mão às
17h30 UTC, **manteve desligado**. Aí a conferência no navegador deu o motivo:
`mercadolivre.com.br/p/MLB47115842` responde **"Este produto está indisponível.
Por favor, escolha outra variação."** — a variação preta 128 GB que
acompanhamos ficou sem oferta ativa. Nada a corrigir no JSON.

**A regra que fica, e é a lição das duas vezes juntas:** rodar o workflow à
mão é o primeiro passo, não a resposta. **Se a segunda rodada mantiver o
produto desligado, abra a página do Meli antes de concluir qualquer coisa** —
em 16/09 a rodada nova trouxe o A36 de volta (era a API falhando), em 17/09
manteve (era a oferta que acabou mesmo). O sintoma no JSON é idêntico; só a
página distingue.

⚠️ **Rodar o workflow à mão pelo GitHub, sem `gh` na máquina:** não existe `gh`
instalado aqui (conferido em 17/09). O caminho é o Chrome logado dele —
Actions → Conferir preços → *Run workflow*. O botão verde de confirmação não
aparece por `find`: pegue-o pelo `read_page` com `filter: interactive` (é o
`button type="submit"` logo abaixo do genérico "Run workflow").

🔴 **O PR de suspeitos pode ficar velho e virar armadilha.** Em 18/09 o robô
abriu o PR 15 com três preços de variação grande. **Mergear teria apagado os
três produtos publicados naquele dia** (A17 e os dois kits de potes), porque o
branch partiu de um `main` anterior a eles. O certo foi: conferir os três na
página do Meli, aplicar os valores à mão no `main` atual e deixar o PR para ser
fechado sem merge. **Sempre olhe a data do branch antes de mergear** — quanto
mais produto novo entra no dia, mais o branch atrasa.

⚠️ **Rodar o workflow à mão é seguro, rodar `npm run precos:conferir` na
máquina não é** — o segundo invalida o refresh token do GitHub (ver acima).
Actions → Conferir preços → *Run workflow*.

⚠️ **Até 15/09/2026 um suspeito segurava a rodada inteira.** Em 14/09 o
suporte de monitor (oculto) caiu 58%, tudo foi pro PR e o A36 ficou dois dias
no site a R$ 1.435 com a loja a R$ 1.499 — e o relógio "conferido há" parou.
Agora o script grava `produtos.json` com os suspeitos no preço de ontem e
`produtos-com-suspeitos.json` (fora do Git) pro PR. **Se o relógio do site
parar, procure branch `robo/precos-*` esperando merge.**

Ele nunca marca `preco_no_pix` (a API dá preço de tabela) e não toca em
`nome`, `descricao`, `categoria`, `avaliacao`, `analise` nem `oculto` — isso é
curadoria.

## A curadoria: como produto entra na página

**Não existe API oficial de afiliados do Mercado Livre.** O programa não expõe
geração de link, e não é falta de procurar. Existem serviços de terceiros que
usam cookie/sessão da conta de afiliado — **não usar**: é a conta que recebe a
comissão.

A corrente é automática dos dois lados e manual no meio:

1. **Garimpo diário** (`garimpar.yml`, 10h de Brasília) escreve
   `data/candidatos.json`, abre uma issue com a fila e para por aí. Filtro em
   `data/garimpo.json`: desconto ≥ 20%, preço de R$ 100 a R$ 2.500, no máximo
   10 por dia. Categoria pode ser **nome** de primeiro nível ou **id**
   (`MLB14370`) de qualquer nível; o que não resolve é pulado com aviso.
   ⚠️ **`foco` e `desconto_minimo_do_foco` saíram do JSON em 11/09**, com a
   reabertura do escopo: a fila volta a ser ordenada só por desconto.
   `scripts/garimpar.ts` ainda lê os dois campos e roda sem eles
   (`config.foco ?? []`) — basta devolvê-los se o foco voltar. O que segue
   valendo é a lição sobre **subcategoria**, abaixo.
   ⚠️ **`desconto_minimo_do_foco` (15%) é o piso só das categorias de foco.**
   Fora do foco continua 20%. O topo de Celulares e Telefones quase nunca bate
   20%, e fila sem celular nenhum não serve ao assunto da página. Decisão do
   Alisson em 10/09/2026, escolhida no lugar de entrar por subcategoria.
   O log do garimpo agora diz **por categoria** por que cada candidato caiu
   (preço, desconto, já sugerido) — é por ali que se confere se o piso resolveu.
   ⚠️ **O foco é `MLB1055` (Celulares e Smartphones), não `Celulares e
   Telefones`.** Trocado em 11/09/2026: o piso de 15% funcionou e trouxe três
   candidatos da categoria — carregador, power bank e power bank, R$ 147 a
   R$ 160, **nenhum celular**. `MLB1051` é guarda-chuva (acessório, capinha,
   smartwatch, telefone fixo) e seus mais vendidos são acessório barato. Mesma
   armadilha de Informática, mesma solução: subcategoria. **Baixar o piso e
   entrar por subcategoria não eram alternativas — eram as duas metades da
   correção.**
2. **O link é gerado à mão** no Linkbuilder, no Chrome logado do Alisson, numa
   sessão com o Claude dirigindo.
   🟢 **O Linkbuilder aceita a fila inteira de uma vez — descoberto em
   17/09/2026.** Endereço:
   <https://www.mercadolivre.com.br/afiliados/linkbuilder> (o nome na tela é
   "Gerador de produtos recomendados"). O campo diz *"Insira 1 ou mais URLs
   separados por 1 linha"*: cola-se o bloco de URLs que o e-mail das 16h12
   manda, escolhe-se a etiqueta `alisson580` e um clique em **Gerar** devolve
   todos os `meli.la` de uma vez, na **mesma ordem da entrada** (conferido
   abrindo o 1º e o 12º link). Até então ele fazia um por um, voltando ao chat
   a cada link — 12 idas e voltas viraram uma.
   ⚠️ **Leia os links do DOM, não do screenshot**: `meli.la/1bChrpF` e
   `meli.la/1bChrpE` são indistinguíveis numa imagem, e link trocado manda o
   clique pro produto errado. O valor está no `<textarea>` do painel direito.
3. **O resto volta a ser automático**: card, publicação, conferência diária.

`candidatos.json` não é catálogo — nada dali aparece no site. Candidato vira
produto quando ganha `link_afiliado`, `analise` e entra no `produtos.json`.

### O lembrete diário dos links (rotina na nuvem)

Criada em 16/09/2026, quando ele topou **gerar até 20 links por dia** pra
engordar o catálogo antes da Black Friday. Por isso o `limite_diario` do
`data/garimpo.json` subiu de 10 para 20 e entrou "Casa, Móveis e Decoração".

- **Rotina `trig_013Qa6WXrWCGCpbcCVhyBj9r`**, todo dia **16h12 de Brasília**
  (`12 19 * * *` em UTC): lê `data/candidatos.json` do repo e **manda e-mail
  pro `alisson580@gmail.com`** com a fila e as URLs cruas. Painel:
  <https://claude.ai/code/routines/trig_013Qa6WXrWCGCpbcCVhyBj9r>
- ⚠️ **Não adiante o horário.** Nasceu às 11h12 e não servia: o garimpo pede
  as 10h no cron, mas o agendador do GitHub entrega entre **13h54 e 15h27 de
  Brasília** (commits de 13 a 16/09). Antes disso a fila do dia não existe, e
  o lembrete sai sempre com a de ontem — que a própria rotina descarta.
- ⚠️ **Ela só envia se `garimpado_em` for a data de hoje em UTC.** Fila do dia
  anterior não vira e-mail — é de propósito, pra não lembrar duas vezes da
  mesma fila. Se o garimpo falhar de manhã, não chega e-mail nenhum.
- ⚠️ **Rotina roda na nuvem, não na máquina dele**: não enxerga nada local, e
  o prompt precisa ser autossuficiente. Ela só lê e avisa — não commita.
- A issue diária do garimpo continua existindo; o e-mail é o lembrete que
  chega no celular sem ele procurar.
- `scripts/corpo-da-issue.mjs` agora fecha com **um bloco só de URLs**, uma
  por linha, pra abrir as 20 de uma vez em vez de caçar link no texto.

### A memória, que é o que faz o diário funcionar

Os "mais vendidos" mudam devagar; sem memória a fila se repetiria e o Alisson
pararia de olhar. `data/garimpo-memoria.json` guarda o que já foi sugerido
(`src/lib/garimpo-memoria.ts`):

| Situação | O que acontece |
|---|---|
| Já no `produtos.json`, ou mesma **família** | Nunca mais é sugerido |
| Já sugerido, preço parecido | Não repete — **silêncio conta como "não"** |
| Já sugerido e caiu 15%+ | Volta: é oferta nova |
| Sugerido há 60+ dias | Volta: o mercado é outro |

⚠️ **Memória e fila entram no mesmo `git add`.** Se o commit da memória
falhar, o garimpo de amanhã repete o de hoje.

⚠️ **O mesmo produto tem vários ids no Meli.** Soundcore P20i é `MLB38302175`
e `MLB43397587`; o WAP GTW 10 é `MLB8923630` e `MLB8923631`. Por isso o campo
`familia` (`family_name` → `grouper_id` → `catalog_product_id`): é o agrupador
do próprio Meli. Comparar nome seria chute — os títulos dos duplicados quase
não se parecem. Produto antigo tem `familia: ""` e o robô preenche na primeira
passagem.

⚠️ **Categoria que rende pouco: desconfie do topo dela, não do filtro.**
Informática deu zero duas vezes porque seus mais vendidos são papel A4,
filamento 3D e gift card — abaixo do piso de R$ 100. A solução foi entrar por
subcategoria: `MLB14370` monitores, `MLB430598` armazenamento, `MLB454379`
periféricos, `MLB430687` portáteis.

⚠️ Os dois workflows renovam o mesmo token de uso único e compartilham
`concurrency: group: meli-token`. Rodando junto, um invalida o outro.

**Curadoria à mão em todo produto novo:** `nome` e `descricao` encurtados (o
título da API tem 200 caracteres e não cabe no card), `avaliacao: 0` quando
ninguém conferiu a nota (o card esconde a linha), e os parágrafos de
`analise`.

### Ler a ficha do anúncio sem levar 403

Descoberto em 17/09/2026, para escrever a `analise` de 7 produtos de uma vez.
`curl` na página do Meli dá **403** (é a mesma proteção que obrigou o robô a
usar a API). O que funciona: no Chrome logado, estando **em qualquer página do
`mercadolivre.com.br`**, rodar `fetch` para a URL do produto — é same-origin,
usa a sessão dele e vem o HTML inteiro. Dali saem os pares de especificação
(`.ui-vpp-highlighted-specs__key-value` e `.andes-table__row`), a nota e o
bloco de preço (`.ui-pdp-price`).

⚠️ **Espace 1,5 a 2 segundos entre os produtos.** Rajada pela sessão dele é o
mesmo risco que levou 429 no Reddit em 10/09 — e aqui a conta em jogo é a que
recebe comissão.

⚠️ **A ficha do anúncio é fonte para `analise`, não para tabela de
comparativo.** Comparativo continua exigindo a página do fabricante: o anúncio
erra e se contradiz (veja a câmera "4K" abaixo).

### 🔴 O preço da API não é o preço que a loja anuncia

Medido em 17/09/2026, produto a produto: o Meli mostra em destaque o **preço
no Pix** e, menor, o valor "em outros meios" — que é justamente o que a API
devolve. No A36: página **R$ 1.399 (46% OFF) no Pix**, API **R$ 1.544,32
(41%)**. No micro-ondas: R$ 508,32 no Pix contra R$ 524,04.

**Cadastre sempre com o número da API**, que é o do garimpo. Razão técnica, e
não de gosto: `conferir-precos.ts` **força `preco_no_pix = false`** e recalcula
`desconto_percentual` a cada rodada — cadastrar o preço do Pix seria desfeito
na manhã seguinte, deixando a página com um desconto que não bate com preço
nenhum. O site mostrando o valor do cartão é o lado seguro: quem paga no Pix
encontra menos do que esperava, nunca mais.

⚠️ **Por isso nenhum produto do catálogo tem `preco_no_pix: true`** — o campo
existe, mas só serviria se o robô parasse de mexer nele.

### 🔴 A linha vermelha de "deixar o site mais viciante"

Pedido dele em 18/09/2026, e a resposta pesquisada — **porque o caminho óbvio
mata o site**. Estes quatro estão na mira explícita das políticas de spam do
Google de 2026, e o primeiro contradiz o nome da marca:

- **Cronômetro de oferta** e **"restam 2 unidades"**: não sabemos quando a
  promoção acaba nem quanto há em estoque. Contagem inventada é o exemplo de
  manual de padrão enganoso. (Já estava proibido desde a paleta original.)
- **Ficha em massa sem julgamento**: é a definição de *thin affiliate*. **71%
  dos sites de afiliados perderam posição no core update de março/2026** — é a
  categoria mais atingida do ano.
- **Pop-up que sequestra a saída**: virou política de spam nomeada em 2026.

**O que prende leitor sem cruzar a linha**, e é o que foi implementado: dizer
onde o produto perde, responder por perfil antes da prova, e deixar o botão
alcançável sem rolar de volta. ⚠️ **Se algum dia a conversa voltar a "deixa
mais agressivo", é esta seção que responde.**

### O que reprova um candidato (casos reais de 17/09)

Dos 12 links gerados, **5 não viraram produto**. Os motivos valem de régua:

- **O anúncio se contradiz.** A câmera "Wi-Fi 4K" tem, na ficha do próprio
  anúncio, `Tipo de resolução: Full HD`. Num site chamado Verificado, esse é
  o produto que não entra — e o motivo não é o preço, é a contradição.
- **O preço "de" é inflado.** SSD SATA de 240 GB de marca desconhecida a
  R$ 231,79 "com 29% de desconto", numa faixa em que os conhecidos custam
  bem menos: o desconto existe só contra um preço de tabela que ninguém cobra.
- **Já temos um igual.** Suporte articulado de monitor — o catálogo tem um,
  hoje `oculto`. E dois liquidificadores na mesma fila: entrou o de marca e
  potência maior, o outro ficou.
- **Fora do assunto do site.** Mochila de viagem, ainda que com saída USB.

**Link gerado que não vira produto não é desperdício** — ele só fica na lista
"Minhas recomendações" do perfil. O que **não** se pode é esvaziar essa lista
sem tirar do site os produtos correspondentes (o link passa a apontar para um
perfil sem o produto).

## Ser achado: busca e IA

Cada produto tem **URL própria** (`/produto/{slug}-{meli_id}`) com
`schema.org` de `Product`/`Offer`. O `meli_id` no fim do slug é de propósito:
`nome` é curadoria e muda, e sem o id reescrever um título quebraria uma URL
indexada.

`priceValidUntil` é o dia seguinte à conferência — o preço vale até a próxima
checagem. `robots.ts` libera tudo, **inclusive rastreador de IA**, e o layout
manda `max-image-preview: large` (requisito do Google Discover).

⚠️ **A foto do Meli tem 719px de largura no maior tamanho** — abaixo dos
1200px que o Discover pede. Quem cumpre é a capa gerada em
`opengraph-image.tsx` (1200×630). Não adianta procurar variante maior.

⚠️ **Nunca esconda o preço atrás de clique.** IA cita fato; sem preço na
página não há fato pra citar. Mostrar coisa diferente pro robô e pra pessoa
(*cloaking*) tira o site do índice.

⚠️ **Texto visível ganha de JSON-LD na hora da citação.** Assistente de IA lê
o HTML renderizado — um `<path>` de SVG não diz preço nenhum. Por isso o
histórico aparece como frase (`fraseDoHistorico`) além do gráfico, e por isso
todo produto tem `analise`.

O botão do card vai **direto pra loja**. A página do produto é porta de
entrada de busca, não degrau do funil.

`/como-conferimos` explica o robô, com marcação `FAQPage`. É o ativo que
ninguém copia — qualquer um lista ofertas, ninguém tem o histórico.

### `/quedas-de-preco` — o motivo de voltar amanhã

No ar em 18/09/2026, do plano do relatório "O ativo é o histórico".
`src/lib/quedas.ts` acha as quedas, `src/app/quedas-de-preco/page.tsx` mostra.

**Por que ela é diferente de tudo o que existe aqui:** guia e comparativo
dependem do Google trazer alguém. Esta página é para quem **já conhece o site**
e quer saber o que mudou — é o mecanismo que transformou rastreador de preço em
hábito diário para muita gente. O material já existia desde 07/09; só não
estava dito em lugar nenhum além do gráfico de cada ficha.

- **Duas janelas:** queda entre as duas últimas conferências, e queda em 7 dias
  para quem não caiu de ontem para hoje. Quem aparece numa não repete na outra.
- **Toda queda mostra as duas pontas com data.** ⚠️ Se o robô falhar um dia, a
  comparação passa a ser com o último dia que existe — e a página mostra essa
  data em vez de fingir que foi ontem.
- **Nunca usa o preço riscado da loja**, e isso está escrito na página: aquele
  valor é escolhido por quem vende.
- ⚠️ **Quando nada cai, ela diz que nada caiu.** É o oposto de inventar
  movimento, e é o que faz o dia de queda valer alguma coisa.
- `data-onde="quedas"` nos cliques, para dar para medir se a página rende.
- Primeiro atalho da home, à frente da Black Friday, e no sitemap com
  `changeFrequency: daily` — é a página do site que mais muda.

### Guias de faixa

Em `/guia/{slug}`, de `data/guias.json`. O primeiro é
`/guia/celulares-ate-1500`, escrito em 10/09/2026.

**Ordena por perfil de quem compra, não por nota** — "quero que dure anos",
"o orçamento manda", "eu jogo". Foi a forma escolhida pelo Alisson entre
tabela única e ranking cru: quem digita "melhor celular até 1500" ainda não
sabe qual especificação importa pra ele, e ranking único mentiria (o G86 ganha
do A36 pra jogo e perde em durar anos).

- ⚠️ **A ficha de cada perfil é copiada palavra por palavra dos
  comparativos**, e o `npm run fichas` confere o guia junto. Número novo aqui
  é número que ninguém verificou na fonte do fabricante.
- **Nenhum preço no arquivo**: mesmos marcadores do comparativo, resolvidos
  por perfil contra o produto daquele perfil (`comTextoDeHoje` de
  `guias.ts`) — o marcador de um aparelho não pode vazar pro texto do outro.
- **Aparelho de fora do catálogo entra sem preço**, dizendo "não acompanhamos".
  Quatro dos seis do primeiro guia são assim, e o rodapé diz isso.
- **`quando_nao` é obrigatório em todo perfil.** Guia que só elogia não merece
  citação — mesma regra da tabela que mostra onde o produto perde.
- Marcação é `Article` com `citation` **mais um `ItemList`**: a ordem dos
  perfis é a substância da página e não se lê de um parágrafo.
- Guia é curadoria, como o comparativo: **nenhum robô escreve um**.

### Perguntas na ficha de produto

Campo `perguntas` (opcional) no `produtos.json`: 2 a 4 perguntas com resposta
curta, em texto visível **e** `FAQPage`. Escritas em 10/09/2026 para os 15
produtos — 49 no total.

⚠️ **Nasceu de um diagnóstico corrigido no meio do caminho.** O plano era
"engordar as fichas que o Google recusou", até abrir as 15 `analise` e ver que
todas já tinham 500 a 900 caracteres de "pra quem serve / quando não comprar".
**Não é falta de texto que faz o Google recusar ficha de commodity** — é o
molde. Mais parágrafo dizendo o mesmo seria enchimento. O que faltava era
julgamento **em formato de pergunta**, que é o que a pessoa digita.

- ⚠️ **Pelo menos uma resposta por produto tem que ser "não"** ("serve para
  academia?" → não). FAQ que só elogia é o mesmo problema do comparativo que
  só elogia.
- **Nenhum número novo entra por aqui**: tudo saiu da `analise` e da
  `descricao` que já estavam no catálogo.
- É curadoria: **o robô nunca escreve uma**. Ele preserva o campo porque muta
  o objeto lido, não remonta o produto — vale lembrar disso se alguém
  reescrever `conferir-precos.ts`.

### Guias relacionados na ficha

`src/app/guias-relacionados.tsx`, no fim da ficha e do comparativo. Até
10/09/2026 **guia só era alcançado pela home** — e as fichas, que o Google
rastreia todo dia, não levavam a lugar nenhum.

⚠️ **A relevância é por categoria (`Celulares`), não por slug escrito no
componente.** Guia novo de celular aparece sozinho em toda ficha de celular.
Lista de slug no código seria uma lista para alguém esquecer de atualizar.

### Black Friday 2026 — a aposta sazonal

Decidida em 16/09/2026. **A data é 27/11/2026**, e a aposta tem prazo: página
publicada até meados de outubro tem chance no Google; em novembro, não tem.

⚠️ **O ângulo não é "promoções", é "o desconto é real?".** Disputar
*promoções da black friday* contra Promobit, Buscapé e portal de notícia com
12 páginas indexadas é gastar dez semanas pra ficar na página 5. O que só nós
temos é **o preço de cada dia desde 07/09/2026** — na Black Friday serão ~82
dias por produto. É a metade da promessa do nome do site que ainda não tinha
sido usada, e casa com o filtro de 30/60/90 dias do gráfico.

- **`/black-friday`** (`src/app/black-friday/page.tsx`): tabela montada do
  histórico — menor e maior valor **que nós mesmos vimos**, com data, e selo
  de quem está no menor preço hoje. Produto entra depois de 2 dias de
  conferência. `FAQPage`, no sitemap, e **primeiro atalho da home**.
  ⚠️ **URL perene, sem ano**: em 2027 a mesma página é reescrita e a
  autoridade não se perde. Depois de 27/11 tirar o atalho da home (a página
  fica no ar).
- **Três guias por categoria**, no molde de decisão (o que o Google já
  indexou 3 vezes aqui): `vale-esperar-black-friday-celular`,
  `-monitor-e-notebook`, `-controle-de-videogame`.
- ⚠️ **O atalho da home agora usa `href`, não `slug`** — antes montava
  `/guia/{slug}` fixo, e a Black Friday não mora em `/guia`.

### Guias de decisão

Em `/guia/{slug}`, de `data/decisoes.json` — **mesmo endereço do guia de
faixa**, formato diferente. O primeiro é `/guia/quanto-de-memoria-no-celular`,
escrito em 10/09/2026.

Responde **pergunta de especificação** ("128 ou 256 GB?", "4, 6 ou 8 GB de
RAM?"), não "qual aparelho comprar". Existe porque o molde do guia de faixa é
por perfil → um aparelho, e nessa pergunta a resposta é uma *configuração*: no
molde antigo os mesmos dois celulares se repetiriam em cada seção.

- **A resposta vem em uma frase, em texto visível, antes da explicação**
  (`resposta_curta`). É o que a IA cita — a mesma regra de sempre: texto
  visível ganha de JSON-LD.
- **O catálogo aparece uma vez só, no fim**, em `exemplos` — topo de funil de
  propósito, quem digita isso não sabe o nome de aparelho nenhum. `data-onde`
  do clique é `guia-decisao`.
- **`cuidado` é obrigatório em toda pergunta**, como o `quando_nao` do guia de
  faixa.
- Marcação é `Article` com `citation` **mais um `FAQPage`** — a página é
  literalmente pergunta com resposta curta.
- **Nenhum preço no arquivo**: só a `nota` do exemplo aceita os marcadores.
- A `ficha` de cada exemplo é copiada palavra por palavra dos comparativos, e
  o `npm run fichas` confere junto.
- ⚠️ **Slug repetido entre `guias.json` e `decisoes.json` é erro de
  curadoria**: `generateStaticParams` soma os dois e a decisão ganha.

### Comparativos

⚠️ **Antes de escrever um, veja se o produto já é coluna de outro.** O
comparativo do A36 já trazia o G17; repetir o par daria a mesma tabela. O que
rende página nova é o produto **pelo ponto de vista dele**, contra os rivais da
faixa *dele* — foi assim que o G17 ganhou a própria página, contra A16, Redmi
14C e G15, com o A36 como o degrau acima.

⚠️ **Ficha oficial nem sempre se deixa ler por `WebFetch`.** Em 10/09/2026,
para montar um guia da faixa de R$ 1.500 a 2.500: a loja da Samsung trunca a
seção de especificações (o A56 só entregou tela, bateria, IP67 e as 6
atualizações), `poco.net` redireciona para `po.co` e morre, e URL de produto
chutada dá 404. **O que funcionou foi a página oficial da Motorola**, que veio
completa. Quando a fonte não abre, ou o número fica "Não divulgado" ou o
aparelho fica de fora — nunca de agregador.

⚠️ **Ficha se confere na fonte do fabricante, nunca de memória nem de
agregador.** Onde o fabricante não divulga, a célula diz "Não divulgado" — chute
numa tabela é o mesmo que preço errado. `npm run fichas` guarda a consistência
entre páginas, não a verdade de cada número: essa é de quem escreve.



Em `/comparativo/{mesmo slug do produto}`, um por `meli_id` em
`data/comparativos.json`. O alvo é quem digita "A36 vale a pena". O brief de
09/09/2026 fez dele o **formato-padrão**, meta de um por semana.

### Quando o anúncio morre e a página fica

Criado em 17/09/2026, quando o anúncio do A36 saiu do ar e outro, do mesmo
celular, entrou no catálogo com `meli_id` novo. O comparativo do A36 é URL
indexada: reescrevê-lo no id novo criaria endereço novo e jogaria fora o
rastreamento.

**Como funciona:** o comparativo aceita `tambem: ["MLB..."]` — outros anúncios
**do mesmo aparelho**, em ordem de preferência. A página continua sendo achada
pelo produto do `meli_id` original (slug, canonical e nome saem dele), mas
**preço, desconto, foto, botão e os marcadores `{preco}` saem do primeiro
anúncio da lista que estiver à venda**. Uma linha discreta avisa o visitante
de que o anúncio acompanhado saiu do ar e o preço é de outro do mesmo
aparelho. Sem nenhum vivo, volta o aviso "Esta oferta acabou", sem botão.

⚠️ **Quem afirma que dois anúncios são o mesmo aparelho é a curadoria, no
arquivo — nunca o código.** Duas alternativas foram descartadas com medição:
casar por `familia` **não funciona** (o agrupador do Meli veio diferente para
os dois A36: `"Samsung Galaxy A36 5g"` e `"Samsung Galaxy A36 5G 5G Dual
SIM"`), e casar por nome normalizado juntaria um 128 GB com um 256 GB — preços
diferentes na mesma página.

⚠️ **O produto antigo continua no `produtos.json`**, desligado. É ele que
sustenta a URL: apagá-lo faria a página voltar a 404.

⚠️ **Comparativo é sempre pedido explícito do Alisson.** Nenhum robô escreve
um. Curadoria assinada por robô é o que tira a autoridade da página.

⚠️ **No celular a ficha não é tabela — são blocos, um por critério.** Decidido
em 11/09/2026, com um print dele na mão. A tabela deslizante fixava a coluna de
critérios em 14rem (mais de metade de uma tela de 390px) e usava fundo
semitransparente (`bg-slate-50/95`): o conteúdo que rolava aparecia **por baixo**
do texto — "R$ 887,78" escrito em cima da nota da linha. Cada critério virou um
bloco com um modelo por linha; do `lg` pra cima a tabela volta, porque lá ela
cabe. **As duas versões saem da mesma lista `linhasDaFicha`** — montagem
separada é como os dois formatos passariam a divergir. ⚠️ Fundo de coluna fixa
nunca leva alfa.

- **Nenhum preço fica escrito no arquivo**, nem na tabela nem na prosa. A
  tabela monta do `produtos.json`; a prosa usa marcadores `{preco}`,
  `{preco_original}`, `{desconto}`, `{economia}`, `{data}`, resolvidos por
  `comTextoDeHoje`. Aconteceu no primeiro dia: o robô mudou o preço às 8h e o
  texto continuou dizendo "44% de desconto". Marcador desconhecido fica
  visível na página, de propósito.
- **Concorrente de fora mostra "não acompanhamos"** em vez de preço: valor de
  rival ninguém reconfere.
- **Concorrente que está no catálogo entra clicável** — a mesma página pode
  gerar comissão por dois caminhos.
- **A tabela mostra onde o produto perde.** Comparativo que só elogia não
  convence e não merece citação.
- `vencedores` é lista (empate é comum) e cada linha tem uma `nota` dizendo
  por que aquilo importa.
- Marcação é `Article` com `citation`, **não `Review` com nota** — nota que
  ninguém mediu é preço inventado em outra linguagem.

## 🔴 Os termos do programa de afiliados (lidos em 15/09/2026)

<https://www.mercadolivre.com.br/ajuda/30228>. Lidos quando ele perguntou se
podia usar o vídeo do anúncio num reel. **Três cláusulas batem de frente com
o que o site já faz, e nenhuma foi resolvida ainda** — decisão dele:

| Cláusula | Diz | Bate em |
|---|---|---|
| **5.3** | Afiliado "não poderá fazer qualquer publicidade **comparando** os produtos… com qualquer produto, seja de empresa concorrente ou não" | Os comparativos e os guias — o formato que abre índice |
| **5.4** | Nas postagens com link, "só poderá mencionar as informações previstas expressamente nos anúncios" | As `analise` com dado de fabricante que o anúncio não traz (ex.: "4 GB reais" do OPPO) |

🟡 **Decisão do Alisson em 16/09/2026 sobre 5.3 e 5.4: seguir escrevendo
comparativo e guia.** O argumento dele: o site não tem tráfego, ninguém vai
reparar agora, e o formato é o único que abre índice — quando as coisas
andarem, revisa. **Não é esquecimento, é risco aceito com informação na mão.**
⚠️ O que fica combinado: **quando o tráfego começar a aparecer** (primeiras
vendas, ou o painel do Meli acusando volume), **retomar esta decisão** — o
risco não é multa, é perder a conta que recebe a comissão.
| **1.3** | Só conta como Mídia (e só gera pagamento) o site/rede **informado ao ML antes** | 🟢 **Resolvido**: em Perfil de afiliado → Contas vinculadas estão `Instagram verificadoagorabr` e `https://verificadoagora.com.br/` (conferido 15/09) |

**Placar do painel em 15/09/2026:** 7 a 13/09 → **19 cliques** (+1800% sobre a
semana anterior), **0 compradores, 0 vendas**. É o primeiro número real de
clique vindo do site.

- **Vídeo do anúncio: não.** 9.2 não dá direito sobre conteúdo que não foi
  expressamente liberado; 9.5 põe na conta do afiliado qualquer obra de
  terceiro (fotografia inclusive); 4.3(c) proíbe coleta automatizada de
  "materiais criativos". O único material liberado é o que o ML
  **disponibilizar** ao afiliado (1.7) — conferir se o painel oferece.
- **5.1 pede sinalização de publicidade no padrão CONAR** (Guia de
  Influenciadores) em todo conteúdo com link — "Link de afiliado" na legenda
  pode não bastar; CONAR costuma pedir `#publi`/"publicidade".

## Dinheiro

Três regras que não são de estilo:

1. **Todo link é de afiliado, e isso é declarado.** No rodapé da página e na
   legenda de todo post. É exigência do próprio programa de afiliados e é o
   mínimo de honestidade com quem clica. Nunca tire.

   Em 08/09/2026 o aviso **encolheu, não sumiu**: saiu a caixa do topo da
   vitrine e os parágrafos longos viraram uma linha em cada rodapé — "Links
   de afiliado · você paga o mesmo preço". Se alguém pedir de novo pra "tirar
   o aviso de afiliado", é esta linha que está em jogo, e ela fica.
2. **Produto não entra sem parágrafo original.** O campo `analise` do
   `produtos.json` tem 2 a 3 parágrafos escritos à mão: pra quem serve e
   quando **não** comprar. Página com preço e botão e mais nada é o que a
   política de spam do Google chama de *thin affiliate*. Vale mesmo quando o
   robô achou uma oferta ótima — e é o motivo pelo qual **catálogo grande não
   é meta**: mais URL sem texto não traz tráfego, atrapalha.
3. **Preço e cupom envelhecem.** Não anuncie desconto sem conferir no link
   antes. Produto com preço errado queima a confiança, que é o único ativo
   desta página.
4. **`link_afiliado` sempre com o tracking do Alisson.** Link limpo entrega o
   clique de graça.
5. **Nunca use `meli.la` em rede social.** Encurtador em pin do Pinterest ou
   post é sinalizado como spam. Nas redes o destino é sempre uma página do
   próprio site, que aí leva pro Meli.

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
- 🔴 **Depois de dois pedidos seguidos o painel para de responder à troca de
  URL** — provável cota de inspeções por minuto. **Não insista**: volte depois
  ou faça o resto à mão. Reenviar a mesma página não muda a prioridade dela,
  segundo o próprio Google.

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
- `data/canal-publicados.json` guarda **quem já foi e por quanto**. Produto só
  volta se o preço tiver mudado — mesma lógica da memória do garimpo, e pela
  mesma razão: repetir a mesma oferta é o que faz alguém sair do canal.
- ⚠️ **Queda de R$ 6 não é manchete.** Só vira "🔻 CAIU HOJE" a partir de **3%
  ou R$ 20**; a primeira versão gritava por qualquer centavo, o que ensina o
  seguidor a ignorar o canal.
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
verificar` falha com `Cannot find module 'react'` se não rodar `npm ci` antes.
Não é erro de tipo — é dependência que nunca foi instalada.

🔴 **Ela não gera vídeo, e isso não tem conserto pelo lado dela**: roda na
nuvem, sem a máquina do Alisson, sem ffmpeg e sem o site local. Vídeo só sai
em sessão aberta, na máquina dele.

⚠️ **O container da rotina nasce sem `node_modules`.** Medido em 19/09/2026:
`npm run verificar` falhava com `Cannot find module 'react'/'next'` — não era
erro de tipo, era dependência nunca instalada. `npm ci` primeiro resolve, leva
~10s. Rodar isso antes de `npm run verificar` em toda execução desta rotina.

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

## Antes de entregar

```bash
npm run verificar    # tsc --noEmit + npm run fichas
```

`npm run fichas` (`scripts/conferir-fichas.ts`) confere se o site descreve o
mesmo aparelho com os mesmos números em todas as páginas.

⚠️ **Nasceu de um erro real, em 10/09/2026:** o Moto G17 era coluna em dois
comparativos, com **20 W** num e **18 W** no outro, 1.050 nits contra 1.000. Os
dois números tinham fonte — o certo era a página oficial da Motorola; o outro
veio de site de ficha técnica. **Site de ficha técnica agregada erra; o
fabricante, não.** Página de "preço conferido" que se contradiz sobre a ficha
perde a única coisa que vende.

Ele compara **grandeza, não redação**: `IP64 (respingos)` e `IP64 — respingos`
passam; `20 W` e `18 W` não. E só compara número **com unidade** — o `600` de
"Sony LYTIA 600" e o `1.8` de "f/1.8" não são grandeza comparável, e exigir
texto idêntico encheria a saída de ruído.

`npm run build` só quando o assunto for o próprio build — é lento e não diz
nada que o `tsc` não diga. As exceções são o `next/og` e a página nova, que
só quebram no build.
