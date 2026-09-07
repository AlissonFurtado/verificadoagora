import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * Favicon gerado no build. O "✓" é desenhado com bordas, não escrito: a fonte
 * padrão do next/og não tem o glifo e ele sairia como quadradinho.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020617',
        }}
      >
        <div
          style={{
            width: 9,
            height: 17,
            marginTop: -4,
            borderRight: '4px solid #4ade80',
            borderBottom: '4px solid #4ade80',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
    ),
    size,
  );
}
