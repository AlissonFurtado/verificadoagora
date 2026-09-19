import type { Metadata } from 'next';
import Link from 'next/link';
import { lerCatalogo, lerHistorico } from '@/lib/catalogo';
import { formatarData, formatarReal, produtosVisiveis, type Produto } from '@/lib/produtos';
import { acharQuedas, noMenorPrecoDeSempre, type Queda } from '@/lib/quedas';
import { caminhoDoProduto, gerarSlug } from '@/lib/slug';
import { descreverConferencia } from '@/lib/relogio';
import { SeloDeConferencia } from '../selo-de-conferencia';

export const revalidate = 3600;

const TITULO = 'O que caiu de preço hoje';
const DESCRICAO =
  'Todo dia o robô confere o preço de cada produto e guarda o valor. Esta página mostra o ' +
  'que caiu desde ontem e na última semana — com as duas pontas da comparação, e a data de cada uma.';

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: '/quedas-de-preco' },
  openGraph: { title: TITULO, description: DESCRICAO, type: 'website' },
};

/**
 * A página das quedas de preço.
 *
 * ⚠️ **Ela existe para dar motivo de voltar, e é a única frente do site que não
 * depende do Google.** Guia e comparativo atraem quem procura; esta página é
 * para quem já conhece o site e quer saber o que mudou — o mesmo mecanismo que
 * transformou rastreador de preço em hábito diário para muita gente.
 *
 * ⚠️ **Nada de urgência inventada.** Sem cronômetro, sem "corra", sem "última
 * chance": quem decide quando a promoção acaba é a loja, e nós não temos esse
 * dado. Quando nada cai, a página diz que nada caiu — e é justamente isso que
 * faz o dia de queda valer alguma coisa.
 */
function LinhaDaQueda({ queda }: { queda: Queda }) {
  const { produto, de, para, porcento, reais, noMenor } = queda;

  return (
    <li className="min-w-0 border-b border-slate-100 py-4 last:border-0">
      <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Link
          href={caminhoDoProduto(produto)}
          className="min-w-0 text-[15px] font-bold leading-snug text-marca hover:underline"
        >
          {produto.nome}
        </Link>
        <span className="shrink-0 rounded-lg bg-economia/10 px-2 py-0.5 text-sm font-black text-economia">
          −{porcento}%
        </span>
      </div>

      <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 text-sm text-slate-600">
        <span className="font-semibold text-slate-400 line-through">{formatarReal(de.preco)}</span>
        <span aria-hidden="true" className="text-slate-300">
          →
        </span>
        <span className="text-lg font-black text-slate-900">{formatarReal(para.preco)}</span>
        <span className="text-[13px] font-semibold text-economia">
          economia de {formatarReal(reais)}
        </span>
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-400">
        Estava {formatarReal(de.preco)} em {formatarData(de.dia)} · conferido de novo em{' '}
        {formatarData(para.dia)}
        {noMenor && (
          <span className="ml-2 inline-block rounded bg-economia/10 px-1.5 py-0.5 text-[10px] font-black text-economia">
            ✓ menor preço que já vimos
          </span>
        )}
      </p>

      {produto.disponivel && (
        <a
          href={produto.link_afiliado}
          target="_blank"
          rel="sponsored noopener noreferrer"
          data-oferta={gerarSlug(produto)}
          data-categoria={produto.categoria}
          data-preco={produto.preco_atual}
          data-onde="quedas"
          className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg border border-marca/25 px-3.5 py-1.5 text-[13px] font-extrabold text-marca transition-colors hover:bg-marca hover:text-white"
        >
          Ver oferta
          <span aria-hidden="true">→</span>
        </a>
      )}
    </li>
  );
}

