import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { lerCatalogo, lerComparativos, lerDecisoes, lerGuias } from '@/lib/catalogo';
import { formatarData, formatarReal, produtosVisiveis, type Produto } from '@/lib/produtos';
import { acharGuia, comTextoDeHoje, quantosAcompanhados, type Guia } from '@/lib/guias';
import {
  acharDecisao,
  comTextoDeHoje as decisaoComTextoDeHoje,
  type Decisao,
} from '@/lib/decisoes';
import { PaginaDecisao } from './decisao';
import { caminhoDoComparativo, caminhoDoProduto, gerarSlug } from '@/lib/slug';
import { descreverConferencia } from '@/lib/relogio';
import { SeloDeConferencia } from '../../selo-de-conferencia';

export const revalidate = 3600;

export function generateStaticParams() {
  // Os dois formatos de guia dividem o mesmo endereço: para quem chega da
  // busca, ambos são "a página que responde antes de vender". O que muda é a
  // forma — faixa é por perfil de quem compra, decisão é por pergunta de
  // especificação. Slug repetido entre os dois arquivos é erro de curadoria.
  return [...lerGuias(), ...lerDecisoes()].map((g) => ({ slug: g.slug }));
}

/** O catálogo por `meli_id`, que é como guia e decisão referem produto. */
function catalogoPorMeliId(): Map<string, Produto> {
  return new Map(
    produtosVisiveis(lerCatalogo().produtos).map((p) => [p.meli_id, p] as const),
  );
}

function buscarDecisao(slug: string): { decisao: Decisao; porMeliId: Map<string, Produto> } | undefined {
  const decisao = acharDecisao(lerDecisoes(), slug);
  if (!decisao) return undefined;
  const porMeliId = catalogoPorMeliId();
  return { decisao: decisaoComTextoDeHoje(decisao, porMeliId), porMeliId };
}

type Achado = { guia: Guia; porMeliId: Map<string, Produto> };

function buscar(slug: string): Achado | undefined {
  const guia = acharGuia(lerGuias(), slug);
  if (!guia) return undefined;

  // O preço sai do catálogo na hora, nunca do JSON do guia: é o que mantém o
  // robô de preços mandando na única informação da página que envelhece só.
  const porMeliId = catalogoPorMeliId();

  return { guia: comTextoDeHoje(guia, porMeliId), porMeliId };
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const decisao = acharDecisao(lerDecisoes(), params.slug);
  if (decisao) {
    return {
      title: decisao.titulo,
      description: decisao.resumo,
      alternates: { canonical: `/guia/${decisao.slug}` },
      openGraph: { title: decisao.titulo, description: decisao.resumo, type: 'article' },
    };
  }

  const achado = buscar(params.slug);
  if (!achado) return { title: 'Guia não encontrado' };

  const { guia, porMeliId } = achado;
  const acompanhados = quantosAcompanhados(guia, porMeliId);
  const descricao = `${guia.perfis.length} celulares de até ${formatarReal(guia.teto)} separados por perfil de uso: durar anos, jogar, fotografar, aguentar tranco. Ficha conferida na fonte do fabricante e ${acompanhados} preços conferidos todos os dias.`;

  return {
    title: guia.titulo,
    description: descricao,
    alternates: { canonical: `/guia/${guia.slug}` },
    openGraph: { title: guia.titulo, description: descricao, type: 'article' },
  };
}

/**
 * Marcação do guia.
 *
 * `Article` com `citation`, igual ao comparativo e pelo mesmo motivo: não é
 * `Review`, porque nota que ninguém mediu é preço inventado em outra
 * linguagem. O `ItemList` por cima declara a ordem dos perfis — que é a
 * substância da página, e não dá pra ler de um parágrafo.
 */
