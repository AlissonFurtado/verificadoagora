import { lerCatalogo, formatarReal, type Produto } from '@/lib/produtos';

export const revalidate = 3600; // o preço envelhece: revalida de hora em hora

const NOME_PLATAFORMA: Record<string, string> = {
  'mercado-livre': 'Mercado Livre',
  shopee: 'Shopee',
  amazon: 'Amazon',
};

function CardProduto({ produto }: { produto: Produto }) {
  const plataforma = NOME_PLATAFORMA[produto.plataforma] ?? produto.plataforma;

  return (
    <article className="flex min-w-0 flex-col rounded-lg bg-slate-800 p-4 transition-shadow hover:shadow-lg">
      <div className="mb-2 flex min-w-0 items-center gap-2">
        <span className="rounded bg-red-600 px-2 py-1 text-sm font-bold text-white">
          {produto.desconto_percentual}% off
        </span>
        <span className="min-w-0 truncate text-xs text-slate-400">{produto.categoria}</span>
      </div>

      <h2 className="mb-2 min-w-0 text-lg font-semibold">{produto.nome}</h2>
      <p className="mb-3 min-w-0 text-sm text-slate-300">{produto.descricao}</p>

      <div className="mb-3 mt-auto">
        <p className="text-slate-400 line-through">{formatarReal(produto.preco_original)}</p>
        <p className="text-3xl font-bold text-green-400">{formatarReal(produto.preco_atual)}</p>
      </div>

      <p className="mb-3 text-sm text-slate-300">
        <span aria-hidden="true">⭐</span> Nota {produto.avaliacao} de 5
      </p>

      {produto.cupom && (
        <p className="mb-3 min-w-0 break-words rounded bg-blue-600 px-2 py-1 text-sm">
          Cupom: <strong>{produto.cupom}</strong>
        </p>
      )}

      <a
        href={produto.link_afiliado}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="block rounded bg-green-600 px-4 py-2 text-center font-bold text-white transition-colors hover:bg-green-700"
      >
        Ver no {plataforma}
      </a>
    </article>
  );
}

export default function Home() {
  const { produtos, metadata } = lerCatalogo();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="bg-slate-950 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="mb-2 text-4xl font-bold">
            <span aria-hidden="true">✓</span> Verificado Agora
          </h1>
          <p className="text-xl text-slate-300">Achadinhos de tech com os melhores descontos</p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="mb-6 text-sm text-slate-400">
          Preços conferidos em {metadata.ultima_atualizacao.split('-').reverse().join('/')}. Podem
          mudar a qualquer momento no site da loja.
        </p>

        <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        </div>
      </section>

      <footer className="mt-12 bg-slate-950 py-6 text-slate-400">
        <div className="mx-auto max-w-6xl space-y-2 px-4 text-center text-sm">
          <p>
            Todos os links desta página são de afiliado: se você comprar por eles, ganhamos uma
            comissão. O preço que você paga é o mesmo.
          </p>
          <p>© 2026 Verificado Agora — A F DE SOUSA · contato@afdesousa.com.br</p>
        </div>
      </footer>
    </main>
  );
}
