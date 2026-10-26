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

## 25/10/2026 (noite): pendências mortas

- 🟢 **As "cópias" sumiram.** A ficha do micro-ondas e o guia de controle da
  BF estão "A página está indexada".
  - ⚠️ A URL do HY320 é `projetor-hy320-full-hd-com-android-mlb48959123`
    (a minha lista tinha outra). Ainda não foi reinspecionada.
- 🟢 **Os 4 guias de vitrine estão indexados.** O "tem problemas" era
  **Listagens do comerciante: N itens inválidos**, por falta de `image` no
  `Product` de dentro do guia (e do comparativo). Corrigido (`abf45d8`).
  O teste ao vivo do guia WePink deu 7 itens válidos.
  - ⚠️ Toda página nova que declarar `Product` precisa de `image`.
- 🟢 **Decisões dele em 25/10, por múltipla escolha:**
  - **robô: deixar `results[0]` como está**, e os suspeitos seguem
    conferidos à mão;
  - **Achados: descartado** (branch local `pausa/achados` apagado);
  - **etiquetas:** cor própria para Informática, Ar-condicionado,
    Esportes, Beleza, Moda, Relógios e Presentes (`card-produto.tsx`);
  - **CLAUDE.md dividido por assunto:** este arquivo tem a retomada, as
    regras e o índice, e o resto foi movido sem cortes para `docs/`.
    Conferido por script: 0 linhas perdidas.
- 🔴 **Apagar os 11 branches `robo/precos-2026-10-15..25`**: o modo
  automático **bloqueou** `git push origin --delete`. Ele roda o comando
  (`!` no prompt) ou libera a permissão.

## 25/10/2026 (tarde): preços corrigidos e guias na linha do tempo

- 🟢 **Guias de vitrine mudaram de lugar e de tamanho**, a pedido dele:
  - entram na grade na posição da data `escrito_em`: depois dos produtos
    mais novos, antes dos do mesmo dia. Calculado em `page.tsx` como
    `posicao`, e `vitrine.tsx` intercala;
  - no PC ocupam uma casa, como um produto (3 fotos + "+N", altura da
    linha). Medido em 1280 px: guia 265 × 333, produto 265 × 493. No
    celular continuam da largura da tela (~330 px de altura).
- 🟢 **14 preços aplicados à mão**, depois de conferir a lista
  `/p/{id}/s`:
  - A57 R$ 2.036,69 (loja oficial Samsung) e creatina R$ 47,90 (Soldiers);
  - aplicado o valor do robô onde o vendedor era sério: Wap, Realme, TCL
    9k, micro-ondas, Basic Whey, Myskin, facas, ralador, almofada e Joey
    Líder;
  - mantido o nacional onde o robô viu importado: Roku R$ 289,90
    (era 249,90) e DualSense R$ 459;
  - não aplicado: Phoebe (conta `CF2025…`, 0 vendas) e Anthelios 80 (o
    site já mostra a loja oficial).
  - O ponto de 25/10 do `historico.json` foi corrigido junto.
  - ⚠️ Os branches `robo/precos-2026-10-15` a `-25` seguem abertos (PRs
    velhos, **não mergear**). Fechar e apagar.

## Onde paramos — 25/10/2026 (fila do garimpo publicada)

- 🟢 **"Poste o que está na fila" = a fila do GARIMPO**, não o canal nem o
  Instagram. Perguntei duas vezes por múltipla escolha: na primeira ele
  respondeu "não é o canal", na segunda escolheu o garimpo. **Da próxima vez,
  "fila" sem contexto: perguntar logo com as 3 opções.**
- 🟢 **16 produtos entraram (ids 94 a 109)**, dos ~100 candidatos de 15 a
  25/10 (só os de marca, conferidos na página):
  - Beleza: secadores Philco PSC3500 e Taiff Style, Vichy Dercos, Anthelios
    Ultra Cover FPS 60 cor 3.0, Hidrabene FPS 70 e kit Principia;
  - Relógios: Redmi Watch 5 Active, Galaxy Fit3, Amazfit Bip Max e Casio
    AQ-230A;
  - Casa: sanduicheira Cadence SAN400, ducha Lorenzetti 220 V e
    liquidificador Mondial L-99;
  - Informática e eletrônicos: Logitech MK235, boombox Aiwa e Hollyland
    Lark M2.
- **Reprovados, com o motivo:**
  - vendedor de nome automático: WD Purple (`blpkf9if`), batedeira Mondial
    (`CIDYDP…`) e CeraVe (`GOGU4775453`);
  - preço subiu desde o garimpo: Moto G56 e mouse Logitech M190;
  - Starlink Mini a R$ 453: barato demais;
  - sem desconto real: Huawei Band 10, A36 256 GB, Amazfit Active 3 e
    Garmin 165;
  - Apple Watch SE 3: vendedor desconhecido e "de" R$ 3.500;
  - o resto era marca sem nome.
