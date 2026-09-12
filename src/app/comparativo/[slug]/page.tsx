import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { lerCatalogo, lerComparativos, lerGuias } from '@/lib/catalogo';
import { formatarData, formatarReal, produtosVisiveis, type Produto } from '@/lib/produtos';
import { acharComparativo, comTextoDeHoje, type Comparativo } from '@/lib/comparativos';
import { acharPorSlug, caminhoDoComparativo, gerarSlug } from '@/lib/slug';
import { descreverConferencia } from '@/lib/relogio';
import { SeloDeConferencia } from '../../selo-de-conferencia';
import { GuiasRelacionados } from '../../guias-relacionados';

export const revalidate = 3600;

/** O comparativo mora no mesmo slug do produto: /produto/x e /comparativo/x. */
export function generateStaticParams() {
  const produtos = produtosVisiveis(lerCatalogo().produtos);
  return lerComparativos()
    .map((c) => produtos.find((p) => p.meli_id === c.meli_id))
    .filter((p): p is Produto => Boolean(p))
    .map((p) => ({ slug: gerarSlug(p) }));
}

type Achado = { produto: Produto; comparativo: Comparativo };

function buscar(slug: string): Achado | undefined {
  const produto = acharPorSlug(produtosVisiveis(lerCatalogo().produtos), slug);
  if (!produto) return undefined;
  const comparativo = acharComparativo(lerComparativos(), produto.meli_id);
  // Resolve `{preco}` e companhia aqui, num lugar só: a página e o
  // generateMetadata passam os dois por esta função.
  return comparativo ? { produto, comparativo: comTextoDeHoje(comparativo, produto) } : undefined;
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const achado = buscar(params.slug);
  if (!achado) return { title: 'Comparativo não encontrado' };

  const { produto, comparativo } = achado;
  const descricao = `${comparativo.colunas.length} celulares lado a lado: tela, processador, bateria, câmera e anos de atualização. ${produto.nome} por ${formatarReal(produto.preco_atual)}, preço conferido em ${formatarData(produto.verificado_em)}.`;

  return {
    title: comparativo.titulo,
    description: descricao,
    alternates: { canonical: caminhoDoComparativo(produto) },
    openGraph: {
      title: comparativo.titulo,
      description: descricao,
      type: 'article',
      images: produto.imagem ? [{ url: produto.imagem }] : undefined,
    },
  };
}

/**
 * Marcação do comparativo como artigo.
 *
 * De propósito **não** é `Review` com nota: nota que a gente não mediu, dita
 * em linguagem de máquina, é o mesmo que inventar preço. O que declaramos é o
 * que existe de fato — um texto nosso, com data, sobre estes aparelhos.
 */
