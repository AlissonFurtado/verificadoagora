import { ImageResponse } from 'next/og';
import catalogo from '../../../../data/produtos.json';
import arquivoDeHistorico from '../../../../data/historico.json';
import { formatarData, formatarReal, produtosVisiveis, type Catalogo, type Produto } from '@/lib/produtos';
import type { PontoDoHistorico } from '@/lib/historico';
import { comoImagem, LUPITA_SVG } from '@/lib/lupita';
import { gerarSlug } from '@/lib/slug';

/**
 * As cenas da série "Esse desconto é real?": `/reel-prova/{slug}?caso=...&cena=...`.
 *
 * Mesma ideia de `/reel/{slug}`: matéria-prima para `scripts/reel.mjs`, sem
 * rosto, com a Lupita no papel de apresentadora. O que muda é o assunto: aqui a
 * prova é o gráfico do nosso histórico.
 *
 * ⚠️ **A série só afirma o que medimos** (decisão dele em 01/11/2026). Nada de
 * "golpe", "falso" ou "enganoso", e sem citar a loja: dizemos o preço riscado e
 * o que vimos em N dias, e quem assiste tira a conclusão. Toda frase daqui sai
 * do arquivo; nenhum número é escrito à mão.
 *
 * ⚠️ `runtime = 'edge'`, como no reel: edge não enxerga disco, e o JSON entra
 * por `import`, resolvido no build.
 */
export const runtime = 'edge';

const CENAS = ['gancho', 'grafico', 'fato', 'chamada'] as const;
type Cena = (typeof CENAS)[number];

const CASOS = ['riscado', 'mais-alto', 'queda'] as const;
type Caso = (typeof CASOS)[number];

const L = 1080;
const A = 1920;
const LUPITA = comoImagem(LUPITA_SVG);

function lerDaLista<T extends string>(lista: readonly T[], valor: string | null): T | null {
  return lista.includes(valor as T) ? (valor as T) : null;
}

function acharProduto(slug: string): Produto | undefined {
  return produtosVisiveis((catalogo as Catalogo).produtos).find((p) => gerarSlug(p) === slug);
}

