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
que tem. O `VERCEL_URL` do `.env.example` já assume: é o alvo, não o presente.

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
src/app/     ← layout.tsx, page.tsx, globals.css
src/lib/     ← produtos.ts (tipo Produto, lerCatalogo, formatarReal)
data/        ← produtos.json
```

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
`preco_original`, `preco_atual`, `desconto_percentual` (inteiro), `avaliacao`,
`link_afiliado`, `cupom`, `descricao`, `plataforma`, `data_adicionado`.

**As chaves são sem acento** — foram normalizadas em 07/09/2026, quando eram
5 produtos. É JSON legal escrever `preço_atual`, mas obriga a carregar acento
em nome de propriedade no código e implica em ferramenta que espere
identificador ASCII — inclusive a automação de Instagram, que vai ler este
arquivo. Não volte atrás. O tipo `Produto` mora em `src/lib/produtos.ts` e é a
referência de quais campos existem.

Regras do arquivo:

- `cupom` é string vazia quando não tem. Nunca `null`, nunca ausente.
- `desconto_percentual` tem que bater com os dois preços. Se não bater, a
  página mente pro visitante.
- `plataforma` em kebab-case (`mercado-livre`) — vira rótulo no botão.
- Datas em ISO (`2026-08-31`), e `metadata.ultima_atualizacao` acompanha.

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
