import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { lerCatalogo, lerComparativos, lerHistorico } from '@/lib/catalogo';
import { acharComparativo, quantosRivais } from '@/lib/comparativos';
import {
  formatarData,
  formatarReal,
  NOME_PLATAFORMA,
  produtosVisiveis,
  type Produto,
} from '@/lib/produtos';
import { seloDeMenorPreco, type PontoDoHistorico } from '@/lib/historico';
import { acharPorSlug, caminhoDoComparativo, caminhoDoProduto, gerarSlug } from '@/lib/slug';
import { descreverConferencia } from '@/lib/relogio';
import { SeloDeConferencia } from '../../selo-de-conferencia';

export const revalidate = 3600;

/** Uma página por produto: é o que dá ao buscador e à IA o que indexar. */
export function generateStaticParams() {
  return produtosVisiveis(lerCatalogo().produtos).map((p) => ({ slug: gerarSlug(p) }));
}

function buscar(slug: string): Produto | undefined {
  return acharPorSlug(produtosVisiveis(lerCatalogo().produtos), slug);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const produto = buscar(params.slug);
  if (!produto) return { title: 'Produto não encontrado' };

  const titulo = `${produto.nome} por ${formatarReal(produto.preco_atual)}`;
  const descricao = `${produto.desconto_percentual}% de desconto, preço conferido em ${formatarData(
    produto.verificado_em,
  )}. ${produto.descricao}`;

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: caminhoDoProduto(produto) },
    openGraph: {
      title: titulo,
      description: descricao,
      type: 'website',
      images: produto.imagem ? [{ url: produto.imagem }] : undefined,
    },
  };
}

/**
 * Marcação schema.org do produto.
 *
 * É daqui que buscador e assistente de IA leem preço, moeda e disponibilidade
 * sem precisar adivinhar no meio do HTML. O `priceValidUntil` sai da data em
 * que o robô conferiu: o preço vale até a próxima checagem, não pra sempre.
 */
