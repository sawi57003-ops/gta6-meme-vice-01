import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// GTA 6 meme entry: copy the bundled meme image to the graded output.
// The image is generated once and stored in this repo as meme.png; the
// program's only job is to place it where the judge reads it.
const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const source = join(here, "meme.png");
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
const bytes = readFileSync(source);
if (bytes.length > 1024 * 1024) {
  throw new Error("meme.png exceeds the 1 MiB limit: " + bytes.length + " bytes");
}
writeFileSync(target, bytes);
console.log("wrote " + target + " (" + bytes.length + " bytes)");
