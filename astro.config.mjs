import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// ============================================================
// Tutoría FPB
// Sección única: 🤝 Tutoría (Modo coop) — unidades 01-11
// Web genérica para cualquier FPB (Comercio, Informática,
// Administrativo…). El mundo narrativo es la tienda de ROSA
// y DANI, válida para todos los ciclos.
// IMPORTANTE: el sidebar solo puede enlazar páginas que existan.
// Al crear una unidad nueva, añadirla aquí ANTES de comprobar el build.
// ============================================================

// --- Unidades de tutoría (creadas; añadir las nuevas aquí) ---
const tutoriaItems = [
  {
    label: '1 · 🌱 Confianza real',
    collapsed: true,
    items: [
      { slug: '01-confianza-real', label: 'Índice' },
      { slug: '01-confianza-real/01-que-es-la-confianza-real', label: '1 · Qué es la confianza real' },
      { slug: '01-confianza-real/02-como-se-cuida', label: '2 · Cómo se cuida' },
      { slug: '01-confianza-real/03-juegos-y-retos', label: '3 · 🎮 Juegos y retos' },
    ],
  },
  {
    label: '2 · 🎭 Ponte en su sitio',
    collapsed: true,
    items: [
      { slug: '02-ponte-en-su-sitio', label: 'Índice' },
      { slug: '02-ponte-en-su-sitio/01-que-es-la-empatia', label: '1 · Qué es la empatía' },
      { slug: '02-ponte-en-su-sitio/02-como-practicarla', label: '2 · Cómo se practica' },
      { slug: '02-ponte-en-su-sitio/03-juegos-y-retos', label: '3 · 🎮 Juegos y retos' },
    ],
  },
  {
    label: '3 · 🧩 Modo equipo',
    collapsed: true,
    items: [
      { slug: '03-modo-equipo', label: 'Índice' },
      { slug: '03-modo-equipo/01-companerismo', label: '1 · Qué es el compañerismo' },
      { slug: '03-modo-equipo/02-gestos-que-se-notan', label: '2 · Gestos que se notan' },
      { slug: '03-modo-equipo/03-juegos-y-retos', label: '3 · 🎮 Juegos y retos' },
    ],
  },
  // 4 · 🛡️ Líneas rojas (en preparación)
  // 5 · 🔓 El insulto no es poder (en preparación)
  // 6 · 🗣️ Decirlo sin liarla (en preparación)
  // 7 · ⚖️ Conflicto: modo sabio (en preparación)
  // 8 · 🎲 Banco de juegos (en preparación)
  {
    label: '9 · 🎁 Kudo Cards',
    collapsed: true,
    items: [
      { slug: '09-kudo-cards', label: 'Índice' },
      { slug: '09-kudo-cards/01-que-son-y-las-6-reglas-de-oro', label: '1 · Qué son y las 6 reglas de oro' },
      { slug: '09-kudo-cards/02-la-caja-o-el-mural', label: '2 · La caja o el mural' },
      { slug: '09-kudo-cards/03-como-escribir-un-kudo', label: '3 · Cómo escribir un kudo' },
      { slug: '09-kudo-cards/04-banco-de-tarjetas', label: '4 · 🖨️ Banco de tarjetas' },
      { slug: '09-kudo-cards/05-tu-kudo-en-digital', label: '5 · 📧 Tu kudo en digital' },
    ],
  },
  // 10 · 🎙️ Tu sesión en 50 minutos (en preparación)
  // 11 · 📆 Turnos del aula (en preparación)
];

export default defineConfig({
  site: 'https://sergarb1.github.io/TutoriaFPB',
  base: '/TutoriaFPB',
  integrations: [
    starlight({
      title: 'Tutoría FPB',
      description:
        'Fichas de aula de tutoría para FPB — Comercio, Informática, Administrativo… Modo coop para que la clase funcione. CC BY-SA 4.0 — Sergi Garcia Barea',
      customCss: ['./src/styles/custom.css', '@fontsource/geist-sans'],
      locales: {
        root: { label: 'Castellano', lang: 'es' },
      },
      defaultLocale: 'root',
      tableOfContents: false,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/sergarb1/TutoriaFPB' },
      ],
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#2563eb' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: '/TutoriaFPB/favicon.svg' } },
      ],
      sidebar: [
        { slug: 'index', label: 'Inicio' },
        {
          label: '🤝 Tutoría — Modo coop',
          items: tutoriaItems,
        },
      ],
    }),
  ],
});
