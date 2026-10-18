#!/usr/bin/env node
/**
 * Validación de contenido ANTES del build (CI y local).
 * Caza los errores que ya han roto el build + reglas del AGENTS.md:
 *
 *  1. Frontmatter YAML válido — si title/description llevan ':' sin
 *     entrecomillar, lo explica con la solución en el mensaje.
 *  2. title y description presentes; description con emoji (aviso).
 *  3. Sin números de unidad en prosa/títulos (U01, "Unidad 5").
 *  4. Enlaces internos /TutoriaFPB/... → la página debe existir.
 *  5. Imágenes /TutoriaFPB/img/... → el fichero debe existir en public/.
 *  6. Sin restos de la web antigua (/ActividadesFPBComercio).
 *  7. Slugs del sidebar (astro.config.mjs) que no existan → error;
 *     docs sin sidebar → aviso.
 *
 * Uso: npm run check   (exit 1 si hay errores)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(root, 'src', 'content', 'docs');
const publicDir = path.join(root, 'public');
const BASE = '/TutoriaFPB';
const OLD_BASE = '/ActividadesFPBComercio';

const errores = [];
const avisos = [];
const rel = (f) => path.relative(root, f).replaceAll('\\', '/');
const err = (f, m) => errores.push(`${rel(f)}\n    ✖ ${m}`);
const warn = (f, m) => avisos.push(`${rel(f)}\n    ⚠ ${m}`);

// ---------- recopilar slugs existentes ----------
function walkMd(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkMd(p));
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const files = walkMd(docsDir).sort();
const slugs = new Set();
for (const f of files) {
  let s = path.relative(docsDir, f).replaceAll('\\', '/').replace(/\.md$/, '');
  if (s === 'index') s = '';
  slugs.add(s);
}

// ---------- helpers ----------
function extractFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? { yaml: m[1], end: m[0].length } : null;
}

function internalTargets(raw) {
  // href="..." · src="..." · [texto](destino)
  const out = new Set();
  for (const m of raw.matchAll(/(?:href|src)="([^"]+)"/g)) out.add(m[1]);
  for (const m of raw.matchAll(/\]\(([^()\s]+)\)/g)) out.add(m[1]);
  return [...out];
}

function linkResolves(target) {
  const t = target.split('#')[0].split('?')[0];
  if (t === '' || t === '/') return true; // ancla de la propia página
  if (t.startsWith(BASE)) {
    const rest = t.slice(BASE.length).replace(/^\//, '');
    if (rest === '') return true;
    if (rest.startsWith('imprimir/')) {
      // Ruta de impresión generada en src/pages/imprimir/[unidad].astro:
      // válida solo si el slug es una unidad con índice.
      const u = rest.slice('imprimir/'.length).replace(/\/$/, '');
      return slugs.has(u);
    }
    if (fs.existsSync(path.join(publicDir, rest))) return true;
    return slugs.has(rest) || slugs.has(rest.replace(/\/$/, ''));
  }
  return false; // rutas que no llevan la base → error también
}

// ---------- validación por fichero ----------
const emojiRe = /\p{Extended_Pictographic}/u;
const unitNumRe = /\bU\d{2}\b|\bUnidad\s+\d+|\bunidades\s+\d+/i;

for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  const fm = extractFrontmatter(raw);

  if (!fm) {
    err(f, 'Sin frontmatter (debe empezar por --- con title y description).');
    continue;
  }

  let data;
  try {
    data = parseYaml(fm.yaml);
  } catch (e) {
    err(
      f,
      `Frontmatter YAML inválido: ${e.message.split('\n')[0]}\n` +
        '    💡 Solución: entrecomilla title/description si contienen ":"  →  título: "Texto: subtexto"',
    );
    continue;
  }

  // 2. title / description
  if (!data || typeof data.title !== 'string' || !data.title.trim()) {
    err(f, 'Falta "title" (o está vacío).');
  }
  if (!data || typeof data.description !== 'string' || !data.description.trim()) {
    err(f, 'Falta "description" (o está vacía).');
  } else if (!emojiRe.test(data.description)) {
    warn(f, 'La "description" no lleva emoji (convención del proyecto).');
  }

  // 3. Números de unidad en prosa/títulos (la URL/fichero está exento: se comprueba aparte)
  const body = raw.slice(fm.end);
  const hitNum = `${data?.title ?? ''} ${data?.description ?? ''} ${body}`.match(unitNumRe);
  if (hitNum) {
    err(f, `Número de unidad en el contenido ("${hitNum[0]}") — usa "en la unidad de…" sin número.`);
  }

  // 4-6. Enlaces e imágenes
  for (const t of internalTargets(raw)) {
    if (/^(https?:|mailto:|#|data:)/.test(t)) continue;
    if (t.startsWith(OLD_BASE)) {
      err(f, `Enlace a la web antigua: ${t} → debería ser ${BASE}/…`);
      continue;
    }
    if (!t.startsWith('/')) continue; // rutas relativas de ficheros: no aplica
    if (!linkResolves(t)) {
      err(f, `Enlace/imagen rota o sin la base: ${t}  → no existe ninguna página con ese destino.`);
    }
  }
}

// ---------- 7. Sidebar vs documentos ----------
const cfg = fs.readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
const sidebarSlugs = [...cfg.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
for (const s of sidebarSlugs) {
  const normalized = s === 'index' ? '' : s;
  if (!slugs.has(normalized)) {
    err(path.join(root, 'astro.config.mjs'), `El sidebar enlaza "${s}" pero ese documento no existe (rompería el build).`);
  }
}
const inSidebar = new Set(sidebarSlugs.map((s) => (s === 'index' ? '' : s)));
for (const s of slugs) {
  if (!inSidebar.has(s)) {
    warn(path.join(docsDir, `${s || 'index'}.md`), 'Documento sin entrada en el sidebar (no será navegable).');
  }
}

// ---------- resumen ----------
if (avisos.length) {
  console.log(`\n⚠  ${avisos.length} aviso(s):\n`);
  for (const a of avisos) console.log('   ' + a);
}
if (errores.length) {
  console.error(`\n✖  ${errores.length} error(es) de contenido:\n`);
  for (const e of errores) console.error('   ' + e);
  console.error('\nLa validación ha fallado. Corrige y vuelve a lanzar: npm run check');
  process.exit(1);
}
console.log(`\n✔  Contenido OK: ${files.length} páginas, ${sidebarSlugs.length} enlaces de sidebar, 0 errores.`);
