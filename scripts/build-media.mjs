// Converts every image under content/ into a web-ready copy under public/media/.
// Raster images -> WebP, capped in width; SVGs are copied as-is. Output paths
// mirror content/ with the extension swapped (see mediaUrl in lib/content.ts).
// Runs before `dev` and `build`; unchanged files are skipped.
import { readdirSync, statSync, mkdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { join, relative, dirname, extname } from 'node:path';
import sharp from 'sharp';

const SRC = 'content';
const OUT = 'public/media';
const RASTER = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.tif', '.tiff']);
// Gallery shows at ~1150 CSS px wide; logos at 64 px.
const maxWidth = (rel) => (rel.startsWith('logos/') ? 256 : 1600);

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );

const outPath = (rel) => {
  const ext = extname(rel).toLowerCase();
  return ext === '.svg' ? rel : rel.slice(0, -extname(rel).length) + '.webp';
};

const expected = new Set();
let built = 0;
for (const file of walk(SRC)) {
  const rel = relative(SRC, file);
  const ext = extname(rel).toLowerCase();
  if (ext !== '.svg' && !RASTER.has(ext)) continue;

  const dest = join(OUT, outPath(rel));
  expected.add(dest);
  if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(file).mtimeMs) continue;

  mkdirSync(dirname(dest), { recursive: true });
  if (ext === '.svg') copyFileSync(file, dest);
  else
    await sharp(file)
      .rotate() // honour EXIF orientation from phone photos
      .resize({ width: maxWidth(rel), withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(dest);
  built++;
}

// Drop outputs whose source was deleted or renamed.
let removed = 0;
if (existsSync(OUT))
  for (const file of walk(OUT))
    if (!expected.has(file)) rmSync(file), removed++;

console.log(`media: ${built} built, ${expected.size - built} up to date, ${removed} removed`);
