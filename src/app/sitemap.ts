import type { MetadataRoute } from 'next';
import { lerCatalogo, lerComparativos } from '@/lib/catalogo';
import { produtosVisiveis } from '@/lib/produtos';
import { caminhoDoComparativo, caminhoDoProduto } from '@/lib/slug';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000';

  const { produtos, metadata } = lerCatalogo();
  const visiveis = produtosVisiveis(produtos);
  const comComparativo = new Set(lerComparativos().map((c) => c.meli_id));

  return [
    {
      url: base,
      lastModified: new Date(metadata.ultima_atualizacao),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...visiveis.map((produto) => ({
      url: `${base}${caminhoDoProduto(produto)}`,
      lastModified: new Date(produto.verificado_em),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
    // Comparativo é texto escrito à mão: muda pouco, mas vale mais no índice
    // do que a página de um produto só — é a pergunta que a pessoa digita.
    ...visiveis
      .filter((produto) => comComparativo.has(produto.meli_id))
      .map((produto) => ({
        url: `${base}${caminhoDoComparativo(produto)}`,
        lastModified: new Date(produto.verificado_em),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      })),
  ];
}
