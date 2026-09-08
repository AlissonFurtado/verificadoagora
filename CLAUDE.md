# verificadoagora

Landing de afiliados de tecnologia — "achadinhos" com desconto, link do
Mercado Livre. Quem chega vem do Instagram (**@verificadoagora_**), pelo link
da bio: a página existe pra transformar aquele scroll em clique no produto.

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

## O nó do domínio

`verificadoagora.com.br` foi o **primeiro domínio** do Alisson e virou hub por
acidente histórico. Hoje ele serve a **página institucional da A F DE SOUSA**,
hospedada na Hostinger por upload manual, cujo fonte mora no repositório do
**Vidraceiro** (`landing/hub/index.html`) — não aqui.

Em 07/09/2026 ficou decidido que o papel de hub passa pro `afdesousa.com.br` e
que este domínio volta a ser só o que o nome diz. Com uma ordem que não se
inverte:

**A institucional só sai do ar quando esta landing estiver pronta pra entrar
no lugar.** Nada de domínio vazio no meio do caminho.

A landing já está publicada em `verificadoagora.vercel.app` desde 01/09/2026 —
a Vercel constrói a cada push na `main`. O que falta é só o último passo:
conectar o `verificadoagora.com.br` ao projeto, e é aí que a institucional
precisa sair.

**Nenhum endereço fica escrito no código.** O `metadataBase` do `layout.tsx`
sai de `VERCEL_PROJECT_PRODUCTION_URL`, que a Vercel preenche com o domínio do
projeto — e que passa a ser o domínio próprio sozinho quando ele for
conectado.

⚠️ **Não use `VERCEL_URL` pra isso.** Ela é o endereço daquele deploy
específico, que a Vercel protege com login e responde 302. Com ela, a capa do
link apontava pra uma URL protegida e o link colado no Instagram aparecia sem
imagem. Aconteceu, e só dava pra ver em produção.

Quando o domínio for conectado, **avise o Alisson**: é o sinal pra sessão do
Vidraceiro tirar a institucional de lá.

### A troca aconteceu em 07/09/2026

`verificadoagora.com.br` **serve esta landing**, com certificado válido. O
registro é `A` · `@` · `216.198.79.1`, no DNS da Hostinger. O endereço oficial
é o apex, sem www.

Nenhum endereço ficou escrito no código: o `metadataBase` sai de
`VERCEL_PROJECT_PRODUCTION_URL` e migrou sozinho pro domínio novo.

**A institucional não morreu, mudou de porta.** Ela continua no ar em
`www.verificadoagora.com.br`, que ficou de propósito apontando pra Hostinger.
É uma solução temporária: quando a sessão do Vidraceiro publicar a
institucional no `afdesousa.com.br`, o `www` daqui deve virar redirecionamento
pro apex ou ser apagado.

### O que mais mora nesta zona DNS

O domínio virou hub por acidente e ainda carrega outros projetos. Auditado em
07/09/2026:

| Registro | Serve | Situação |
|---|---|---|
| `A @` | esta landing (Vercel) | ativo |
| `CNAME www` | institucional (Hostinger) | ativo, temporário |
| `ALIAS hrvidros` | **landing do HR Vidros** | 🔴 **ativo — é do cliente** |
| `ALIAS api-licitacoes` | "Página padrão" da Hostinger | morto |
| `CNAME licitacoes` | Vercel que não existe mais | morto |
| `A ftp` | 45.132.157.6 | não auditado |

⚠️ **`hrvidros.verificadoagora.com.br` está no ar e é a página de um cliente
real** (a vidraçaria de Parauapebas). O destino dela, `hrvidros.afdesousa.com.br`,
ainda não tem DNS. **Não apague esse registro** antes de a landing existir no
endereço novo — o cliente ficaria sem página nenhuma.

Os dois mortos (`api-licitacoes`, `licitacoes`) podem sair a qualquer momento.

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

O que **não** diverge e não deve divergir: pt-BR no domínio e na interface,
`tsc --noEmit` antes de entregar, cor nunca como única informação, `min-w-0`
no container **e nos filhos** de qualquer grade nova.

O Tailwind chegou a existir só no `package.json`: a página usava as classes
sem `tailwind.config.js`, `postcss.config.js`, `globals.css` nem layout, e saía
sem estilo nenhum. Se alguma dessas peças sumir de novo, é isso que aconteceu.

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
- `disponivel: false` tira o produto da página sem apagar nada. É o robô que
  liga e desliga; mexer na mão só se souber por quê.
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

Toda manhã, `.github/workflows/conferir-precos.yml` reconfere cada produto na
API do Mercado Livre e reescreve o `produtos.json`. Mudança normal entra
direto na `main` e a Vercel publica; mudança grande vira PR.

