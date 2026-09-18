import Link from 'next/link';
import { lerCatalogo, lerDecisoes, lerGuias } from '@/lib/catalogo';
import type { Produto } from '@/lib/produtos';

/**
 * Os guias que cabem para um produto, no fim da página dele.
 *
 * Existe por dois motivos. O primeiro é de índice: até 10/09/2026 os guias só
 * eram alcançados pela home, e página que nada aponta o Google demora a achar
 * — enquanto as fichas, que ele já rastreia todo dia, não levavam a lugar
 * nenhum. Em 16/09 isso se provou: seis fichas de celular saíram do limbo
 * depois de ganharem guia apontando para elas. O segundo motivo é de leitura:
 * quem cai numa ficha pela busca muitas vezes ainda está decidindo a
 * **especificação**, não o aparelho.
 *
 * ⚠️ **A relevância é derivada, nunca uma lista de slug no código.** Até
 * 17/09/2026 a regra era um `if` de categoria única (`Celulares`), e por isso
 * as fichas de Informática, Casa e Eletrônicos — que chegaram junto com o
 * catálogo novo — não recebiam link nenhum. Agora **a categoria de um guia sai
 * dos produtos que ele cita**: um guia que fala do monitor S3 é guia de
 * Informática sem ninguém escrever isso em lugar algum. Guia novo entra
 * sozinho na ficha certa.
 */

/** As categorias que um guia cobre, lidas dos produtos do catálogo que cita. */
function categoriasCitadas(meliIds: string[], porMeliId: Map<string, Produto>): Set<string> {
  const categorias = new Set<string>();
  for (const id of meliIds) {
    const produto = porMeliId.get(id);
    if (produto) categorias.add(produto.categoria);
  }
  return categorias;
}

export function GuiasRelacionados({ produto }: { produto: Produto }) {
  const porMeliId = new Map(lerCatalogo().produtos.map((p) => [p.meli_id, p] as const));

  const daFaixa = lerGuias()
    .filter((g) =>
      categoriasCitadas(
        g.perfis.map((p) => p.meli_id),
        porMeliId,
      ).has(produto.categoria),
    )
    .map((g) => ({
      href: `/guia/${g.slug}`,
      titulo: g.titulo,
      chamada: 'Qual comprar, por perfil de uso',
    }));

  const decisoes = lerDecisoes()
    .filter((d) =>
      categoriasCitadas(
        d.exemplos.map((e) => e.meli_id),
        porMeliId,
      ).has(produto.categoria),
    )
    .map((d) => ({
      href: `/guia/${d.slug}`,
      // Guia de faixa corta no dois-pontos e fica limpo; guia de decisão não,
      // porque "Tela de celular: AMOLED ou LCD?" viraria "Tela de celular".
      titulo: d.slug.startsWith('vale-esperar-black-friday') ? d.titulo : d.titulo.split(':')[0],
      chamada: d.slug.startsWith('vale-esperar-black-friday')
        ? 'A resposta muda conforme o que você quer comprar'
        : 'Antes de escolher o aparelho, decida a configuração',
    }));

  const links = [...daFaixa, ...decisoes];
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
