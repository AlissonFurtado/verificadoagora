import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { lerCatalogo, lerComparativos } from '@/lib/catalogo';
import { formatarData, formatarReal, produtosVisiveis, type Produto } from '@/lib/produtos';
import { acharComparativo, type Comparativo } from '@/lib/comparativos';
import { acharPorSlug, caminhoDoComparativo, gerarSlug } from '@/lib/slug';

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
  return comparativo ? { produto, comparativo } : undefined;
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
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '';

  /** Quem tem meli_id está no catálogo — e o preço vem de lá, nunca do JSON do
   *  comparativo. É o que mantém o robô de preços mandando na única linha da
   *  tabela que envelheceria sozinha. */
  const noCatalogo = new Map(
    comparativo.colunas
      .map((c) => [c.chave, catalogo.find((p) => p.meli_id === c.meli_id)] as const)
      .filter((par): par is readonly [string, Produto] => Boolean(par[1])),
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
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
          <span className="mx-2 text-slate-300 animate-pulse" aria-hidden="true">
            ›
          </span>
          <span className="text-slate-400 font-bold">Comparativo</span>
        </nav>

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
            <p className="mt-1 flex flex-wrap items-baseline gap-x-3 text-3xl font-black text-emerald-600 tracking-tight">
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
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] animate-pulse-subtle"
          >
            Ver oferta
            <span aria-hidden="true" className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
          </a>
        </section>

        <section className="mt-10 min-w-0">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">A tabela</h2>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Arraste a tabela para o lado para ver todos os modelos.
          </p>

          {/* A tabela é o único lugar da página que pode passar da largura da
              tela: rola dentro do próprio quadro, e o corpo nunca rola no
              horizontal. */}
          <div className="mt-4 min-w-0 overflow-x-auto rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Ficha técnica do {produto.nome} comparada com{' '}
                {comparativo.colunas.length - 1} modelos concorrentes
              </caption>
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/85">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 w-56 min-w-[14rem] bg-slate-50 border-r border-slate-200/80 px-4 py-3.5 font-bold text-slate-800"
                  >
                    O que compara
                  </th>
                  {comparativo.colunas.map((coluna, i) => (
                    <th
                      key={coluna.chave}
                      scope="col"
                      className={`min-w-[11rem] px-4 py-3.5 font-extrabold border-r border-slate-200/30 ${
                        i === 0 ? 'bg-emerald-50/70 text-emerald-900' : 'text-slate-700'
                      }`}
                    >
                      {coluna.nome}
                      {noCatalogo.has(coluna.chave) && (
                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                          está na vitrine
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Linha de preço montada do catálogo, não do arquivo do
                    comparativo: assim o robô de preços continua dono dela e o
                    texto nunca anuncia valor que ninguém conferiu hoje. */}
                <tr className="border-b border-slate-200/60">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-slate-50/95 border-r border-slate-200 px-4 py-4 align-top font-bold text-slate-800"
                  >
                    Preço conferido
                    <span className="mt-1 block text-xs font-normal leading-relaxed text-slate-400">
                      Só publicamos preço que nosso robô confere todo dia. Dos concorrentes não
                      acompanhamos o valor, então não inventamos um.
                    </span>
                  </th>
                  {comparativo.colunas.map((coluna, i) => {
                    const doCatalogo = noCatalogo.get(coluna.chave);
                    return (
                      <td
                        key={coluna.chave}
                        className={`px-4 py-4 align-top border-r border-slate-200/30 ${i === 0 ? 'bg-emerald-50/20' : ''}`}
                      >
                        {doCatalogo ? (
                          <>
                            <span className="text-lg font-black text-emerald-600 block">
                              {formatarReal(doCatalogo.preco_atual)}
                            </span>
                            <span className="mt-1 block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              em {formatarData(doCatalogo.verificado_em)}
                            </span>
                          </>
                        ) : (
                          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">não acompanhamos</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {comparativo.linhas.map((linha) => (
                  <tr key={linha.campo} className="border-b border-slate-200/60">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-slate-50/95 border-r border-slate-200 px-4 py-4 align-top font-bold text-slate-800"
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
                          className={`px-4 py-4 align-top border-r border-slate-200/30 ${
                            venceu
                              ? 'bg-emerald-50/60 text-slate-900 font-medium'
                              : i === 0
                                ? 'bg-emerald-50/10 text-slate-600'
                                : 'text-slate-600'
                          }`}
                        >
                          {linha.valores[coluna.chave] ?? '—'}
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
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-md shadow-emerald-500/10 transition-all hover:from-emerald-600 hover:to-emerald-700 animate-pulse-subtle"
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
                  className="flex items-center gap-2 rounded-xl bg-slate-100 border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-all"
                >
                  Ver o {coluna.nome} por {formatarReal(doCatalogo.preco_atual)}
                  <span aria-hidden="true">→</span>
                </a>
              );
            })}
          </div>
        </section>

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
                  className="break-words text-slate-400 underline decoration-slate-200 underline-offset-4 hover:text-emerald-600 hover:decoration-emerald-400 transition-colors"
                >
                  {fonte.titulo}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p className="mx-auto max-w-2xl leading-relaxed">
            Os links de compra desta página são de afiliado: se você comprar por eles, ganhamos uma
            comissão. O preço que você paga é exatamente o mesmo, e isso não muda o que escrevemos
            acima — a tabela mostra inclusive onde o {produto.nome} perde.
          </p>
          <p className="mt-4">
            <Link href="/" className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center justify-center gap-1.5 hover:-translate-x-0.5 duration-200">
              <span>←</span> Ver todos os achados
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
