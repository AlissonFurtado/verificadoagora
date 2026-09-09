import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { MedirCliques } from './medicao';
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

const titulo = 'Verificado Agora — celulares intermediários com preço conferido todo dia';
const descricao =
  'Celulares intermediários de R$ 800 a R$ 2.500, com o preço conferido por robô toda manhã, ' +
  'histórico de cada dia e comparativos ficha a ficha.';

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
  /*
   * `max-image-preview: large` é requisito do Google Discover: sem ele o
   * buscador só pode mostrar miniatura, e Discover não usa miniatura. Vale
   * pra todas as páginas porque o layout é a raiz.
   *
   * ⚠️ A foto do produto que vem do Meli tem 719px de largura no maior
   * tamanho disponível — abaixo dos 1200px que o Discover pede. Quem cumpre
   * o requisito é a capa gerada em `opengraph-image.tsx`, que é 1200x630.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="bg-fundo font-sans text-slate-900 antialiased">
        {children}
        {/*
          Medição. Entrou em 08/09/2026: o site estava no ar desde 01/09 sem
          ninguém saber quantas pessoas entravam.

          Escolhido por não usar cookie — daí não precisar de banner de
          consentimento, que seria a primeira coisa que o visitante veria no
          celular, em cima da vitrine. Só roda em produção; em
          desenvolvimento o pacote fica quieto sozinho.
        */}
        <Analytics />
        <MedirCliques />
      </body>
    </html>
  );
}
