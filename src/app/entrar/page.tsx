import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { lerCatalogo, lerHistorico } from '@/lib/catalogo';
import { formatarData, formatarReal, produtosVisiveis, type Produto } from '@/lib/produtos';
import { acharQuedas, type Queda } from '@/lib/quedas';
import { descreverConferencia } from '@/lib/relogio';
import { caminhoDoProduto, gerarSlug } from '@/lib/slug';
import { SeloDeConferencia } from '../selo-de-conferencia';
import { BarraDupla } from './barra-dupla';
import { BuscaRapida, type ItemDaBusca } from './busca-rapida';

export const revalidate = 3600;

const TITULO = 'Ofertas com o preço conferido todo dia';
const DESCRICAO =
  'Ache o produto que você viu e entre no canal: as ofertas que o robô confere todos os dias, ' +
  'com o histórico de preço de cada produto, para você saber se o desconto é real.';

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRICAO,
  // Página de captação, não de busca: ela existe para quem vem do Instagram.
  robots: { index: false, follow: true },
};

type Canal = { link: string; nome: string; aberto_em: string };

function lerCanal(): Canal {
  const bruto = readFileSync(join(process.cwd(), 'data', 'canal.json'), 'utf8');
  return JSON.parse(bruto) as Canal;
}

/** Um produto da vitrine de destaques, com o motivo de estar ali. */
type Destaque = {
  produto: Produto;
  /** O rótulo curto do card. */
  motivo: string;
  /** A frase com data, quando o destaque vem de uma queda que nós medimos. */
  prova: string;
  /** Verde para queda medida; o resto fica no vermelho do desconto da loja. */
  medido: boolean;
};

const ID_DOS_BOTOES = 'botoes-do-topo';

/**
 * A mesma barra da manchete do canal ("CAIU HOJE"): 3% **e** R$ 15, as duas
 * juntas. Queda de R$ 10 num fone existe, mas não é o que se grita num selo;
 * esse produto ainda pode entrar pelo desconto anunciado.
 */
function ehManchete(q: Queda): boolean {
  return q.porcento >= 3 && q.reais >= 15;
}

/**
 * A página de entrada — o destino do "link na bio" do Instagram e dos reels.
 *
 * 🟢 **Reescrita em 08/10/2026, a pedido dele.** Até então a página só tinha um
 * caminho grande, o canal do WhatsApp; quem chegava do Instagram atrás de um
 * produto só encontrava "ver o site completo" no rodapé. Agora ela serve aos
 * dois: **entrar no canal** e **achar o produto**, com a busca, a oferta do
 * dia e os destaques antes de qualquer texto.
 *
 * ⚠️ **O modelo do mercado promete número, e nós prometemos prova.** As landings
 * de grupo de oferta anunciam "+40.000 membros"; nós não temos isso e não vamos
 * inventar. A prova social daqui é **dado**: quantos produtos são conferidos,
 * há quantos dias, e o que caiu — sempre com a data.
 *
 * ⚠️ **O destaque chama atenção com dado medido, nunca com urgência.** Nada de
 * cronômetro nem "últimas unidades" (ver "A linha vermelha" no CLAUDE.md): o
 * que brilha na página é queda de preço que o robô registrou.
 *
 * ⚠️ **Nada de "recompensa por entrar".** A cláusula 1.4 dos termos do programa
 * de afiliados proíbe oferecer benefício a quem cumpre condição — sorteio
 * incluído.
 */