function DadosEstruturados({ url, quantas }: { url: string; quantas: number }) {
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: TITULO,
    description: DESCRICAO,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Como vocês sabem que o preço caiu?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Um robô confere o preço de cada produto do catálogo todos os dias, pela API do Mercado Livre, e guarda o valor daquele dia. A queda é a diferença entre o preço de hoje e o do dia anterior conferido — as duas pontas aparecem na página, com data. Não é estimativa nem preço riscado pela loja.',
        },
      },
      {
        '@type': 'Question',
        name: 'O preço riscado da loja serve para comparar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Não. O valor "de" que aparece riscado é escolhido pela própria loja e não precisa ter sido cobrado recentemente. O número que diz alguma coisa é o que o produto custava semana passada — e é esse que guardamos.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quantos produtos caíram de preço hoje?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Hoje ${quantas === 0 ? 'nenhum produto que acompanhamos caiu de preço' : quantas === 1 ? '1 produto que acompanhamos caiu de preço' : `${quantas} produtos que acompanhamos caíram de preço`}. A lista muda todo dia, depois que a conferência automática termina.`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON montado por nós, não conteúdo de terceiro
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

export default function PaginaDeQuedas() {
  const { produtos: todos, metadata: meta } = lerCatalogo();
  const produtos = produtosVisiveis(todos);
  const historico = lerHistorico().produtos;

  const { ontem, semana } = acharQuedas(produtos, historico);
  const noMenor = noMenorPrecoDeSempre(produtos, historico);
  const conferencia = descreverConferencia(meta.conferido_em, new Date());

  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '';

  /** Quem está no menor preço mas não caiu hoje nem na semana: vale citar à parte. */
  const jaListados = new Set([...ontem, ...semana].map((q) => q.produto.meli_id));
  const estaveisNoMenor = noMenor.filter((p) => !jaListados.has(p.meli_id));

  return (
    <main className="min-h-screen bg-fundo text-slate-800">
      <DadosEstruturados url={`${base}/quedas-de-preco`} quantas={ontem.length + semana.length} />

      <header className="faixa-noturna border-b-4 border-corte">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
          {conferencia && (
            <div className="mb-3">
              <SeloDeConferencia conferidoEm={meta.conferido_em} inicial={conferencia} />
            </div>
          )}
          <h1 className="text-2xl font-black leading-tight text-white sm:text-4xl">
            O que caiu de preço
          </h1>
          <p className="mt-3 text-sm font-medium text-slate-300 sm:text-base">
            Guardamos o preço de cada produto <strong className="text-white">todos os dias</strong>.
            Aqui está o que ficou mais barato — com o valor anterior, a data em que ele foi visto e
            quanto caiu. Sem preço riscado de loja.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">
            {ontem.length > 0
              ? `Caiu na última conferência: ${ontem.length} ${ontem.length === 1 ? 'produto' : 'produtos'}`
              : 'Nada caiu na última conferência'}
          </h2>

          {ontem.length > 0 ? (
            <ul className="mt-3">
              {ontem.map((queda) => (
                <LinhaDaQueda key={queda.produto.id} queda={queda} />
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Nenhum dos {produtos.length} produtos que acompanhamos ficou mais barato entre a
              conferência de ontem e a de hoje. Isso é o normal na maioria dos dias — preço de
              eletrônico muda pouco de um dia para o outro, e dizer isso é o que faz o dia de queda
              valer alguma coisa.
            </p>
          )}
        </section>

        {semana.length > 0 && (
          <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-900">Caiu nos últimos 7 dias</h2>
            <p className="mt-1 text-sm text-slate-500">
              Não caiu de ontem para hoje, mas está mais barato que no começo da semana.
            </p>
            <ul className="mt-3">
              {semana.map((queda) => (
                <LinhaDaQueda key={queda.produto.id} queda={queda} />
              ))}
            </ul>
          </section>
        )}

        {estaveisNoMenor.length > 0 && (
          <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-900">
              No menor preço que já registramos
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Não caiu agora, mas está no piso de tudo o que já vimos deste produto.
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {estaveisNoMenor.map((produto: Produto) => (
                <li key={produto.id} className="min-w-0">
                  <Link
                    href={caminhoDoProduto(produto)}
                    className="inline-flex max-w-full items-baseline gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm ring-1 ring-inset ring-slate-200 transition-colors hover:bg-marca/[0.06]"
                  >
                    <span className="truncate font-bold text-slate-700">{produto.nome}</span>
                    <span className="shrink-0 font-black text-marca">
                      {formatarReal(produto.preco_atual)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">Como esta lista é feita</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
            <p>
              Toda manhã um robô abre a API do Mercado Livre, confere o preço de cada produto do
              catálogo e grava o valor do dia. A queda que aparece aqui é a diferença entre duas
              conferências nossas — as duas com data, as duas na tela.
            </p>
            <p>
              <strong>Não usamos o preço riscado da loja.</strong> Aquele valor é escolhido por
              quem vende e não precisa ter sido cobrado recentemente. O número que diz alguma coisa
              é o que o produto custava semana passada.
            </p>
            <p>
              Produto novo só aparece aqui depois de dois dias de conferência: um preço sozinho não
              é histórico.{' '}
              <Link href="/como-conferimos" className="font-bold text-marca hover:underline">
                Veja como a conferência funciona
              </Link>
              .
            </p>
          </div>
        </section>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/" className="font-bold text-marca hover:underline">
            ← Ver todos os produtos
          </Link>
          <Link href="/black-friday" className="font-bold text-marca hover:underline">
            O desconto da Black Friday é real? →
          </Link>
        </nav>

        <p className="text-xs text-slate-400">
          Links de afiliado · você paga o mesmo preço.
        </p>
      </div>
    </main>
  );
}
