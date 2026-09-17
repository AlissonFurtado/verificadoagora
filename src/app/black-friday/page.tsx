import type { Metadata } from 'next';
import Link from 'next/link';
import { lerCatalogo, lerHistorico } from '@/lib/catalogo';
import { formatarData, formatarReal, produtosVisiveis, type Produto } from '@/lib/produtos';
import type { PontoDoHistorico } from '@/lib/historico';
import { caminhoDoProduto } from '@/lib/slug';
import { descreverConferencia } from '@/lib/relogio';
import { SeloDeConferencia } from '../selo-de-conferencia';

export const revalidate = 3600;

/** Sexta-feira da Black Friday de 2026. */
const BLACK_FRIDAY = '2026-11-27';

const TITULO = 'Black Friday 2026: o desconto é real?';
const DESCRICAO =
  'Guardamos o preço de cada produto todos os dias desde setembro. Na Black Friday dá para ver ' +
  'se o desconto anunciado é queda de verdade ou preço que subiu antes para "cair" depois.';

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: '/black-friday' },
  openGraph: { title: TITULO, description: DESCRICAO, type: 'article' },
};

/**
 * A página da Black Friday.
 *
 * ⚠️ **Ela não promete promoção: promete prova.** Disputar "promoções da
 * black friday" contra Promobit e Buscapé com um domínio de 12 páginas
 * indexadas seria gastar dez semanas para ficar na página 5. O que só nós
 * temos é o preço de cada dia, guardado desde 07/09/2026 — e é isso que
 * responde a pergunta que a pessoa de fato digita quando desconfia:
 * "o desconto é real?".
 *
 * Tudo aqui é calculado do histórico de verdade. Se o robô parar, a página
 * passa a dizer que observou menos dias, em vez de manter um número bonito.
 */
type Linha = {
  produto: Produto;
  dias: number;
  menor: PontoDoHistorico;
  maior: PontoDoHistorico;
  noMenor: boolean;
};

function montarLinhas(produtos: Produto[], historico: Record<string, PontoDoHistorico[]>): Linha[] {
  return produtos
    .map((produto) => {
      const pontos = historico[produto.meli_id] ?? [];
      if (pontos.length < 2) return null;
      const menor = pontos.reduce((a, b) => (b.preco < a.preco ? b : a));
      const maior = pontos.reduce((a, b) => (b.preco > a.preco ? b : a));
      return {
        produto,
        dias: pontos.length,
        menor,
        maior,
        noMenor: produto.preco_atual <= menor.preco,
      };
    })
    .filter((l): l is Linha => l !== null)
    .sort((a, b) => Number(b.noMenor) - Number(a.noMenor));
}

function diasAte(dia: string): number {
  const alvo = new Date(`${dia}T00:00:00Z`).getTime();
  const hoje = new Date(new Date().toISOString().slice(0, 10) + 'T00:00:00Z').getTime();
  return Math.round((alvo - hoje) / 86_400_000);
}

