import { ImageResponse } from 'next/og';
import catalogo from '../../../../data/produtos.json';
import { produtosVisiveis, type Catalogo, type Produto } from '@/lib/produtos';
import { gerarSlug } from '@/lib/slug';

/**
 * A arte do pin do Pinterest: `/pin/{slug}`, 1000x1500.
 *
 * Existe porque a foto que vem do Mercado Livre **não serve como pin**. O
 * Pinterest pede pelo menos 1000px de largura e privilegia o formato vertical
 * 2:3; as fotos do Meli chegam quadradas e pequenas — a do Galaxy A36 tem 389px
 * de largura, e o próprio pin-builder reclama. Aqui a foto vira o miolo de uma
 * arte no tamanho certo, com a marca em volta.
 *
 * ⚠️ **A arte não leva preço**, pela mesma razão que o texto do pin não leva
 * (veja `scripts/pins.ts`): pin vive meses, o robô muda o preço toda manhã, e
 * ninguém refaz 15 imagens por dia. O que ela promete é o que não envelhece.
 *
 * ⚠️ **`runtime = 'edge'` é obrigatório pro `next/og`** — sem isso o build
 * morre no Windows com `TypeError: Invalid URL`. E edge não enxerga disco: por
 * isso o catálogo entra por `import` do JSON, que o bundler resolve no build,
 * e não por `lerCatalogo()`, que usa `fs`.
 *
 * ⚠️ **O "✓" é desenhado com bordas, não escrito.** A fonte padrão do next/og
 * não tem o glifo e ele sairia como quadradinho.
 */
export const runtime = 'edge';

const LARGURA = 1000;
const ALTURA = 1500;

function acharProduto(slug: string): Produto | undefined {
  return produtosVisiveis((catalogo as Catalogo).produtos).find((p) => gerarSlug(p) === slug);
}

export function GET(_pedido: Request, { params }: { params: { slug: string } }): Response {
  const produto = acharProduto(params.slug);
  if (!produto || !produto.imagem) {
    return new Response('Pin não encontrado', { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(160deg, #0b1220 0%, #172554 100%)',
          color: 'white',
          padding: 60,
        }}
      >
        {/* Marca. O mesmo par de bordas do favicon e da capa do link. */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 26,
              height: 50,
              marginRight: 24,
              marginTop: -12,
              borderRight: '11px solid #4ade80',
              borderBottom: '11px solid #4ade80',
              transform: 'rotate(45deg)',
            }}
          />
          <div style={{ display: 'flex', fontSize: 54, fontWeight: 700 }}>Verificado Agora</div>
        </div>

        {/* A foto, sobre branco: foto de produto do Meli vem recortada em fundo
            claro, e sobre o azul escuro ela ficaria com halo. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 48,
            height: 760,
            borderRadius: 32,
            background: 'white',
            padding: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={produto.imagem}
            alt=""
            width={640}
            height={640}
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div style={{ display: 'flex', marginTop: 52, fontSize: 60, fontWeight: 700, lineHeight: 1.15 }}>
          {produto.nome}
        </div>

        <div style={{ display: 'flex', marginTop: 28, fontSize: 40, color: '#7dd3fc' }}>
          Vale a pena?
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            fontSize: 32,
            color: '#cbd5e1',
          }}
        >
          Preço conferido todo dia · verificadoagora.com.br
        </div>
      </div>
    ),
    { width: LARGURA, height: ALTURA },
  );
}
