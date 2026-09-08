import type { MetadataRoute } from 'next';
import { lerCatalogo } from '@/lib/catalogo';
import { produtosVisiveis } from '@/lib/produtos';
import { caminhoDoProduto } from '@/lib/slug';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000';

  const { produtos, metadata } = lerCatalogo();

  return [
    {
      url: base,
      lastModified: new Date(metadata.ultima_atualizacao),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...produtosVisiveis(produtos).map((produto) => ({
      url: `${base}${caminhoDoProduto(produto)}`,
      lastModified: new Date(produto.verificado_em),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ];
}
