<!-- Parte do CLAUDE.md, separada em 25/10/2026 (decisão do Alisson: "dividir por assunto"). Texto movido sem cortes. -->

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

- 🟢 **O "ID do produto" serve para vídeo, e leva ao mesmo lugar que o link**
  (medido em 07/10/2026). Buscar `HDDAJQ-JMUD` (iPhone 17) no Meli redireciona
  para `/social/alisson580` com `matt_word=alisson580` e `ref` — exatamente o
  destino do `meli.la`. O prefixo `HDDAJQ` é o código dele; o sufixo, o produto.
  **Onde achar:** na página do produto, logado, barra "GANHOS X%" → botão
  **Compartilhar** → "Gerar link / ID de produto" (traz link, ID e um texto
  sugerido). O Linkbuilder não mostra o ID. ⚠️ **Não foi medido se a venda entra
  como comissão** — só que o caminho é o mesmo; o teste é ver o clique no
  painel. A mesma barra mostra a **comissão da categoria** ("GANHOS 5%" em
  celular): é a fonte para a faixa de cada produto, em vez de blog.
  **Uso:** texto na tela de reel ("ID: … no Mercado Livre"), onde link não
  clica. Continua **não sendo cupom**.
- `cupom` é **cupom de desconto de verdade**, e nada mais. O painel de
  afiliados também mostra um "ID do produto" (tipo `HDDAJQ-17AY`), que serve
  pra colar no buscador do Meli — **não é cupom**. O catálogo original tinha
  esse ID no campo `cupom` e a página anunciava "Cupom: HDDAJQ-ZYTV" pra quem
  nunca conseguiria usar. Não repita.
- 🟢 **`imagens` (opcional, desde 05/10/2026) liga a galeria da ficha.** Pedido
  dele para o iPhone 17 ("página com imagens chamativas"), escolhido contra
  bloco de destaques e comparativo. É lista de fotos **extras**, depois da
  `imagem`; sem o campo a ficha fica como sempre
  (`produto/[slug]/galeria-de-fotos.tsx`, client component). **Só foto do
  aparelho**: banner de marketing com texto e foto de acessório que não vem
  na caixa ficam de fora — das 11 fotos do anúncio do iPhone entraram 5. As
  fotos saem de `.ui-pdp-gallery img` na página do Meli (troque o sufixo por
  `-F.jpg`). ⚠️ Mantenha até **5 fotos**: com miniatura de 56 px é o que cabe
  em 390 px sem rolar. O robô não toca no campo.
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

### 🔴 O histórico gravava preço que o site nunca mostrou (corrigido em 22/09)

**O bug mais sério achado até agora, porque contaminava o ativo central.**
`conferir-precos.ts` gravava o `historico.json` **antes** de decidir se o preço
era suspeito. Como suspeito volta ao valor de ontem no `produtos.json`, o
gráfico ficava com um ponto que nenhum visitante viu.

O caso que revelou: o **Wap GTW 10** ficou com **R$ 370,77 em 21/09** (valor de
outra variação, que eu tinha rejeitado depois de conferir na página) enquanto o
site mostrava R$ 279,90. No dia seguinte o canal ia anunciar *"Ontem estava
R$ 370,77. Caiu R$ 97,87"* — **uma queda de 26% que nunca aconteceu**; a real
foi de R$ 7,00.

