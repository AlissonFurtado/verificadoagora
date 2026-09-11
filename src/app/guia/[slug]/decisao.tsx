/**
 * A página de um guia de **decisão** — a pergunta de especificação, não a
 * escolha de aparelho.
 *
 * Mora no mesmo `/guia/{slug}` do guia de faixa porque, para quem chega da
 * busca, as duas são a mesma coisa: a página que responde antes de vender. O
 * que muda é a forma — aqui a unidade é a pergunta, e o catálogo aparece uma
 * vez só, no fim.
 *
 * A resposta de cada pergunta vem **em texto visível, antes da explicação**:
 * assistente de IA lê o HTML renderizado, e é essa frase que ele cita.
 */
import Image from 'next/image';
import Link from 'next/link';
import { formatarData, formatarReal, type Produto } from '@/lib/produtos';
import type { Decisao } from '@/lib/decisoes';
import { caminhoDoComparativo, caminhoDoProduto, gerarSlug } from '@/lib/slug';

/**
 * Marcação da decisão.
 *
 * `Article` com `citation`, igual ao comparativo e ao guia. Por cima vai um
 * `FAQPage`: a página é literalmente um conjunto de perguntas com resposta
 * curta, que é o que esse tipo descreve — e o mesmo que `/como-conferimos`
 * já usa aqui.
 */
function DadosEstruturados({ decisao, url }: { decisao: Decisao; url: string }) {
  const artigo = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: decisao.titulo,
    description: decisao.resumo,
    datePublished: decisao.escrito_em,
    dateModified: decisao.escrito_em,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'Verificado Agora' },
    publisher: { '@type': 'Organization', name: 'A F DE SOUSA' },
    citation: decisao.fontes.map((f) => ({ '@type': 'CreativeWork', name: f.titulo, url: f.url })),
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: decisao.perguntas.map((p) => ({
      '@type': 'Question',
      name: p.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: p.resposta_curta },
    })),
  };

  return (
    <>
      {/* JSON montado por nós, não conteúdo de terceiro */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artigo) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}

