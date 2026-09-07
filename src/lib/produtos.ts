import fs from 'fs';
import path from 'path';

export type Produto = {
  id: number;
  nome: string;
  categoria: string;
  preco_original: number;
  preco_atual: number;
  desconto_percentual: number;
  avaliacao: number;
  link_afiliado: string;
  cupom: string;
  descricao: string;
  plataforma: string;
  data_adicionado: string;
};

export type Catalogo = {
  produtos: Produto[];
  metadata: {
    ultima_atualizacao: string;
    total_produtos: number;
    comissao_media_ml: number;
    moeda: string;
  };
};

/** Lê o catálogo do disco. Fonte única de verdade da landing — não há painel. */
export function lerCatalogo(): Catalogo {
  const caminho = path.join(process.cwd(), 'data', 'produtos.json');
  // asserção de tipo: JSON externo, não validado em tempo de compilação
  const bruto = JSON.parse(fs.readFileSync(caminho, 'utf-8')) as Catalogo;
  return bruto;
}

export function formatarReal(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
