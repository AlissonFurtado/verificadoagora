# verificadoagora

Landing de afiliados de tecnologia da [A F DE SOUSA](mailto:contato@afdesousa.com.br).
Achadinhos de tech com desconto, para quem chega do Instagram
[@verificadoagora_](https://instagram.com/verificadoagora_).

```bash
npm install
npm run dev          # http://localhost:3000
npm run verificar    # tsc --noEmit, antes de qualquer entrega
```

O catálogo é o `data/produtos.json` — não existe painel. Um robô diário
reconfere os preços na API do Mercado Livre (`npm run precos:conferir`).

O contexto que não está no código — o nó do domínio, o contrato do catálogo,
as regras de link de afiliado — está no `CLAUDE.md`.