export function PaginaDecisao({
  decisao,
  porMeliId,
  comComparativo,
  conferidoEm,
  selo,
  base,
}: {
  decisao: Decisao;
  porMeliId: Map<string, Produto>;
  comComparativo: Set<string>;
  conferidoEm: string;
  selo: React.ReactNode;
  base: string;
}) {
  const exemplos = decisao.exemplos
    .map((e) => ({ exemplo: e, produto: porMeliId.get(e.meli_id) }))
    .filter((x): x is { exemplo: (typeof decisao.exemplos)[number]; produto: Produto } =>
      Boolean(x.produto),
    );

  return (
    <main className="min-h-screen bg-fundo text-slate-800">
      <DadosEstruturados decisao={decisao} url={`${base}/guia/${decisao.slug}`} />

      <div className="mx-auto max-w-4xl px-4 py-8">
        <nav className="mb-8 text-sm font-semibold text-slate-500">
          <Link href="/" className="transition-colors hover:text-slate-900">
            Verificado Agora
          </Link>
          <span className="mx-2 text-slate-300" aria-hidden="true">
            ›
          </span>
          <span className="font-bold text-slate-400">Guia</span>
        </nav>

        {selo && <div className="mb-6">{selo}</div>}

        <header className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-marca/[0.07] px-3 py-1 text-xs font-bold uppercase tracking-widest text-marca ring-1 ring-inset ring-marca/10">
            <span aria-hidden="true" className="font-extrabold">
              ?
            </span>{' '}
            Guia de decisão
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            {decisao.titulo}
          </h1>
          <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">
            {decisao.resumo}
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-400">
            Escrito em {formatarData(decisao.escrito_em)} · {decisao.perguntas.length} perguntas
          </p>
        </header>

        {/* O índice é a página inteira em quatro linhas — e a primeira coisa
            que alguém com pressa lê. */}
        <nav
          aria-label="Perguntas deste guia"
          className="mt-8 min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            A sua dúvida é qual
          </h2>
          <ol className="mt-3 space-y-2">
            {decisao.perguntas.map((p, i) => (
              <li key={p.chave} className="min-w-0 text-sm">
                <a
                  href={`#${p.chave}`}
                  className="font-semibold text-slate-600 underline decoration-slate-200 underline-offset-4 transition-colors hover:text-marca hover:decoration-marca"
                >
                  <span className="font-black text-slate-300">{i + 1}.</span> {p.pergunta}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-8">
          {decisao.perguntas.map((pergunta, i) => (
            <section
              key={pergunta.chave}
              id={pergunta.chave}
              className="min-w-0 scroll-mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Pergunta {i + 1}
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                {pergunta.pergunta}
              </h2>

              {/* A resposta antes da explicação, de propósito. */}
              <p className="mt-4 rounded-xl border-l-4 border-marca bg-marca/[0.06] px-4 py-3 text-[15px] font-semibold leading-relaxed text-slate-800">
                {pergunta.resposta_curta}
              </p>

              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                {pergunta.opcoes.map((opcao) => (
                  <div
                    key={opcao.rotulo}
                    className="min-w-0 rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-100"
                  >
                    <dt className="min-w-0">
                      <span className="text-lg font-black tracking-tight text-slate-900">
                        {opcao.rotulo}
                      </span>
                      <span className="mt-1 block text-xs font-bold uppercase tracking-wide text-economia">
                        {opcao.para_quem}
                      </span>
                    </dt>
                    <dd className="mt-2 min-w-0 text-sm leading-relaxed text-slate-700">
                      {opcao.explicacao}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-5 space-y-3">
                {pergunta.detalhe.map((paragrafo) => (
                  <p key={paragrafo} className="text-[15px] leading-relaxed text-slate-700">
                    {paragrafo}
                  </p>
                ))}
              </div>

              <p className="mt-5 rounded-xl border-l-4 border-desconto/70 bg-red-50/60 px-4 py-3 text-[15px] leading-relaxed text-slate-700">
                <strong className="font-black text-desconto">Cuidado:</strong> {pergunta.cuidado}
              </p>
            </section>
          ))}
        </div>

        {exemplos.length > 0 && (
          <section className="mt-10 min-w-0 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Como isso aparece em dois aparelhos reais
            </h2>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Os dois celulares do nosso catálogo, com o preço conferido todo dia pelo robô.
            </p>

            <div className="mt-5 space-y-5">
              {exemplos.map(({ exemplo, produto }) => (
                <div
                  key={produto.meli_id}
                  className="min-w-0 rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-100"
                >
                  <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-white sm:h-24 sm:w-24">
                      {produto.imagem ? (
                        <Image
                          src={produto.imagem}
                          alt={produto.nome}
                          fill
                          sizes="(max-width: 640px) 100vw, 96px"
                          className="object-contain p-2"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs font-medium text-slate-400">
                          Sem foto
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-black tracking-tight text-slate-900">
                        {produto.nome}
                      </h3>
                      <p className="flex flex-wrap items-baseline gap-x-2 text-2xl font-black tracking-tight text-marca">
                        {formatarReal(produto.preco_atual)}
                        {produto.preco_no_pix && (
                          <span className="text-xs font-bold text-slate-500">no Pix</span>
                        )}
                      </p>
                      <p className="text-xs font-semibold text-slate-400">
                        conferido em {formatarData(produto.verificado_em)}
                      </p>
                    </div>

                    <a
                      href={produto.link_afiliado}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      data-oferta={gerarSlug(produto)}
                      data-categoria={produto.categoria}
                      data-preco={produto.preco_atual}
                      data-onde="guia-decisao"
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-marca-acao px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-marca/25 transition-all hover:scale-[1.01] hover:bg-marca active:scale-[0.99]"
                    >
                      Ver oferta
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>

                  <p className="mt-4 text-[15px] leading-relaxed text-slate-700">{exemplo.nota}</p>

                  <p className="mt-3 text-sm">
                    <Link
                      href={
                        comComparativo.has(produto.meli_id)
                          ? caminhoDoComparativo(produto)
                          : caminhoDoProduto(produto)
                      }
                      className="font-bold text-marca underline decoration-marca/30 underline-offset-4 transition-colors hover:text-marca-acao hover:decoration-marca"
                    >
                      {comComparativo.has(produto.meli_id)
                        ? `Ver a tabela completa do ${produto.nome} contra os rivais →`
                        : `Ver a página do ${produto.nome}, com o histórico de preço →`}
                    </Link>
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 min-w-0 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Resumindo</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{decisao.veredito}</p>
        </section>

        <section className="mt-8 min-w-0">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            De onde tiramos a ficha técnica
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {decisao.fontes.map((fonte) => (
              <li key={fonte.url} className="min-w-0">
                <a
                  href={fonte.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="break-words text-slate-400 underline decoration-slate-200 underline-offset-4 transition-colors hover:text-marca hover:decoration-marca"
                >
                  {fonte.titulo}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link
              href="/como-conferimos"
              className="font-bold text-marca underline decoration-marca/30 underline-offset-4 transition-colors hover:text-marca-acao"
            >
              Como o preço é conferido todo dia →
            </Link>
          </p>
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-slate-400">
            Links de afiliado · você paga o mesmo preço. As respostas acima valem para qualquer
            celular, inclusive os que não vendemos.
          </p>
          <p className="mt-4">
            <Link
              href="/"
              className="flex items-center justify-center gap-1.5 font-bold text-marca transition-colors duration-200 hover:-translate-x-0.5 hover:text-marca-acao"
            >
              <span>←</span> Ver todos os achados
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