Rodar na mão: `npm run precos:conferir`.

⚠️ **O robô escreve três arquivos, não um.** `data/produtos.json`,
`data/historico.json` e o `relatorio.json` que a Action lê. Entre 07 e
08/09/2026 faltava o `writeFileSync` do histórico: o script lia o arquivo,
acumulava o preço do dia na memória e terminava a rodada sem gravar. O
workflow até fazia `git add data/historico.json`, mas nada mudava, então nada
era commitado — e o erro era mudo.

O estrago: todo produto ficou com **um ponto só**, o gráfico da página do
produto (precisa de 2) e o selo de menor preço (precisa de 3) nunca
apareceram uma vez, e cada dia conferido se perdia. Se o gráfico sumir de
novo, é a primeira coisa a checar.

⚠️ **"Toda manhã", não "às 8h".** O cron pede 11:00 UTC (8h de Brasília), mas
o agendador do GitHub é melhor esforço: em 08/09/2026 a rodada saiu às 14:51
UTC — 3h51 de atraso — e o garimpo, agendado pras 10h, saiu às 14h09. A página
chegou a anunciar "confere às 8h" e isso era falso na prática.

Por isso o robô grava `metadata.conferido_em`, com **data e hora** do instante
em que terminou, e é essa hora que a página mostra. Nunca prometa horário
cravado ao visitante: mostre o que aconteceu.

**Por que API e não ler a página.** Pedir a página do produto por HTTP puro
devolve a tela de *suspicious traffic* — inclusive de IP residencial. Num
runner do GitHub, com IP de datacenter, é certeza. A API responde de qualquer
lugar, desde que com token. Não tente voltar pra raspagem sem lembrar disso.

**O refresh_token do Meli é de uso único.** Cada renovação devolve um novo e
mata o anterior. Por isso `scripts/acesso.ts` guarda o novo **antes de
qualquer outra coisa**, e o passo que reescreve o segredo do GitHub roda com
`if: always()`. Se essa ordem se perder, um erro no meio da rodada deixa a
automação sem como voltar e alguém tem que refazer a autorização na mão.

As travas, que são o motivo de o robô poder commitar sozinho:

| Situação | O que ele faz |
|---|---|
| Preço mudou até 15% | Aplica e commita na `main` |
| Mudou mais que 15% | Aplica, mas **em PR** — preço que pula 30% costuma ser outra coisa |
| Produto pausado ou sem estoque | `disponivel: false` e some da página |
| 404 no Meli | Mesma coisa: sumiu, então sai do ar |
| API instável ou erro qualquer | **Não mexe em nada** e a Action fica vermelha |
| Produto sem `meli_id` | Não confere, e avisa no relatório |

O robô nunca marca `preco_no_pix`: a API devolve preço de tabela. Preço de Pix
só entra quando uma pessoa abriu a página e viu.

Ele também não mexe em `nome`, `descricao`, `categoria` nem `avaliacao` — isso
é curadoria, e curadoria é do Alisson.

**Quem é dono do refresh token é a Action.** Desde 07/09/2026 os segredos
estão no GitHub e cada rodada lá queima o token e grava o novo por cima.
Rodar `npm run precos:conferir` na máquina **invalida o que o GitHub tem** e
quebra a rodada seguinte. Se precisar rodar local, refaça a autorização e
recadastre o `ML_REFRESH_TOKEN` no GitHub depois.

Segredos que a Action precisa (Settings > Secrets and variables > Actions):
`ML_CLIENT_ID`, `ML_CLIENT_SECRET`, `ML_REFRESH_TOKEN` e um `GH_PAT` com
permissão de escrever segredos — sem o PAT o token não rotaciona e o robô
funciona exatamente uma vez.

## A curadoria: como produto entra na página

Decidido em 07/09/2026, depois de pesquisar o que dá e o que não dá.

**Não existe API oficial de afiliados do Mercado Livre.** Não é falta de
procurar: o programa simplesmente não expõe geração de link. O que existe são
serviços de terceiros que funcionam com cookie/sessão da conta de afiliado —
**não usar**. É a conta que recebe a comissão; entregar sessão dela pra fora
não compensa economizar dez minutos por semana.

Então a corrente é automática dos dois lados e manual exatamente no meio:

1. **Robô garimpa todo dia** (`.github/workflows/garimpar.yml`, 10h de
   Brasília) e escreve `data/candidatos.json` + abre uma issue com a fila do
   dia, no máximo 10. Filtro em `data/garimpo.json`: desconto ≥ 20%, preço de
   R$ 100 a R$ 2.000. Cada categoria da lista é um **nome** de categoria de
   primeiro nível ou um **id** (`MLB14370`) de qualquer nível; o que não
   resolve é avisado no log e pulado, sem derrubar a rodada
