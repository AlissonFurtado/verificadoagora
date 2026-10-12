import { lerCatalogo, lerComparativos, lerDecisoes, lerGuias, lerHistorico } from '@/lib/catalogo';
import { ordenarPorRecencia, produtosVisiveis } from '@/lib/produtos';
import { resumirTendencia, seloDeMenorPreco } from '@/lib/historico';
import { acharComparativo, quantosRivais } from '@/lib/comparativos';
import { caminhoDoComparativo } from '@/lib/slug';
import Link from 'next/link';
import { CardProduto } from './card-produto';
import { Vitrine } from './vitrine';
import { SeloDeConferencia } from './selo-de-conferencia';
import { descreverConferencia } from '@/lib/relogio';

export const revalidate = 3600; // o preço envelhece: revalida de hora em hora

/**
 * Os motivos pra confiar na página, ditos sem enrolação.
 *
 * Eram três caixas empilhadas e ocupavam 365px no celular — mais da metade
 * do cabeçalho, com o primeiro card começando em 936px numa tela de 844px:
 * quem abria pelo Instagram não via produto nenhum sem rolar. Viraram uma
 * faixa de uma linha, e a explicação de cada uma só aparece do `sm` pra cima.
 *
 * O aviso de link de afiliado saiu daqui em 08/09/2026 e vive no rodapé,
 * onde continua sendo declarado — veja "Dinheiro" no CLAUDE.md.
 */
const GARANTIAS = [
  ['Preço conferido todo dia', 'um robô confere na API do Mercado Livre toda manhã'],
  ['Histórico de verdade', 'guardamos o preço de cada dia, por isso sabemos qual é o menor'],
] as const;

/**
 * ⚠️ **O foco em celulares acabou em 11/09/2026**, por decisão do Alisson.
 *
 * Ele entrou em 09/09 para o buscador ler um assunto só, e saiu porque o
 * catálogo tinha dois celulares e a vitrine parecia vazia. O aviso sobre a
 * leitura de tópico foi dado antes da decisão, e a decisão foi mantida.
 *
 * Sem foco, o filtro trata toda categoria igual — é o que `Vitrine` faz
 * quando `foco` não vem.
 */
const CATEGORIA_FOCO = undefined;

