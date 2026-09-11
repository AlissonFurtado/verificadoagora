import Link from 'next/link';
import { lerDecisoes, lerGuias } from '@/lib/catalogo';
import type { Produto } from '@/lib/produtos';

/**
 * Os guias que cabem para um produto, no fim da página dele.
 *
 * Existe por dois motivos. O primeiro é de índice: até 10/09/2026 os guias só
 * eram alcançados pela home, e página que nada aponta o Google demora a achar
 * — enquanto as fichas, que ele já rastreia todo dia, não levavam a lugar
 * nenhum. O segundo é de leitura: quem cai numa ficha pela busca muitas vezes
 * ainda está decidindo a **especificação**, não o aparelho.
 *
 * ⚠️ **A relevância é por categoria, não por slug escrito no código.** Guia
 * novo de celular aparece sozinho em toda ficha de celular; guia de outro
 * assunto, quando existir, entra pela mesma regra. Slug no meio do componente
 * seria uma lista para alguém esquecer de atualizar.
 */
export function GuiasRelacionados({ produto }: { produto: Produto }) {
  // O catálogo fora do foco (casa, games, foto, áudio) continua no ar, mas
  // nenhum guia fala dele: melhor nenhum link que um link fora de assunto.
  if (produto.categoria !== 'Celulares') return null;

  const links = [
    ...lerGuias().map((g) => ({
      href: `/guia/${g.slug}`,
      titulo: g.titulo,
      chamada: 'Qual comprar, por perfil de uso',
    })),
    ...lerDecisoes().map((d) => ({
      href: `/guia/${d.slug}`,
      titulo: d.titulo.split(':')[0],
      chamada: 'Antes de escolher o aparelho, decida a configuração',
    })),
  ];

  if (links.length === 0) return null;

  return (
    <section className="mt-10 min-w-0 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-900 sm:text-xl">Ainda está decidindo?</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href} className="min-w-0">
            <Link
              href={link.href}
              data-onde="guia-relacionado"
              className="block min-w-0 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-inset ring-slate-100 transition-colors hover:bg-marca/[0.06] hover:ring-marca/20"
            >
              <span className="block text-[15px] font-bold leading-snug text-slate-800">
                {link.titulo} <span aria-hidden="true">→</span>
              </span>
              <span className="mt-0.5 block text-xs font-semibold text-slate-500">
                {link.chamada}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