2. **O link é gerado à mão**, no Linkbuilder, dentro do Chrome logado do
   Alisson — numa sessão com o Claude, que dirige e faz o trabalho repetitivo
3. **O resto é automático de novo**: card, publicação, conferência diária de
   preço

`candidatos.json` não é catálogo: nada dali aparece no site. Candidato vira
produto quando ganha `link_afiliado` e é movido pra `produtos.json`.

### A memória, que é o que faz o diário funcionar

Os "mais vendidos" do Meli mudam devagar. Sem memória, rodar todo dia nas
mesmas categorias devolveria quase a mesma lista — e o Alisson pararia de
olhar a fila na terceira repetição.

`data/garimpo-memoria.json` guarda o que já foi sugerido e por quanto. As
regras (`src/lib/garimpo-memoria.ts`):

| Situação | O que acontece |
|---|---|
| Produto já no `produtos.json` | Nunca mais é sugerido |
| Mesma **família** de um que já está lá | Nunca mais é sugerido |
| Já sugerido, preço parecido | Não repete — **silêncio conta como "não"** |
| Já sugerido e caiu 15%+ | Volta: é oferta nova, não repetição |
| Sugerido há 60+ dias | Volta: o mercado já é outro |

### Por que Informática entra por subcategoria

Duas rodadas seguidas deram zero em Informática. Não era nome errado nem bug:
o topo de "mais vendidos" da categoria é **consumível barato** — papel A4,
filamento de impressora 3D, gift card, power bank de R$ 76. Quase tudo abaixo
do piso de R$ 100, e o que passa não tem desconto.

Os produtos que interessam moram nas subcategorias, e é por isso que a config
aceita id: `MLB14370` (Monitores), `MLB430598` (Armazenamento), `MLB454379`
(Periféricos), `MLB430687` (Portáteis).

Vale desconfiar do mesmo em qualquer categoria que renda pouco: o problema
costuma ser o topo dela, não o filtro.

### O mesmo produto tem vários ids no Meli

Descoberto em 08/09/2026, na primeira fila diária: o Soundcore P20i está no
catálogo do Meli como `MLB38302175` **e** `MLB43397587`; o aspirador WAP GTW
10 como `MLB8923630` **e** `MLB8923631` — ids consecutivos, mesmo aparelho.
Memória por id não pega isso, e dois repetidos entraram na fila.

Por isso o campo `familia` (`family_name`, `grouper_id` ou
`catalog_product_id`, nessa ordem): é o agrupador do próprio Meli e reconhece
o mesmo produto sob outro número. Comparar nome seria chute — "Fone Bluetooth
soundcore P20i" e "Fone De Ouvido In ear Soundcore P20i Bluetooth 5.3" são o
mesmo produto e quase não se parecem como texto.

Produto que entrou antes do campo existir tem `familia: ""`; o robô de preços
preenche na primeira vez que passa por ele.

⚠️ **A memória precisa ser commitada junto com a fila.** Se o commit falhar,
o garimpo de amanhã sugere exatamente o que sugeriu hoje. Por isso os dois
arquivos entram no mesmo `git add`.

⚠️ Os dois workflows renovam o mesmo token de uso único, então compartilham
`concurrency: group: meli-token`. Rodando junto, um invalidaria o outro.

Quem tentar automatizar o passo 2 vai reencontrar essa parede. Ela é do Meli,
não do código.

### A primeira fila garimpada entrou em 07/09/2026

Os 5 produtos anteriores eram links pegos a esmo pra testar e foram
substituídos pelos 7 primeiros garimpados de verdade. `nome` e `descricao`
são encurtados na mão: o título que vem da API tem 200 caracteres e não cabe
num card. `avaliacao: 0` significa "ninguém conferiu a nota" e o card esconde
a linha — melhor que anunciar "Nota 0 de 5".

## Ser achado: busca e IA

Cada produto tem **URL própria** (`/produto/{slug}-{meli_id}`) com marcação
`schema.org` de `Product` e `Offer`. É de lá que buscador e assistente de IA
leem preço, moeda e disponibilidade sem adivinhar no HTML.

**O `meli_id` no fim do slug é de propósito.** O `nome` é curadoria e muda
quando o Alisson reescreve o título; sem o id, reescrever quebraria uma URL
já indexada. Com ele, o texto muda à vontade.

O `priceValidUntil` é o dia seguinte à conferência — o preço vale até a
próxima checagem, não pra sempre. Prometer validade maior que a real é o
mesmo erro do preço velho, só que em linguagem de máquina.

`robots.ts` libera tudo, **inclusive rastreador de IA**. A aposta do projeto é
ser citado como fonte de preço conferido, e pra isso o robô precisa entrar e
ler o preço.

