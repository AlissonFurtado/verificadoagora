/**
 * A Lupita parada, em SVG, para onde não dá para usar o componente React do
 * pacote `@afdesousa/personagens` (o `next/og` do favicon e da capa).
 *
 * Gerada em 15/10/2026 do `src/Lupita.tsx` da tag `v0.2.0` de
 * github.com/AlissonFurtado/afdesousa-personagens, com a pose `parado(0)`.
 * Ela entrou no lugar do "✓" de verificado (no favicon, na capa do link e no
 * topo da home), a pedido do Alisson: a conta da Meta levou strike, e o ✓
 * lembra o selo de verificação. Se o desenho mudar no pacote, gere de novo.
 * O mesmo desenho está em `public/lupita.svg`, que é o que a home usa.
 */
const DESENHO = `<g transform="translate(0 -1) scale(1 1) rotate(0 0 -60)" opacity="1"><ellipse cx="0" cy="4" rx="52" ry="9" fill="rgba(0,0,0,0.35)" transform="translate(0 1)"></ellipse><path d="M -16 -26 Q -22 -11.75 -18 0" stroke="#FF8A3D" stroke-width="7" stroke-linecap="round" fill="none"></path><path d="M 16 -26 Q 22 -11.75 18 0" stroke="#FF8A3D" stroke-width="7" stroke-linecap="round" fill="none"></path><ellipse cx="-21" cy="0" rx="15" ry="7" fill="#FF8A3D" stroke="#E06A1B" stroke-width="2"></ellipse><ellipse cx="21" cy="0" rx="15" ry="7" fill="#FF8A3D" stroke="#E06A1B" stroke-width="2"></ellipse><ellipse cx="0" cy="-68" rx="52" ry="60" fill="#1FB57A" stroke="#0C6B45" stroke-width="2"></ellipse><ellipse cx="0" cy="-58" rx="33" ry="42" fill="#EAFBF0"></ellipse><g stroke="#128A5B" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.7"><path d="M -15 -66 q 5 7 10 0"></path><path d="M 5 -66 q 5 7 10 0"></path><path d="M -5 -48 q 5 7 10 0"></path><path d="M -15 -30 q 5 7 10 0"></path><path d="M 5 -30 q 5 7 10 0"></path></g><g transform="translate(0 -146) rotate(0)"><path d="M -52 -18 L -60 -64 L -20 -40 Z" fill="#128A5B" stroke="#0C6B45" stroke-width="2" stroke-linejoin="round" transform="rotate(0 -40 -30)"></path><path d="M 52 -18 L 60 -64 L 20 -40 Z" fill="#128A5B" stroke="#0C6B45" stroke-width="2" stroke-linejoin="round" transform="rotate(0 40 -30)"></path><ellipse cx="0" cy="0" rx="57" ry="48" fill="#1FB57A" stroke="#0C6B45" stroke-width="2"></ellipse><circle cx="-23" cy="-2" r="26" fill="#BDF3D6"></circle><circle cx="23" cy="-2" r="26" fill="#BDF3D6"></circle><g><circle cx="-23" cy="-2" r="18" fill="#fff" stroke="#16302A" stroke-width="2.5"></circle><circle cx="23" cy="-2" r="18" fill="#fff" stroke="#16302A" stroke-width="2.5"></circle><circle cx="-21.2" cy="-2" r="9" fill="#16302A"></circle><circle cx="24.8" cy="-2" r="9" fill="#16302A"></circle><circle cx="-18.2" cy="-6" r="3" fill="#fff"></circle><circle cx="27.8" cy="-6" r="3" fill="#fff"></circle></g><path d="M -7 16 L 7 16 L 0 23.2 Z" fill="#E06A1B" stroke-linejoin="round"></path><path d="M -10 12 L 10 12 L 0 27 Z" fill="#FF8A3D" stroke="#E06A1B" stroke-width="1.5" stroke-linejoin="round"></path></g><path d="M -40 -104 Q -54 -79.5 -40 -62" stroke="#128A5B" stroke-width="17" stroke-linecap="round" fill="none"></path><path d="M 40 -104 Q 54 -79.5 40 -62" stroke="#128A5B" stroke-width="17" stroke-linecap="round" fill="none"></path><circle cx="-40" cy="-62" r="11" fill="#128A5B" stroke="#0C6B45" stroke-width="2"></circle><g transform="translate(40 -62) rotate(20)"><line x1="0" y1="0" x2="13" y2="-21" stroke="#5B36C9" stroke-width="9" stroke-linecap="round"></line><circle cx="24" cy="-40" r="21" fill="rgba(190,240,255,0.45)" stroke="#8A5CFF" stroke-width="6"></circle><path d="M 11 -46 q 5 -11 16 -11" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.85"></path></g><circle cx="40" cy="-62" r="11" fill="#128A5B" stroke="#0C6B45" stroke-width="2"></circle></g>`;

const comCaixa = (viewBox: string) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${DESENHO}</svg>`;

/** Corpo inteiro, com a lupa. */
export const LUPITA_SVG = comCaixa('-85 -218 190 232');

/** Só a cabeça: é o que se lê num favicon de 32 px. */
export const LUPITA_CABECA_SVG = comCaixa('-68 -214 136 136');

export const comoImagem = (svg: string) => `data:image/svg+xml;base64,${btoa(svg)}`;
