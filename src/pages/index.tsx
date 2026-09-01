import Head from 'next/head';
import fs from 'fs';
import path from 'path';

type Produto = {
  id: number;
  nome: string;
  categoria: string;
  preço_original: number;
  preço_atual: number;
  desconto_percentual: number;
  avaliação: number;
  link_afiliado: string;
  cupom: string;
  descrição: string;
  plataforma: string;
};

export default function Home({ produtos }: { produtos: Produto[] }) {
  return (
    <>
      <Head>
        <title>Verificado Agora — Afiliados de Tech</title>
        <meta name="description" content="Achadinhos de tecnologia com os melhores descontos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        {/* Header */}
        <header className="bg-slate-950 text-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">✓ Verificado Agora</h1>
            <p className="text-xl text-slate-300">Achadinhos de tech com os melhores descontos</p>
          </div>
        </header>

        {/* Produtos Grid */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.map((produto) => (
              <div key={produto.id} className="bg-slate-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4">
                  <div className="mb-2">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                      -{produto.desconto_percentual}%
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{produto.nome}</h3>
                  <p className="text-sm text-slate-300 mb-3">{produto.descrição}</p>
                  
                  <div className="mb-3">
                    <p className="text-slate-400 line-through">R$ {produto.preço_original.toFixed(2)}</p>
                    <p className="text-3xl font-bold text-green-400">R$ {produto.preço_atual.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400">⭐ {produto.avaliação}</span>
                  </div>

                  {produto.cupom && (
                    <p className="text-sm bg-blue-600 text-white px-2 py-1 rounded mb-3">
                      Cupom: <strong>{produto.cupom}</strong>
                    </p>
                  )}

                  <a
                    href={produto.link_afiliado}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors text-center"
                  >
                    VER NA {produto.plataforma.toUpperCase()}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>© 2026 Verificado Agora. Links de afiliados — ganhamos uma comissão se você comprar.</p>
          </div>
        </footer>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const dataPath = path.join(process.cwd(), 'data', 'produtos.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
  return {
    props: {
      produtos: data.produtos,
    },
    revalidate: 3600, // ISR: revalida a cada 1h
  };
}
