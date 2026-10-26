<!-- Parte do CLAUDE.md, separada em 25/10/2026 (decisão do Alisson: "dividir por assunto"). Texto movido sem cortes. -->

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

### 🟢 Endereço perene: como aproveitar a indexação quando o produto muda (12/10/2026)

Pergunta dele: "o ar da Samsung sai de linha, dá para trocar pelo LG na mesma
página e manter a indexação?". **Não — e a decisão dele foi "página perene +
aviso de substituto".**

- 🔴 **Nunca reaproveite a ficha (ou o comparativo) de um produto para outro.**
  O Google não guarda "página indexada" como crédito solto: guarda "esta
  página responde tal busca". Trocar o conteúdo perde a busca antiga, deixa o
  nome errado na URL e mistura o histórico de preços de dois aparelhos.
- 🟢 **Quem tem endereço perene é o guia de categoria**, no molde do guia de
  faixa (`data/guias.json`, perfil → aparelho): **`/guia/ar-condicionado-12000-btus`**
  e **`/guia/ar-condicionado-9000-btus`**, sem marca e sem ano no slug. Quando
  o mercado muda, **troca-se o perfil dentro do guia** (aparelho, `meli_id`,
  `porque`, `quando_nao`, `ficha`) e preenche-se `atualizado_em` — a URL
  indexada continua a mesma. `teto` virou opcional e entrou `descricao` (a
  frase padrão do buscador falava em celular).
- 🟢 **Campo `substituto`** no produto (`meli_id` do modelo que ocupa o
  lugar). A ficha de produto que acabou (`disponivel: false`) passa a mostrar,
  dentro do aviso "Esta oferta acabou", o link para o substituto **e** para o
  guia da categoria (este aparece sozinho, sem ninguém preencher nada). É
  curadoria; o robô não toca. Testado com edição temporária no dev.
- **A rotina, quando um produto novo entra no lugar de um velho:** (1) ficha
  nova para o novo, com pedido de indexação; (2) trocar o perfil no guia da
  categoria; (3) `substituto` no antigo, se ele saiu de linha; (4) a ficha
  antiga fica no ar. Redirect 301 só quando é **o mesmo aparelho**.
- 🟢 **Mais três no mesmo dia, a pedido dele:** `/guia/monitor-full-hd`,
  `/guia/fone-de-ouvido` e `/guia/controle-de-videogame`. Fichas copiadas dos
  comparativos do S3 27" e do DualSense e dos exemplos do guia de fone da
  Black Friday. **Aparelho sem ficha de fabricante conferida entra com
  `ficha: {}`** (Fmaxx e JBL Quantum): a página esconde a tabela e o texto
  diz por quê. O AOC 27B35HM entra como aparelho de fora, sem preço.
  Os comparativos seguem presos ao slug de um modelo — não foram migrados.
- 🔴 **A análise do soundcore P30i dizia "fone de cabeça"** desde o
  cadastro; ele é intra-auricular com estojo (o guia de fone da BF já dizia
  certo: 10 h no fone, 45 h com o estojo). Corrigidas a `analise` e 3
  `perguntas`. ⚠️ `data/posts.json` e `data/pins.json` ainda trazem o
  texto antigo — são gerados (`npm run posts` / `npm run pins`) e não
  foram regerados.
- 🔴 **Bug achado no caminho, no ar desde 21/09:** o guia `celulares-ate-1500`
  mostrava **`{preco}`, `{desconto}` e `{economia}` crus** no perfil do A36, e
  os 3 guias de decisão tinham perdido o exemplo do A36 — todos apontavam para
  o `MLB47115842` (preto, `oculto`), que não entra em `produtosVisiveis`.
  Corrigido apontando para o verde (`MLB47111438`). ⚠️ **Ao ocultar ou trocar
  um produto, `grep` o `meli_id` em `guias.json` e `decisoes.json`** — o
  comparativo tem o `tambem`, os guias não. Se o A36 preto voltar a ser o
  visível, é o caminho inverso.

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
- **Guias por categoria**, no molde de decisão (o que o Google já indexou 3
  vezes aqui): `vale-esperar-black-friday-celular`, `-monitor-e-notebook`,
  `-controle-de-videogame` e, desde 20/09, **`-eletrodomestico`**.
  🟢 **A `/black-friday` acha os guias sozinha**, por `startsWith(
  'vale-esperar-black-friday')` — guia novo com esse prefixo entra na página
  sem ninguém editar lista nenhuma.
- 🔴 **O guia de projetor e TV foi abandonado, e o motivo não se resolve
  escrevendo melhor.** Os dois produtos que ele citaria não têm ficha de
  fabricante: a Philco P32VIK não existe no site da Philco e o HY320 não tem
  fabricante. **Decisão dele em 20/09: trocar de tema.** Entrou no lugar o
  **`-fone-de-ouvido`**, categoria com 3 produtos no catálogo e fabricantes
  que publicam ficha (soundcore e Samsung). ⚠️ **Se alguém retomar projetor ou
  TV, o problema volta igual** — só muda se entrar no catálogo uma TV de
  modelo oficial.
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
