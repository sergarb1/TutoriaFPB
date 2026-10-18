import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// ============================================================
// Tutoría FPB
// Sección única: 🤝 Tutoría (Modo coop) — unidades 01-14
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
  {
    label: '4 · 🛡️ Líneas rojas',
    collapsed: true,
    items: [
      { slug: '04-lineas-rojas', label: 'Índice' },
      { slug: '04-lineas-rojas/01-respeto-y-limites', label: '1 · Respeto y límites rojas' },
      { slug: '04-lineas-rojas/02-tipos-y-senales', label: '2 · Tipos, señales y cero red' },
      { slug: '04-lineas-rojas/03-juegos-y-retos', label: '3 · 🎮 Juegos y retos' },
    ],
  },
  {
    label: '5 · 🔓 El insulto no es poder',
    collapsed: true,
    items: [
      { slug: '05-el-insulto-no-es-poder', label: 'Índice' },
      { slug: '05-el-insulto-no-es-poder/01-por-que-busca-reaccion', label: '1 · Por qué busca tu reacción' },
      { slug: '05-el-insulto-no-es-poder/02-como-no-dar-la-reaccion', label: '2 · Cómo no dar la reacción' },
      { slug: '05-el-insulto-no-es-poder/03-juegos-y-retos', label: '3 · 🎮 Juegos y retos' },
    ],
  },
  {
    label: '6 · 🗣️ Decirlo sin liarla',
    collapsed: true,
    items: [
      { slug: '06-decirlo-sin-liarla', label: 'Índice' },
      { slug: '06-decirlo-sin-liarla/01-llamas-dices-o-hieres', label: '1 · Callas, dices o hieres' },
      { slug: '06-decirlo-sin-liarla/02-mensaje-yo-y-escucha', label: '2 · Mensaje-Yo y escucha' },
      { slug: '06-decirlo-sin-liarla/03-juegos-y-retos', label: '3 · 🎮 Juegos y retos' },
    ],
  },
  {
    label: '7 · ⚖️ Conflicto: modo sabio',
    collapsed: true,
    items: [
      { slug: '07-conflicto-modo-sabio', label: 'Índice' },
      { slug: '07-conflicto-modo-sabio/01-que-se-ve-y-que-no', label: '1 · Lo que se ve y lo que no' },
      { slug: '07-conflicto-modo-sabio/02-resolucion-paso-a-paso', label: '2 · Resolución paso a paso' },
      { slug: '07-conflicto-modo-sabio/03-juegos-y-retos', label: '3 · 🎮 Juegos y retos' },
    ],
  },
  {
    label: '8 · 🎲 Banco de juegos',
    collapsed: true,
    items: [
      { slug: '08-banco-de-juegos', label: 'Índice' },
      { slug: '08-banco-de-juegos/01-cohesion', label: '1 · Cohesión: un grupo que funciona' },
      { slug: '08-banco-de-juegos/02-calma', label: '2 · Calma: bajar la tensión' },
      { slug: '08-banco-de-juegos/03-kit-del-profe', label: '3 · 🎮 Kit del profe' },
    ],
  },
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
  {
    label: '10 · 🎙️ Tu sesión en 50 minutos',
    collapsed: true,
    items: [
      { slug: '10-tu-sesion-en-50-minutos', label: 'Índice' },
      { slug: '10-tu-sesion-en-50-minutos/01-anatomia-sesion', label: '1 · La anatomía de la sesión' },
      { slug: '10-tu-sesion-en-50-minutos/02-tu-guion', label: '2 · Tu guión (plantilla)' },
    ],
  },
  {
    label: '11 · 📆 Turnos del aula',
    collapsed: true,
    items: [
      { slug: '11-turnos-del-aula', label: 'Índice' },
      { slug: '11-turnos-del-aula/01-cinco-turnos', label: '1 · Los 5 turnos del aula' },
      { slug: '11-turnos-del-aula/02-tu-planilla', label: '2 · Tu planilla (plantilla)' },
    ],
  },
  {
    label: '12 · 🌐 Ciberconvivencia',
    collapsed: true,
    items: [
      { slug: '12-ciberconvivencia', label: 'Índice' },
      { slug: '12-ciberconvivencia/01-chat-plaza-publica', label: '1 · El chat es plaza pública' },
      { slug: '12-ciberconvivencia/02-cuando-se-vira', label: '2 · Cuando el chat se vira' },
      { slug: '12-ciberconvivencia/03-juegos-y-retos', label: '3 · 🎮 Retos, filtros y estafas' },
    ],
  },
  {
    label: '13 · 💚 Bienestar y estrés',
    collapsed: true,
    items: [
      { slug: '13-bienestar-y-estres', label: 'Índice' },
      { slug: '13-bienestar-y-estres/01-descanso-de-verdad', label: '1 · Descanso de verdad' },
      { slug: '13-bienestar-y-estres/02-presion-y-comparacion', label: '2 · Presión y comparación' },
      { slug: '13-bienestar-y-estres/03-pedir-ayuda-a-tiempo', label: '3 · 🪜 Pedir ayuda a tiempo' },
    ],
  },
  {
    label: '14 · 🧭 Mi futuro FPB',
    collapsed: true,
    items: [
      { slug: '14-mi-futuro-fpb', label: 'Índice' },
      { slug: '14-mi-futuro-fpb/01-la-brujula', label: '1 · La brújula' },
      { slug: '14-mi-futuro-fpb/02-caminos-despues-de-fpb', label: '2 · Los caminos después del FPB' },
      { slug: '14-mi-futuro-fpb/03-tu-plan-con-fecha', label: '3 · 📅 Tu plan con fecha' },
    ],
  },
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
