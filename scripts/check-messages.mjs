// Fails when locales drift apart or when user-facing copy is hard-coded in components instead of messages/*.json.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const keys = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) =>
    typeof v === "object" ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );

const [it, en] = ["it", "en"].map((l) => new Set(keys(JSON.parse(readFileSync(`messages/${l}.json`, "utf8")))));
const problems = [
  ...[...it].filter((k) => !en.has(k)).map((k) => `missing in en.json: ${k}`),
  ...[...en].filter((k) => !it.has(k)).map((k) => `missing in it.json: ${k}`),
];

const files = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : p.endsWith(".tsx") ? [p] : [];
  });

// JSX text with letters, or a user-facing attribute set to a literal string.
const jsxText = />\s*([A-Za-zÀ-ú][^<>{}\n]*[A-Za-zÀ-ú]{2}[^<>{}\n]*)\s*</g;
const literalAttr = /\b(alt|aria-label|title|eyebrow|intro|text)="([^"]*[A-Za-zÀ-ú][^"]*)"/g;
for (const file of files("src")) {
  const source = readFileSync(file, "utf8").replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  for (const [, text] of source.matchAll(jsxText)) problems.push(`${file}: hard-coded text "${text.trim()}"`);
  for (const [, attr, text] of source.matchAll(literalAttr)) problems.push(`${file}: hard-coded ${attr}="${text}"`);
}

for (const p of problems) console.error(p);
console.log(`${it.size} keys per locale, ${problems.length} problems`);
process.exit(problems.length ? 1 : 0);