export default function PaginaDeEntrada() {
  const canal = lerCanal();
  const { produtos: todos, metadata: meta } = lerCatalogo();
  const produtos = produtosVisiveis(todos);
  const historico = lerHistorico().produtos;
  const { ontem, semana } = acharQuedas(produtos, historico);
  const conferencia = descreverConferencia(meta.conferido_em, new Date());

  const diasDeHistorico = Math.max(
    0,
    ...produtos.map((p) => (historico[p.meli_id] ?? []).length),
  );

  // A ordem dos destaques é a mesma da fila do canal: primeiro o que caiu
  // entre as duas últimas conferências, depois o que caiu na semana, depois o
  // maior desconto anunciado. Quem entra por queda leva a data junto.
  const destaques: Destaque[] = [];
  const jaEntrou = new Set<number>();
  const incluir = (d: Destaque) => {
    if (jaEntrou.has(d.produto.id)) return;
    jaEntrou.add(d.produto.id);
    destaques.push(d);
  };

  for (const q of ontem) {
    if (!ehManchete(q)) continue;
    incluir({
      produto: q.produto,
      motivo: `Caiu ${formatarReal(q.reais)}`,
      prova: `Era ${formatarReal(q.de.preco)} em ${formatarData(q.de.dia).slice(0, 5)}${
        q.noMenor ? ' · menor preço que já vimos' : ''
      }`,
      medido: true,
    });
  }
  for (const q of semana) {
    if (!ehManchete(q)) continue;
    incluir({
      produto: q.produto,
      motivo: `Caiu ${q.porcento}% na semana`,
      prova: `Era ${formatarReal(q.de.preco)} em ${formatarData(q.de.dia).slice(0, 5)}${
        q.noMenor ? ' · menor preço que já vimos' : ''
      }`,
      medido: true,
    });
  }
  for (const produto of [...produtos].sort((a, b) => b.desconto_percentual - a.desconto_percentual)) {
    if (produto.desconto_percentual <= 0) continue;
    incluir({ produto, motivo: `${produto.desconto_percentual}% OFF`, prova: '', medido: false });
  }

  const [principal, ...resto] = destaques;
  const carrossel = resto.slice(0, 8);

  const itensDaBusca: ItemDaBusca[] = produtos.map((p) => ({
    nome: p.nome,
    categoria: p.categoria,
    caminho: caminhoDoProduto(p),
    preco: formatarReal(p.preco_atual),
    desconto: p.desconto_percentual,
    imagem: p.imagem,
  }));

  return (
    <main className="min-h-screen bg-noite text-white">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col gap-6 px-4 pb-28 pt-8">
        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="inline-block h-5 w-2.5 -translate-y-1 rotate-45 border-b-4 border-r-4 border-economia"
              />
              <span className="text-sm font-black uppercase tracking-widest text-corte">
                Verificado Agora
              </span>
            </div>
            {conferencia && (
              <SeloDeConferencia conferidoEm={meta.conferido_em} inicial={conferencia} />
            )}
          </div>

          <h1 className="text-[28px] font-black leading-[1.1] sm:text-4xl">
            Viu no Instagram? <span className="text-corte">O preço está conferido aqui.</span>
          </h1>

          <p className="text-[15px] leading-relaxed text-slate-300">
            Um robô confere o preço de cada produto todo dia e guarda o valor. Ache o que você viu
            ou entre no canal para receber quando cair.
          </p>
        </header>

        {/* Os dois caminhos da página, do mesmo tamanho: nenhum deles fica no
            rodapé. É o `id` daqui que a barra fixa observa. */}
        <div id={ID_DOS_BOTOES} className="flex flex-col gap-2.5">
          {canal.link ? (
            <a
              href={canal.link}
              target="_blank"
              rel="noopener noreferrer"
              data-onde="entrar-canal"
              className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-5 py-4 text-center text-[17px] font-black text-[#062b16] shadow-lg shadow-black/30 transition-transform active:scale-[0.99]"
            >
              Entrar no canal do WhatsApp
              <span aria-hidden="true">→</span>
            </a>
          ) : (
            <p className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm leading-relaxed text-slate-300">
              <strong className="font-black text-white">O canal abre nas próximas horas.</strong>{' '}
              Até lá, as ofertas estão todas aqui embaixo.
            </p>
          )}
          <a
            href="#destaques"
            className="flex items-center justify-center gap-3 rounded-2xl bg-marca-acao px-5 py-4 text-center text-[17px] font-black text-white shadow-lg shadow-black/30 transition-transform active:scale-[0.99]"
          >
            Ver as ofertas em destaque
            <span aria-hidden="true">↓</span>
          </a>
          <p className="text-center text-xs text-slate-400">
            Canal gratuito · só nós publicamos, ninguém vê seu número
          </p>
        </div>

        <BuscaRapida itens={itensDaBusca} />

        {principal && (
          <section id="destaques" aria-labelledby="titulo-dos-destaques" className="scroll-mt-4 min-w-0">
            <h2
              id="titulo-dos-destaques"
              className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-corte"
            >
              <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-economia opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-economia" />
              </span>
              Em destaque hoje
            </h2>

            {/* A oferta principal: a foto grande que a página não tinha. */}
            <article className="mt-3 min-w-0 overflow-hidden rounded-2xl bg-white text-slate-900 shadow-xl shadow-black/40 ring-2 ring-corte">
              <Link
                href={caminhoDoProduto(principal.produto)}
                className="relative block aspect-[4/3] bg-white"
              >
                {principal.produto.imagem && (
                  <Image
                    src={principal.produto.imagem}
                    alt={principal.produto.nome}
                    fill
                    sizes="(max-width: 512px) 100vw, 512px"
                    className="object-contain p-5"
                    priority
                  />
                )}
                <span
                  className={`absolute left-3 top-3 rounded-lg px-2.5 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow ${
                    principal.medido ? 'bg-economia' : 'bg-desconto'
                  }`}
                >
                  {principal.medido && <span aria-hidden="true">↓ </span>}
                  {principal.motivo}
                </span>
              </Link>
              <div className="flex min-w-0 flex-col gap-1.5 border-t border-slate-100 p-4">
                <h3 className="min-w-0 text-lg font-black leading-tight">
                  <Link href={caminhoDoProduto(principal.produto)}>{principal.produto.nome}</Link>
                </h3>
                <p className="flex flex-wrap items-baseline gap-x-2.5 leading-none">
                  {principal.produto.preco_original > principal.produto.preco_atual && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatarReal(principal.produto.preco_original)}
                    </span>
                  )}
                  <span className="text-[32px] font-black tracking-[-0.5px] text-marca">
                    {formatarReal(principal.produto.preco_atual)}
                  </span>
                </p>
                {principal.prova && (
                  <p className="text-[13px] font-bold text-economia">{principal.prova}</p>
                )}
                <a
                  href={principal.produto.link_afiliado}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  data-oferta={gerarSlug(principal.produto)}
                  data-categoria={principal.produto.categoria}
                  data-preco={principal.produto.preco_atual}
                  data-onde="entrar-principal"
                  className="mt-1.5 block rounded-xl bg-marca-acao px-4 py-3.5 text-center text-[15px] font-extrabold uppercase tracking-wider text-white transition-colors hover:bg-marca"
                >
                  Ver oferta
                </a>
                <Link
                  href={caminhoDoProduto(principal.produto)}
                  className="text-center text-xs font-bold text-slate-500 underline"
                >
                  ver o histórico de preço e a análise
                </Link>
              </div>
            </article>

            {/* Carrossel: rola de lado, um card e meio à vista para deixar
                claro que tem mais. */}
            {carrossel.length > 0 && (
              <ul className="-mx-4 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {carrossel.map(({ produto, motivo, medido }) => (
                  <li
                    key={produto.id}
                    className="flex w-[46%] min-w-0 shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-white text-slate-900 shadow-lg shadow-black/30"
                  >
                    <Link href={caminhoDoProduto(produto)} className="relative block aspect-square bg-white">
                      {produto.imagem && (
                        <Image
                          src={produto.imagem}
                          alt={produto.nome}
                          fill
                          sizes="(max-width: 512px) 46vw, 236px"
                          className="object-contain p-3"
                        />
                      )}
                      <span
                        className={`absolute left-2 top-2 rounded px-1.5 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-sm ${
                          medido ? 'bg-economia' : 'bg-desconto'
                        }`}
                      >
                        {medido && <span aria-hidden="true">↓ </span>}
                        {motivo}
                      </span>
                    </Link>
                    <div className="flex min-w-0 flex-1 flex-col gap-1 border-t border-slate-100 p-2.5">
                      <h3 className="min-h-[2.2rem] min-w-0">
                        <Link
                          href={caminhoDoProduto(produto)}
                          className="line-clamp-2 text-[13px] font-bold leading-tight text-slate-800"
                        >
                          {produto.nome}
                        </Link>
                      </h3>
                      <p className="mt-auto text-lg font-black leading-none tracking-[-0.3px] text-marca">
                        {formatarReal(produto.preco_atual)}
                      </p>
                      <a
                        href={produto.link_afiliado}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        data-oferta={gerarSlug(produto)}
                        data-categoria={produto.categoria}
                        data-preco={produto.preco_atual}
                        data-onde="entrar-carrossel"
                        className="mt-1 block rounded-lg bg-marca-acao px-2 py-2.5 text-center text-xs font-extrabold uppercase tracking-wider text-white"
                      >
                        Ver oferta
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/"
              className="mt-3 flex items-center justify-center gap-2 rounded-2xl border-2 border-white/25 px-5 py-3.5 text-center text-[15px] font-black text-white transition-colors hover:border-corte hover:text-corte"
            >
              Ver todos os {produtos.length} produtos
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        )}

        {/* A prova, em número nosso — no lugar do "+40.000 membros" que não temos. */}
        <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl bg-white/10">
          <div className="bg-noite-meio px-3 py-4 text-center">
            <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Produtos
            </dt>
            <dd className="mt-1 text-2xl font-black">{produtos.length}</dd>
          </div>
          <div className="bg-noite-meio px-3 py-4 text-center">
            <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Dias de histórico
            </dt>
            <dd className="mt-1 text-2xl font-black">{diasDeHistorico}</dd>
          </div>
          <div className="bg-noite-meio px-3 py-4 text-center">
            <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Caíram agora
            </dt>
            <dd className="mt-1 text-2xl font-black text-economia">{ontem.length}</dd>
          </div>
        </dl>

        <section className="flex flex-col gap-3 text-sm leading-relaxed text-slate-300">
          <h2 className="text-base font-black text-white">Por que confiar no preço daqui</h2>
          <p>
            <strong className="text-white">Todo produto tem histórico aberto.</strong> Você clica e
            vê o preço de cada dia desde que começamos a acompanhar, com o menor valor já visto.
          </p>
          <p>
            <strong className="text-white">No canal, só vai o que caiu de verdade.</strong> Em dia
            sem queda você não recebe nada. Isso é de propósito.
          </p>
          <p>
            <strong className="text-white">Sem cronômetro e sem "últimas unidades".</strong> Quem
            decide quando a promoção acaba é a loja; nós não temos esse dado e não vamos fingir que
            temos.
          </p>
          <Link href="/quedas-de-preco" className="font-bold text-corte hover:underline">
            Ver tudo o que caiu de preço →
          </Link>
        </section>

        <footer className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-400">
          <p>Links de afiliado · você paga o mesmo preço.</p>
          <p>
            <Link href="/" className="font-bold text-corte hover:underline">
              Ver o site completo
            </Link>
            {' · '}
            <Link href="/como-conferimos" className="font-bold text-corte hover:underline">
              Como a conferência funciona
            </Link>
          </p>
        </footer>
      </div>

      <BarraDupla alvo={ID_DOS_BOTOES} linkDoCanal={canal.link} />
    </main>
  );
}
