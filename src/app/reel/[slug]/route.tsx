import { ImageResponse } from 'next/og';
import catalogo from '../../../../data/produtos.json';
import arquivoDeHistorico from '../../../../data/historico.json';
import { formatarData, formatarReal, produtosVisiveis, type Catalogo, type Produto } from '@/lib/produtos';
import { resumoDoHistorico, type PontoDoHistorico } from '@/lib/historico';
import { gerarSlug } from '@/lib/slug';

/**
 * As cenas do reel: `/reel/{slug}?cena=...`, 1080x1920.
 *
 * ⚠️ **Isto não é um post: é matéria-prima de vídeo.** `scripts/reel.mjs` baixa
 * as quatro cenas e as monta num MP4 vertical com movimento e transição. A arte
 * mora aqui, e não no script, porque é o mesmo desenho do site — mesma paleta,
 * mesma marca, mesmo jeito de mostrar preço — e porque o `next/og` já resolve
 * fonte e imagem remota sem instalar nada.
 *
 * ⚠️ **Aqui o preço aparece, ao contrário do pin e do post.** A razão é o
 * tempo de vida: pin vive meses e o robô muda o preço toda manhã, então preço
 * em pin vira mentira; reel de oferta é do dia. **A data fica gravada na arte**
 * — é o que mantém o vídeo honesto quando alguém o encontrar em novembro.
 *
 * ⚠️ `runtime = 'edge'` é obrigatório pro `next/og`, e edge não enxerga disco:
 * catálogo e histórico entram por `import` do JSON, resolvidos no build.
 */
export const runtime = 'edge';

const CENAS = ['gancho', 'produto', 'prova', 'chamada'] as const;
type Cena = (typeof CENAS)[number];

const L = 1080;
const A = 1920;

function lerCena(url: string): Cena {
  const pedida = new URL(url).searchParams.get('cena');
  return (CENAS as readonly string[]).includes(pedida ?? '') ? (pedida as Cena) : 'gancho';
}

function acharProduto(slug: string): Produto | undefined {
  return produtosVisiveis((catalogo as Catalogo).produtos).find((p) => gerarSlug(p) === slug);
}

const fundo = 'linear-gradient(160deg, #0b1220 0%, #172554 100%)';

/** A marca, com o mesmo par de bordas do favicon e da capa do link. */
function Marca({ tamanho = 44 }: { tamanho?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          width: 24,
          height: 46,
          marginRight: 22,
          marginTop: -10,
          borderRight: '10px solid #4ade80',
          borderBottom: '10px solid #4ade80',
          transform: 'rotate(45deg)',
        }}
      />
      <div style={{ display: 'flex', fontSize: tamanho, fontWeight: 700 }}>Verificado Agora</div>
    </div>
  );
}

