import { readFileSync } from "node:fs";
import path from "node:path";

const size = { width: 1200, height: 630 };

function loadFont(name: string, weight: 400 | 500 | 600, file: string) {
  return {
    name,
    weight,
    data: readFileSync(path.join(process.cwd(), "public", "fonts", "og", file)),
  };
}

const fonts = [
  loadFont("Newsreader", 600, "newsreader-600.woff"),
  loadFont("Plex Sans", 400, "plex-sans-400.woff"),
  loadFont("Plex Sans", 600, "plex-sans-600.woff"),
  loadFont("Plex Mono", 500, "plex-mono-500.woff"),
];

export { size, fonts };
