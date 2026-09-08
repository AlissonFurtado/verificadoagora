/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Um tom só pra página inteira: cabeçalho, corpo e rodapé. O card
        // branco recorta contra ele sem precisar de sombra pesada.
        fundo: '#eef2f8',
      },
      fontFamily: {
        sans: ['var(--fonte)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