export function GET(pedido: Request, { params }: { params: { slug: string } }): Response {
  const produto = acharProduto(params.slug);
  if (!produto) return new Response('Produto não encontrado', { status: 404 });

  const cena = lerCena(pedido.url);
  const pontos = (arquivoDeHistorico as { produtos: Record<string, PontoDoHistorico[]> }).produtos[
    produto.meli_id
  ];
  const resumo = resumoDoHistorico(pontos, produto.preco_atual);

  const base = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    background: fundo,
    color: 'white',
    padding: 72,
  };

  const miolo: Record<Cena, React.ReactElement> = {
    // 1. O gancho. Número grande, sem enrolação: é o primeiro segundo que
    //    decide se a pessoa para de rolar.
    gancho: (
      <div style={{ ...base, justifyContent: 'center' }}>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, color: '#7dd3fc' }}>
          {produto.categoria}
        </div>
        <div style={{ display: 'flex', marginTop: 24, fontSize: 132, fontWeight: 900, lineHeight: 1 }}>
          {produto.desconto_percentual}% OFF
        </div>
        <div style={{ display: 'flex', marginTop: 40, fontSize: 56, color: '#94a3b8', textDecoration: 'line-through' }}>
          {formatarReal(produto.preco_original)}
        </div>
        <div style={{ display: 'flex', marginTop: 8, fontSize: 116, fontWeight: 900, color: '#4ade80' }}>
          {formatarReal(produto.preco_atual)}
        </div>
        <div style={{ display: 'flex', marginTop: 48, fontSize: 40, color: '#cbd5e1' }}>
          Preço conferido em {formatarData(produto.verificado_em)}
        </div>
      </div>
    ),

    // 2. O produto. Foto sobre branco: a foto do Meli vem recortada em fundo
    //    claro e ficaria com halo sobre o azul escuro.
    produto: (
      <div style={{ ...base, justifyContent: 'center' }}>
        {produto.imagem ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 780,
              borderRadius: 40,
              background: 'white',
              padding: 48,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={produto.imagem} alt="" width={680} height={680} style={{ objectFit: 'contain' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', height: 780, alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
            Sem foto
          </div>
        )}
        <div style={{ display: 'flex', marginTop: 56, fontSize: 68, fontWeight: 700, lineHeight: 1.15 }}>
          {produto.nome}
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 44, color: '#7dd3fc' }}>
          {produto.descricao}
        </div>
      </div>
    ),

    // 3. A prova. É a cena que nenhum outro perfil de oferta consegue fazer:
    //    o preço de cada dia é dado nosso.
    prova: (
      <div style={{ ...base, justifyContent: 'center' }}>
        <div style={{ display: 'flex', fontSize: 52, color: '#7dd3fc' }}>Por que dá pra confiar</div>
        {resumo ? (
          <>
            <div style={{ display: 'flex', marginTop: 40, fontSize: 96, fontWeight: 900, lineHeight: 1.05 }}>
              {resumo.dias} dias
            </div>
            <div style={{ display: 'flex', marginTop: 12, fontSize: 52, color: '#cbd5e1' }}>
              conferindo este preço todo dia
            </div>
            <div style={{ display: 'flex', marginTop: 64, fontSize: 44, color: '#94a3b8' }}>
              Menor valor que já vimos
            </div>
            <div style={{ display: 'flex', marginTop: 10, fontSize: 84, fontWeight: 900, color: '#4ade80' }}>
              {formatarReal(resumo.menor.preco)}
            </div>
            <div style={{ display: 'flex', marginTop: 10, fontSize: 40, color: '#94a3b8' }}>
              em {formatarData(resumo.menor.dia)}
            </div>
            <div style={{ display: 'flex', marginTop: 56, fontSize: 48, fontWeight: 700, color: resumo.noMenor ? '#4ade80' : '#e2e8f0' }}>
              {resumo.noMenor
                ? 'Hoje está no menor preço'
                : `Hoje está ${resumo.acimaDoMenor}% acima do menor`}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', marginTop: 40, fontSize: 60, fontWeight: 700, lineHeight: 1.2 }}>
            Conferimos o preço deste produto todo dia, e guardamos o valor de cada um.
          </div>
        )}
      </div>
    ),

    // 4. A chamada. Um pedido só — dois pedidos numa tela viram zero.
    chamada: (
      <div style={{ ...base, justifyContent: 'center' }}>
        <Marca tamanho={52} />
        <div style={{ display: 'flex', marginTop: 72, fontSize: 88, fontWeight: 900, lineHeight: 1.1 }}>
          Ofertas com o preço conferido
        </div>
        <div style={{ display: 'flex', marginTop: 32, fontSize: 52, color: '#cbd5e1', lineHeight: 1.3 }}>
          Todo dia, sem grupo lotado de conversa
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 72,
            padding: '32px 48px',
            borderRadius: 28,
            background: '#2563eb',
            fontSize: 56,
            fontWeight: 900,
          }}
        >
          Link na bio
        </div>
        <div style={{ display: 'flex', marginTop: 'auto', fontSize: 38, color: '#94a3b8' }}>
          verificadoagora.com.br · link de afiliado
        </div>
      </div>
    ),
  };

  return new ImageResponse(miolo[cena], { width: L, height: A });
}
