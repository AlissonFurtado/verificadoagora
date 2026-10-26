import type { Produto } from './produtos';

/**
 * Produtos que estão em vídeo no Instagram (@verificadoagorabr).
 *
 * Quem chega pelo link da bio procura o produto que acabou de ver: estes vão
 * para o topo da home (com o selo "No vídeo") e para a seção "Dos nossos
 * vídeos" do /entrar. Pedido do Alisson em 26/10/2026.
 *
 * **Para trocar, edite só esta lista**: o `meli_id` do produto, o vídeo mais
 * novo primeiro. O preço vem do robô, como em todo o site. Produto que ficar
 * indisponível (ou sair do catálogo) some sozinho, sem quebrar a página.
 */
export const IDS_DOS_VIDEOS: string[] = [
  'MLB27727511', // Ar-condicionado LG AI Dual Inverter Voice 12.000 BTUs
  'MLB24473062', // Controle GameSir G7 SE para Xbox
];

/** Os produtos da lista, na ordem dela, só os que estão visíveis. */
export function produtosDosVideos(visiveis: Produto[]): Produto[] {
  return IDS_DOS_VIDEOS.map((id) => visiveis.find((p) => p.meli_id === id)).filter(
    (p): p is Produto => p !== undefined,
  );
}
