import type { PontoDoHistorico } from './historico';
import type { Produto } from './produtos';

/**
 * As quedas de preço, lidas do histórico que o robô grava todo dia.
 *
 * ⚠️ **Esta é a única página do site que não depende do Google para funcionar.**
 * Guia e comparativo trazem quem está procurando; isto aqui é o motivo de
 * alguém **voltar amanhã** — e visitante que retorna converte muito mais que o
 * de primeira visita. O material já existia desde 07/09/2026, um preço por dia
 * por produto: só não estava dito em lugar nenhum além do gráfico de cada
 * ficha.
 *
 * ⚠️ **Nada aqui é estimado.** Toda queda tem as duas pontas com data, saídas
 * do arquivo. Se o robô falhar um dia, a comparação passa a ser com o último
 * dia que existe — e a página mostra essa data, em vez de fingir que foi ontem.
 */

export type Queda = {
  produto: Produto;
  /** O preço de onde caiu, com o dia em que foi visto. */
  de: PontoDoHistorico;
  /** O preço de hoje, com o dia da última conferência. */
  para: PontoDoHistorico;
  /** Quanto caiu, em reais. */
  reais: number;
  /** Quanto caiu, em % inteiro e positivo. */
  porcento: number;
  /** Hoje é o menor valor de todo o histórico deste produto? */
  noMenor: boolean;
};

const DIA = 86_400_000;

function diasAtras(dias: number): string {
  return new Date(Date.now() - dias * DIA).toISOString().slice(0, 10);
}

/** Queda de um produto entre o ponto mais antigo da janela e o último. */
function quedaNaJanela(
  produto: Produto,
  pontos: PontoDoHistorico[] | undefined,
  dias: number,
): Queda | null {
  if (!pontos || pontos.length < 2) return null;

  const corte = diasAtras(dias);
  const janela = pontos.filter((p) => p.dia >= corte);
  if (janela.length < 2) return null;

  const de = janela[0];
  const para = janela[janela.length - 1];
  if (para.preco >= de.preco) return null;

  const menorDeTodos = pontos.reduce((a, b) => (b.preco < a.preco ? b : a));

  return {
    produto,
    de,
    para,
    reais: de.preco - para.preco,
    porcento: Math.round(((de.preco - para.preco) / de.preco) * 100),
    noMenor: para.preco <= menorDeTodos.preco,
  };
}

/**
 * Quem caiu de preço, em duas janelas.
 *
 * `ontem` compara os dois últimos pontos existentes — normalmente hoje e
 * ontem. `semana` compara com o começo dos últimos sete dias, e exclui quem já
 * apareceu em `ontem` para a mesma queda não ser contada duas vezes na tela.
 */
export function acharQuedas(
  produtos: Produto[],
  historico: Record<string, PontoDoHistorico[]>,
): { ontem: Queda[]; semana: Queda[] } {
  const ontem: Queda[] = [];
  const semana: Queda[] = [];

  for (const produto of produtos) {
    const pontos = historico[produto.meli_id];
    if (!pontos || pontos.length < 2) continue;

    const doisUltimos = pontos.slice(-2);
    const daVespera =
      doisUltimos[1].preco < doisUltimos[0].preco
        ? quedaNaJanela(produto, doisUltimos, 3650)
        : null;

    if (daVespera) {
      ontem.push(daVespera);
      continue;
    }

    const daSemana = quedaNaJanela(produto, pontos, 7);
    if (daSemana) semana.push(daSemana);
  }

  const maiorPrimeiro = (a: Queda, b: Queda) => b.porcento - a.porcento;
  return { ontem: ontem.sort(maiorPrimeiro), semana: semana.sort(maiorPrimeiro) };
}

/** Quem está hoje no menor preço de todo o histórico, tendo caído ou não. */
export function noMenorPrecoDeSempre(
  produtos: Produto[],
  historico: Record<string, PontoDoHistorico[]>,
): Produto[] {
  return produtos.filter((produto) => {
    const pontos = historico[produto.meli_id];
    if (!pontos || pontos.length < 2) return false;
    const menor = pontos.reduce((a, b) => (b.preco < a.preco ? b : a));
    return produto.preco_atual <= menor.preco;
  });
}