function DadosEstruturados({
  comparativo,
  produto,
  url,
}: {
  comparativo: Comparativo;
  produto: Produto;
  url: string;
}) {
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comparativo.titulo,
    description: comparativo.resumo,
    datePublished: comparativo.escrito_em,
    dateModified: produto.verificado_em,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'Verificado Agora' },
    publisher: { '@type': 'Organization', name: 'A F DE SOUSA' },
    about: comparativo.colunas.map((coluna) => ({ '@type': 'Product', name: coluna.nome })),
    citation: comparativo.fontes.map((f) => ({ '@type': 'CreativeWork', name: f.titulo, url: f.url })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON montado por nós, não conteúdo de terceiro
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

/** Marca quem ganhou a linha. Nunca só pela cor: vem com a palavra junto. */
function Melhor() {
  return (
    <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-emerald-800">
      <span aria-hidden="true">▲</span> melhor
    </span>
  );
}

export default function PaginaDoComparativo({ params }: { params: { slug: string } }) {
  const achado = buscar(params.slug);
  if (!achado) notFound();

  const { produto, comparativo } = achado;
  const catalogo = produtosVisiveis(lerCatalogo().produtos);
  const conferidoEm = lerCatalogo().metadata.conferido_em;
  const conferencia = descreverConferencia(conferidoEm, new Date());
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '';

  /** Quem tem meli_id está no catálogo — e o preço vem de lá, nunca do JSON do
   *  comparativo. É o que mantém o robô de preços mandando na única linha da
   *  tabela que envelheceria sozinha. */
  const guiasComEle = lerGuias().filter((guia) =>
    guia.perfis.some((perfil) => perfil.meli_id === produto.meli_id),
  );

  const noCatalogo = new Map(
    comparativo.colunas
      .map((c) => [c.chave, catalogo.find((p) => p.meli_id === c.meli_id)] as const)
      .filter((par): par is readonly [string, Produto] => Boolean(par[1])),
  );

  /**
   * A ficha inteira numa lista só — a linha de preço na frente das linhas do
   * arquivo do comparativo.
   *
   * ⚠️ Existe porque a mesma ficha é desenhada de **dois jeitos**: blocos
   * empilhados no celular, tabela do `lg` pra cima. Duas montagens separadas
   * é como os dois formatos passariam a divergir com o tempo.
   */
  const linhasDaFicha = [
    {
      campo: 'Preço conferido',
      nota: 'Só publicamos preço que nosso robô confere todo dia. Dos concorrentes não acompanhamos o valor, então não inventamos um.',
      vencedores: [] as string[],
      celula: (chave: string) => {
        const doCatalogo = noCatalogo.get(chave);
        if (!doCatalogo) {
          return (
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              não acompanhamos
            </span>
          );
        }
        return (
          <>
            <span className="block text-lg font-black text-marca">
              {formatarReal(doCatalogo.preco_atual)}
            </span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              em {formatarData(doCatalogo.verificado_em)}
            </span>
          </>
        );
      },
    },
    ...comparativo.linhas.map((linha) => ({
      campo: linha.campo,
      nota: linha.nota,
      vencedores: linha.vencedores,
      celula: (chave: string) => <>{linha.valores[chave] ?? '—'}</>,
    })),
  ];

  return (
    <main className="min-h-screen bg-fundo text-slate-800">
      <DadosEstruturados
        comparativo={comparativo}
        produto={produto}
        url={`${base}${caminhoDoComparativo(produto)}`}
      />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <nav className="mb-8 text-sm text-slate-500 font-semibold">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Verificado Agora
          </Link>
          <span className="mx-2 text-slate-300" aria-hidden="true">
            ›
          </span>
          <span className="text-slate-400 font-bold">Comparativo</span>
        </nav>

        {conferencia && (
          <div className="mb-6">
            <SeloDeConferencia conferidoEm={conferidoEm} inicial={conferencia} />
          </div>
        )}

        <header className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-800 ring-1 ring-inset ring-amber-600/10">
            <span aria-hidden="true" className="text-amber-500 font-extrabold">⚖</span> Comparativo
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            {comparativo.titulo}
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-slate-600">
            {comparativo.resumo}
          </p>
          <p className="mt-3 text-sm text-slate-400 font-semibold">
            Escrito em {formatarData(comparativo.escrito_em)} · preços conferidos em{' '}
            {formatarData(produto.verificado_em)}
          </p>
        </header>

        {/* O produto do comparativo, com o botão de compra logo no começo:
            quem já decidiu não precisa descer a tabela inteira pra comprar. */}
        <section className="mt-8 flex min-w-0 flex-col gap-5 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-md sm:flex-row sm:items-center">
          <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-white border border-slate-100 sm:h-36 sm:w-36">
            {produto.imagem ? (
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                sizes="(max-width: 640px) 100vw, 144px"
                className="object-contain p-4"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-400 font-medium">
                Sem foto
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-black text-slate-900">{produto.nome}</h2>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-3 text-3xl font-black text-marca tracking-tight">
              {formatarReal(produto.preco_atual)}
              <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-black text-white shadow-md shadow-red-500/10 flex items-center gap-1">
                <span>🔥</span> {produto.desconto_percentual}% OFF
              </span>
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-400 line-through">
              {formatarReal(produto.preco_original)}
            </p>
          </div>

          <a
            href={produto.link_afiliado}
            target="_blank"
            rel="sponsored noopener noreferrer"
            data-oferta={gerarSlug(produto)}
            data-categoria={produto.categoria}
            data-preco={produto.preco_atual}
            data-onde="comparativo"
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-marca-acao px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-marca/25 transition-all hover:bg-marca hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
          >
            Ver oferta
            <span aria-hidden="true" className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
          </a>
        </section>

        <section className="mt-10 min-w-0">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">A tabela</h2>
          <p className="mt-1 hidden text-sm font-medium text-slate-500 lg:block">
            Arraste a tabela para o lado para ver todos os modelos.
          </p>

          {/* ⚠️ **No celular a ficha não é tabela, e isso foi uma decisão.**
              A tabela deslizante tinha a coluna de critérios fixa em 14rem —
              mais de metade de uma tela de 390px — e o fundo dela era
              semitransparente, então o conteúdo que rolava aparecia POR BAIXO
              do texto. O print do Alisson em 11/09/2026 mostrava "R$ 887,78"
              escrito em cima da nota da linha.

              Cada critério vira um bloco, com um modelo por linha dentro: não
              rola nada de lado, e quem perde continua aparecendo — que é a
              regra do comparativo. Do `lg` pra cima a tabela volta, porque lá
              ela cabe e comparar coluna a coluna é melhor. */}
          <div className="mt-4 space-y-4 lg:hidden">
            {linhasDaFicha.map((linha) => (
              <div
                key={linha.campo}
                className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
              >
                <h3 className="text-base font-black text-slate-900">{linha.campo}</h3>
                <p className="mt-1 text-xs font-normal leading-relaxed text-slate-400">
                  {linha.nota}
                </p>

                <dl className="mt-3 divide-y divide-slate-200/70 border-t border-slate-200/70">
                  {comparativo.colunas.map((coluna, i) => {
                    const venceu = linha.vencedores.includes(coluna.chave);
                    return (
                      <div
                        key={coluna.chave}
                        className={`-mx-4 flex min-w-0 items-baseline justify-between gap-3 px-4 py-2.5 ${
                          venceu ? 'bg-emerald-50/70' : i === 0 ? 'bg-marca/[0.04]' : ''
                        }`}
                      >
                        <dt
                          className={`min-w-0 shrink text-sm font-bold ${
                            i === 0 ? 'text-marca' : 'text-slate-700'
                          }`}
                        >
                          {coluna.nome}
                        </dt>
                        <dd
                          className={`min-w-0 text-right text-sm ${
                            venceu ? 'font-semibold text-slate-900' : 'text-slate-600'
                          }`}
                        >
                          {linha.celula(coluna.chave)}
                          {venceu && <Melhor />}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
          </div>

          {/* A tabela é o único lugar da página que pode passar da largura da
              tela: rola dentro do próprio quadro, e o corpo nunca rola no
              horizontal. ⚠️ O fundo da coluna fixa é **opaco** — com alfa,
              o que desliza aparece por baixo dela. */}
          <div className="mt-4 hidden min-w-0 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm lg:block">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Ficha técnica do {produto.nome} comparada com{' '}
                {comparativo.colunas.length - 1} modelos concorrentes
              </caption>
              <thead>
                <tr className="border-b border-slate-200/85 bg-slate-50">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 w-56 min-w-[14rem] border-r border-slate-200/80 bg-slate-50 px-4 py-3.5 font-bold text-slate-800"
                  >
                    O que compara
                  </th>
                  {comparativo.colunas.map((coluna, i) => (
                    <th
                      key={coluna.chave}
                      scope="col"
                      className={`min-w-[11rem] border-r border-slate-200/30 px-4 py-3.5 font-extrabold ${
                        i === 0 ? 'bg-marca/[0.07] text-marca' : 'text-slate-700'
                      }`}
                    >
                      {coluna.nome}
                      {noCatalogo.has(coluna.chave) && (
                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-marca">
                          está na vitrine
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {linhasDaFicha.map((linha) => (
                  <tr key={linha.campo} className="border-b border-slate-200/60">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 border-r border-slate-200 bg-slate-50 px-4 py-4 align-top font-bold text-slate-800"
                    >
                      {linha.campo}
                      <span className="mt-1 block text-xs font-normal leading-relaxed text-slate-400">
                        {linha.nota}
                      </span>
                    </th>
                    {comparativo.colunas.map((coluna, i) => {
                      const venceu = linha.vencedores.includes(coluna.chave);
                      return (
                        <td
                          key={coluna.chave}
                          className={`border-r border-slate-200/30 px-4 py-4 align-top ${
                            venceu
                              ? 'bg-emerald-50/70 font-medium text-slate-900'
                              : i === 0
                                ? 'bg-marca/[0.04] text-slate-600'
                                : 'text-slate-600'
                          }`}
                        >
                          {linha.celula(coluna.chave)}
                          {venceu && <Melhor />}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 grid min-w-0 gap-5 md:grid-cols-2">
          <div className="min-w-0 rounded-2xl bg-emerald-50/60 border border-emerald-100 p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-emerald-800 flex items-center gap-1.5">
              <span aria-hidden="true" className="text-emerald-500">✓</span>
              Por que vale a pena
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 font-medium">
              {comparativo.a_favor.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-emerald-500 font-bold">
                    +
                  </span>
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 rounded-2xl bg-slate-100/50 border border-slate-200/55 p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-1.5">
              <span aria-hidden="true" className="text-slate-400">⚠</span>
              Onde ele perde
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 font-medium">
              {comparativo.contra.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-slate-400 font-bold">
                    −
                  </span>
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-8 min-w-0 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-md">
          <h2 className="text-lg font-black text-slate-900">O veredito</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 font-medium">{comparativo.veredito}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={produto.link_afiliado}
              target="_blank"
              rel="sponsored noopener noreferrer"
              data-oferta={gerarSlug(produto)}
              data-categoria={produto.categoria}
              data-preco={produto.preco_atual}
              data-onde="comparativo"
              className="flex items-center gap-2 rounded-xl bg-marca-acao px-5 py-3.5 text-sm font-extrabold text-white shadow-md shadow-marca/10 transition-all hover:bg-marca"
            >
              Ver o {produto.nome.split(' ').slice(0, 3).join(' ')} por{' '}
              {formatarReal(produto.preco_atual)}
              <span aria-hidden="true">→</span>
            </a>

            {comparativo.colunas.slice(1).map((coluna) => {
              const doCatalogo = noCatalogo.get(coluna.chave);
              if (!doCatalogo) return null;
              return (
                <a
                  key={coluna.chave}
                  href={doCatalogo.link_afiliado}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  data-oferta={gerarSlug(doCatalogo)}
                  data-categoria={doCatalogo.categoria}
                  data-preco={doCatalogo.preco_atual}
                  data-onde="comparativo-rival"
                  className="flex items-center gap-2 rounded-xl bg-slate-100 border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-all"
                >
                  Ver o {coluna.nome} por {formatarReal(doCatalogo.preco_atual)}
                  <span aria-hidden="true">→</span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Quem chegou aqui buscando o nome do aparelho pode ainda estar em
            dúvida sobre a faixa inteira. O guia é a página que responde isso. */}
        {guiasComEle.length > 0 && (
          <section className="mt-8 min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Ainda comparando a faixa inteira?
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {guiasComEle.map((guia) => (
                <li key={guia.slug} className="min-w-0">
                  <Link
                    href={`/guia/${guia.slug}`}
                    className="font-bold text-marca underline decoration-marca/30 underline-offset-4 transition-colors hover:text-marca-acao hover:decoration-marca"
                  >
                    {guia.titulo} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-8 min-w-0">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            De onde tiramos a ficha técnica
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {comparativo.fontes.map((fonte) => (
              <li key={fonte.url} className="min-w-0">
                <a
                  href={fonte.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="break-words text-slate-400 underline decoration-slate-200 underline-offset-4 hover:text-marca hover:decoration-marca transition-colors"
                >
                  {fonte.titulo}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <GuiasRelacionados produto={produto} />

        <footer className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-slate-400">
            Links de afiliado · você paga o mesmo preço, e isso não muda o que escrevemos acima:
            a tabela mostra inclusive onde o {produto.nome} perde.
          </p>
          <p className="mt-4">
            <Link href="/" className="font-bold text-marca hover:text-marca-acao transition-colors flex items-center justify-center gap-1.5 hover:-translate-x-0.5 duration-200">
              <span>←</span> Ver todos os achados
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
