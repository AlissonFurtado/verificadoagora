import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
// O alt é o que leitor de tela anuncia quando o link é compartilhado. Ficou
// desatualizado até 10/09/2026, dizendo "achadinhos de tech" — o posicionamento
// de antes do brief de celulares.
export const alt =
  'Verificado Agora — celulares intermediários com o preço conferido todo dia';

/**
 * Capa do link quando ele é colado no Instagram, no WhatsApp ou no X.
 * O "✓" é desenhado com bordas: a fonte padrão do next/og não tem o glifo.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #020617 0%, #1e293b 100%)',
          color: 'white',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 40,
              height: 76,
              marginRight: 36,
              marginTop: -18,
              borderRight: '16px solid #4ade80',
              borderBottom: '16px solid #4ade80',
              transform: 'rotate(45deg)',
            }}
          />
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700 }}>Verificado Agora</div>
        </div>
        <div style={{ display: 'flex', marginTop: 24, fontSize: 40, color: '#cbd5e1' }}>
          Celulares intermediários com o preço conferido todo dia
        </div>
        <div style={{ display: 'flex', marginTop: 48, fontSize: 28, color: '#94a3b8' }}>
          Preço conferido no dia · links de afiliado
        </div>
      </div>
    ),
    size,
  );
}
