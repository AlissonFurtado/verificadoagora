# verificadoagora

Site de **celulares intermediários** (R$ 800 a R$ 2.500) com o preço conferido
por robô toda manhã, link de afiliado do Mercado Livre.

O foco entrou em 09/09/2026, por brief do Alisson. Antes era "achadinhos de
tecnologia" em geral. O que já estava no catálogo fora dessa faixa — casa,
games, foto, áudio — **fica no ar e continua sendo conferido**, mas não recebe
produto novo e perdeu o destaque no filtro: dois assuntos com o mesmo peso
atrapalham a leitura de tópico do buscador.

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

Limpar a conversa é a forma mais eficaz de baratear a sessão — e é **este
arquivo que atravessa o `/clear`**. Nada mais atravessa.

Então, ao fim de qualquer trabalho que descubra algo, escreva aqui: a
armadilha encontrada, a decisão tomada e o porquê. Se o Alisson disser que vai
limpar, ofereça isso antes.

Escreva a regra, não a história. "O robô não gravava o histórico entre 07 e
08/09" vale uma linha; o relato de como foi descoberto, nenhuma.

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

Link gerado a partir do **Perfil Social** (`meli.la/...` que cai em
`mercadolivre.com.br/social/alisson580`) **não leva ao produto**: leva ao
perfil, com o produto em destaque e um botão "Ir para produto". Um clique a
mais, e quando a lista do perfil esvazia o link vira uma página vazia — foi o
que aconteceu com o robô aspirador (id 1).

**E não existe alternativa.** Testado em 07/09/2026 direto no gerador: o
"Gerador de produtos recomendados" é a ferramenta oficial de link de afiliado,
e tanto o link curto quanto o "link completo" apontam pra `/social/`. Não há
opção de link direto pro produto. Quem procurar de novo vai gastar o mesmo
tempo pra chegar na mesma resposta.

Como funciona de verdade: gerar o link **adiciona o produto à lista "Minhas
recomendações"**, e o link leva ao perfil com esse produto em destaque e um
botão "Ir para produto". Um clique a mais, e a comissão é creditada.

⚠️ **Daí o modo de falhar:** produto que sai da lista "Minhas recomendações"
deixa o link apontando pro perfil sem ele — foi o que aconteceu com o robô
aspirador, cujo link caía num perfil vazio. Não esvazie a lista no Meli sem
tirar os produtos correspondentes daqui.

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
   ⚠️ **`foco` põe as categorias do assunto da página no topo da fila**, na
   frente do desconto — quem sobra do limite diário é sempre de fora do foco. A
   fila de 10/09 veio com 10 candidatos e nenhum celular, que é o que motivou.
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

### Comparativos

⚠️ **Antes de escrever um, veja se o produto já é coluna de outro.** O
comparativo do A36 já trazia o G17; repetir o par daria a mesma tabela. O que
rende página nova é o produto **pelo ponto de vista dele**, contra os rivais da
faixa *dele* — foi assim que o G17 ganhou a própria página, contra A16, Redmi
14C e G15, com o A36 como o degrau acima.

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
| **Fóruns / Reddit** | dias | Primeira visita, e o teste de se a página convence | não começou |
| **Pinterest** | 2 a 6 semanas | Era o volume de novembro | 🔴 **bloqueado**, veja abaixo |
| **Google / SEO** | 3 a 6 meses | O ativo que compõe sozinho | sitemap enviado 10/09 |
| **Instagram** | meses | Antecipado do "fase 3" a pedido do Alisson | não começou |

⚠️ **SEO não chega a tempo de novembro, e isso está certo.** Com o Pinterest
bloqueado, quem ainda cabe no prazo é **fórum**. Não julgue o SEO pelo resultado
de novembro: é o único canal que não exige postar todo dia.

Cronograma original (semana 1 = 10/09): diagnóstico e fórum → Pinterest de pé →
volume, 1 comparativo/semana → Instagram → dobrar no que rendeu. **O bloqueio do
Pinterest tirou as semanas 2 a 4 do lugar**; refazer quando ele voltar.

### Regras que valem em qualquer canal

- **O destino é sempre uma página deste site**, nunca o link do Meli e **nunca
  `meli.la`** — encurtador em rede social é sinalizado como spam.
- **Fórum não é lugar de link solto.** Responde-se a pergunta de verdade,
  citando a página como fonte do preço. A skill `garimpar-foruns` acha as
  threads.
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

⚠️ **Parte das impressões não é desta página:** `vidraçaria parauapebas`, `box
banheiro` e afins somam 184 impressões e vêm do `hrvidros.` — do cliente. Há
busca real por vidraçaria em Parauapebas: informação do projeto **Vidraceiro**,
que some do relatório quando o subdomínio migrar.

### 🔴 Pinterest: bloqueado, com apelação em curso

Perfil **Verificado Agora**, conta de empresa, site reivindicado em 10/09/2026
pela meta tag `p:domain_verify` no `layout.tsx` (⚠️ não apague: o Pinterest
reconfere, e sem ela a reivindicação cai).

**Mas nenhum link para `verificadoagora.com.br` pode virar pin.** O campo de
destino responde *"Esse link está bloqueado porque pode não atender às nossas
políticas de conteúdo"*; vale para o domínio inteiro, e `wikipedia.org` passa no
mesmo campo. **Apelação enviada em 10/09/2026** (Central de Ajuda → Apresentar
um recurso → O Pinterest bloqueou meu site), com print anexado, argumentando que
o WordPress de afiliados saiu em julho e o projeto atual é outro conteúdo.

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

## Instagram: é fase 3, não é agora

Existe um plano de postagem diária escrito pelo Alisson — rotação de produtos,
logs, state em JSON. **Não comece.** Site que não existe não tem pra onde
mandar o clique.

Quando chegar a hora, a regra é a **fila de revisão do Metricool**. Post que
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
