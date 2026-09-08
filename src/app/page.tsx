import { lerCatalogo, lerHistorico } from '@/lib/catalogo';
import { formatarData, produtosVisiveis } from '@/lib/produtos';
import { seloDeMenorPreco } from '@/lib/historico';
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
  const produtos = produtosVisiveis(todos);
  const historico = lerHistorico();

  return (
    <main className="min-h-screen bg-slate-950">
      <header className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
            <span aria-hidden="true">✓</span> Conferido em {formatarData(metadata.ultima_atualizacao)}
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Verificado Agora
          </h1>
          <p className="mt-3 max-w-xl text-lg text-slate-300">
            Achadinhos de tecnologia com desconto de verdade — e o preço conferido no dia,
            não no mês passado.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {GARANTIAS.map(([titulo, texto]) => (
              <div key={titulo} className="min-w-0 rounded-xl bg-white/5 p-4 ring-1 ring-inset ring-white/10">
                <dt className="text-sm font-bold text-white">{titulo}</dt>
                <dd className="mt-1 text-sm leading-snug text-slate-400">{texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold text-white">
            {produtos.length} {produtos.length === 1 ? 'achado' : 'achados'} desta semana
          </h2>
          <p className="text-sm text-slate-400">
            A loja muda preço a qualquer hora — vale conferir antes de comprar.
          </p>
        </div>

        <Vitrine
          produtos={produtos}
          cards={produtos.map((produto) => (
            <CardProduto
              key={produto.id}
              produto={produto}
              selo={seloDeMenorPreco(historico.produtos[produto.meli_id], produto.preco_atual)}
            />
          ))}
        />
      </section>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-10 text-center text-sm text-slate-400">
          <p className="mx-auto max-w-2xl">
            Todos os links desta página são de afiliado: se você comprar por eles, ganhamos uma
            comissão do Mercado Livre. O preço que você paga é exatamente o mesmo.
          </p>
          <p className="text-slate-500">
            © 2026 Verificado Agora — A F DE SOUSA ·{' '}
            <a className="underline hover:text-slate-300" href="mailto:contato@afdesousa.com.br">
              contato@afdesousa.com.br
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
