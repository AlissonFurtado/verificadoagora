/**
 * Confere se o site descreve o mesmo aparelho com os mesmos números em todas
 * as páginas.
 *
 *   npm run fichas   (roda junto no `npm run verificar`)
 *
 * Nasceu de um erro real, em 10/09/2026: o Moto G17 aparecia como coluna em
 * dois comparativos, com **20 W** num e **18 W** no outro, e com 1.050 nits
 * contra 1.000. Os dois números tinham fonte; um estava certo e o outro veio de
 * site de ficha técnica. Uma página de "preço conferido" que se contradiz sobre
 * a ficha perde a única coisa que ela vende.
 *
 * ⚠️ **Compara número, não redação.** "IP64 (respingos)" e "IP64 — respingos"
 * dizem a mesma coisa e passam; "20 W" e "18 W" não. Exigir texto idêntico
 * encheria a saída de ruído e ninguém olharia mais.
 *
 * ⚠️ **E só compara número com unidade.** Detalhe a mais numa página não é
 * contradição: uma diz "50 MP, f/1.8 (Sony LYTIA 600)" e a outra "50 MP Sony
 * LYTIA 600, sem estabilização" — o `600` do nome do sensor e o `1.8` da
 * abertura não são grandeza comparável. Contradição é a mesma unidade com
 * valor diferente: 20 W contra 18 W.
 */
import fs from 'fs';
import path from 'path';

type Coluna = { chave: string; nome: string; meli_id: string };
type Linha = { campo: string; valores: Record<string, string> };
type Comparativo = { meli_id: string; titulo: string; colunas: Coluna[]; linhas: Linha[] };

/**
 * O guia repete a ficha dos mesmos aparelhos em outra página — que é
 * exatamente a situação que criou este script. Um perfil do guia é uma coluna
 * a mais para conferir, com o nome do aparelho como identidade.
 */
type PerfilDoGuia = {
  aparelho: string;
  meli_id: string;
  ficha: Record<string, string>;
};
type Guia = { slug: string; perfis: PerfilDoGuia[] };

/** Cada grandeza do texto: "5.200 mAh · 20 W" → { mah: "5200", w: "20" }. */
function grandezasDe(texto: string): Map<string, string> {
  const achados = texto.matchAll(/(\d+(?:[.,]\d+)*)\s*([a-zA-Záéíóúâêôãõç]+)/g);
  const saida = new Map<string, string>();

  for (const [, numero, unidade] of achados) {
    // "6,7" e "6.7" são o mesmo número escrito em duas línguas.
    const limpo = numero.replace(/\./g, '').replace(',', '.');
    const chave = unidade.toLowerCase();
    // Só a primeira ocorrência de cada unidade: "4 GB · 128 GB" não é conflito
    // consigo mesmo.
    if (!saida.has(chave)) saida.set(chave, limpo);
  }

  return saida;
}

/** Mesma unidade com valor diferente. É isso, e só isso, que é contradição. */
function conflito(a: string, b: string): string | undefined {
  const ga = grandezasDe(a);
  const gb = grandezasDe(b);

  for (const [unidade, valor] of ga) {
    const outro = gb.get(unidade);
    if (outro !== undefined && outro !== valor) return unidade;
  }

  return undefined;
}

function main(): void {
  const caminho = path.join(process.cwd(), 'data', 'comparativos.json');
  const { comparativos } = JSON.parse(fs.readFileSync(caminho, 'utf-8')) as {
    comparativos: Comparativo[];
  };

  const caminhoGuias = path.join(process.cwd(), 'data', 'guias.json');
  const guias: Guia[] = fs.existsSync(caminhoGuias)
    ? (JSON.parse(fs.readFileSync(caminhoGuias, 'utf-8')) as { guias: Guia[] }).guias
    : [];

  // Cada aparelho identificável, e o que cada comparativo diz sobre ele.
  // Rival de fora não tem `meli_id`, então é agrupado pelo nome da coluna.
  type Dito = { onde: string; texto: string };
  const ditos = new Map<string, Map<string, Dito[]>>();

  for (const comparativo of comparativos) {
    for (const coluna of comparativo.colunas) {
      const aparelho = coluna.meli_id || coluna.nome;
      const porCampo = ditos.get(aparelho) ?? new Map<string, Dito[]>();

      for (const linha of comparativo.linhas) {
        const texto = linha.valores[coluna.chave];
        if (!texto) continue;
        const lista = porCampo.get(linha.campo) ?? [];
        lista.push({ onde: comparativo.meli_id, texto });
        porCampo.set(linha.campo, lista);
      }

      ditos.set(aparelho, porCampo);
    }
  }

  for (const guia of guias) {
    for (const perfil of guia.perfis) {
      const aparelho = perfil.meli_id || perfil.aparelho;
      const porCampo = ditos.get(aparelho) ?? new Map<string, Dito[]>();

      for (const [campo, texto] of Object.entries(perfil.ficha)) {
        const lista = porCampo.get(campo) ?? [];
        lista.push({ onde: `guia/${guia.slug}`, texto });
        porCampo.set(campo, lista);
      }

      ditos.set(aparelho, porCampo);
    }
  }

  const problemas: string[] = [];

  for (const [aparelho, porCampo] of ditos) {
    for (const [campo, lista] of porCampo) {
      if (lista.length < 2) continue;

      const unidade = lista
        .slice(1)
        .map((d) => conflito(lista[0].texto, d.texto))
        .find(Boolean);
      if (!unidade) continue;

      problemas.push(
        `${aparelho} — ${campo} (diverge em "${unidade}")\n` +
          lista.map((d) => `    ${d.onde}: ${d.texto}`).join('\n'),
      );
    }
  }

  if (problemas.length === 0) {
    console.log(`Fichas conferidas: ${ditos.size} aparelho(s), nenhuma divergência de número.`);
    return;
  }

  console.error('Números que divergem entre páginas:\n');
  console.error(problemas.join('\n\n'));
  console.error('\nDecida qual está certo na fonte do fabricante e alinhe os dois.');
  process.exit(1);
}

main();