- 🔴 **Fila do canal de 25/10, conferida na página e NÃO publicada (não era
  o pedido):**
  - o **A57 a R$ 1.799 não existe na página**. A loja oficial da Samsung
    cobra R$ 2.036,69, e o mais barato tem 4 vendas: é o `results[0]`;
  - a **creatina "menor preço" a R$ 43** vem de `GOGU4775453`, quando a
    Soldiers cobra R$ 47,90.
  - Os dois preços da vitrine seguem errados.
- 🟢 (conferidos à tarde, ver acima) **O robô deixou 14 suspeitos em 25/10 e 12 em 24/10**.
- **Indexação de 25/10:** 11 pedidos aceitos, todos fichas novas; a cota
  cortou no 12º. 🔴 **Falta pedir:**
  - liquidificador Mondial, sanduicheira, Hidrabene, Principia e Aiwa;
  - as 18 de 17/10 (8 de cozinha e 10 de Friends), que não sei se foram
    pedidas entre 18 e 24/10 (não houve sessão).

## Regras de toda sessão (o detalhe está em `docs/`)

Resumo do que mais custou caro aprender. O porquê e os casos ficam no
arquivo indicado. **Na dúvida, abra o arquivo antes de agir.**

- **`git fetch` antes de commitar** e confira `git log --oneline -3
  origin/main`. O robô e o garimpo commitam todo dia.
- **Nunca rode `npm run precos:conferir` aqui**: invalida o refresh token
  da Action. Para rodar o robô, use o workflow pelo GitHub.
  → `docs/catalogo-e-robo.md`
- **Texto com acento: escreva por `.py` (ferramenta Write) ou `node`**,
  nunca por heredoc do Bash.
- **Nenhum preço escrito em arquivo**: use os marcadores `{preco}`,
  `{data}` e `{custo}`. E nada de "mais barato", "mais caro" ou "custa
  perto" (envelhece igual a preço). → `docs/seo-e-guias.md`
- **Produto só de catálogo** (`/p/MLB…`, id **sem hífen**).
  - Anúncio (`MLB-`) dá 403 na API.
  - Vendedor com nome automático (`AB2025…`) reprova.
  - Preço muito abaixo dos outros vendedores reprova.
  - Prefira loja oficial.
  - `analise` com "quando **não** comprar" é obrigatória.
- **Ficha técnica só do fabricante** (nunca agregador). `npm run
  verificar` antes de entregar.
- **`Product` no JSON-LD sempre com `image`** (sem ela, "Listagens do
  comerciante" fica inválida) e **sem `aggregateRating`**.
- **Suspeito do robô:** confira na lista `/p/{id}/s` e aplique à mão o
  preço e o ponto do dia no `historico.json`.
  - Importado não vale: use o vendedor nacional.
  - **Nunca mergeie PR velho do robô.**
  - 🟡 O robô pega `results[0]`, não a loja oficial. **Decisão dele em
    25/10: deixar assim** e conferir os suspeitos à mão.
- **Produto cadastrado ontem: confira hoje se segue `disponivel`.**
- **Indexação:** cota de ~11 pedidos por dia. Inspecione antes de pedir.
  → `docs/divulgacao-e-indexacao.md`
- **Rede social: nunca `meli.la`.** O destino é sempre uma página do site.
  Afiliado é declarado em todo post.
- **Instagram: links restritos até 10/11/2026.** Não mexa no link da bio.
  → `docs/canal-e-instagram.md`
- **Canal do WhatsApp não é afazer meu**, só se ele pedir. "Fila" sem
  contexto: pergunte qual (garimpo, canal ou Instagram).
- **Comparativo só quando ele pede.** Guia de tema: `guias.json` com
  `vitrine: { chamada }`.
- **Layout de celular:** meça numa iframe de 390 px no `next dev -p 3111`.
  Quem confere no aparelho é ele.
- **Ler o Meli:** `fetch` same-origin numa aba do Meli, 2 s entre pedidos.
  Com a janela oculta, use laço assíncrono + `window.__x`. O Linkbuilder
  aceita várias URLs completas (com slug): setter nativo + clique em
  "Gerar" por JS.

## Índice de `docs/`

- `docs/sessoes-anteriores.md`: Retomadas antigas, de 12/10 a 17/10/2026, e o estado das frentes antes disso
- `docs/frentes.md`: As frentes e o estado de cada uma; nicho de ar-condicionado; produto de varejo sem ficha
- `docs/dominio-e-stack.md`: Domínio, zona DNS, migração do HR Vidros, stack e onde diverge do padrão
- `docs/visual-e-medicao.md`: Tokens de cor, a home no celular, Vercel Analytics e eventos
- `docs/catalogo-e-robo.md`: Contrato do produtos.json, links do Meli, robô de preços, curadoria e garimpo
- `docs/seo-e-guias.md`: Ser achado: quedas de preço, endereço perene, guias de faixa e decisão, Black Friday, comparativos
- `docs/afiliados-e-dinheiro.md`: Termos do programa, comissão por categoria, so_no_canal, Shopee, regras de dinheiro
- `docs/divulgacao-e-indexacao.md`: Plano de divulgação, Reddit, histórico do domínio, Search Console, laço de indexação, Pinterest
- `docs/canal-e-instagram.md`: Canal do WhatsApp, /entrar, reels, rotina da manhã e Instagram/Metricool

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
