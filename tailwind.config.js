/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // O corpo claro da vitrine. O card branco recorta contra ele sem
        // precisar de sombra pesada.
        fundo: '#eef2f8',

        // A faixa noturna: topo e rodape usam o mesmo par, e a linha ciano
        // e o que corta o escuro do claro. Escolhido em 08/09/2026 entre
        // tres cortes, pra pagina parar de ter cara de blog.
        noite: '#0b1220',
        'noite-meio': '#172554',
        corte: '#38bdf8',

        // Marca. Azul de proposito longe do #3483fa do Mercado Livre: a
        // pagina e de afiliado e nao pode se passar pela loja.
        marca: '#1d4ed8',
        'marca-acao': '#2563eb',
        'marca-claro': '#7dd3fc',

        // Semanticas, que nao sao a marca: verde e economia, vermelho e
        // desconto. Nao troque por azul.
        economia: '#047857',
        desconto: '#d00000',
      },
      fontFamily: {
        sans: ['var(--fonte)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
