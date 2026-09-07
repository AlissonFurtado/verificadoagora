import { lerCatalogo } from '@/lib/catalogo';
import { formatarData } from '@/lib/produtos';
import { CardProduto } from './card-produto';
import { Vitrine } from './vitrine';

export const revalidate = 3600; // o preço envelhece: revalida de hora em hora

export default function Home() {
  const { produtos, metadata } = lerCatalogo();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="bg-slate-950 py-8">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="mb-2 text-4xl font-bold">
            <span aria-hidden="true">✓</span> Verificado Agora
          </h1>
          <p className="mb-3 text-xl text-slate-300">
            Achadinhos de tech com os melhores descontos
          </p>
          <p className="max-w-2xl text-sm text-slate-400">
            Os links aqui são de afiliado: se você comprar por eles, ganhamos uma comissão do
            Mercado Livre. Você paga o mesmo preço.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="mb-6 text-sm text-slate-400">
          Preços conferidos em {formatarData(metadata.ultima_atualizacao)}. Loja muda preço a
          qualquer hora — vale conferir antes de comprar.
        </p>

        <Vitrine
          produtos={produtos}
          cards={produtos.map((produto) => (
            <CardProduto key={produto.id} produto={produto} />
          ))}
        />
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