**Seis pontos falsos foram encontrados e corrigidos à mão** (Wap, monitor S3
27", DualSense em dois dias, A36 verde e GameSir G7 SE). A regra agora é:
**o histórico grava o preço que o site mostra** — suspeito entra com o valor
anterior, não com o da API.

⚠️ **Isso afetava tudo o que se apoia no histórico:** o gráfico da ficha, o selo
de menor preço, a `/quedas-de-preco` e as mensagens do canal. Se aparecer um
pico inexplicável num gráfico, é aqui que se procura.

⚠️ **Produto novo não tem o preço de estreia no histórico.** Ele só entra na
primeira rodada do robô, então o valor com que o produto apareceu na vitrine
não está lá — foi por isso que o JBL, cadastrado a R$ 164,10, quase foi
anunciado como "menor preço que já vi" a R$ 170,90.

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

### 🔴 404 permanente: o produto de catálogo virou redirect (24/09/2026)

**O terceiro sentido possível de um 404, e o mais caro até agora.** O OPPO A6t
respondia 404 em `/products/MLB75697401/items` **desde 15/09** — nove dias sem
conferência, com o site anunciando R$ 799,90 enquanto a loja cobrava
R$ 887,78. Não era API instável nem oferta encerrada: **`/p/MLB75697401`
redireciona para `/p/MLB75697418`**, porque o Meli funde e aposenta produto de
catálogo. O produto esteve à venda o tempo todo.

**Como distinguir dos outros dois 404:** abra `/p/{meli_id}` no navegador e
olhe o `canonical`. Se ele mostra **outro id**, é fusão de catálogo; se a
página diz "produto indisponível, escolha outra variação", a oferta acabou
mesmo; se a rodada seguinte traz o produto de volta, era instabilidade.

**A correção é o campo `confere_por`** (`src/lib/produtos.ts`), não trocar o
`meli_id`: a identidade continua sendo o `meli_id` — que sustenta o **slug da
ficha** e a **chave do histórico** —, e só a consulta da API muda.
`conferir-precos.ts` lê `produto.confere_por || produto.meli_id`.
⚠️ **Trocar o `meli_id` teria jogado fora a série de preços** do produto, que
é o ativo central deste site.

🔴 **O robô pega o vendedor errado em catálogo com vários vendedores — e
fixar o anúncio da buy box QUEBROU O ROBÔ** (29/09 a 01/10/2026). A Philco
P32VIK virou suspeita com R$ 1.085,87 → R$ 1.999 (+84%), e a página mostrava
**R$ 1.085,87 em outros meios** — o site estava certo. O catálogo tem 7
vendedores, o `buy_box_winner` vem nulo e `buscarProduto` pega
`/products/{id}/items` `results[0]`, **que não é a buy box**.
Tentei `confere_por: "MLB-4367472233"` (o anúncio da buy box) e
**`/items/MLB4367472233` respondeu 403** na Action. Erro de API faz a rodada
inteira parar sem mexer em nada: **o site ficou 2 dias sem conferir preço
nenhum** até alguém reparar. Revertido em 01/10.
- ⚠️ **`confere_por` só aponta para id que a API já respondeu.** Não dá para
  testar daqui (rodar o robô local mata o token), então qualquer mudança de
  `meli_id`/`confere_por` exige **olhar a Action do dia seguinte** — commit
  `Preços de DD/MM` na `main`. Sem ele, o robô caiu.
- 🔴 **Um produto com erro derruba os 36.** Esse é o defeito de fundo, e não
  foi corrigido: a trava "API instável → não mexe em nada" foi pensada para
  queda geral da API, não para um id ruim.
- A Philco segue virando suspeita todo dia, com o preço certo na vitrine. A
  correção de verdade é no `results[0]` — **decisão dele**, pendente.

🔴 **Id de catálogo com 10 dígitos era lido como anúncio** (06 a 08/10/2026).
`ehCatalogo()` decidia pelo tamanho do número (até 9 dígitos); os ids novos têm
10 (`MLB1055308843`, o iPhone 17). O robô consultou os dois iPhones em
`/items/`, levou 404 e **os desligou da vitrine no primeiro dia** — ficaram 3
dias fora, e só apareceu porque a busca da `/entrar` não os achava. Corrigido
em 08/10: **sem hífen é catálogo, com hífen é anúncio** (a convenção do
`produtos.json`). Rodada manual no mesmo dia confirmou: os dois voltaram.
⚠️ **Produto novo: no dia seguinte, confira se ele continua `disponivel`** —
"sumiu do Meli (404)" no commit do robô, para algo cadastrado ontem, é bug de
consulta até prova em contrário.

⚠️ **Sintoma para procurar em outros produtos:** histórico com **um ponto só**
e `verificado_em` parado há dias. O do OPPO tinha exatamente 1 ponto, de
15/09, e ninguém reparou porque o gráfico simplesmente não aparecia.

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

🔴 **Suspeito não revisado deixa a vitrine mentindo barato — e isso é pior
que o PR velho.** Em 21/09 o monitor S3 27" foi marcado suspeito (+16%) e o
site ficou anunciando **R$ 603,90 enquanto a loja cobrava R$ 821,25**, por
dias. A trava protege contra preço errado que entra sozinho, mas **congela o
preço antigo até alguém olhar** — e preço congelado para baixo é exatamente o
erro que queima a confiança. **Revise o PR de suspeitos no mesmo dia**, nem
que seja para aplicar o valor à mão como foi feito aqui.

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

🔴 **E o aviso virou fato em 21/09/2026: o Meli respondeu com CAPTCHA.** Depois
de ~15 conferências de preço numa sessão (uma amostra de 8 produtos em lote
mais as conferências avulsas), a navegação passou a cair em
`mercadolivre.com.br/captcha/wall/logged` — "Segurança — Mercado Livre". **Eu
não resolvo CAPTCHA**, então o trabalho parou ali.

**O limite prático, até prova em contrário: poucas conferências por sessão, e
2 s entre elas.** Conferir o catálogo inteiro de uma vez não é uma opção —
custa a sessão e arrisca a conta. Quando precisar de muitas, peça a ele
espalhar ao longo do dia ou aceite conferir só o que decide alguma coisa.

⚠️ **A ficha do anúncio é fonte para `analise`, não para tabela de
comparativo.** Comparativo continua exigindo a página do fabricante: o anúncio
erra e se contradiz (veja a câmera "4K" abaixo).

### 🔴 Não confira preço pelo JSON-LD da página (21/09/2026)

Custou meia sessão e quase virou um alarme falso de que o catálogo inteiro
estava errado. **O `"offers":{"price":...}` do JSON-LD do Meli é o preço do
Pix**, e o nosso é o do cartão — medido no Wap GTW 10, em que o JSON-LD
devolveu exatamente os R$ 251,91 do Pix contra os R$ 279,90 do cartão que o
site mostra. Comparar os dois acusa "divergência" em quase todo produto que
tem desconto no Pix, que são quase todos.

⚠️ **E raspar a página por `fetch` + `DOMParser` também não serve para preço.**
O HTML traz os produtos relacionados junto, e `querySelector('.ui-pdp-price…')`
pega o primeiro que aparecer — no teste, o fone P30i "custava" R$ 109,90, que
era de outro anúncio na mesma página. **Só vale o que se lê na página
navegada**, com a primeira dobra renderizada, um produto por vez.

**O jeito certo, quando precisar conferir preço de verdade:** navegar até a
página e ler o bloco `R$ X no Pix ou R$ Y em outros meios`. O **Y** é o nosso.

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
