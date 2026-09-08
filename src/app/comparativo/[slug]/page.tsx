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
    <span className="mt-1 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-emerald-300">
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
    <main className="min-h-screen bg-slate-950">
      <DadosEstruturados
        comparativo={comparativo}
        produto={produto}
        url={`${base}${caminhoDoComparativo(produto)}`}
      />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <nav className="mb-8 text-sm text-slate-400">
          <Link href="/" className="hover:text-white">
            Verificado Agora
          </Link>
          <span className="mx-2" aria-hidden="true">
            ›
          </span>
          <span className="text-slate-500">Comparativo</span>
        </nav>

        <header className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-300 ring-1 ring-inset ring-amber-500/20">
            <span aria-hidden="true">⚖</span> Comparativo
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {comparativo.titulo}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-300">
            {comparativo.resumo}
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Escrito em {formatarData(comparativo.escrito_em)} · preços conferidos em{' '}
            {formatarData(produto.verificado_em)}
          </p>
        </header>

        {/* O produto do comparativo, com o botão de compra logo no começo:
            quem já decidiu não precisa descer a tabela inteira pra comprar. */}
        <section className="mt-8 flex min-w-0 flex-col gap-5 rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10 sm:flex-row sm:items-center">
          <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-white sm:h-36 sm:w-36">
            {produto.imagem ? (
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                sizes="(max-width: 640px) 100vw, 144px"
                className="object-contain p-3"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-400">
                Sem foto
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-white">{produto.nome}</h2>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-3 text-3xl font-extrabold text-emerald-400">
              {formatarReal(produto.preco_atual)}
              <span className="rounded-md bg-red-600 px-2 py-0.5 text-sm font-bold text-white">
                {produto.desconto_percentual}% OFF
              </span>
            </p>
            <p className="mt-1 text-sm text-slate-400 line-through">
              {formatarReal(produto.preco_original)}
            </p>
          </div>

          <a
            href={produto.link_afiliado}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-emerald-700"
          >
            Ver oferta
            <span aria-hidden="true">→</span>
          </a>
        </section>

        <section className="mt-10 min-w-0">
          <h2 className="text-2xl font-bold text-white">A tabela</h2>
          <p className="mt-1 text-sm text-slate-400">
            Arraste a tabela para o lado para ver todos os modelos.
          </p>

          {/* A tabela é o único lugar da página que pode passar da largura da
              tela: rola dentro do próprio quadro, e o corpo nunca rola no
              horizontal. */}
          <div className="mt-4 min-w-0 overflow-x-auto rounded-2xl ring-1 ring-inset ring-white/10">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Ficha técnica do {produto.nome} comparada com{' '}
                {comparativo.colunas.length - 1} modelos concorrentes
              </caption>
              <thead>
                <tr className="bg-white/10">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 w-56 min-w-[14rem] bg-slate-900 px-4 py-3 font-bold text-white"
                  >
                    O que compara
                  </th>
                  {comparativo.colunas.map((coluna, i) => (
                    <th
                      key={coluna.chave}
                      scope="col"
                      className={`min-w-[11rem] px-4 py-3 font-bold ${
                        i === 0 ? 'bg-emerald-500/10 text-emerald-200' : 'text-slate-200'
                      }`}
                    >
                      {coluna.nome}
                      {noCatalogo.has(coluna.chave) && (
                        <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
                          está aqui na página
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
                <tr className="border-t border-white/10">
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-slate-900 px-4 py-4 align-top font-bold text-white"
                  >
                    Preço conferido
                    <span className="mt-1 block text-xs font-normal leading-snug text-slate-400">
                      Só publicamos preço que nosso robô confere todo dia. Dos outros três não
                      acompanhamos o valor, então não inventamos um.
                    </span>
                  </th>
                  {comparativo.colunas.map((coluna, i) => {
                    const doCatalogo = noCatalogo.get(coluna.chave);
                    return (
                      <td
                        key={coluna.chave}
                        className={`px-4 py-4 align-top ${i === 0 ? 'bg-emerald-500/5' : ''}`}
                      >
                        {doCatalogo ? (
                          <>
                            <span className="text-lg font-extrabold text-emerald-400">
                              {formatarReal(doCatalogo.preco_atual)}
                            </span>
                            <span className="mt-0.5 block text-[11px] text-slate-400">
                              em {formatarData(doCatalogo.verificado_em)}
                            </span>
                          </>
                        ) : (
                          <span className="text-slate-500">não acompanhamos</span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {comparativo.linhas.map((linha) => (
                  <tr key={linha.campo} className="border-t border-white/10">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-slate-900 px-4 py-4 align-top font-bold text-white"
                    >
                      {linha.campo}
                      <span className="mt-1 block text-xs font-normal leading-snug text-slate-400">
                        {linha.nota}
                      </span>
                    </th>
                    {comparativo.colunas.map((coluna, i) => {
                      const venceu = linha.vencedores.includes(coluna.chave);
                      return (
                        <td
                          key={coluna.chave}
                          className={`px-4 py-4 align-top ${
                            venceu
                              ? 'bg-emerald-500/10 text-white'
                              : i === 0
                                ? 'bg-emerald-500/5 text-slate-300'
                                : 'text-slate-300'
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
          <div className="min-w-0 rounded-2xl bg-emerald-500/5 p-5 ring-1 ring-inset ring-emerald-500/20">
            <h2 className="text-lg font-bold text-emerald-300">Por que vale a pena</h2>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-300">
              {comparativo.a_favor.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-emerald-400">
                    +
                  </span>
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 rounded-2xl bg-white/5 p-5 ring-1 ring-inset ring-white/10">
            <h2 className="text-lg font-bold text-slate-200">Onde ele perde</h2>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-300">
              {comparativo.contra.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-slate-500">
                    −
                  </span>
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-8 min-w-0 rounded-2xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
          <h2 className="text-lg font-bold text-white">O veredito</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">{comparativo.veredito}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={produto.link_afiliado}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700"
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
                  className="flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-slate-200 ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/15 hover:text-white"
                >
                  Ver o {coluna.nome} por {formatarReal(doCatalogo.preco_atual)}
                  <span aria-hidden="true">→</span>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-8 min-w-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
            De onde tiramos a ficha técnica
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {comparativo.fontes.map((fonte) => (
              <li key={fonte.url} className="min-w-0">
                <a
                  href={fonte.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="break-words text-slate-400 underline decoration-slate-700 underline-offset-2 hover:text-slate-200"
                >
                  {fonte.titulo}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
          <p className="mx-auto max-w-2xl">
            Os links de compra desta página são de afiliado: se você comprar por eles, ganhamos uma
            comissão. O preço que você paga é exatamente o mesmo, e isso não muda o que escrevemos
            acima — a tabela mostra inclusive onde o {produto.nome} perde.
          </p>
          <p className="mt-3">
            <Link href="/" className="font-semibold text-emerald-400 hover:text-emerald-300">
              ← Ver todos os achados
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
