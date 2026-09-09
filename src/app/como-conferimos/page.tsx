import type { Metadata } from 'next';
import Link from 'next/link';
import { lerCatalogo, lerHistorico } from '@/lib/catalogo';
import { formatarData, produtosVisiveis } from '@/lib/produtos';
import { descreverConferencia } from '@/lib/relogio';
import { SeloDeConferencia } from '../selo-de-conferencia';

export const revalidate = 3600;

const TITULO = 'Como conferimos os preços';
const DESCRICAO =
  'Um robô confere cada preço na API do Mercado Livre toda manhã, guarda o valor de cada dia e ' +
  'tira do ar o que sumiu. Explicamos o processo inteiro, inclusive o que acontece quando ele falha.';

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: '/como-conferimos' },
  openGraph: { title: TITULO, description: DESCRICAO, type: 'article' },
};

/**
 * A página que explica o robô.
 *
 * É o ativo de confiança do site: qualquer um consegue copiar uma lista de
 * ofertas, ninguém copia "o preço foi conferido hoje às 11h51 e aqui está o
 * de todos os dias anteriores". Explicar o processo por extenso é o que
 * transforma esse trabalho em motivo pra acreditar na página — e é texto que
 * buscador e assistente de IA conseguem ler e citar.
 *
 * Os números vêm do catálogo de verdade. Se o robô parar, esta página passa a
 * dizer isso sozinha, em vez de descrever um processo que não acontece mais.
 */
function DadosEstruturados({ url }: { url: string }) {
  const dados = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Com que frequência os preços são conferidos?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Toda manhã. Um robô lê o preço de cada produto direto na API do Mercado Livre e reescreve o catálogo do site. O horário exato varia porque o agendador é de melhor esforço, então a página mostra a hora em que a conferência realmente aconteceu, não a hora agendada.',
        },
      },
      {
        '@type': 'Question',
        name: 'O que acontece quando o preço muda muito?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Variação de até 15% é publicada automaticamente. Acima disso, o robô não publica sozinho: ele separa a mudança para revisão humana, porque um preço que salta 30% costuma ser outra coisa — fim de promoção, troca de vendedor ou erro da própria loja.',
        },
      },
      {
        '@type': 'Question',
        name: 'E se o robô falhar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ele não altera nada. Preço que não foi confirmado não entra no site nem no histórico. O selo no topo da página continua contando o tempo desde a última conferência bem-sucedida, então uma falha aparece como um número que cresce, e não como um preço velho passando por novo.',
        },
      },
      {
        '@type': 'Question',
        name: 'Os links são de afiliado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'São, e isso está declarado no rodapé de todas as páginas. Se você comprar por um deles, o site ganha comissão do Mercado Livre. O preço que você paga é exatamente o mesmo.',
        },
      },
    ],
    url,
  };

  return (
    <script
      type="application/ld+json"
      // JSON montado por nós, não conteúdo de terceiro
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="min-w-0 border-t border-slate-200 pt-8">
      <h2 className="text-xl font-black tracking-tight text-slate-900">{titulo}</h2>
      <div className="mt-3 flex max-w-[65ch] flex-col gap-4 text-[15px] leading-relaxed text-slate-600">
        {children}
      </div>
    </section>
  );
}

