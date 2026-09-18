'use client';

import { useEffect, useRef, useState } from 'react';
import { formatarReal, type Produto } from '@/lib/produtos';
import { gerarSlug } from '@/lib/slug';

/**
 * A barra de oferta que aparece no rodapé do celular quando o botão de compra
 * já saiu da tela.
 *
 * ⚠️ **Por que ela existe, com número:** num estudo de 2026 da Contentsquare
 * com 58 milhões de sessões móveis em 400 lojas, a barra fixa de ação no
 * rodapé rendeu **31% mais conversão** que a mesma página sem ela. A razão é
 * boba e real: no celular a página é comprida, o botão principal some nos
 * primeiros segundos de rolagem, e quem decide comprar no meio do texto teria
 * que rolar de volta para agir. Ninguém rola de volta.
 *
 * ⚠️ **Ela não é um banner de urgência, e isso é de propósito.** Sem
 * cronômetro, sem "últimas unidades", sem cor de alarme: é o mesmo preço e o
 * mesmo botão que já estão na página, só que alcançáveis. A página se chama
 * Verificado — inventar pressa aqui contradiz o nome e é o que a política de
 * spam do Google chama de padrão enganoso.
 *
 * **Só aparece quando o botão principal sai de vista**, via
 * `IntersectionObserver` sobre ele. Assim ela não duplica o que já está na
 * tela, que é o que faz esse tipo de barra irritar.
 *
 * `data-onde="barra-fixa"` é de propósito diferente de `produto` e
 * `comparativo`: é o que vai responder, no painel, se a barra rendeu clique
 * ou só ocupou espaço.
 */
export function BarraDeOferta({ produto, alvoId }: { produto: Produto; alvoId: string }) {
  const [visivel, setVisivel] = useState(false);
  const jaApareceu = useRef(false);

  useEffect(() => {
    const alvo = document.getElementById(alvoId);
    if (!alvo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        // Só liga depois que o botão principal foi visto uma vez: se a pessoa
        // caiu no meio da página por um link com âncora, a barra não pula na
        // cara antes de ela ver o produto.
        if (entrada.isIntersecting) jaApareceu.current = true;
        setVisivel(jaApareceu.current && !entrada.isIntersecting);
      },
      { threshold: 0 },
    );

    observador.observe(alvo);
    return () => observador.disconnect();
  }, [alvoId]);

  if (!produto.disponivel) return null;

  return (
    <div
      hidden={!visivel}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-sm shadow-[0_-4px_16px_rgba(15,23,42,0.08)] lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-bold uppercase tracking-wide text-slate-500">
            {produto.nome}
          </p>
          <p className="flex items-baseline gap-2">
            <span className="text-lg font-black leading-tight text-marca">
              {formatarReal(produto.preco_atual)}
            </span>
            {produto.desconto_percentual > 0 && (
              <span className="text-[11px] font-black text-economia">
                −{produto.desconto_percentual}%
              </span>
            )}
          </p>
        </div>
        <a
          href={produto.link_afiliado}
          target="_blank"
          rel="sponsored noopener noreferrer"
          data-oferta={gerarSlug(produto)}
          data-categoria={produto.categoria}
          data-preco={produto.preco_atual}
          data-onde="barra-fixa"
          className="shrink-0 rounded-xl bg-marca-acao px-5 py-3 text-sm font-extrabold text-white shadow-md shadow-marca/20 transition-colors hover:bg-marca"
        >
          Ver oferta
        </a>
      </div>
    </div>
  );
}
