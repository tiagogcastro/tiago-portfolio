import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const output = join(root, "public", "brand");
const font = await readFile(
  join(root, "public", "fonts", "og", "newsreader-600.woff"),
);
const embeddedFont = font.toString("base64");

const mark = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Tiago G Castro symbol">
  <rect x="1.5" y="1.5" width="61" height="61" rx="13" fill="#26372e" stroke="#789987" stroke-width="2"/>
  <path d="M8 18.5H38L38 25Q23 22 8 25ZM20.25 21.75H25.75V41L29.75 46H16.25L20.25 41Z" fill="#f2f0e8"/>
  <path d="M57 23Q50 28 43 33M43 33Q50 38 57 43" fill="none" stroke="#c9aa70" stroke-width="7" stroke-linecap="round"/>
</svg>
`.trim();

const lockup = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 80" role="img" aria-label="Tiago G Castro logo">
  <style>
    @font-face {
      font-family: "Newsreader Brand";
      src: url("data:font/woff;base64,${embeddedFont}") format("woff");
      font-weight: 600;
    }
  </style>
  <g transform="scale(1.25)">
    <rect x="1.5" y="1.5" width="61" height="61" rx="13" fill="#26372e" stroke="#789987" stroke-width="2"/>
    <path d="M8 18.5H38L38 25Q23 22 8 25ZM20.25 21.75H25.75V41L29.75 46H16.25L20.25 41Z" fill="#f2f0e8"/>
    <path d="M57 23Q50 28 43 33M43 33Q50 38 57 43" fill="none" stroke="#c9aa70" stroke-width="7" stroke-linecap="round"/>
  </g>
  <rect x="96" y="20" width="3" height="40" fill="#789987"/>
  <text x="117" y="53" fill="#f2f0e8" font-family="Newsreader Brand, Georgia, serif" font-size="34" font-weight="600" letter-spacing="1">TIAGO G CASTRO</text>
</svg>
`.trim();

await mkdir(output, { recursive: true });
await Promise.all([
  writeFile(join(output, "tiago-g-castro-mark.svg"), mark),
  writeFile(join(output, "tiago-g-castro-lockup.svg"), lockup),
  sharp(Buffer.from(mark))
    .resize(1024, 1024)
    .png()
    .toFile(join(output, "tiago-g-castro-mark.png")),
  sharp(Buffer.from(lockup))
    .resize({ width: 2000 })
    .png()
    .toFile(join(output, "tiago-g-castro-lockup.png")),
]);

console.log(`Brand assets generated in ${output}`);
