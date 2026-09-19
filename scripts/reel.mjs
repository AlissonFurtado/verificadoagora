// Monta o reel de um produto: baixa as quatro cenas de /reel/{slug} e junta
// num MP4 vertical com movimento e transição.
//
// Uso:  node scripts/reel.mjs <slug> [--base http://localhost:3111]
//
// ⚠️ **O vídeo sai em `rascunhos/reels/`, que está fora do Git.** O repositório
// é público e vídeo com preço do dia não é material de código — além de pesar.
//
// ⚠️ **Precisa do ffmpeg.** Instalado em 18/09/2026 por
// `winget install --id Gyan.FFmpeg -e --scope user`, que **não pede
// administrador**. Se `ffmpeg` não estiver no PATH desta sessão, o script
// procura sozinho na pasta do winget.
//
// ⚠️ **O reel não tem áudio, e isso é de propósito**: o Instagram penaliza
// vídeo mudo, e a trilha entra no aplicativo na hora de publicar — é lá que
// está o catálogo de áudios em alta, que é metade do alcance de um reel.

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const CENAS = ['gancho', 'produto', 'prova', 'chamada'];
/** Segundos por cena. Curto: reel de oferta que passa de 20s perde retenção. */
const DURACAO = 4;
const FPS = 30;

function acharFfmpeg() {
  const candidatos = [
    'ffmpeg',
    join(
      process.env.LOCALAPPDATA ?? '',
      'Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.1-full_build/bin/ffmpeg.exe',
    ),
  ];
  for (const caminho of candidatos) {
    try {
      execFileSync(caminho, ['-version'], { stdio: 'ignore' });
      return caminho;
    } catch {
      /* tenta o próximo */
    }
  }
  throw new Error(
    'ffmpeg não encontrado. Instale com: winget install --id Gyan.FFmpeg -e --scope user',
  );
}

const slug = process.argv[2];
if (!slug) {
  console.error('Uso: node scripts/reel.mjs <slug-do-produto> [--base http://localhost:3111]');
  process.exit(1);
}
const iBase = process.argv.indexOf('--base');
const base = iBase > 0 ? process.argv[iBase + 1] : 'http://localhost:3111';

const ffmpeg = acharFfmpeg();
const pasta = join('rascunhos', 'reels', slug);
mkdirSync(pasta, { recursive: true });

// 1. Baixa as cenas.
for (const cena of CENAS) {
  const url = `${base}/reel/${slug}?cena=${cena}`;
  const resposta = await fetch(url);
  if (!resposta.ok) {
    console.error(`✗ ${cena}: ${resposta.status} em ${url}`);
    process.exit(1);
  }
  const bytes = Buffer.from(await resposta.arrayBuffer());
  writeFileSync(join(pasta, `${cena}.png`), bytes);
  console.log(`✓ ${cena}.png (${Math.round(bytes.length / 1024)} KB)`);
}

// 2. Monta. Cada cena ganha um zoom lento (o "Ken Burns" de sempre, que é o
//    que separa slideshow parado de vídeo), e as cenas se cruzam em fade.
const entradas = CENAS.flatMap((cena) => [
  '-loop', '1', '-t', String(DURACAO), '-i', join(pasta, `${cena}.png`),
]);

// A arte é tipografia sobre fundo chapado: o zoom pequeno dá vida sem virar
// enjoo.
//
// ⚠️ **Não faça upscale antes do zoompan.** A primeira versão escalava para
// 1188×2112 "para o zoom não borrar" e cada render passou a comer mais de 1 GB
// — em 19/09/2026 um lote de quatro vídeos foi morto pelo sistema por falta de
// memória. Com zoom de apenas 1,08× o upscale não muda o que se vê, e sem ele
// o processo cabe folgado.
const zoom = (i) =>
  `[${i}:v]zoompan=z='min(zoom+0.0005,1.08)':d=${DURACAO * FPS}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1080x1920:fps=${FPS},setsar=1[v${i}]`;

const filtros = [
  ...CENAS.map((_, i) => zoom(i)),
  // Encadeia os crossfades: v0+v1 -> x1, x1+v2 -> x2, x2+v3 -> saida.
  `[v0][v1]xfade=transition=fade:duration=0.4:offset=${DURACAO - 0.4}[x1]`,
  `[x1][v2]xfade=transition=fade:duration=0.4:offset=${DURACAO * 2 - 0.8}[x2]`,
  `[x2][v3]xfade=transition=fade:duration=0.4:offset=${DURACAO * 3 - 1.2}[saida]`,
].join(';');

const saida = join(pasta, `${slug}.mp4`);
execFileSync(
  ffmpeg,
  [
    '-y',
    ...entradas,
    '-filter_complex', filtros,
    '-map', '[saida]',
    // yuv420p + faststart: sem os dois, o Instagram recusa ou demora a abrir.
    // `tune stillimage` é o que derruba o tamanho aqui — o conteúdo é arte
    // parada com zoom, não cena filmada. Sem ele o arquivo passa de 45 MB e
    // fica ruim de mandar para o celular.
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'medium', '-crf', '26',
    '-tune', 'stillimage', '-maxrate', '3M', '-bufsize', '6M',
    '-movflags', '+faststart',
    '-r', String(FPS),
    saida,
  ],
  { stdio: 'inherit' },
);

const tamanho = readFileSync(saida).length;
console.log(
  `\n✓ ${saida} — ${(DURACAO * 4 - 1.2).toFixed(1)}s, ${(tamanho / 1024 / 1024).toFixed(1)} MB`,
);
console.log('  Falta só a trilha: escolha um áudio em alta na hora de publicar no Instagram.');
