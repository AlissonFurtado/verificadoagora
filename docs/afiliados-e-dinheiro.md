<!-- Parte do CLAUDE.md, separada em 25/10/2026 (decisão do Alisson: "dividir por assunto"). Texto movido sem cortes. -->

## 🔴 Os termos do programa de afiliados (lidos em 15/09/2026)

<https://www.mercadolivre.com.br/ajuda/30228>. Lidos quando ele perguntou se
podia usar o vídeo do anúncio num reel. **Três cláusulas batem de frente com
o que o site já faz, e nenhuma foi resolvida ainda** — decisão dele:

| Cláusula | Diz | Bate em |
|---|---|---|
| **5.3** | Afiliado "não poderá fazer qualquer publicidade **comparando** os produtos… com qualquer produto, seja de empresa concorrente ou não" | Os comparativos e os guias — o formato que abre índice |
| **5.4** | Nas postagens com link, "só poderá mencionar as informações previstas expressamente nos anúncios" | As `analise` com dado de fabricante que o anúncio não traz (ex.: "4 GB reais" do OPPO) |

🟡 **Decisão do Alisson em 16/09/2026 sobre 5.3 e 5.4: seguir escrevendo
comparativo e guia.** O argumento dele: o site não tem tráfego, ninguém vai
reparar agora, e o formato é o único que abre índice — quando as coisas
andarem, revisa. **Não é esquecimento, é risco aceito com informação na mão.**
⚠️ O que fica combinado: **quando o tráfego começar a aparecer** (primeiras
vendas, ou o painel do Meli acusando volume), **retomar esta decisão** — o
risco não é multa, é perder a conta que recebe a comissão.
| **1.3** | Só conta como Mídia (e só gera pagamento) o site/rede **informado ao ML antes** | 🟢 **Resolvido**: em Perfil de afiliado → Contas vinculadas estão `Instagram verificadoagorabr` e `https://verificadoagora.com.br/` (conferido 15/09) |

**Placar do painel em 15/09/2026:** 7 a 13/09 → **19 cliques** (+1800% sobre a
semana anterior), **0 compradores, 0 vendas**. É o primeiro número real de
clique vindo do site.

- **Vídeo do anúncio: não.** 9.2 não dá direito sobre conteúdo que não foi
  expressamente liberado; 9.5 põe na conta do afiliado qualquer obra de
  terceiro (fotografia inclusive); 4.3(c) proíbe coleta automatizada de
  "materiais criativos". O único material liberado é o que o ML
  **disponibilizar** ao afiliado (1.7) — conferir se o painel oferece.
- **5.1 pede sinalização de publicidade no padrão CONAR** (Guia de
  Influenciadores) em todo conteúdo com link — "Link de afiliado" na legenda
  pode não bastar; CONAR costuma pedir `#publi`/"publicidade".

## 🔴 A comissão do afiliado muda por categoria — e nós estávamos na pior

Pesquisado em 24/09/2026, quando ele perguntou sobre ampliar o portfólio para
roupas no fim de ano. **É o dado mais importante sobre dinheiro que este
projeto tinha em falta:**

| Categoria | Venda direta | Indireta |
|---|---|---|
| **Beleza · Calçados, roupas e bolsas · Esportes e fitness** | **16%** | 8% |
| Maioria das categorias | 12% | 6% |
| **Eletrônicos, celulares e informática** | **5%** | 2,5% |
| Alimentos e bebidas | 0% | — |

**O catálogo inteiro está na faixa de 5%.** Uma roupa de R$ 200 rende R$ 32;
o Moto G17 de R$ 843 rende R$ 42 — quase o mesmo por um produto 4× mais caro.
⚠️ **Não foi confirmado em qual faixa caem os eletrodomésticos** que já
vendemos (micro-ondas, aspirador, cafeteira); a fonte que decide é o painel de
afiliado da conta dele, não blog de terceiro. **Conferir antes de qualquer
conta séria.**

