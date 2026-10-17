#!/usr/bin/env node
/**
 * Genera DOCX por unidad con Pandoc:
 *   docx/<unidad>/<unidad>.docx   → índice + puntos de la unidad
 *
 * Las unidades se descubren solas: cualquier carpeta NN-nombre de
 * src/content/docs con sus .md genera su DOCX. No hay que registrar nada.
 *
 * Uso: npm run docx   (requiere Pandoc CLI en PATH)
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'src', 'content', 'docs');
const outRoot = path.join(root, 'docx');

function stripFrontmatter(content) {
  return content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '').trim();
}

function getFrontTitle(content, fallback) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (m) {
    const t = m[1].match(/^title:\s*"?([^"\r\n]+)"?/m);
    if (t) return t[1].trim();
  }
  return fallback;
}

function rewriteLinks(content) {
  // Los enlaces internos se convierten en URLs de GitHub Pages para que en
  // el DOCX sean enlaces vivos tras el despliegue.
  return content.replaceAll(
    '](/ActividadesFPBComercio/',
    '](https://sergarb1.github.io/ActividadesFPBComercio/',
  );
}

function toSectionMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const base = path.basename(filePath, '.md');
  const title = getFrontTitle(raw, base);
  const body = rewriteLinks(stripFrontmatter(raw));
  return `# ${title}\n\n${body}\n`;
}

function runPandoc(md, outFile) {
  const tmp = path.join(
    root,
    `.tmp-docx-${path.basename(outFile, '.docx')}-${process.pid}.md`,
  );
  fs.writeFileSync(tmp, md, 'utf8');
  try {
    execFileSync(
      'pandoc',
      [
        tmp,
        '--from', 'markdown+raw_html',
        '--to', 'docx',
        '--toc',
        '--toc-depth=3',
        '--metadata', 'lang=es-ES',
        '-o', outFile,
      ],
      { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' },
    );
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

/** Unidades = carpetas NN-nombre de src/content/docs */
function discoverUnits() {
  return fs
    .readdirSync(srcDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^\d{2}-/.test(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, 'es'));
}

function unitFiles(slug) {
  const files = [];
  const index = path.join(srcDir, `${slug}.md`);
  if (fs.existsSync(index)) files.push(index);
  const dir = path.join(srcDir, slug);
  const puntos = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, 'es'));
  for (const p of puntos) files.push(path.join(dir, p));
  return files;
}

function main() {
  let ok = 0;
  let fail = 0;

  for (const slug of discoverUnits()) {
    const outDir = path.join(outRoot, slug);
    fs.mkdirSync(outDir, { recursive: true });

    const files = unitFiles(slug);
    if (files.length === 0) continue;

    const parts = files.map((f) => toSectionMarkdown(f));
    const unitOut = path.join(outDir, `${slug}.docx`);
    try {
      runPandoc(parts.join('\n'), unitOut);
      console.log(`OK  ${path.relative(root, unitOut)}`);
      ok += 1;
    } catch (e) {
      console.error(`FAIL ${slug}: ${e.message}`);
      fail += 1;
    }
  }

  console.log(`\nDOCX: ${ok} generados, ${fail} fallos → ${path.relative(root, outRoot)}/`);
  if (fail > 0) process.exitCode = 1;
}

main();
