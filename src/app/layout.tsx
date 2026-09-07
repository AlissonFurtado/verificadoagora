import type { Metadata } from 'next';
import './globals.css';

const enderecoDoSite =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

const titulo = 'Verificado Agora — achadinhos de tech';
const descricao =
  'Ofertas de tecnologia conferidas uma a uma, com o preço do dia e o link direto da loja.';

export const metadata: Metadata = {
  metadataBase: new URL(enderecoDoSite),
  title: titulo,
  description: descricao,
  openGraph: {
    title: titulo,
    description: descricao,
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Verificado Agora',
  },
  twitter: { card: 'summary_large_image', title: titulo, description: descricao },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-900 text-white">{children}</body>
    </html>
  );
}
