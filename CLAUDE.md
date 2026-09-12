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

## Onde paramos — 11/09/2026

Atualize esta seção sempre; é por ela que a próxima sessão sabe retomar.

**Meta:** uma venda até 03/11/2026. O gargalo é visita, não catálogo.

| Frente | Estado | De quem é a vez |
|---|---|---|
| Reddit `r/CelularesBR` | Conta `u/a_f_de_sousa` criada; aquecimento **dias 1 e 2 postados** (dia 2 em 11/09, na thread "A57 ou S24 usado?", com o texto reescrito por ele) | **Dele**: dia 3 ("Celular gamer até 2.500", link em `rascunhos/`), depois o comentário com link |
| Guia `/guia/celulares-ate-1500` | No ar, medido, indexação pedida no Search Console | Ninguém — é esperar o Google, semanas |
| Garimpo | 🔄 **Sem foco desde 11/09** — a fila volta a ser ordenada só por desconto, como antes de 09/09. `MLB1055` segue na lista de categorias | Conferir a Fila de 12/09: agora vale candidato de qualquer categoria |
| Pinterest | 🔴 **Apelação recusada em 11/09**. Revisão humana pedida no mesmo dia | Ninguém — ver a linha abaixo |
| Instagram | 🟢 **Pronto pra sair.** Arte quadrada, 14 legendas e `/instagram` no ar; link já na bio e app do Metricool instalado, com os dois posts visíveis nele (confirmado por ele em 11/09) | **Dele**: concluir o G17 pela notificação em 12/09 às 10h, e o A36 em 13/09. ⚠️ **A trava do 3º celular caiu com a reabertura do escopo**: há 14 legendas prontas de todas as categorias, então o feed pode seguir sem aparelho novo — decidir com ele se agenda a partir do dia 3 |
| Pinterest (revisão humana) | Post publicado por ele em 11/09 na Business Community | Ninguém — esperar ~3 semanas. Sem resposta, o canal morreu |
| Catálogo | 15 produtos, sendo 2 celulares (G17 e A36, os dois já com comparativo) | Comparativo novo depende de produto novo, de qualquer categoria agora |
| Guia de decisão `/guia/quanto-de-memoria-no-celular` | No ar desde 10/09; **indexação pedida em 11/09** | Ninguém — é esperar o Google |
| Guia de decisão `/guia/tela-de-celular-amoled-ou-lcd` | No ar desde 10/09; **indexação pedida em 11/09** | Ninguém — é esperar o Google |
| Guia de decisão `/guia/quantos-anos-de-atualizacao-no-celular` | No ar desde 11/09; **indexação pedida em 11/09** | Ninguém — é esperar o Google |
| Perguntas nas 15 fichas | No ar desde 10/09 | Ninguém — é esperar o Google reavaliar as 8 recusadas |
| Guia de faixa até R$ 2.500 | 🔴 **Parado**, e a razão importa | Decisão dele: ver abaixo |

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
| `ALIAS hrvidros` | **landing do HR Vidros** | 🔴 **ativo — é de cliente** |
| `ALIAS api-licitacoes`, `CNAME licitacoes` | nada | mortos, podem sair |
| `A ftp` → `45.132.157.6` | ? | não auditado |

⚠️ **`hrvidros.verificadoagora.com.br` é a página de um cliente real** (a
vidraçaria de Parauapebas) e `hrvidros.afdesousa.com.br` ainda não resolve.
Não apague esse registro.

⚠️ **A institucional da A F DE SOUSA está sem endereço** desde 09/09/2026:
morava no `www` daqui e saiu quando ele passou a servir a landing. O
`afdesousa.com.br` responde "Página padrão" da Hostinger. Decisão do Alisson,
com o aviso dado antes. Pendência da sessão do Vidraceiro.

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
| Mudou mais que 15% | Aplica **em PR** — 30% costuma ser outra coisa |
| Pausado, sem estoque ou 404 | `disponivel: false`, some da página |
| API instável ou erro | **Não mexe em nada** e a Action fica vermelha |
| Sem `meli_id` | Não confere, avisa no relatório |

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
3. **O resto volta a ser automático**: card, publicação, conferência diária.

`candidatos.json` não é catálogo — nada dali aparece no site. Candidato vira
produto quando ganha `link_afiliado`, `analise` e entra no `produtos.json`.

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

⚠️ **Comparativo é sempre pedido explícito do Alisson.** Nenhum robô escreve
um. Curadoria assinada por robô é o que tira a autoridade da página.

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
