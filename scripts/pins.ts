/**
 * Gera o texto dos pins do Pinterest a partir do catálogo.
 *
 *   npm run pins
 *
 * Escreve `data/pins.json` e imprime pronto pra colar. **Não publica nada** —
 * o Pinterest não tem API de publicação aberta pra conta nova, e post que sai
 * sozinho em nome do Alisson é a mesma regra do Instagram.
 *
 * ⚠️ **Pin não leva preço.** Pin vive meses e o robô muda o preço toda manhã:
 * um pin dizendo "R$ 887" vira mentira em duas semanas, e ninguém edita 15
 * pins por dia. É a mesma razão pela qual o comparativo não escreve preço no
 * arquivo. O que o pin promete é o que não envelhece — que o preço é conferido
 * todo dia.
 *
 * ⚠️ **O destino é sempre uma página deste site, nunca o link do Meli.** Além
 * de `meli.la` ser sinalizado como spam em rede social, o Pinterest exige que
 * o domínio de destino seja o reivindicado pra creditar o pin ao perfil.
 */
import fs from 'fs';
import path from 'path';
import { produtosVisiveis, type Catalogo, type Produto } from '../src/lib/produtos';
import { caminhoDoProduto } from '../src/lib/slug';

const SITE = 'https://www.verificadoagora.com.br';

/** Limites do Pinterest. Passar disso corta no meio da frase. */
const MAX_TITULO = 100;
const MAX_DESCRICAO = 500;

type Pin = {
  meli_id: string;
  pasta: string;
  titulo: string;
  descricao: string;
  destino: string;
  imagem: string;
};

/**
 * A pasta é por faixa de preço, porque quem busca no Pinterest busca por
 * orçamento ("celular até 1500"), não por taxonomia de loja. E faixa é
 * estável: o produto muda de preço, mas raramente pula de faixa.
 *
 * ⚠️ **Mas a faixa só vira "Celulares até R$ X" se for celular.** A primeira
 * versão olhava só o preço e pôs uma Smart TV de R$ 998 na pasta "Celulares
 * até R$ 1.500" — pasta que mente sobre o conteúdo é o que faz o Pinterest
 * parar de distribuir o perfil.
 */
function pastaDe(produto: Produto): string {
  const p = produto.preco_atual;
  const ehCelular = produto.categoria === 'Celulares';

  if (ehCelular) {
    if (p < 800) return 'Celulares até R$ 800';
    if (p < 1500) return 'Celulares até R$ 1.500';
    if (p <= 2500) return 'Celulares de R$ 1.500 a R$ 2.500';
    return 'Celulares acima de R$ 2.500';
  }

  if (p < 300) return 'Achados de tecnologia até R$ 300';
  if (p < 800) return 'Achados de tecnologia de R$ 300 a R$ 800';
  return 'Achados de tecnologia acima de R$ 800';
}

function cortar(texto: string, limite: number): string {
  if (texto.length <= limite) return texto;
  const corte = texto.slice(0, limite - 1);
  return `${corte.slice(0, corte.lastIndexOf(' '))}…`;
}

/**
 * O título usa "vale a pena?" de propósito: é a consulta que já trouxe
 * impressão neste domínio ("samsung galaxy a16 vale a pena"), medida no Search
 * Console em 10/09/2026. Não é chute de copy.
 */
function tituloDe(produto: Produto): string {
  return cortar(`${produto.nome} vale a pena?`, MAX_TITULO);
}

const PROMESSA =
  'Conferimos o preço todo dia e mostramos o histórico: dá pra ver se caiu de verdade ou se só o anúncio mudou.';

/** Exigência do programa de afiliados. Sai em toda descrição, sempre inteira. */
const DECLARACAO = 'Link de afiliado — você paga o mesmo preço.';

/**
 * ⚠️ **O que é cortado é a análise, nunca o rodapé.** Cortar a descrição
 * inteira no limite de 500 comia a declaração de afiliado do produto de
 * análise mais longa — justamente a linha que o programa exige. O fim é
 * reservado antes; a análise ocupa o que sobrar.
 */
function descricaoDe(produto: Produto): string {
  // O primeiro parágrafo da análise é curadoria escrita à mão — é o que o
  // Pinterest indexa e o que diferencia o pin de um anúncio repetido.
  const analise = Array.isArray(produto.analise) ? produto.analise[0] : produto.analise;
  const abertura = (analise ?? produto.descricao ?? '').trim();

  const rodape = `${PROMESSA}\n\n${DECLARACAO}`;
  const espaco = MAX_DESCRICAO - rodape.length - 2;

  return [cortar(abertura, espaco), rodape].filter(Boolean).join('\n\n');
}

function main(): void {
  const raiz = process.cwd();
  const catalogo = JSON.parse(
    fs.readFileSync(path.join(raiz, 'data', 'produtos.json'), 'utf-8'),
  ) as Catalogo;

  const semImagem: string[] = [];
  const pins: Pin[] = [];

  for (const produto of produtosVisiveis(catalogo.produtos)) {
    // Pin é formato visual: sem foto não existe pin. Avisa em vez de gerar um
    // texto que não dá pra publicar.
    if (!produto.imagem) {
      semImagem.push(produto.nome);
      continue;
    }

    pins.push({
      meli_id: produto.meli_id,
      pasta: pastaDe(produto),
      titulo: tituloDe(produto),
      descricao: descricaoDe(produto),
      destino: `${SITE}${caminhoDoProduto(produto)}`,
      imagem: produto.imagem,
    });
  }

  pins.sort((a, b) => a.pasta.localeCompare(b.pasta, 'pt-BR'));

  fs.writeFileSync(
    path.join(raiz, 'data', 'pins.json'),
    `${JSON.stringify({ gerado_em: new Date().toISOString().slice(0, 10), total: pins.length, pins }, null, 2)}\n`,
    'utf-8',
  );

  let pasta = '';
  for (const pin of pins) {
    if (pin.pasta !== pasta) {
      pasta = pin.pasta;
      console.log(`\n\n### Pasta: ${pasta}\n`);
    }
    console.log(`— ${pin.titulo}`);
    console.log(`  destino: ${pin.destino}`);
    console.log(`  imagem:  ${pin.imagem}`);
    console.log(`  ${pin.descricao.replace(/\n\n/g, '\n  ')}\n`);
  }

  console.log(`\n${pins.length} pin(s) em data/pins.json.`);
  if (semImagem.length > 0) {
    console.log(`Sem foto, então sem pin: ${semImagem.join(', ')}`);
  }
}

main();
