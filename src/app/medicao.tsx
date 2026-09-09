'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

/**
 * Os eventos que a página manda, e o que cada um responde.
 *
 * | evento              | responde                                          |
 * |---------------------|---------------------------------------------------|
 * | `clique_oferta`     | quantas visitas viram clique, e em quais produtos  |
 * | `abre_comparativo`  | se o comparativo puxa gente ou é enfeite           |
 * | `filtro_categoria`  | que categoria as pessoas procuram de verdade       |
 *
 * `clique_oferta` é o único que liga o site ao dinheiro: é o número pra
 * cruzar com os cliques que o painel de afiliado do Mercado Livre já mostra.
 * Se os dois baterem, o caminho está inteiro; se a página contar mais cliques
 * que o Meli, alguma coisa quebra no meio.
 *
 * `filtro_categoria` não é curiosidade: a categoria mais filtrada é a que deveria
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
        // ⚠️ Duas propriedades, no máximo. É o teto do plano Pro da Vercel
        // (documentação de 25/08/2026), e mandar mais é pedir pra perder o
        // evento inteiro. Categoria e preço saíram porque dá pra descobrir os
        // dois no catálogo a partir do nome — `onde` não dá.
        track('clique_oferta', {
          produto: oferta.dataset.oferta ?? '',
          // De qual página saiu o clique: a vitrine, a página do produto ou o
          // comparativo. É o que diz se vale escrever mais comparativo.
          onde: oferta.dataset.onde ?? '',
        });
        return;
      }

      const comparativo = alvo.closest<HTMLElement>('[data-comparativo]');
      if (comparativo) {
        track('abre_comparativo', { comparativo: comparativo.dataset.comparativo ?? '' });
      }
    }

    // Fase de captura: o evento é contado mesmo se alguém no caminho parar a
    // propagação, e o clique segue pro link do mesmo jeito.
    document.addEventListener('click', aoClicar, true);
    return () => document.removeEventListener('click', aoClicar, true);
  }, []);

  return null;
}
