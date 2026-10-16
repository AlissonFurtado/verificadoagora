import { ImageResponse } from 'next/og';
import catalogo from '../../../../data/produtos.json';
import arquivoDeGuias from '../../../../data/guias.json';
import { produtosVisiveis, type Catalogo } from '@/lib/produtos';
import type { Guia } from '@/lib/guias';

/**
 * A capa do link de um guia: `/capa-guia/{slug}`, 1200x630.
 *
 * Nasceu em 15/10/2026, pedido do Alisson: ele colou o link do guia de
 * suplementos no canal do WhatsApp e a prévia veio só com o título, sem
 * imagem nenhuma. Agora a prévia mostra as fotos dos produtos do guia, no
 * mesmo visual do banner da home (`card-guia.tsx`): fundo escuro, selo âmbar
 * e as fotos em quadrados brancos.
 *
 * ⚠️ **Sem preço na arte**: a prévia fica guardada na conversa por dias, e o
 * robô muda o preço toda manhã. Mesma regra do pin.
 *
 * ⚠️ Edge não enxerga disco: catálogo e guias entram por `import` do JSON,
 * como em `/pin/{slug}`.
 */
export const runtime = 'edge';

export function GET(_pedido: Request, { params }: { params: { slug: string } }): Response {
  const guia = (arquivoDeGuias as unknown as { guias: Guia[] }).guias.find((g) => g.slug === params.slug);
  if (!guia) return new Response('Guia não encontrado', { status: 404 });

  const visiveis = produtosVisiveis((catalogo as Catalogo).produtos);
  const doGuia = guia.perfis
    .map((perfil) => visiveis.find((p) => p.meli_id === perfil.meli_id))
    .filter((p): p is (typeof visiveis)[number] => p !== undefined);
  const fotos = doGuia.filter((p) => p.imagem).slice(0, 6);
  // O título longo ("…: creatina e whey com melhor custo-benefício") quebra em
  // três linhas e empurra as fotos para fora; o trecho antes dos dois-pontos
  // basta, e a chamada embaixo diz o resto.
  const titulo = guia.titulo.split(':')[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0b1220 0%, #172554 100%)',
          borderBottom: '10px solid #38bdf8',
          color: 'white',
          padding: '48px 56px 40px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                background: '#fbbf24',
                color: '#0f172a',
                fontSize: 26,
                fontWeight: 900,
                padding: '6px 16px',
                borderRadius: 8,
                letterSpacing: 2,
              }}
            >
              {`GUIA · ${doGuia.length} PRODUTOS`}
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.05, marginTop: 18 }}>{titulo}</div>
          {guia.vitrine && (
            <div style={{ fontSize: 28, color: '#cbd5e1', marginTop: 10, lineHeight: 1.3 }}>
              {guia.vitrine.chamada}
            </div>
          )}
        </div>

        {fotos.length > 0 && (
          <div style={{ display: 'flex', gap: 18 }}>
            {fotos.map((p) => (
              <div
                key={p.meli_id}
                style={{
                  width: 167,
                  height: 167,
                  background: 'white',
                  borderRadius: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.imagem} alt="" style={{ maxWidth: 143, maxHeight: 143, objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        )}

        <div style={{ fontSize: 26, color: '#38bdf8', fontWeight: 800 }}>verificadoagora.com.br · preço conferido todo dia</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
