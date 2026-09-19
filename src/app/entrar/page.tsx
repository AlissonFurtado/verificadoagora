import type { Metadata } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { lerCatalogo, lerHistorico } from '@/lib/catalogo';
import { formatarReal, produtosVisiveis } from '@/lib/produtos';
import { acharQuedas } from '@/lib/quedas';
import { caminhoDoProduto } from '@/lib/slug';

export const revalidate = 3600;

const TITULO = 'Ofertas com o preço conferido todo dia';
const DESCRICAO =
  'Entre no canal e receba as ofertas que o robô confere todos os dias — com o histórico de ' +
  'preço de cada produto, para você saber se o desconto é real.';

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

/**
 * A página de captação do canal — o destino do "link na bio" e dos reels.
 *
 * ⚠️ **O modelo do mercado promete número, e nós prometemos prova.** As landings
 * de grupo de oferta anunciam "+40.000 membros"; nós não temos isso e não vamos
 * inventar. O que temos e ninguém copia é o preço de cada dia desde
 * 07/09/2026 — então a prova social daqui é **dado**: quantos produtos são
 * conferidos, há quantos dias, e o que caiu hoje. Quem chega vê o serviço
 * funcionando antes de entrar.
 *
 * ⚠️ **Nada de "recompensa por entrar".** A cláusula 1.4 dos termos do programa
 * de afiliados proíbe oferecer benefício a quem cumpre condição — sorteio
 * incluído. É a tática mais comum de encher grupo, e está vedada por contrato.
 */
export default function PaginaDeEntrada() {
  const canal = lerCanal();
  const { produtos: todos } = lerCatalogo();
  const produtos = produtosVisiveis(todos);
  const historico = lerHistorico().produtos;
  const { ontem, semana } = acharQuedas(produtos, historico);
  const quedas = [...ontem, ...semana].slice(0, 3);

  const diasDeHistorico = Math.max(
    0,
    ...produtos.map((p) => (historico[p.meli_id] ?? []).length),
  );

  return (
    <main className="min-h-screen bg-noite text-white">
      <div className="mx-auto flex min-h-screen max-w-lg flex-col gap-7 px-5 py-10">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-5 w-2.5 -translate-y-1 rotate-45 border-b-4 border-r-4 border-economia"
            />
            <span className="text-sm font-black uppercase tracking-widest text-corte">
              Verificado Agora
            </span>
          </div>

          <h1 className="text-3xl font-black leading-[1.1] sm:text-4xl">
            Oferta boa é a que <span className="text-corte">já foi conferida</span> ontem, e
            anteontem
          </h1>

          <p className="text-base leading-relaxed text-slate-300">
            Um robô confere o preço de cada produto todo dia e guarda o valor. Quando o desconto é
            de verdade, você recebe. Quando o preço só subiu para "cair" depois, a gente não manda.
          </p>
        </header>

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
              Dias seguidos
            </dt>
            <dd className="mt-1 text-2xl font-black">{diasDeHistorico}</dd>
          </div>
          <div className="bg-noite-meio px-3 py-4 text-center">
            <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Caíram hoje
            </dt>
            <dd className="mt-1 text-2xl font-black text-economia">{ontem.length}</dd>
          </div>
        </dl>

        {canal.link ? (
          <a
            href={canal.link}
            target="_blank"
            rel="noopener noreferrer"
            data-onde="entrar-canal"
            className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-5 text-center text-lg font-black text-[#062b16] shadow-lg shadow-black/30 transition-transform active:scale-[0.99]"
          >
            Entrar no canal do WhatsApp
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <p className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm leading-relaxed text-slate-300">
            <strong className="font-black text-white">O canal abre nas próximas horas.</strong> Até
            lá, veja o que já caiu de preço — a lista é a mesma que vai para o canal.
          </p>
        )}

        <p className="-mt-3 text-center text-xs text-slate-400">
          Gratuito · só nós publicamos, ninguém vê seu número
        </p>

        {quedas.length > 0 && (
          <section className="rounded-2xl bg-white/[0.06] p-5">
            <h2 className="text-sm font-black uppercase tracking-widest text-corte">
              Exemplo do que você recebe
            </h2>
            <ul className="mt-4 flex flex-col gap-4">
              {quedas.map(({ produto, de, para, porcento }) => (
                <li key={produto.id} className="min-w-0">
                  <Link href={caminhoDoProduto(produto)} className="block min-w-0">
                    <p className="truncate text-[15px] font-bold text-white">{produto.nome}</p>
                    <p className="mt-0.5 flex flex-wrap items-baseline gap-2 text-sm">
                      <span className="text-slate-400 line-through">{formatarReal(de.preco)}</span>
                      <span className="text-lg font-black text-economia">
                        {formatarReal(para.preco)}
                      </span>
                      <span className="text-xs font-black text-economia">−{porcento}%</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/quedas-de-preco"
              className="mt-4 inline-block text-sm font-bold text-corte hover:underline"
            >
              Ver tudo o que caiu →
            </Link>
          </section>
        )}

        <section className="flex flex-col gap-3 text-sm leading-relaxed text-slate-300">
          <h2 className="text-base font-black text-white">Por que este canal é diferente</h2>
          <p>
            <strong className="text-white">Não mandamos tudo o que aparece.</strong> A maioria dos
            dias não tem queda nenhuma — e nesses dias você não recebe nada. Isso é de propósito.
          </p>
          <p>
            <strong className="text-white">Todo produto tem histórico aberto.</strong> Você clica e
            vê o preço de cada dia desde que começamos a acompanhar, com o menor valor já visto.
          </p>
          <p>
            <strong className="text-white">Sem cronômetro e sem "últimas unidades".</strong> Quem
            decide quando a promoção acaba é a loja; nós não temos esse dado e não vamos fingir que
            temos.
          </p>
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
    </main>
  );
}
