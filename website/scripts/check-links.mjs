// After a build: every internal href/src in dist/ must resolve to a built file.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) pages.push(p);
  }
})(dist);

const broken = new Map();
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    if (url.startsWith('//') || url.startsWith('/_vercel/')) continue;
    const target = path.join(dist, decodeURIComponent(url));
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(path.join(target, 'index.html')));
    if (!ok) broken.set(url, [...(broken.get(url) ?? []), path.relative(dist, page)]);
  }
}
if (broken.size) {
  for (const [url, from] of broken) console.error(`broken ${url}  <- ${from.slice(0, 3).join(', ')}${from.length > 3 ? ` +${from.length - 3}` : ''}`);
  process.exit(1);
}
console.log(`links ok: ${pages.length} pages`);