function DadosEstruturados({ url, dias }: { url: string; dias: number }) {
  const perguntas = [
    {
      q: 'Como saber se o desconto da Black Friday é real?',
      a: 'Compare o preço anunciado com o que o produto custava nas semanas anteriores, não com o "preço de tabela" que a loja mostra riscado. O preço riscado é escolhido pela loja; o preço de ontem, não. Aqui guardamos o valor de cada dia desde 7 de setembro de 2026 e mostramos o menor e o maior de cada produto que acompanhamos.',
    },
    {
      q: 'É verdade que as lojas aumentam o preço antes da Black Friday?',
      a: 'Acontece, e é o motivo de existir histórico de preço. Um produto que sobe em outubro e volta ao valor de sempre em novembro aparece anunciado como desconto sem nunca ter ficado mais barato. Com o preço de cada dia na mão, isso fica visível no gráfico da página do produto.',
    },
    {
      q: 'Vale a pena esperar a Black Friday para comprar?',
      a: 'Depende do produto. Eletrônico de linha antiga costuma cair de verdade, porque a loja quer esvaziar estoque. Lançamento do ano quase nunca cai. Se o produto que você quer já está no menor preço que observamos, esperar pode custar mais caro do que comprar hoje.',
    },
    {
      q: 'Quando é a Black Friday de 2026?',
      a: 'Na sexta-feira, 27 de novembro de 2026. As lojas brasileiras costumam começar as ofertas semanas antes, o que torna a comparação com o preço anterior ainda mais importante.',
    },
  ];

  const dados = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: TITULO,
    description: `${DESCRICAO} Já observamos ${dias} dias de preço.`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    mainEntity: perguntas.map((p) => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON montado por nós, não conteúdo de terceiro
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

export default function PaginaBlackFriday() {
  const { produtos: todos, metadata: meta } = lerCatalogo();
  const produtos = produtosVisiveis(todos);
  const historico = lerHistorico().produtos;
  const linhas = montarLinhas(produtos, historico);
  const conferencia = descreverConferencia(meta.conferido_em, new Date());

  const diasObservados = Math.max(0, ...linhas.map((l) => l.dias));
  const faltam = diasAte(BLACK_FRIDAY);
  const noMenor = linhas.filter((l) => l.noMenor).length;

  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '';

  return (
    <main className="min-h-screen bg-fundo text-slate-800">
      <DadosEstruturados url={`${base}/black-friday`} dias={diasObservados} />

      <header className="faixa-noturna border-b-4 border-corte">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
          {conferencia && (
            <div className="mb-3">
              <SeloDeConferencia conferidoEm={meta.conferido_em} inicial={conferencia} />
            </div>
          )}
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Black Friday 2026: o desconto é real?
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-medium">
            Não publicamos lista de promoção. Guardamos o preço de cada produto{' '}
            <strong className="text-white">todos os dias</strong> — {diasObservados} dias até agora
            — para que, quando a loja anunciar 50% OFF, dê para conferir se o preço caiu mesmo.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 space-y-8">
        <section className="rounded-2xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">Como saber se o desconto é real</h2>
          <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 list-decimal pl-5">
            <li>
              <strong>Ignore o preço riscado.</strong> Quem escolhe o valor "de" é a própria loja, e
              ele não precisa ter sido cobrado recentemente. O número que importa é o que o produto
              custava semana passada.
            </li>
            <li>
              <strong>Olhe pelo menos 30 dias para trás.</strong> A manobra mais comum é subir o
              preço em outubro para "baixar" em novembro. Em um mês de histórico ela aparece.
            </li>
            <li>
              <strong>Compare o mesmo anúncio.</strong> Modelo com outra cor, outra memória ou outro
              vendedor é outro produto — e outro preço.
            </li>
            <li>
              <strong>Desconfie do cupom que exige pressa.</strong> Contagem regressiva é
              ferramenta de venda; preço é fato. Nesta página não existe cronômetro, porque nós não
              sabemos quando a oferta acaba: quem muda o preço é a loja.
            </li>
          </ol>
          <p className="mt-4 text-sm text-slate-600">
            A Black Friday de 2026 cai em <strong>27 de novembro</strong>
            {faltam > 0 ? `, daqui a ${faltam} dias` : ''}. Até lá, o robô continua guardando um
            preço por dia de cada produto abaixo.{' '}
            <Link href="/como-conferimos" className="text-marca font-bold hover:underline">
              Veja como a conferência funciona
            </Link>
            .
          </p>
        </section>

        <section className="rounded-2xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">
            O preço dos {linhas.length} produtos que acompanhamos
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Menor e maior valor que <strong>nós mesmos vimos</strong> em {diasObservados} dias de
            conferência diária — não é o preço que a loja diz que já cobrou.{' '}
            {noMenor > 0 && (
              <>
                Hoje, <strong>{noMenor}</strong>{' '}
                {noMenor === 1 ? 'está no menor preço' : 'estão no menor preço'} que já registramos.
              </>
            )}
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500">
                  <th className="py-2 pr-3 font-bold">Produto</th>
                  <th className="py-2 pr-3 font-bold">Hoje</th>
                  <th className="py-2 pr-3 font-bold">Menor visto</th>
                  <th className="py-2 font-bold">Maior visto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {linhas.map(({ produto, menor, maior, noMenor: estaNoMenor }) => (
                  <tr key={produto.id} className="align-top">
                    <td className="py-3 pr-3 min-w-0">
                      <Link
                        href={caminhoDoProduto(produto)}
                        className="font-bold text-marca hover:underline"
                      >
                        {produto.nome}
                      </Link>
                      {estaNoMenor && (
                        <span className="ml-2 inline-block rounded bg-economia/10 px-1.5 py-0.5 text-[10px] font-black text-economia align-middle">
                          ✓ no menor preço
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-3 font-black text-slate-900 whitespace-nowrap">
                      {formatarReal(produto.preco_atual)}
                    </td>
                    <td className="py-3 pr-3 whitespace-nowrap">
                      <span className="font-bold text-economia">{formatarReal(menor.preco)}</span>
                      <span className="block text-[11px] text-slate-400">
                        {formatarData(menor.dia)}
                      </span>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <span className="font-bold text-slate-700">{formatarReal(maior.preco)}</span>
                      <span className="block text-[11px] text-slate-400">
                        {formatarData(maior.dia)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Produto novo no site aparece aqui depois de dois dias de conferência: um preço só não é
            histórico.
          </p>
        </section>

        <section className="rounded-2xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">Vale a pena esperar?</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
            <p>
              Depende do que você quer comprar. <strong>Aparelho de linha anterior</strong> — o
              celular do ano passado, o monitor que ganhou sucessor — costuma cair de verdade,
              porque a loja quer esvaziar estoque. <strong>Lançamento do ano</strong> quase nunca
              cai: ele vende igual com ou sem data comemorativa.
            </p>
            <p>
              E há o caso que ninguém conta: se o produto que você quer{' '}
              <strong>já está no menor preço que registramos</strong>, esperar pode sair mais caro.
              Preço de eletrônico sobe também.
            </p>
            <p>
              Por isso a tabela acima existe antes de novembro, e não durante. Quem chega aqui em 27
              de novembro vê o mesmo número que nós vemos hoje — e aí a conta é simples.
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-white border border-slate-200/60 p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">O que esta página não faz</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc pl-5">
            <li>Não lista oferta de loja que não acompanhamos. Só falamos do que conferimos.</li>
            <li>Não promete cupom nem "menor preço garantido": nenhum site pode garantir isso.</li>
            <li>
              Não tem cronômetro de oferta. Quem decide quando a promoção acaba é a loja, e nós não
              temos esse dado.
            </li>
            <li>
              Não esconde quando o produto está caro. Se o preço de hoje é o maior que já vimos, a
              tabela mostra isso do mesmo jeito.
            </li>
          </ul>
        </section>

        <nav className="text-sm">
          <Link href="/" className="font-bold text-marca hover:underline">
            ← Ver todos os produtos acompanhados
          </Link>
        </nav>
      </div>
    </main>
  );
}
