/**
 * Cliente da API do Mercado Livre.
 *
 * É o único lugar que fala com o Meli. Trocar de fonte de dados (voltar a ler
 * a página, entrar Shopee ou Amazon) é mexer só aqui.
 *
 * Por que API e não raspagem: pedir a página do produto por HTTP puro devolve
 * a tela de "suspicious traffic" mesmo de IP residencial. A API responde de
 * qualquer lugar, desde que com token.
 */

const API = 'https://api.mercadolibre.com';

export type Credenciais = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

export type TokensRenovados = {
  accessToken: string;
  /** O refresh_token do Meli é de uso único: este novo TEM que ser guardado. */
  novoRefreshToken: string;
};

export type DadosDoProduto = {
  nome: string;
  preco: number;
  precoOriginal: number | null;
  imagem: string;
  disponivel: boolean;
  permalink: string;
};

class ErroDoMeli extends Error {
  constructor(
    public readonly rota: string,
    public readonly status: number,
    public readonly corpo: string,
  ) {
    super(`[meli] ${rota} respondeu ${status}: ${corpo.slice(0, 200)}`);
  }
}

export async function pedir(rota: string, accessToken: string): Promise<unknown> {
  const resposta = await fetch(`${API}${rota}`, {
    headers: { Authorization: `Bearer ${accessToken}`, accept: 'application/json' },
  });
  const corpo = await resposta.text();
  if (!resposta.ok) throw new ErroDoMeli(rota, resposta.status, corpo);
  return JSON.parse(corpo) as unknown;
}

/**
 * Troca o refresh_token por um access_token novo.
 *
 * Devolve também um refresh_token novo — o antigo morre nesta chamada. Quem
 * chama precisa guardar o novo ANTES de fazer qualquer outra coisa, senão uma
 * falha no meio do caminho deixa a automação sem como voltar.
 */
export async function renovarAcesso(cred: Credenciais): Promise<TokensRenovados> {
  const resposta = await fetch(`${API}/oauth/token`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: cred.clientId,
      client_secret: cred.clientSecret,
      refresh_token: cred.refreshToken,
    }),
  });
  const corpo = await resposta.text();
  if (!resposta.ok) throw new ErroDoMeli('/oauth/token', resposta.status, corpo);

  // asserção de tipo: resposta externa, validada logo abaixo
  const dados = JSON.parse(corpo) as { access_token?: string; refresh_token?: string };
  if (!dados.access_token || !dados.refresh_token) {
    throw new Error('[meli] /oauth/token não devolveu access_token e refresh_token');
  }
  return { accessToken: dados.access_token, novoRefreshToken: dados.refresh_token };
}

export type TipoDeId = 'produto' | 'anuncio';

/**
 * Chute quando ninguém disse o tipo: id de catálogo é curto (`MLB24076624`),
 * anúncio é longo ou vem com hífen (`MLB-7547729432`).
 *
 * É heurística mesmo — os dois são "MLB" + dígitos e as faixas se aproximam
 * com o tempo. Quem souber o tipo (o garimpo sabe, vem do /highlights) deve
 * passar explicitamente em vez de confiar nisto.
 */
function ehCatalogo(meliId: string): boolean {
  return !meliId.includes('-') && /^MLB\d{1,9}$/.test(meliId);
}

function comoTexto(valor: unknown): string {
  return typeof valor === 'string' ? valor : '';
}

function comoNumero(valor: unknown): number | null {
  return typeof valor === 'number' && Number.isFinite(valor) ? valor : null;
}

/**
 * Extrai os campos que a landing usa.
 *
 * `bruto` é o produto (catálogo) ou o anúncio; `oferta` é de onde sai o preço.
 * Em anúncio os dois são o mesmo objeto.
 */
function normalizar(
  bruto: Record<string, unknown>,
  oferta: Record<string, unknown>,
  meliId: string,
): DadosDoProduto {
  const vencedor = oferta;

  const preco = comoNumero(vencedor.price);
  if (preco === null) {
    throw new Error(
      `[meli] ${meliId}: resposta sem preço. Rode "npm run meli:inspecionar ${meliId}" e veja o que voltou.`,
    );
  }

  const fotos = Array.isArray(bruto.pictures) ? bruto.pictures : [];
  const primeiraFoto = fotos[0] as Record<string, unknown> | undefined;
  const imagem =
    comoTexto(primeiraFoto?.secure_url) ||
    comoTexto(primeiraFoto?.url) ||
    comoTexto((bruto.pictures as unknown as Record<string, unknown>)?.['0']) ||
    '';

  const status = comoTexto(vencedor.status) || comoTexto(bruto.status);
  const quantidade = comoNumero(vencedor.available_quantity);

  return {
    nome: comoTexto(bruto.name) || comoTexto(bruto.title),
    preco,
    precoOriginal: comoNumero(vencedor.original_price),
    imagem,
    disponivel: status !== 'paused' && status !== 'closed' && quantidade !== 0,
    permalink: comoTexto(vencedor.permalink) || comoTexto(bruto.permalink),
  };
}

/**
 * URL da página do produto. O `permalink` da API vem vazio em produto de
 * catálogo, então monta-se pelo id — o Meli redireciona pro endereço com
 * slug. É essa URL que vai pro Linkbuilder.
 */
export function urlDoProduto(meliId: string, tipo: TipoDeId): string {
  return tipo === 'produto'
    ? `https://www.mercadolivre.com.br/p/${meliId}`
    : `https://produto.mercadolivre.com.br/${meliId.startsWith('MLB-') ? meliId : meliId.replace('MLB', 'MLB-')}`;
}

export async function buscarProduto(
  meliId: string,
  accessToken: string,
  tipo?: TipoDeId,
): Promise<DadosDoProduto> {
  const catalogo = tipo ? tipo === 'produto' : ehCatalogo(meliId);
  if (!catalogo) {
    const anuncio = (await pedir(`/items/${meliId.replace('-', '')}`, accessToken)) as Record<
      string,
      unknown
    >;
    return normalizar(anuncio, anuncio, meliId);
  }

  const produto = (await pedir(`/products/${meliId}`, accessToken)) as Record<string, unknown>;

  // O buy_box_winner costuma vir nulo. Quando vem, /items lista as ofertas
  // ativas daquele produto — a primeira é a que o Meli mostra na página.
  let oferta = produto.buy_box_winner as Record<string, unknown> | null;
  if (!oferta) {
    const lista = (await pedir(`/products/${meliId}/items`, accessToken)) as {
      results?: Record<string, unknown>[];
    };
    oferta = lista.results?.[0] ?? null;
  }

  // Sem oferta ativa não há o que anunciar. O preço 0 nunca chega na página:
  // quem chama olha `disponivel` antes de olhar preço.
  if (!oferta) {
    return {
      nome: comoTexto(produto.name),
      preco: 0,
      precoOriginal: null,
      imagem: '',
      disponivel: false,
      permalink: comoTexto(produto.permalink),
    };
  }

  return normalizar(produto, oferta, meliId);
}

/** Devolve a resposta crua, pra quando a normalização não achar o que espera. */
export async function inspecionar(meliId: string, accessToken: string): Promise<unknown> {
  const rota = ehCatalogo(meliId) ? `/products/${meliId}` : `/items/${meliId.replace('-', '')}`;
  return pedir(rota, accessToken);
}
