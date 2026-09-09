'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/**
 * Os eventos que a página manda, e o que cada um responde.
 *
 * | evento              | responde                                          |
 * |---------------------|---------------------------------------------------|
 * | `oferta_clicada`    | quantas visitas viram clique, e em quais produtos  |
 * | `comparativo_aberto`| se o comparativo puxa gente ou é enfeite           |
 * | `filtro_usado`      | que categoria as pessoas procuram de verdade       |
 *
 * `oferta_clicada` é o único que liga o site ao dinheiro: é o número pra
 * cruzar com os cliques que o painel de afiliado do Mercado Livre já mostra.
 * Se os dois baterem, o caminho está inteiro; se a página contar mais cliques
 * que o Meli, alguma coisa quebra no meio.
 *
 * `filtro_usado` não é curiosidade: a categoria mais filtrada é a que deveria
 * estar no `data/garimpo.json`. A medição realimenta o robô.
 *
 * ⚠️ **Nada de dado pessoal vai nestes eventos.** Só nome de produto,
 * categoria e preço — coisas que já estão públicas na própria página.
 */
export function MedirCliques() {
  useEffect(() => {
    function aoClicar(evento: MouseEvent) {
      const alvo = evento.target;
      if (!(alvo instanceof Element)) return;

      const oferta = alvo.closest<HTMLElement>('[data-oferta]');
      if (oferta) {
        track('oferta_clicada', {
          produto: oferta.dataset.oferta ?? '',
          categoria: oferta.dataset.categoria ?? '',
          preco: Number(oferta.dataset.preco ?? 0),
          // De qual página saiu o clique: a vitrine, a página do produto ou o
          // comparativo. É o que diz se vale escrever mais comparativo.
          onde: oferta.dataset.onde ?? '',
        });
        return;
      }

      const comparativo = alvo.closest<HTMLElement>('[data-comparativo]');
      if (comparativo) {
        track('comparativo_aberto', { produto: comparativo.dataset.comparativo ?? '' });
      }
    }

    // Fase de captura: o evento é contado mesmo se alguém no caminho parar a
    // propagação, e o clique segue pro link do mesmo jeito.
    document.addEventListener('click', aoClicar, true);
    return () => document.removeEventListener('click', aoClicar, true);
  }, []);

  return null;
}
