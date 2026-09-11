import Image from 'next/image';
import Link from 'next/link';
import { formatarData, formatarReal, type Produto } from '@/lib/produtos';
import { caminhoDoProduto, gerarSlug } from '@/lib/slug';
import type { Tendencia } from '@/lib/historico';
import { MiniGrafico } from './mini-grafico';

/**
 * Cor da tag de categoria.
 *
 * Serve pra varrer a vitrine sem ler nome nenhum: quem procura fone reconhece
 * o azul antes de ler a palavra. Categoria nova cai no cinza até alguém
 * escolher uma cor — melhor que sortear uma que colida com outra.
 */
const COR_DA_CATEGORIA: Record<string, string> = {
  Celulares: '#0047ba',
  Eletrônicos: '#0047ba',
  'Foto e vídeo': '#7c3aed',
  Games: '#be123c',
  Casa: '#ff6b00',
  Acessórios: '#0f766e',
};

/**
 * Card do produto.
 *
 * **Deitado no celular, em pé a partir do `sm`.** Abaixo de 640px a vitrine
 * tem uma coluna só: com a foto em cima ocupando a largura inteira caberia um
 * produto por tela e a lista viraria um túnel de quinze rolagens. Com a foto
 * ao lado cabem três, e a altura de todos os cards passa a ser a mesma sem
 * truque nenhum — quem manda é o corpo do texto.
 *
 * O miolo veio da paleta que o Alisson trouxe em 08/09/2026: tag de categoria
 * no topo, preço antigo e atual colados, preço em 26px peso 900 e botão em
 * caixa alta. O que **não** veio de lá foi o formato vertical, que devolveria
 * o problema de um produto por tela.
 */
export function CardProduto({
  produto,
  selo,
  comparativo,
  tendencia,
  onde = 'vitrine',
}: {
  produto: Produto;
  /** "Menor preço em N dias", ou null quando não há histórico pra afirmar. */
  selo: string | null;
  /**
   * Quando o produto tem comparativo escrito, o card ganha um selo âmbar
   * sobre a foto e um anel da mesma cor. O selo é o único caminho pro
   * comparativo: qualquer coisa que ocupasse espaço no corpo deixaria este
   * card mais alto que os outros e desalinharia a grade por um produto só.
   */
  comparativo?: { caminho: string; rivais: number } | null;
  /** Como o preço andou. `null` até o robô ter dois dias do produto. */
  tendencia?: Tendencia | null;
  /**
   * De onde saiu o clique, no evento `oferta_clicada`. A vitrine é o padrão;
   * `/instagram` passa o seu para que o placar do canal não se misture com o
   * da home — é a propriedade `onde`, a que responde "esse canal rendeu?".
   */
  onde?: string;
}) {
  const economia = produto.preco_original - produto.preco_atual;
  const caminho = caminhoDoProduto(produto);
  const corDaTag = COR_DA_CATEGORIA[produto.categoria] ?? '#475569';

  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_5px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] ${
        comparativo ? 'ring-2 ring-amber-400' : 'ring-1 ring-slate-200 hover:ring-marca-acao'
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-row sm:flex-col">
        {/* A foto é o quadro: o link dela, o selo de desconto e o selo do
            comparativo ficam todos por cima, e nenhum deles empurra a altura
            do card. Foi assim que o card do comparativo deixou de ser 33px
            mais alto que os outros catorze. */}
        <div className="relative w-2/5 min-w-0 shrink-0 self-stretch bg-white sm:aspect-square sm:w-full sm:self-auto">
          <Link href={caminho} className="absolute inset-0 block">
            {produto.imagem ? (
              <Image
                src={produto.imagem}
                alt={produto.nome}
                fill
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-3 transition duration-500 group-hover:scale-105 sm:p-5"
              />
            ) : (
              <div className="flex h-full items-center justify-center p-4 text-center text-xs text-slate-400">
                Sem foto
              </div>
            )}
          </Link>

          <span className="pointer-events-none absolute left-2 top-2 rounded bg-desconto px-2 py-1 text-[10px] font-black tracking-wide text-white shadow-sm sm:left-3 sm:top-3">
            {produto.desconto_percentual}% OFF
          </span>

          {comparativo && (
            <Link
              href={comparativo.caminho}
              data-comparativo={gerarSlug(produto)}
              className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-amber-400 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-amber-950 shadow-sm transition-colors hover:bg-amber-300 sm:bottom-3 sm:left-3"
            >
              <span aria-hidden="true">⚖</span>
              Comparativo
              <span className="hidden sm:inline">· {comparativo.rivais} modelos</span>
            </Link>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-3 sm:border-t sm:border-slate-100 sm:p-4">
          <div className="flex min-w-0 items-center justify-between gap-2">
            <span
              className="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white"
              style={{ backgroundColor: corDaTag }}
            >
              {produto.categoria}
            </span>
            <span className="shrink-0 text-[9px] font-bold text-slate-400">
              {formatarData(produto.verificado_em).slice(0, 5)}
            </span>
          </div>

          {/* Altura mínima de duas linhas: título curto e título longo ocupam
              o mesmo espaço, e é o que mantém todos os cards do mesmo tamanho
              mesmo em linhas diferentes da grade. */}
          <h2 className="min-h-[2.2rem] min-w-0">
            <Link
              href={caminho}
              className="line-clamp-2 text-sm font-bold leading-tight text-slate-800 transition-colors hover:text-marca"
            >
              {produto.nome}
            </Link>
          </h2>

          {/* Preços colados de propósito: o olho lê os dois como um bloco só e
              a queda salta. Soltos, viravam dois números separados. */}
          <div className="mt-auto min-w-0 leading-[1.08]">
            <div className="flex min-w-0 items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400 line-through">
                {formatarReal(produto.preco_original)}
              </span>
              {tendencia && <MiniGrafico tendencia={tendencia} />}
            </div>
            <p className="flex flex-wrap items-baseline gap-x-2 text-[26px] font-black tracking-[-0.5px] text-marca">
              {formatarReal(produto.preco_atual)}
              {produto.preco_no_pix && (
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  no Pix
                </span>
              )}
            </p>
            {/* Reserva a linha mesmo sem selo, pelo mesmo motivo do título. */}
            <p className="flex min-h-[1.1rem] min-w-0 flex-wrap items-baseline gap-x-1.5 text-[11px] font-bold text-economia">
              {economia > 0 && <span>economiza {formatarReal(economia)}</span>}
              {selo && <span className="text-amber-700">· {selo}</span>}
            </p>
          </div>

          {/* O botão vai direto pra loja: caminho mais curto até a compra. A
              página do produto é porta de entrada de busca, não degrau do funil
              — quem chega por ela já está lá. */}
          <a
            href={produto.link_afiliado}
            target="_blank"
            rel="sponsored noopener noreferrer"
            data-oferta={gerarSlug(produto)}
            data-categoria={produto.categoria}
            data-preco={produto.preco_atual}
            data-onde={onde}
            className="mt-1.5 block rounded-lg bg-marca-acao px-3 py-2.5 text-center text-[13px] font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-marca"
          >
            Ver oferta
          </a>

          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-[10px] font-medium text-slate-400">
            <span className="min-w-0">Conferido em {formatarData(produto.verificado_em)}</span>
            <Link href={caminho} className="shrink-0 underline transition-colors hover:text-marca">
              detalhes
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
