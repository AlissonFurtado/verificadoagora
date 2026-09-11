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

/**
 * Dois formatos, uma arte só.
 *
 * ⚠️ **O 2:3 do Pinterest não serve no Instagram.** O feed corta vertical em
 * 4:5, e uma arte 1000x1500 perderia o rodapé — que é justamente onde está o
 * endereço do site. O quadrado foi a escolha do Alisson em 11/09/2026: é o
 * único formato que o Instagram nunca corta, e a conta é nova demais pra
 * apostar num recorte.
 *
 * ⚠️ **Formato quadrado não é o vertical espremido.** Sobra menos altura, então
 * a foto encolhe e os tipos descem junto — senão o nome do produto empurra o
 * rodapé pra fora. Os números de cada formato moram em `MEDIDAS`.
 */
const MEDIDAS = {
  pin: { largura: 1000, altura: 1500, foto: 760, imagem: 640, marca: 54, nome: 60, chamada: 40, rodape: 32 },
  quadrado: { largura: 1080, altura: 1080, foto: 540, imagem: 460, marca: 48, nome: 52, chamada: 36, rodape: 30 },
} as const;

type Formato = keyof typeof MEDIDAS;

function lerFormato(url: string): Formato {
  return new URL(url).searchParams.get('formato') === 'quadrado' ? 'quadrado' : 'pin';
}

function acharProduto(slug: string): Produto | undefined {
  return produtosVisiveis((catalogo as Catalogo).produtos).find((p) => gerarSlug(p) === slug);
}

export function GET(pedido: Request, { params }: { params: { slug: string } }): Response {
  const produto = acharProduto(params.slug);
  if (!produto || !produto.imagem) {
    return new Response('Pin não encontrado', { status: 404 });
  }
  const m = MEDIDAS[lerFormato(pedido.url)];

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
          <div style={{ display: 'flex', fontSize: m.marca, fontWeight: 700 }}>Verificado Agora</div>
        </div>

        {/* A foto, sobre branco: foto de produto do Meli vem recortada em fundo
            claro, e sobre o azul escuro ela ficaria com halo. */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 48,
            height: m.foto,
            borderRadius: 32,
            background: 'white',
            padding: 40,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={produto.imagem}
            alt=""
            width={m.imagem}
            height={m.imagem}
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div style={{ display: 'flex', marginTop: 52, fontSize: m.nome, fontWeight: 700, lineHeight: 1.15 }}>
          {produto.nome}
        </div>

        <div style={{ display: 'flex', marginTop: 28, fontSize: m.chamada, color: '#7dd3fc' }}>
          Vale a pena?
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            fontSize: m.rodape,
            color: '#cbd5e1',
          }}
        >
          Preço conferido todo dia · verificadoagora.com.br
        </div>
      </div>
    ),
    { width: m.largura, height: m.altura },
  );
}