export default function Home() {
  const { produtos: todos, metadata } = lerCatalogo();
  const produtos = ordenarPorRecencia(produtosVisiveis(todos));
  const historico = lerHistorico();
  const comparativos = lerComparativos();
  const guias = lerGuias();
  // No topo ficam só três atalhos, numa linha. Eram todos os guias (17 botões
  // em 12/10/2026), e no monitor viravam 5 ou 6 linhas: quem abria a página
  // não via produto nenhum sem rolar. Os guias moram na seção `#guias`,
  // depois da vitrine, separados por assunto. Decisão do Alisson em 12/10.
  const atalhosDeGuia = [
    // Primeiro atalho é o que muda todo dia: é o único motivo que a página
    // oferece para alguém voltar amanhã sem passar pelo Google.
    { href: '/quedas-de-preco', rotulo: 'O que caiu de preço', icone: '↓' },
    // Depois de 27/11/2026 a Black Friday sai daqui — a página continua no ar.
    { href: '/black-friday', rotulo: 'Black Friday 2026: o desconto é real?', icone: '%' },
    { href: '#guias', rotulo: 'Todos os guias', icone: '☰' },
  ];
  const decisoes = lerDecisoes();
  const ehDeBlackFriday = (slug: string) => slug.startsWith('vale-esperar-black-friday');
  // O guia de faixa corta no dois-pontos ("Monitor Full HD: qual comprar…"
  // vira o rótulo bom). Na decisão, cortar assim estraga: "Tela de celular:
  // AMOLED ou LCD?" virava "Tela de celular", que não diz pergunta nenhuma.
  const gruposDeGuia = [
    {
      titulo: 'Qual comprar',
      itens: guias.map((g) => ({ href: `/guia/${g.slug}`, rotulo: g.titulo.split(':')[0] })),
    },
    {
      titulo: 'Dúvidas antes de comprar',
      itens: decisoes
        .filter((d) => !ehDeBlackFriday(d.slug))
        .map((d) => ({ href: `/guia/${d.slug}`, rotulo: d.titulo })),
    },
    {
      titulo: 'Vale esperar a Black Friday?',
      itens: decisoes
        .filter((d) => ehDeBlackFriday(d.slug))
        .map((d) => ({
          href: `/guia/${d.slug}`,
          rotulo: d.titulo.replace('Vale esperar a Black Friday para comprar ', 'Para comprar '),
        })),
    },
  ].filter((grupo) => grupo.itens.length > 0);
  const conferencia = descreverConferencia(metadata.conferido_em, new Date());

  return (
    <main className="min-h-screen bg-fundo">
      {/* A faixa noturna, cortada por uma linha ciano. É o contraste dela com
          o corpo claro que separa a vitrine de um blog — foi assim que o
          Alisson escolheu em 08/09/2026, entre três cortes de topo. */}
      <header className="faixa-noturna border-b-4 border-corte">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="mb-2">
            {conferencia && (
              <SeloDeConferencia
                conferidoEm={metadata.conferido_em}
                inicial={conferencia}
                sobre="escuro"
              />
            )}
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Verificado <span className="text-marca-claro">Agora</span>
          </h1>
          {/* Some no celular: no espaço que ele ocupa cabe metade de um card,
              e o título já diz o que a página é. */}
          <p className="mt-2 max-w-xl text-sm font-semibold text-marca-claro sm:mt-3 sm:text-lg">
            Tecnologia com preço conferido todo dia.
          </p>
          <p className="mt-2 hidden max-w-xl text-lg font-medium text-sky-100/70 sm:block">
            Celular, eletrônico, casa e games. O preço de cada um é conferido por robô toda manhã,
            e a gente guarda o valor de todo dia — por isso dá pra dizer quando está barato de
            verdade.
          </p>

          <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-sky-100/65 sm:mt-4 sm:text-sm">
            {GARANTIAS.map(([titulo, texto]) => (
              <div key={titulo} className="flex min-w-0 items-baseline gap-1.5">
                <dt className="font-bold text-sky-50">
                  <span aria-hidden="true" className="mr-1 font-black text-corte">
                    ✓
                  </span>
                  {titulo}
                </dt>
                <dd className="hidden min-w-0 sm:block">— {texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* Guia acima da grade porque ele responde a dúvida de quem ainda não
          escolheu — e a vitrine sozinha só serve quem já sabe o que quer. */}
      {atalhosDeGuia.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pt-5 sm:pt-6">
          {/* No celular é uma tira que rola de lado, mesmo gesto da barra de
              filtro logo abaixo. São três botões e não crescem: guia novo
              entra na seção `#guias`, não aqui. */}
          <ul className="-mx-4 flex min-w-0 gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {atalhosDeGuia.map((guia) => (
              <li key={guia.href} className="shrink-0">
                <Link
                  href={guia.href}
                  className="flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-marca/30 hover:text-marca hover:shadow-md sm:whitespace-normal sm:px-5 sm:py-3.5"
                >
                  <span aria-hidden="true" className="font-black text-marca">
                    {guia.icone}
                  </span>
                  <span>{guia.rotulo}</span>
                  <span aria-hidden="true" className="text-marca">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-5 sm:pt-6 sm:pb-12">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 sm:mb-5">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            {produtos.length} {produtos.length === 1 ? 'achado conferido' : 'achados conferidos'}
          </h2>
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            A loja muda preço a qualquer hora — vale conferir antes de comprar.
          </p>
        </div>

        <Vitrine
          foco={CATEGORIA_FOCO}
          produtos={produtos}
          cards={produtos.map((produto) => {
            const comparativo = acharComparativo(comparativos, produto.meli_id);
            return (
              <CardProduto
                key={produto.id}
                produto={produto}
                selo={seloDeMenorPreco(historico.produtos[produto.meli_id], produto.preco_atual)}
                tendencia={resumirTendencia(historico.produtos[produto.meli_id])}
                comparativo={
                  comparativo
                    ? {
                        caminho: caminhoDoComparativo(produto),
                        rivais: quantosRivais(comparativo),
                      }
                    : null
                }
              />
            );
          })}
        />
      </section>

      {gruposDeGuia.length > 0 && (
        <section id="guias" className="mx-auto max-w-6xl scroll-mt-6 px-4 pb-8 sm:pb-14">
          <h2 className="mb-4 text-xl font-extrabold tracking-tight text-slate-900 sm:mb-6 sm:text-2xl">
            Guias
          </h2>
          <div className="grid min-w-0 gap-4 md:grid-cols-3">
            {gruposDeGuia.map((grupo) => (
              <div
                key={grupo.titulo}
                className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
              >
                <h3 className="text-xs font-black uppercase tracking-wide text-marca">
                  {grupo.titulo}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {grupo.itens.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm font-bold text-slate-700 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-marca hover:decoration-marca/40"
                      >
                        {item.rotulo}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* O rodapé usa a mesma faixa do topo: a página abre e fecha no mesmo
          escuro, e a vitrine clara fica emoldurada entre as duas. */}
      <footer className="faixa-noturna mt-4 border-t-4 border-corte">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-8 text-center text-xs text-sky-100/50">
          <p className="text-base font-black tracking-tight text-white">
            Verificado <span className="text-marca-claro">Agora</span>
          </p>
          {/* Encurtado em 08/09/2026, não removido: o programa de afiliados
              exige a declaração e a regra 1 do projeto diz "nunca tire". Uma
              linha cumpre a exigência sem virar parede de texto. */}
          <p>
            <Link
              href="/como-conferimos"
              className="font-bold text-marca-claro underline decoration-marca-claro/40 underline-offset-4 transition-colors hover:text-white"
            >
              Como conferimos os preços
            </Link>
          </p>
          <p className="text-sky-100/75">Links de afiliado · você paga o mesmo preço</p>
          <p>
            © 2026 A F DE SOUSA ·{' '}
            <a
              className="font-medium underline transition-colors hover:text-white"
              href="mailto:contato@afdesousa.com.br"
            >
              contato@afdesousa.com.br
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