export default function ComoConferimos() {
  const { produtos, metadata: meta } = lerCatalogo();
  const visiveis = produtosVisiveis(produtos);
  const historico = lerHistorico();
  const conferencia = descreverConferencia(meta.conferido_em, new Date());

  const pontos = Object.values(historico.produtos);
  const diasGuardados = pontos.length ? Math.max(...pontos.map((p) => p.length)) : 0;
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : '';

  return (
    <main className="min-h-screen bg-fundo text-slate-800">
      <DadosEstruturados url={`${base}/como-conferimos`} />

      <header className="faixa-noturna border-b-4 border-corte">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-14">
          <nav className="mb-5 text-sm font-semibold text-sky-100/60">
            <Link href="/" className="transition-colors hover:text-white">
              Verificado Agora
            </Link>
            <span className="mx-2 text-sky-100/30" aria-hidden="true">
              ›
            </span>
            <span className="font-bold text-sky-100/80">Como conferimos</span>
          </nav>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
            Como conferimos os preços
          </h1>
          <p className="mt-3 max-w-[60ch] text-base font-medium leading-relaxed text-sky-100/70 sm:text-lg">
            Nenhum preço desta página foi digitado à mão. Um robô lê todos eles direto na API do
            Mercado Livre, toda manhã, e guarda o valor de cada dia. Abaixo está exatamente como
            isso funciona — inclusive o que acontece quando dá errado.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        {conferencia && (
          <div className="mb-10">
            <SeloDeConferencia conferidoEm={meta.conferido_em} inicial={conferencia} />
          </div>
        )}

        <div className="flex flex-col gap-8">
          <Bloco titulo="O que o robô faz toda manhã">
            <p>
              Ele percorre os {produtos.length} produtos do catálogo e pergunta o preço de cada um
              à API do Mercado Livre — a mesma fonte que a loja usa para montar a própria página,
              não uma leitura de tela que pode se enganar com o que está escrito.
            </p>
            <p>
              Cada resposta vira três coisas: o preço que aparece no card, uma linha no histórico
              daquele produto, e a data de conferência que a página exibe. Hoje o histórico já tem{' '}
              {diasGuardados === 1 ? 'um dia' : `${diasGuardados} dias`} guardados, e ele cresce
              sozinho a cada manhã.
            </p>
            <p>
              O horário exato varia. O agendador que dispara o robô é de melhor esforço e atrasa
              quando está congestionado — por isso a página nunca promete "às 8h" e mostra a hora
              em que a conferência realmente terminou.
            </p>
          </Bloco>

          <Bloco titulo="Quando ele publica sozinho e quando ele para">
            <p>
              Variação de até 15% entra no site automaticamente: é oscilação normal de loja. Acima
              disso o robô não publica — ele separa a mudança e espera revisão humana, porque preço
              que salta 30% em um dia raramente é promoção. Costuma ser fim de campanha, troca de
              vendedor ou erro da própria loja.
            </p>
            <p>
              Produto que sai do ar, fica sem estoque ou some do Mercado Livre é desligado no mesmo
              dia e deixa a vitrine. A página dele continua existindo, dizendo que a oferta acabou
              e mostrando o histórico até ali.
            </p>
          </Bloco>

          <Bloco titulo="O que acontece quando o robô falha">
            <p>
              Ele não mexe em nada. Se a API não responde ou devolve algo estranho, a rodada é
              descartada inteira — <strong>preço que não foi confirmado não entra no site nem no
              histórico</strong>. É a diferença entre não saber e inventar.
            </p>
            <p>
              E a falha fica visível: o selo no alto de todas as páginas conta o tempo desde a
              última conferência bem-sucedida. Se ele disser "há 3 dias", é porque faz três dias
              que ninguém confirmou aqueles preços. O número cresce sozinho e entrega o problema,
              em vez de deixar preço velho passando por novo.
            </p>
          </Bloco>

          <Bloco titulo="O que o robô não decide">
            <p>
              Ele não escolhe o que aparece na página. Um segundo robô garimpa ofertas todo dia e
              sugere candidatos, mas quem decide o que entra é uma pessoa — e cada produto só é
              publicado depois de alguém escrever sobre ele.
            </p>
            <p>
              Nome, descrição, categoria e as análises são escritos à mão. O robô mexe em preço,
              desconto, foto e disponibilidade, e em mais nada.
            </p>
          </Bloco>

          <Bloco titulo="Como o site ganha dinheiro">
            <p>
              Os links de compra são de afiliado do Mercado Livre: se você comprar por um deles, o
              site recebe comissão da loja. <strong>O preço que você paga é exatamente o
              mesmo</strong> — comissão de afiliado sai da margem da loja, não do seu bolso.
            </p>
            <p>
              Isso está declarado no rodapé de todas as páginas, e é por isso que o preço é
              conferido todo dia em vez de uma vez por mês: um site de afiliado que anuncia
              desconto que não existe ganha um clique e perde o visitante.
            </p>
          </Bloco>
        </div>

        <p className="mt-12 border-t border-slate-200 pt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-marca-acao px-6 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-marca"
          >
            Ver os {visiveis.length} achados conferidos
          </Link>
        </p>
        <p className="mt-4 text-center text-xs text-slate-400">
          Última conferência em {formatarData(meta.ultima_atualizacao)}.
        </p>
      </div>
    </main>
  );
}
