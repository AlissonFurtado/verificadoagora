# verificadoagora

Landing de afiliados de tecnologia — "achadinhos" com desconto, link do
Mercado Livre. Quem chega vem do Instagram (**@verificadoagora_**), pelo link
da bio: a página existe pra transformar aquele scroll em clique no produto.

- Next.js 14 (App Router) + TypeScript + Tailwind, na **raiz do repo**
- Dados em `data/produtos.json` — sem banco, sem API, sem backend
- Deploy: **nenhum ainda.** Veja "O nó do domínio"

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

Ou seja: este repo é o gargalo da arrumação inteira. Enquanto a landing não
existir, **este projeto não tem endereço público** — e nada aqui deve assumir
que tem. É por isso que o `metadataBase` do `layout.tsx` sai de
`NEXT_PUBLIC_SITE_URL` com `localhost` de reserva, em vez de ter o domínio
escrito no código.

Quando a landing estiver publicada, **avise o Alisson**. É o sinal pra sessão
do Vidraceiro tirar a institucional daqui e este projeto assumir o endereço.
Na prática: publicar na Vercel primeiro, conferir o site no domínio provisório
da Vercel, e só então apontar o DNS.

## Stack, e onde ela diverge do padrão

Em 07/09/2026 as três divergências abertas foram decididas e já estão
aplicadas:

| Assunto | Como ficou |
|---|---|
| Router | **App Router** (`src/app/`), como nos outros projetos. Migrado enquanto só existia uma página |
| Chaves do JSON | **Sem acento** (`preco_atual`, `avaliacao`, `descricao`) |
| Deploy | **Vercel pela integração com o GitHub** — `git push` na `main` publica. A Action `.github/workflows/deploy.yml` foi removida: era redundante e pedia três segredos que não existem |
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
src/lib/
  produtos.ts           ← tipos e formatação. Sem fs: roda no cliente também
  catalogo.ts           ← lerCatalogo(), único lugar que toca o disco
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
`imagem`, `plataforma`, `data_adicionado`, `verificado_em`.

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

## Antes de entregar

```bash
npx tsc --noEmit
```

`npm run build` só quando o assunto for o próprio build — é lento e não diz
nada que o `tsc` não diga.