⚠️ **Nunca esconda o preço atrás de clique.** A ideia apareceu em 07/09/2026 e
foi descartada com razão: IA cita fato, e sem preço na página não há fato pra
citar — o site sai da resposta em vez de ganhar o clique. Mostrar coisa
diferente pro robô e pra pessoa (*cloaking*) tira o site do índice.

O botão do card vai **direto pra loja**. A página do produto é porta de
entrada de busca, não degrau do funil: quem chega por ela já está lá.

### Comparativos

O primeiro entrou em 08/09/2026: o Galaxy A36 5G contra quatro rivais, em
`/comparativo/{mesmo slug do produto}`. O alvo é quem digita "A36 vale a pena"
— gente que ainda não decidiu e que a vitrine sozinha não alcança.

⚠️ **Comparativo é sempre pedido explícito do Alisson.** Nenhum robô escreve
um, e nenhum aparece porque o produto "parecia bom". A escolha dos rivais e o
veredito são curadoria assinada; robô escolhendo o que elogiar é exatamente o
que tira a autoridade da página.

Moram em `data/comparativos.json`, um por produto, ligados pelo `meli_id`. O
tipo `Comparativo` em `src/lib/comparativos.ts` diz quais campos existem.

As três decisões que sustentam o formato:

- **Nenhum preço fica escrito no arquivo do comparativo** — nem na tabela,
  nem na prosa. A linha de preço é montada do `produtos.json` na hora, e só
  aparece pros modelos que estão no catálogo. Concorrente de fora mostra "não acompanhamos" — porque preço de
  rival ninguém reconfere, e publicar valor velho é a regra 2 quebrada em
  letra grande. Foi por isso que a coluna de preço dos de fora foi descartada
  em 08/09/2026, e não por falta de pesquisa.
- **Concorrente que também está no catálogo entra clicável.** O A36 é
  comparado com o Moto G17, que é nosso: a mesma página pode gerar comissão
  por dois caminhos, e o leitor ganha uma alternativa barata de verdade.
- **A tabela mostra onde o produto perde.** O A36 perde em memória, em
  processador e em câmera, e isso está lá. Comparativo que só elogia não
  convence ninguém e não merece ser citado por IA.

### Número no texto é marcador, nunca número

O texto do comparativo escreve `{preco}`, `{preco_original}`, `{desconto}`,
`{economia}` e `{data}`; a página troca pelo valor do catálogo na hora de
renderizar (`comTextoDeHoje`, em `src/lib/comparativos.ts`).

Aconteceu em 08/09/2026, no mesmo dia em que o comparativo nasceu: o robô
mexeu no preço do A36 às 8h, a tabela passou a mostrar 42% — e o texto ao
lado continuou anunciando "44% de desconto de verdade". Preço velho escrito
por extenso é o mesmo erro da regra 2, só que mais difícil de perceber,
porque a tabela ao lado está certa.

Marcador que não existe fica na página como está escrito, visível. É de
propósito: erro de digitação que aparece alguém conserta; erro que some
calado vira frase sem sentido no ar.

Cada linha tem uma `nota` explicando por que aquilo importa pra quem vai
comprar — sem ela é só uma tabela de números. E `vencedores` é lista: empate
técnico entre três é comum, e cravar um vencedor onde não há seria mentira.

A marcação é `schema.org/Article` com `citation` das fontes, **não `Review`
com nota**. Nota que ninguém mediu, dita em linguagem de máquina, é o mesmo
erro do preço inventado.

## Dinheiro

Três regras que não são de estilo:

1. **Todo link é de afiliado, e isso é declarado.** No rodapé da página e na
   legenda de todo post. É exigência do próprio programa de afiliados e é o
   mínimo de honestidade com quem clica. Nunca tire.

   Em 08/09/2026 o aviso **encolheu, não sumiu**: saiu a caixa do topo da
   vitrine e os parágrafos longos viraram uma linha em cada rodapé — "Links
   de afiliado · você paga o mesmo preço". Se alguém pedir de novo pra "tirar
   o aviso de afiliado", é esta linha que está em jogo, e ela fica.
2. **Preço e cupom envelhecem.** Não anuncie desconto sem conferir no link
   antes. Produto com preço errado queima a confiança, que é o único ativo
   desta página.
3. **`link_afiliado` sempre com o tracking do Alisson.** Link limpo entrega o
   clique de graça.

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
npm run verificar    # tsc --noEmit, cobre a página e os scripts do robô
```

`npm run build` só quando o assunto for o próprio build — é lento e não diz
nada que o `tsc` não diga. As exceções são o `next/og` e a página nova, que
só quebram no build.