function DadosEstruturados({ guia, url }: { guia: Guia; url: string }) {
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guia.titulo,
    description: guia.resumo,
    datePublished: guia.escrito_em,
    dateModified: guia.escrito_em,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'Verificado Agora' },
    publisher: { '@type': 'Organization', name: 'A F DE SOUSA' },
    citation: guia.fontes.map((f) => ({ '@type': 'CreativeWork', name: f.titulo, url: f.url })),
    mainEntity: {
      '@type': 'ItemList',
      name: guia.titulo,
      numberOfItems: guia.perfis.length,
      itemListElement: guia.perfis.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `${p.aparelho} — ${p.perfil}`,
        item: { '@type': 'Product', name: p.aparelho },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON montado por nós, não conteúdo de terceiro
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

export default function PaginaDoGuia({ params }: { params: { slug: string } }) {
  const naDecisao = buscarDecisao(params.slug);
  if (naDecisao) {
    const conferidoEm = lerCatalogo().metadata.conferido_em;
    const conferencia = descreverConferencia(conferidoEm, new Date());
    return (
      <PaginaDecisao
        decisao={naDecisao.decisao}
        porMeliId={naDecisao.porMeliId}
        comComparativo={new Set(lerComparativos().map((c) => c.meli_id))}
        conferidoEm={conferidoEm}
        selo={
          conferencia && <SeloDeConferencia conferidoEm={conferidoEm} inicial={conferencia} />
        }
        base={
          process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : ''
        }
      />
    );
  }

  const achado = buscar(params.slug);
  if (!achado) notFound();

  const { guia, porMeliId } = achado;
  const conferidoEm = lerCatalogo().metadata.conferido_em;
  const conferencia = descreverConferencia(conferidoEm, new Date());
  const comComparativo = new Set(lerComparativos().map((c) => c.meli_id));
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '';

  return (
    <main className="min-h-screen bg-fundo text-slate-800">
      <DadosEstruturados guia={guia} url={`${base}/guia/${guia.slug}`} />

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

        {conferencia && (
          <div className="mb-6">
            <SeloDeConferencia conferidoEm={conferidoEm} inicial={conferencia} />
          </div>
        )}

        <header className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full bg-marca/[0.07] px-3 py-1 text-xs font-bold uppercase tracking-widest text-marca ring-1 ring-inset ring-marca/10">
            <span aria-hidden="true" className="font-extrabold">
              ☰
            </span>{' '}
            Guia de compra
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            {guia.titulo}
          </h1>
          <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600">{guia.resumo}</p>
          <p className="mt-3 text-sm font-semibold text-slate-400">
            Escrito em {formatarData(guia.escrito_em)} ·{' '}
            {quantosAcompanhados(guia, porMeliId)} de {guia.perfis.length} com preço conferido todo
            dia
          </p>
        </header>

        {/* O índice existe pra pessoa achar o parágrafo dela sem ler os seis.
            É a página inteira em seis linhas — e é o que a IA cita. */}
        <nav aria-label="Perfis deste guia" className="mt-8 min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Ache o seu caso
          </h2>
          <ol className="mt-3 space-y-2">
            {guia.perfis.map((p, i) => (
              <li key={p.chave} className="min-w-0 text-sm">
                <a
                  href={`#${p.chave}`}
                  className="font-semibold text-slate-600 underline decoration-slate-200 underline-offset-4 transition-colors hover:text-marca hover:decoration-marca"
                >
                  <span className="font-black text-slate-300">{i + 1}.</span> {p.perfil}
                </a>
                <span className="text-slate-400"> → {p.aparelho}</span>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 space-y-8">
          {guia.perfis.map((perfil, i) => {
            const produto = porMeliId.get(perfil.meli_id);

            return (
              <section
                key={perfil.chave}
                id={perfil.chave}
                className="min-w-0 scroll-mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {i + 1}. {perfil.perfil}
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                  {perfil.aparelho}
                </h2>

                {produto ? (
                  <div className="mt-4 flex min-w-0 flex-col gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center">
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
                      data-onde="guia"
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-marca-acao px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-marca/25 transition-all hover:scale-[1.01] hover:bg-marca active:scale-[0.99]"
                    >
                      Ver oferta
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                ) : (
                  /* Rival de fora não tem preço aqui, e a página diz por quê.
                     Valor de aparelho que ninguém reconfere é a mesma mentira
                     que preço velho — a regra é a do comparativo. */
                  <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">
                    Não vendemos nem acompanhamos o preço deste aparelho — ele está aqui porque
                    ganha neste perfil.
                  </p>
                )}

                <ul className="mt-5 space-y-2.5">
                  {perfil.porque.map((motivo) => (
                    <li key={motivo} className="flex min-w-0 gap-2.5 text-[15px] leading-relaxed text-slate-700">
                      <span aria-hidden="true" className="mt-0.5 shrink-0 font-black text-economia">
                        ▲
                      </span>
                      <span className="min-w-0">{motivo}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 rounded-xl border-l-4 border-desconto/70 bg-red-50/60 px-4 py-3 text-[15px] leading-relaxed text-slate-700">
                  <strong className="font-black text-desconto">Quando não comprar:</strong>{' '}
                  {perfil.quando_nao}
                </p>

                <dl className="mt-5 grid gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
                  {Object.entries(perfil.ficha).map(([campo, valor]) => (
                    <div key={campo} className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                      <dt className="font-bold text-slate-500">{campo}:</dt>
                      <dd className="min-w-0 font-medium text-slate-700">{valor}</dd>
                    </div>
                  ))}
                </dl>

                {produto && comComparativo.has(produto.meli_id) && (
                  <p className="mt-5 text-sm">
                    <Link
                      href={caminhoDoComparativo(produto)}
                      data-onde="guia-comparativo"
                      className="font-bold text-marca underline decoration-marca/30 underline-offset-4 transition-colors hover:text-marca-acao hover:decoration-marca"
                    >
                      Ver a tabela completa do {perfil.aparelho} contra os rivais →
                    </Link>
                  </p>
                )}
                {produto && !comComparativo.has(produto.meli_id) && (
                  <p className="mt-5 text-sm">
                    <Link
                      href={caminhoDoProduto(produto)}
                      className="font-bold text-marca underline decoration-marca/30 underline-offset-4 transition-colors hover:text-marca-acao hover:decoration-marca"
                    >
                      Ver a página do {perfil.aparelho}, com o histórico de preço →
                    </Link>
                  </p>
                )}
              </section>
            );
          })}
        </div>

        <section className="mt-10 min-w-0 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-md">
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            E se nenhum for o seu caso
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{guia.veredito}</p>
        </section>

        <section className="mt-8 min-w-0">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
            De onde tiramos a ficha técnica
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {guia.fontes.map((fonte) => (
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
            Links de afiliado · você paga o mesmo preço, e isso não muda o que escrevemos acima:
            quatro dos seis aparelhos deste guia não são vendidos por nós.
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
