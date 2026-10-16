import { ImageResponse } from 'next/og';
import { LUPITA_CABECA_SVG, comoImagem } from '@/lib/lupita';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * Favicon gerado no build: a cabeça da Lupita. Até 15/10/2026 era um "✓"
 * desenhado com bordas; saiu porque lembra selo de verificação (strike na
 * Meta, decisão do Alisson).
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={comoImagem(LUPITA_CABECA_SVG)} width={32} height={32} alt="" />
      </div>
    ),
    size,
  );
}