/** A linha do preço, desenhada em SVG sobre uma escala que inclui o riscado. */
function Grafico({ pontos, riscado }: { pontos: PontoDoHistorico[]; riscado: number | null }) {
  const largura = 936;
  const altura = 620;
  const valores = pontos.map((p) => p.preco);
  const topo = Math.max(...valores, riscado ?? 0);
  const piso = Math.min(...valores) * 0.92;
  const y = (preco: number) => altura - ((preco - piso) / (topo - piso)) * (altura - 16) - 8;
  const x = (i: number) => (i / Math.max(1, pontos.length - 1)) * largura;
  const linha = pontos.map((p, i) => `${x(i).toFixed(1)},${y(p.preco).toFixed(1)}`).join(' ');

  return (
    <svg width={largura} height={altura} viewBox={`0 0 ${largura} ${altura}`}>
      {riscado && (
        <line x1="0" x2={largura} y1={y(riscado)} y2={y(riscado)} stroke="#f87171" strokeWidth="6" strokeDasharray="22 16" />
      )}
      <polyline points={linha} fill="none" stroke="#4ade80" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function GET(pedido: Request, { params }: { params: { slug: string } }): Response {
  const produto = acharProduto(params.slug);
  if (!produto) return new Response('Produto não encontrado', { status: 404 });

  const busca = new URL(pedido.url).searchParams;
  const caso = lerDaLista(CASOS, busca.get('caso'));
  if (!caso) return new Response('Caso inválido', { status: 400 });
  const cena = lerDaLista(CENAS, busca.get('cena')) ?? 'gancho';

  const pontos = (arquivoDeHistorico as { produtos: Record<string, PontoDoHistorico[]> }).produtos[
    produto.meli_id
  ];
  if (!pontos || pontos.length < 2) return new Response('Sem histórico', { status: 404 });

  const dias = pontos.length;
  const maior = Math.max(...pontos.map((p) => p.preco));
  const anterior = pontos[pontos.length - 2].preco;

  // A trava da série: se o dado de hoje não sustenta o caso, o vídeo não sai.
  const sustenta: Record<Caso, boolean> = {
    riscado: produto.preco_original > maior,
    'mais-alto': produto.preco_atual >= maior && produto.desconto_percentual > 0,
    queda: produto.preco_atual < anterior,
  };
  if (!sustenta[caso]) return new Response('O histórico de hoje não sustenta este caso', { status: 409 });

  const pergunta = caso === 'queda' ? 'Essa queda é de verdade?' : 'Esse desconto é real?';
  const fato: Record<Caso, { titulo: string; apoio: string }> = {
    riscado: {
      titulo: `Em ${dias} dias, nunca vimos o preço riscado`,
      apoio: `Riscado: ${formatarReal(produto.preco_original)}. Maior preço que vimos: ${formatarReal(maior)}.`,
    },
    'mais-alto': {
      titulo: `Hoje é o maior preço que vimos em ${dias} dias`,
      apoio: `Anunciado com ${produto.desconto_percentual}% OFF, a ${formatarReal(produto.preco_atual)}.`,
    },
    queda: {
      titulo: `Caiu de ${formatarReal(anterior)} para ${formatarReal(produto.preco_atual)}`,
      apoio: `Comparando com o preço da conferência anterior, em ${dias} dias de histórico.`,
    },
  };

  const base = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    background: 'linear-gradient(160deg, #0b1220 0%, #172554 100%)',
    color: 'white',
    padding: 72,
  };

  const Lupita = ({ tamanho }: { tamanho: number }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={LUPITA} alt="" width={tamanho} height={Math.round(tamanho * 1.22)} />
  );

  const miolo: Record<Cena, React.ReactElement> = {
    // O primeiro segundo: a pergunta, e o número que a provoca.
    gancho: (
      <div style={base}>
        <Lupita tamanho={190} />
        <div style={{ display: 'flex', marginTop: 44, fontSize: 112, fontWeight: 900, lineHeight: 1.05 }}>
          {pergunta}
        </div>
        <div style={{ display: 'flex', marginTop: 52, fontSize: 60, fontWeight: 700, color: '#7dd3fc', lineHeight: 1.15 }}>
          {produto.nome}
        </div>
        <div style={{ display: 'flex', marginTop: 44, fontSize: 96, fontWeight: 900, color: '#4ade80' }}>
          {produto.desconto_percentual}% OFF
        </div>
      </div>
    ),

    // A prova: cada ponto é um dia conferido pelo robô.
    grafico: (
      <div style={base}>
        <div style={{ display: 'flex', fontSize: 70, fontWeight: 900, lineHeight: 1.1 }}>
          O preço de cada dia
        </div>
        <div style={{ display: 'flex', marginTop: 16, marginBottom: 60, fontSize: 44, color: '#cbd5e1' }}>
          {dias} dias conferidos pelo nosso robô
        </div>
        <Grafico pontos={pontos} riscado={caso === 'riscado' ? produto.preco_original : null} />
        {caso === 'riscado' && (
          <div style={{ display: 'flex', marginTop: 40, fontSize: 42, color: '#f87171' }}>
            Tracejado: o preço riscado no anúncio
          </div>
        )}
        <div style={{ display: 'flex', marginTop: 28, fontSize: 38, color: '#94a3b8' }}>
          {formatarData(pontos[0].dia)} a {formatarData(pontos[pontos.length - 1].dia)}
        </div>
      </div>
    ),

    // O fato, sem adjetivo. Quem conclui é quem assiste.
    fato: (
      <div style={base}>
        <div style={{ display: 'flex', fontSize: 92, fontWeight: 900, lineHeight: 1.08 }}>
          {fato[caso].titulo}
        </div>
        <div style={{ display: 'flex', marginTop: 48, fontSize: 54, color: '#cbd5e1', lineHeight: 1.25 }}>
          {fato[caso].apoio}
        </div>
        <div style={{ display: 'flex', marginTop: 64, fontSize: 40, color: '#94a3b8' }}>
          Preço de {formatarReal(produto.preco_atual)} conferido em {formatarData(produto.verificado_em)}
        </div>
      </div>
    ),

    // Um pedido só.
    chamada: (
      <div style={base}>
        <Lupita tamanho={220} />
        <div style={{ display: 'flex', marginTop: 48, fontSize: 88, fontWeight: 900, lineHeight: 1.1 }}>
          Veja o histórico antes de comprar
        </div>
        <div
          style={{
            display: 'flex',
            alignSelf: 'flex-start',
            marginTop: 64,
            padding: '32px 48px',
            borderRadius: 28,
            background: '#2563eb',
            fontSize: 56,
            fontWeight: 900,
          }}
        >
          Link na bio
        </div>
        <div style={{ display: 'flex', marginTop: 96, fontSize: 38, color: '#94a3b8' }}>
          verificadoagora.com.br · link de afiliado
        </div>
      </div>
    ),
  };

  return new ImageResponse(miolo[cena], { width: L, height: A });
}
