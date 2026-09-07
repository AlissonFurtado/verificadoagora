# verificadoagora

Landing de afiliados de tecnologia — "achadinhos" com desconto, link do
Mercado Livre. Quem chega vem do Instagram (**@verificadoagora_**), pelo link
da bio: a página existe pra transformar aquele scroll em clique no produto.

- Next.js 14 (App Router) + TypeScript + Tailwind, na **raiz do repo**
- Dados em `data/produtos.json` — sem banco, sem API, sem backend
- No ar em **verificadoagora.vercel.app** — `git push` na `main` publica
- O domínio próprio ainda **não** está conectado. Veja "O nó do domínio"

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
  page.tsx              ← monta os cards (Server Component)
  card-produto.tsx      ← o card, com next/image
  vitrine.tsx           ← 'use client': só o filtro de categoria
  icon.tsx              ← favicon gerado (next/og, runtime edge)
  opengraph-image.tsx   ← capa do link gerada (next/og, runtime edge)
  oauth/meli/page.tsx   ← retorno do login do Meli: só mostra o code na tela
src/lib/
  produtos.ts           ← tipos e formatação. Sem fs: roda no cliente também
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

### A armadilha dos links do Mercado Livre

Link gerado a partir do **Perfil Social** (`meli.la/...` que cai em
`mercadolivre.com.br/social/alisson580`) **não leva ao produto**: leva ao
perfil, com o produto em destaque e um botão "Ir para produto". Um clique a
mais, e quando a lista do perfil esvazia o link vira uma página vazia — foi o
que aconteceu com o robô aspirador (id 1).

Link bom é o do **Linkbuilder**, que abre a página do produto direto. Ao
adicionar produto, **abra o link e confira onde ele cai** antes de commitar.

O lado bom: a `og:image` dessas páginas do Meli é a foto do produto em
destaque, e foi de lá que saíram as imagens que estão no JSON.

## O robô de preços

Todo dia às 8h de Brasília, `.github/workflows/conferir-precos.yml` reconfere
cada produto na API do Mercado Livre e reescreve o `produtos.json`. Mudança
normal entra direto na `main` e a Vercel publica; mudança grande vira PR.

Rodar na mão: `npm run precos:conferir`.

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

1. **Robô garimpa** os mais vendidos (`/highlights/MLB/category/{id}`), filtra
   por desconto e nota, e monta uma fila de candidatos
2. **O link é gerado à mão**, no Linkbuilder, dentro do Chrome logado do
   Alisson — numa sessão com o Claude, que dirige e faz o trabalho repetitivo
3. **O resto é automático de novo**: card, publicação, conferência diária de
   preço

Quem tentar automatizar o passo 2 vai reencontrar essa parede. Ela é do Meli,
não do código.

### Os 5 produtos que estão lá hoje são exemplos

O Alisson pegou esses links aleatoriamente pra testar, sem curadoria nenhuma.
Não são escolha de produto: são dado de teste que acabou em produção. Quando a
primeira fila garimpada de verdade entrar, eles saem.

## Dinheiro

Três regras que não são de estilo:

1. **Todo link é de afiliado, e isso é declarado.** No rodapé da página e na
   legenda de todo post. É exigência do próprio programa de afiliados e é o
   mínimo de honestidade com quem clica. Nunca tire.
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