function DadosEstruturados({ produto }: { produto: Produto }) {
  const amanha = new Date(produto.verificado_em);
  amanha.setUTCDate(amanha.getUTCDate() + 1);

  const dados = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: produto.nome,
    description: produto.descricao || undefined,
    image: produto.imagem || undefined,
    category: produto.categoria,
    offers: {
      '@type': 'Offer',
      price: produto.preco_atual,
      priceCurrency: 'BRL',
      availability: produto.disponivel
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceValidUntil: amanha.toISOString().slice(0, 10),
      url: produto.link_afiliado,
      seller: { '@type': 'Organization', name: NOME_PLATAFORMA[produto.plataforma] },
    },
    ...(produto.avaliacao > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: produto.avaliacao,
            bestRating: 5,
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // JSON montado por nós, não conteúdo de terceiro
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

/** Linha do tempo do preço. SVG na mão: um gráfico não vale uma dependência. */
function Grafico({ pontos }: { pontos: PontoDoHistorico[] }) {
  if (pontos.length < 2) return null;

  const precos = pontos.map((p) => p.preco);
  const min = Math.min(...precos);
  const max = Math.max(...precos);
  const amplitude = max - min || 1;
  const largura = 600;
  const altura = 120;

  const caminho = pontos
    .map((p, i) => {
      const x = (i / (pontos.length - 1)) * largura;
      const y = altura - ((p.preco - min) / amplitude) * (altura - 16) - 8;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const legenda = `Variação de preço em ${pontos.length} dias, de ${formatarReal(
    min,
  )} a ${formatarReal(max)}`;

  return (
    <section className="min-w-0 rounded-2xl bg-white border border-slate-200/60 p-6 shadow-sm">
      <h2 className="mb-1 text-sm font-bold text-slate-800 flex items-center gap-1.5">
        <span aria-hidden="true" className="text-emerald-500">📈</span>
        Como o preço se comportou
      </h2>
      <p className="mb-4 text-xs text-slate-500 font-medium">
        {pontos.length} dias observados · menor <span className="text-emerald-600 font-bold">{formatarReal(min)}</span> · maior <span className="text-slate-700 font-bold">{formatarReal(max)}</span>
      </p>
      <svg viewBox={`0 0 ${largura} ${altura}`} className="h-28 w-full" role="img" aria-label={legenda}>
        <path d={caminho} fill="none" stroke="#059669" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <div className="mt-2 flex justify-between text-[11px] text-slate-400 font-semibold">
        <span>{formatarData(pontos[0].dia)}</span>
        <span>{formatarData(pontos[pontos.length - 1].dia)}</span>
      </div>
    </section>
  );
}

export default function PaginaDoProduto({ params }: { params: { slug: string } }) {
  const produto = buscar(params.slug);
  if (!produto) notFound();

  const pontos = lerHistorico().produtos[produto.meli_id] ?? [];
  const selo = seloDeMenorPreco(pontos, produto.preco_atual);
  const plataforma = NOME_PLATAFORMA[produto.plataforma] ?? produto.plataforma;
  const economia = produto.preco_original - produto.preco_atual;
  const comparativo = acharComparativo(lerComparativos(), produto.meli_id);
  const conferencia = descreverConferencia(lerCatalogo().metadata.conferido_em, new Date());

  return (
    <main className="min-h-screen bg-fundo text-slate-800">
      <DadosEstruturados produto={produto} />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <nav className="mb-8 text-sm text-slate-500 font-semibold">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Verificado Agora
          </Link>
          <span className="mx-2 text-slate-300" aria-hidden="true">
            ›
          </span>
          <span className="text-slate-400 font-bold">{produto.categoria}</span>
        </nav>

        {conferencia && (
          <div className="mb-6">
            <SeloDeConferencia
              conferidoEm={lerCatalogo().metadata.conferido_em}
              inicial={conferencia}
            />
          </div>
        )}

        <div className="grid min-w-0 gap-8 md:grid-cols-2">
          <div className="relative aspect-square min-w-0 overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-md">
            {produto.imagem ? (
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8 hover:scale-105 transition duration-500"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 font-medium">
                Sem foto do produto
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              {produto.categoria}
            </p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-slate-900">{produto.nome}</h1>
            {produto.descricao && <p className="mt-3 text-slate-500 text-sm font-medium leading-relaxed">{produto.descricao}</p>}

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-400 line-through">{formatarReal(produto.preco_original)}</p>
              <p className="flex flex-wrap items-baseline gap-x-3 text-4xl font-black tracking-tight text-emerald-600">
                {formatarReal(produto.preco_atual)}
                <span className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-black text-white shadow-md shadow-red-500/10 flex items-center gap-1">
                  <span>🔥</span> {produto.desconto_percentual}% OFF
                </span>
              </p>
              {produto.preco_no_pix && (
                <p className="mt-1.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Preço válido no Pix</p>
              )}
            </div>

            <div className="mt-4 flex min-w-0 flex-wrap gap-2">
              {economia > 0 && (
                <span className="rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  Você economiza {formatarReal(economia)}
                </span>
              )}
              {selo && (
                <span className="rounded-xl bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-800 flex items-center gap-1">
                  <span>📉</span> {selo}
                </span>
              )}
            </div>

            {produto.avaliacao > 0 && (
              <p className="mt-4 text-sm font-bold text-slate-600 flex items-center gap-1">
                <span aria-hidden="true" className="text-amber-400 text-base">⭐</span> Nota {produto.avaliacao} de 5
              </p>
            )}

            {produto.cupom && (
              <p className="mt-4 min-w-0 break-words rounded-xl bg-blue-50 border border-blue-200/50 px-4 py-3 text-sm text-blue-700 font-medium">
                Cupom ativo: <strong className="font-extrabold uppercase bg-blue-100 px-2 py-0.5 rounded text-blue-800 ml-1 select-all">{produto.cupom}</strong>
              </p>
            )}

            <a
              href={produto.link_afiliado}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-600 hover:to-emerald-700 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
            >
              Ver no {plataforma}
              <span aria-hidden="true" className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
            </a>

            {comparativo && (
              <Link
                href={caminhoDoComparativo(produto)}
                className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-amber-50 border border-amber-200/60 px-6 py-3.5 text-sm font-bold text-amber-800 transition-colors hover:bg-amber-100"
              >
                <span aria-hidden="true">⚖</span>
                Comparar com {quantosRivais(comparativo)} concorrentes
              </Link>
            )}

            <p className="mt-4 text-center text-[10px] text-slate-400 font-semibold">
              Preço verificado em {formatarData(produto.verificado_em)} · link de afiliado
            </p>
          </div>
        </div>

        <div className="mt-12">
          <Grafico pontos={pontos} />
        </div>

        <footer className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p className="text-xs text-slate-400">
            Link de afiliado do {plataforma} · você paga o mesmo preço
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
