/**
 * Quanto tempo faz que o robô conferiu os preços.
 *
 * É o argumento inteiro da página dito em uma frase — e é fato, não promessa:
 * sai de `metadata.conferido_em`, o instante em que a rodada terminou de
 * verdade. Se o robô quebrar, o número cresce sozinho e denuncia. Um relógio
 * que prometesse "próxima às 8h" faria o contrário: continuaria anunciando
 * uma conferência que não aconteceu.
 *
 * Sem `fs` e sem React: roda igual no servidor e no navegador, que é o que
 * permite o texto sair pronto no HTML e depois se atualizar sozinho.
 */

const MINUTO = 60_000;
const HORA = 60 * MINUTO;
const DIA = 24 * HORA;

/**
 * Depois disso a página para de prometer a próxima conferência.
 *
 * A rodada de ontem já devia ter sido substituída pela de hoje; se não foi, o
 * robô está com problema e anunciar "próxima amanhã de manhã" viraria
 * promessa vazia. Melhor calar e deixar o "há N dias" falar.
 */
const LIMITE_PRA_PROMETER = 30 * HORA;

export type Conferencia = {
  /** "há 7 horas", "há 12 minutos", "há 2 dias". */
  faz: string;
  /** "hoje às 11h51", "ontem às 09h04", ou a data quando for mais antigo. */
  quando: string;
  /** "próxima amanhã de manhã", ou null quando não dá pra prometer. */
  proxima: string | null;
  /** Passou do limite: o robô provavelmente não rodou. */
  atrasado: boolean;
};

/** Horário de Brasília, que é onde o Alisson e quem lê a página estão. */
const FUSO = 'America/Sao_Paulo';

function partes(data: Date): { dia: string; hora: string } {
  const f = new Intl.DateTimeFormat('pt-BR', {
    timeZone: FUSO,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(data);
  const p = (t: string) => f.find((x) => x.type === t)?.value ?? '';
  return { dia: `${p('day')}/${p('month')}/${p('year')}`, hora: `${p('hour')}h${p('minute')}` };
}

function contar(ms: number): string {
  if (ms < MINUTO) return 'agora mesmo';
  if (ms < HORA) {
    const m = Math.floor(ms / MINUTO);
    return `há ${m} ${m === 1 ? 'minuto' : 'minutos'}`;
  }
  if (ms < DIA) {
    const h = Math.floor(ms / HORA);
    return `há ${h} ${h === 1 ? 'hora' : 'horas'}`;
  }
  const d = Math.floor(ms / DIA);
  return `há ${d} ${d === 1 ? 'dia' : 'dias'}`;
}

/**
 * Monta o texto do relógio. `agora` entra por parâmetro pra função continuar
 * pura — quem chama é que decide se o relógio é o do servidor ou o do
 * navegador.
 */
export function descreverConferencia(conferidoEm: string, agora: Date): Conferencia | null {
  const quando = new Date(conferidoEm);
  if (!conferidoEm || Number.isNaN(quando.getTime())) return null;

  // Relógio do visitante adiantado deixaria o texto negativo; trata como zero.
  const ms = Math.max(0, agora.getTime() - quando.getTime());
  const atrasado = ms > LIMITE_PRA_PROMETER;

  const dela = partes(quando);
  const hoje = partes(agora).dia;
  const ontem = partes(new Date(agora.getTime() - DIA)).dia;

  const rotuloDoDia =
    dela.dia === hoje ? 'hoje' : dela.dia === ontem ? 'ontem' : `em ${dela.dia}`;

  // Só promete a próxima quando a última foi hoje — aí "amanhã de manhã" é
  // sempre verdade. Se a última foi ontem, o robô ainda não rodou hoje e
  // qualquer previsão dependeria da hora em que a pessoa abriu a página: às
  // 9h "ainda hoje" seria certo, às 23h seria mentira. Melhor não prometer.
  return {
    faz: contar(ms),
    quando: `${rotuloDoDia} às ${dela.hora}`,
    proxima: rotuloDoDia === 'hoje' ? 'próxima amanhã de manhã' : null,
    atrasado,
  };
}
