import { formatarData, formatarReal } from '@/lib/produtos';
import type { ResumoDoHistorico } from '@/lib/historico';

/**
 * O histórico em três números, logo abaixo do preço.
 *
 * ⚠️ **Isto não é enfeite: é a prova que sustenta o nome do site.** Qualquer
 * página lista oferta; só quem confere todo dia sabe dizer que o valor de hoje
 * é o menor de 12 dias — ou que está 8% acima do que já esteve. Fica na
 * primeira tela porque é o que responde à desconfiança de quem chega ("esse
 * desconto é real?") e porque **texto visível é o que assistente de IA cita**;
 * o gráfico, abaixo, é a mesma verdade em forma de imagem.
 *
 * Não inventa urgência: quando o preço está acima do menor observado, diz isso
 * com todas as letras, mesmo que atrapalhe a venda. É o oposto do "últimas
 * unidades" — e é o que faz o selo verde valer alguma coisa quando aparece.
 */
export function HistoricoEmNumeros({ resumo }: { resumo: ResumoDoHistorico }) {
  return (
    <section
      aria-label="Histórico de preço conferido"
      className="mt-5 min-w-0 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5"
    >
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
        <div className="min-w-0">
          <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Conferindo há
          </dt>
          <dd className="mt-0.5 text-base font-black text-slate-900">
            {resumo.dias} {resumo.dias === 1 ? 'dia' : 'dias'}
          </dd>
        </div>

        <div className="min-w-0">
          <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Menor que já vimos
          </dt>
          <dd className="mt-0.5 text-base font-black text-economia">
            {formatarReal(resumo.menor.preco)}
            <span className="block text-[11px] font-semibold text-slate-400">
              em {formatarData(resumo.menor.dia)}
            </span>
          </dd>
        </div>

        <div className="col-span-2 min-w-0 sm:col-span-1">
          <dt className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Hoje
          </dt>
          <dd className="mt-0.5 text-base font-black">
            {resumo.noMenor ? (
              <span className="text-economia">✓ é o menor preço</span>
            ) : resumo.acimaDoMenor >= 1 ? (
              <span className="text-slate-700">
                {resumo.acimaDoMenor}% acima do menor
              </span>
            ) : (
              <span className="text-slate-700">quase no menor</span>
            )}
          </dd>
        </div>
      </dl>
    </section>
  );
}