⚠️ **Venda indireta paga metade** e acontece quando a pessoa clica no link,
navega e compra outra coisa em até 24h. Como o nosso `meli.la` cai no
**perfil social** com um "Ir para produto" no meio do caminho, vale medir se
as vendas estão entrando como direta ou indireta quando a primeira acontecer.

**Sazonalidade, medida na Black Friday 2025:** por faturamento lideram TVs
(R$ 868 mi), smartphones (R$ 791 mi) e geladeiras (R$ 557 mi) — eletrônicos
cresceram 16,1% e passaram Moda. Por **número de pedidos** lideram moda e
beleza/perfumaria (+16%). Dezembro é outro jogo: brinquedo atinge o pico do
ano, com decoração, utensílio de cozinha e fone TWS. **Ticket alto domina o
faturamento, ticket baixo domina o volume — e o percentual está do lado do
ticket baixo.**

### `so_no_canal`: o canal e o site deixaram de ter o mesmo catálogo

**Decisão dele em 24/09/2026**, escolhida contra "abrir moda no site também".
O campo `so_no_canal: true` em `src/lib/produtos.ts` marca produto que vale a
mensagem do WhatsApp mas não a vitrine.

- **Some** da vitrine, do sitemap e de toda página do site — o filtro está em
  `produtosVisiveis()`, que é o **ponto único de visibilidade**: vitrine,
  sitemap, `/black-friday`, `/entrar`, `/instagram`, guias e comparativos
  passam por lá. Filtro novo entra nessa linha, nunca espalhado.
- **Fica** na fila do canal (`canal.mjs` filtra por `oculto`, não por este).
- **A ficha continua no ar, com `noindex`** — ela é o destino do link da
  mensagem, e **nunca mandamos `meli.la` no canal**. O `noindex` existe porque
  roupa não tem ficha de fabricante: sem ela não há comparativo nem guia, e
  ficha solta de commodity é a URL fina que este domínio já é penalizado por
  ter. Mesma razão do `noindex` da `/instagram`.
- ⚠️ **`oculto` e `so_no_canal` são opostos e não se combinam** — oculto some
  do canal também. O `canal.mjs` avisa se alguém marcar os dois.

Medido no dev local com um produto de teste: 0 menções na vitrine, 0 no
sitemap, ficha respondendo 200 com `noindex, follow`.

⚠️ **O que ainda não foi feito:** o `data/garimpo.json` continua só com as
categorias de tecnologia e casa. Para a fila trazer candidato de moda, beleza
ou esporte, é lá que se acrescenta a categoria — e aí vale o mesmo cuidado de
sempre com subcategoria (o topo de uma categoria guarda-chuva vem cheio de
acessório barato).

## 🟡 Shopee: segunda loja de afiliado (decidido em 03/10/2026)

**Decisão dele: adicionar a Shopee ao site, ao lado do Mercado Livre.**

- 🟢 **Inscrição aceita em 03/10/2026** (e-mail `affiliate@mail.shopee.com.br`,
  "Inscrição aceita - Afiliados Shopee Brasil"). **Já dá para gerar link.**
- 🔴 **Para receber, falta o cadastro bancário e fiscal no painel** — é dele
  (dado bancário eu não preencho). Escolha pendente: **PF ou PJ** (a A F DE
  SOUSA tem CNPJ). A aprovação leva até ~10 dias, e **a comissão só é paga 60
  dias depois da aprovação**: cada dia sem cadastrar empurra o primeiro
  pagamento.
- ⚠️ **Nada do site fala com a Shopee ainda.** O robô de preços, o garimpo, o
  histórico e o `meli_id` são do Meli. O campo `plataforma` (kebab-case) já
  existe e vira o rótulo do botão — `shopee` cabe nele —, mas **produto sem
  conferência diária contradiz o nome do site**. Antes de pôr o primeiro
  produto: pesquisar se a Shopee tem API de afiliado (preço e link por
  programa), a comissão por categoria, e **ler os termos** como foi feito com
  os do Meli (cláusulas de comparativo, de mídia declarada e de rede social).
- Nada disso foi pesquisado ainda. **É a próxima frente quando ele pedir.**

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
