import type { MetadataRoute } from 'next';

/**
 * Tudo liberado, inclusive pros rastreadores de IA.
 *
 * A aposta do projeto é ser citado como fonte de preço conferido — e pra isso
 * o robô precisa entrar e ler o preço. Bloquear IA aqui seria fechar a porta
 * pela qual a gente quer que as pessoas cheguem.
 */
export default function robots(): MetadataRoute.Robots {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000';

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${base}/sitemap.xml`,
  };
}
