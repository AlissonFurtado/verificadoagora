import { lerCatalogo, lerComparativos, lerHistorico } from '@/lib/catalogo';
import { formatarData, ordenarPorRecencia, produtosVisiveis } from '@/lib/produtos';
import { seloDeMenorPreco } from '@/lib/historico';
import { acharComparativo, quantosRivais } from '@/lib/comparativos';
import { caminhoDoComparativo } from '@/lib/slug';
import { CardProduto } from './card-produto';
import { Vitrine } from './vitrine';

export const revalidate = 3600; // o preço envelhece: revalida de hora em hora

/** Os três motivos pra confiar na página, ditos sem enrolação. */
const GARANTIAS = [
  ['Preço conferido todo dia', 'Um robô confere na API do Mercado Livre às 8h da manhã.'],
  ['Histórico de verdade', 'Guardamos o preço de cada dia — por isso sabemos quando é o menor.'],
  ['Link de afiliado declarado', 'Ganhamos comissão se você comprar. Você paga o mesmo preço.'],
] as const;

export default function Home() {
  const { produtos: todos, metadata } = lerCatalogo();
  const produtos = ordenarPorRecencia(produtosVisiveis(todos));
  const historico = lerHistorico();
  const comparativos = lerComparativos();

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200/80 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700 ring-1 ring-inset ring-emerald-600/10">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Conferido em {formatarData(metadata.ultima_atualizacao)}
          </p>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
            Verificado Agora
          </h1>
          <p className="mt-3 max-w-xl text-lg font-medium text-slate-600">
            Achadinhos de tecnologia com desconto de verdade — e o preço conferido no dia,
            não no mês passado.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {GARANTIAS.map(([titulo, texto]) => (
              <div key={titulo} className="min-w-0 rounded-2xl bg-slate-50/50 p-5 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-slate-300/80 transition duration-300">
                <dt className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="text-emerald-600 font-extrabold text-base">✓</span>
                  {titulo}
                </dt>
                <dd className="mt-1.5 text-xs leading-relaxed text-slate-500">{texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {produtos.length} {produtos.length === 1 ? 'achado' : 'achados'} desta semana
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            A loja muda preço a qualquer hora — vale conferir antes de comprar.
          </p>
        </div>

        <Vitrine
          produtos={produtos}
          cards={produtos.map((produto) => {
            const comparativo = acharComparativo(comparativos, produto.meli_id);
            return (
              <CardProduto
                key={produto.id}
                produto={produto}
                selo={seloDeMenorPreco(historico.produtos[produto.meli_id], produto.preco_atual)}
                comparativo={
                  comparativo
                    ? {
                        caminho: caminhoDoComparativo(produto),
                        rivais: quantosRivais(comparativo),
                      }
                    : null
                }
              />
            );
          })}
        />
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-12 text-center text-sm text-slate-500">
          <p className="mx-auto max-w-2xl leading-relaxed">
            Todos os links desta página são de afiliado: se você comprar por eles, ganhamos uma
            comissão do Mercado Livre. O preço que você paga é exatamente o mesmo.
          </p>
          <p className="text-xs text-slate-400">
            © 2026 Verificado Agora — A F DE SOUSA ·{' '}
            <a className="underline hover:text-slate-600 font-medium transition-colors" href="mailto:contato@afdesousa.com.br">
              contato@afdesousa.com.br
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
