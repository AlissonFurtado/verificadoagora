<!-- Parte do CLAUDE.md, separada em 25/10/2026 (decisão do Alisson: "dividir por assunto"). Texto movido sem cortes. -->

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

### A home no celular: o que empurra o produto pra fora da tela

⚠️ **Os atalhos de guia são uma tira que rola de lado, não uma grade que quebra
linha.** Com 4 guias de rótulo longo, o `flex-wrap` empilhava 4 botões de 48px
e o primeiro card começava fora da tela — reclamação dele em 11/09/2026. A tira
custa uma linha e **não cresce** quando entrar o 5º guia, que vai entrar:
publicar guia é a frente de SEO. Do `sm` pra cima volta a quebrar linha.

⚠️ **O rótulo do guia de decisão não corta no dois-pontos.** No guia de faixa
cortar é bom ("Melhor celular até R$ 1.500: qual comprar em 2026" vira um
rótulo limpo). Na decisão estraga: "Tela de celular: AMOLED ou LCD?" virava
"Tela de celular", que não diz pergunta nenhuma.

🟢 **Card compacto no celular (04/10/2026), decisão dele.** As opções eram 2
colunas, 1 coluna compacta, 3 colunas e deixar como estava; ele escolheu **1
coluna compacta**, e o desktop (3 a 4 colunas) não mudou. Medido numa `iframe`
de 390 px: card de 219 → 176 px, **3,6 → 4,5 produtos por tela**, botão com os
mesmos 40 px. ⚠️ **3 colunas foi descartado**: ~115 px por card, preço ilegível.
**Como medir layout de celular daqui:** a janela do Chrome não redimensiona,
mas uma `iframe` de 390×844 numa página do `next dev` (mesma origem) sim —
mede altura, colunas e rolagem lateral, e o print dela mostra a tela de
verdade (espere as fotos carregarem antes do print).

🟢 **No topo da home ficam só 3 atalhos (12/10/2026), decisão dele.** Com 17
guias, os botões viravam 5 ou 6 linhas no monitor e ele não via produto sem
rolar. Agora: "O que caiu de preço", "Black Friday" e "Todos os guias" (âncora
`#guias`). Os guias moram numa seção **depois da vitrine**, em 3 grupos: "Qual
comprar" (`guias.json`), "Dúvidas antes de comprar" e "Vale esperar a Black
Friday?" (`decisoes.json`, pelo prefixo do slug). **Guia novo entra sozinho no
grupo certo; não volte a listar guia no topo.** O cabeçalho encolheu ~15% no
desktop (400 → 344 px), a pedido dele ("bem sutil"). Medido em iframe de
1920 px: primeiro card em ~570 px. Vale também no celular (3 botões na tira).

**O orçamento da dobra, pra quem for mexer:** cabeçalho ~175px + atalhos ~50px
+ título da vitrine ~80px + filtro ~74px. Tudo que entrar acima da grade sai do
espaço do primeiro card.

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
