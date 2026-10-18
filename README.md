# Tutoría FPB

> **Fichas de aula de tutoría para FPB — sirve para cualquier ciclo: Comercio, Informática, Gestión Administrativa…**
> Unidades de convivencia en modo coop: gana el grupo, nadie se queda fuera y nadie queda señalado. CC BY-SA 4.0 — [Sergi Garcia Barea](https://github.com/sergarb1)

---

## 🌐 Web

**👉 [https://sergarb1.github.io/TutoriaFPB/](https://sergarb1.github.io/TutoriaFPB/)**

---

## 🎯 Misión

Mejorar el clima del aula con actividades **cooperativas** (nunca destructivas): cero insultos modelados, inclusión explícita de quien está solo, herramientas para cortar el "uno contra el grupo" y tono esperanzador. Los errores los comete **DANI**, el dependiente metepata de la tienda de **ROSA** — nunca el alumnado.

---

## 📚 Contenido — 11 unidades publicadas

| Unidad | Fichas |
|---|---|
| 🌱 Confianza real | Qué es, cómo se cuida, juegos y retos |
| 🎭 Ponte en su sitio | Empatía: sentirla, practicarla, cyberempatía |
| 🧩 Modo equipo | Compañerismo: nadie se queda solo |
| 🛡️ Líneas rojas | Respeto, límites y cero bullying ("uno contra el grupo") |
| 🔓 El insulto no es poder | No dar la reacción que busca; el límite: persiste → se avisa |
| 🗣️ Decirlo sin liarla | Asertividad: Mensaje-Yo, escuchar y responder sin insultar |
| ⚖️ Conflicto: modo sabio | Anatomía del conflicto y acuerdos de clase |
| 🎲 Banco de juegos | Dinámicas de cohesión y de calma, con fichas |
| 🎁 Kudo Cards | Guía + banco de +50 tarjetas + herramienta digital |
| 🎙️ Tu sesión en 50 minutos | Guión de tutoría (tema libre) para Aules o papel |
| 📆 Turnos del aula | Lista de responsables diarios: plantilla para imprimir |

Cada punto es una **ficha imprimible** con ejercicios para rellenar (soluciones ocultas en web y en el papel; visibles en el DOCX). Y cada unidad tiene su página **`/imprimir/<unidad>`**: índice + todas las fichas con salto de página y botón para imprimirlas o guardarlas en PDF.

---

## 🛠️ Técnico

- **Astro 7 + Starlight** — estático, sin backend, sin cookies.
- **Despliegue:** GitHub Actions → GitHub Pages (rama `main`).
- **Validación de contenido:** `npm run check` (frontmatter, enlaces, sidebar); también corre en el CI antes del build.
- **DOCX por unidad:** automáticos en CI al cambiar el contenido (con Pandoc); en local, `npm run docx` → `docx/<unidad>/`.
- **Imprimir:** página `/imprimir/<unidad>` por unidad (A4, soluciones ocultas, PDF desde el navegador).
- **Imágenes:** diagramas Excalidraw editables en `public/img/fuentes/`.

```bash
npm run dev      # http://localhost:4321
npm run check    # validar contenido antes del build
npm run build    # dist/
npm run docx     # DOCX por unidad (en local; el CI lo hace solo)
```

> 📌 **¿Continúas el proyecto?** Lee `planaseguir.txt`: estado actual, pendientes (unidades 12-15) y flujo de trabajo paso a paso.

---

## 📄 Licencia

CC BY-SA 4.0 — usa, imprime y adapta citando la fuente.
