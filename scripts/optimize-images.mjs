/**
 * Downsample the committed photo masters in public/ to a sane display size.
 *
 * The originals were straight off the camera — up to 4090x6072 at 3-12MB — but
 * nothing on the site renders wider than ~1400 CSS px. Keeping 25-megapixel
 * sources meant every next/image transform had to decode a huge frame first,
 * and on Vercel each variant counts against the image-transform quota.
 *
 *   node scripts/optimize-images.mjs           # apply
 *   node scripts/optimize-images.mjs --dry-run # report only
 */
import { readdir, stat, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT      = "public";
const MAX_EDGE  = 2560;
const QUALITY   = 88;
const DRY_RUN   = process.argv.includes("--dry-run");

const fmtMB = (b) => (b / 1024 / 1024).toFixed(2);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (extname(entry.name).toLowerCase() === ".webp") out.push(full);
  }
  return out;
}

const files = (await walk(ROOT)).sort();

let before = 0;
let after = 0;
let touched = 0;

for (const file of files) {
  const sizeBefore = (await stat(file)).size;
  before += sizeBefore;

  const image = sharp(file);
  const { width, height } = await image.metadata();
  const longEdge = Math.max(width, height);

  if (longEdge <= MAX_EDGE) {
    after += sizeBefore;
    console.log(`  skip   ${file}  ${width}x${height}  (already <= ${MAX_EDGE})`);
    continue;
  }

  const dims = width >= height ? { width: MAX_EDGE } : { height: MAX_EDGE };

  const buf = await image
    .resize({ ...dims, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer();

  const meta = await sharp(buf).metadata();

  if (!DRY_RUN) await writeFile(file, buf);

  after += buf.length;
  touched += 1;
  console.log(
    `  ${DRY_RUN ? "would" : "wrote"}  ${file}  ` +
    `${width}x${height} ${fmtMB(sizeBefore)}MB -> ${meta.width}x${meta.height} ${fmtMB(buf.length)}MB`,
  );
}

console.log(
  `\n${DRY_RUN ? "[dry run] " : ""}${touched}/${files.length} resized  ` +
  `${fmtMB(before)}MB -> ${fmtMB(after)}MB  (saved ${fmtMB(before - after)}MB)`,
);
