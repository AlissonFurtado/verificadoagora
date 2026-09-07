import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Verificado Agora — Afiliados de Tech',
  description: 'Achadinhos de tecnologia com os melhores descontos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-900 text-white">{children}</body>
    </html>
  );
}
