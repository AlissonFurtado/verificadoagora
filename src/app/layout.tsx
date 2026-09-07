import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// next/font baixa e serve a fonte do próprio domínio: sem chamada ao Google
// no navegador de quem visita, e sem o pisca-pisca de troca de fonte.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--fonte' });

/**
 * De onde saem as URLs absolutas das metatags.
 *
 * Tem que ser `VERCEL_PROJECT_PRODUCTION_URL` (o domínio do projeto) e não
 * `VERCEL_URL` (o endereço daquele deploy específico). Com VERCEL_URL a capa
 * do link apontava pra uma URL de deploy, que a Vercel protege com login e
 * responde 302 — resultado: link colado no Instagram aparecia sem imagem.
 *
 * Como é o domínio do projeto, ele vira `verificadoagora.com.br` sozinho no
 * dia em que o domínio for conectado. Nada pra lembrar de trocar.
 */
const enderecoDoSite = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

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
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-slate-950 font-sans text-white antialiased">{children}</body>
    </html>
  );
}
