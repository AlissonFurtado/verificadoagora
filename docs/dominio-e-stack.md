<!-- Parte do CLAUDE.md, separada em 25/10/2026 (decisão do Alisson: "dividir por assunto"). Texto movido sem cortes. -->

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
