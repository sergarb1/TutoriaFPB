---
title: 5 — Tu kudo en digital
description: Enviar por correo, copiar o imprimir 📧
---

<p><small>Enviar por correo, copiar o imprimir 📧</small></p>

> 🗺️ **Estás en:** 🤝 **Kudo Cards** → 5 · Tu kudo en digital

---

## 📬 En corto

> **¿Falta alguien o prefieres el móvil?** Rellena, elige y envía: la herramienta de abajo abre tu correo con el kudo escrito, lo copia para WhatsApp/Aules o lo deja listo para imprimir.

---

## 📧 Herramienta: crea y envía tu kudo

<style>
  .k-tool { border: 1px solid rgba(37,99,235,.2); border-radius: .85rem; padding: 1.25rem; background: rgba(37,99,235,.03); }
  .k-tool label { display:block; font-weight:700; margin:.8rem 0 .25rem; }
  .k-tool input, .k-tool textarea { width:100%; padding:.5rem; border-radius:.5rem; border:1px solid rgba(37,99,235,.3); font:inherit; }
  .k-tool textarea { min-height: 90px; }
  .k-btns { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:1rem; }
  .k-btns button { padding:.55rem 1.1rem; border:none; border-radius:2rem; font-weight:700; cursor:pointer; color:#fff; background:linear-gradient(135deg,#2563eb,#4ecdc4); }
  .k-btns button:hover { transform: translateY(-1px); }
  .k-sug { display:inline-block; margin:.15rem; padding:.25rem .6rem; border-radius:1rem; border:1px solid rgba(37,99,235,.3); background:transparent; cursor:pointer; font-size:.75rem; color:inherit; }
  #k-preview { margin-top:1rem; padding:1rem; border-radius:.85rem; border:2px dashed rgba(37,99,235,.4); white-space:pre-wrap; font-family:inherit; }
  @media print { .k-tool, .k-sugs { display:none !important; } }
</style>

<div class="k-tool">

**Para:** (nombre del compañero o "La profe")
<input id="k-para" placeholder="Ej.: Marta / La profe de tu módulo">

**De:** tu nombre
<input id="k-de" placeholder="Ej.: Dani">
<label style="font-weight:400;"><input type="checkbox" id="k-anon"> Enviar como anónimo/a</label>

**Mensaje:** (concreto + comportamiento + impacto)
<textarea id="k-msg" placeholder="Gracias por ayudarme con la caja sin que te lo pidiera; sin ti no la terminaba antes del cliente."></textarea>

<div class="k-sugs">
  <button type="button" class="k-sug">Gracias por hacerme sitio en la mesa el primer día; me quitaste los nervios.</button>
  <button type="button" class="k-sug">Gracias por explicarme la parte que no entendía sin hacerme sentir tonto.</button>
  <button type="button" class="k-sug">Gracias por parar la burla con un "no es para tanto"; se notó.</button>
  <button type="button" class="k-sug">Gracias por explicarme el tema dos veces con un ejemplo real; la segunda me cuadró todo.</button>
</div>

**Correo de destino** (quien recibe el kudo; edítalo con el correo de tu profe)
<input id="k-correo" placeholder="ejemplo@centro.edu" value="">

<div class="k-btns">
  <button type="button" id="k-mail">📧 Enviar por correo</button>
  <button type="button" id="k-copy">📋 Copiar (WhatsApp / Aules)</button>
  <button type="button" id="k-print">🖨️ Imprimir tarjeta</button>
</div>

<div id="k-preview">Vista previa del kudo…</div>
</div>

<script is:inline>
  (function () {
    var $ = function (id) { return document.getElementById(id); };
    function kudoTexto() {
      var para = ($('k-para').value || '______').trim();
      var anon = $('k-anon').checked;
      var de = anon ? 'Anónimo/a' : (($('k-de').value || '______').trim());
      var msg = ($('k-msg').value || '______').trim();
      return '⭐ KUDO CARD ⭐\n\nPara: ' + para + '\nDe: ' + de + '\n\n"' + msg + '"\n\n— Enviada con Tutoría FPB 🛍️';
    }
    function actualizar() { $('k-preview').textContent = kudoTexto(); }
    ['k-para', 'k-de', 'k-msg'].forEach(function (id) { $(id).addEventListener('input', actualizar); });
    $('k-anon').addEventListener('change', function () { $('k-de').disabled = this.checked; actualizar(); });
    $('k-mail').addEventListener('click', function () {
      var destino = ($('k-correo').value || '').trim();
      if (!destino) { alert('Escribe primero el correo de quien recibe el kudo (el de tu profe, por ejemplo).'); return; }
      var asunto = '⭐ Kudo Card para ' + (($('k-para').value || '').trim() || 'ti');
      window.location.href = 'mailto:' + encodeURIComponent(destino) + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(kudoTexto());
    });
    $('k-copy').addEventListener('click', function () {
      var t = kudoTexto();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(function () { alert('Kudo copiado. Pégalo en el WhatsApp del grupo, en Aules o donde quieras.'); });
      } else {
        var ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove(); alert('Kudo copiado.');
      }
    });
    $('k-print').addEventListener('click', function () { window.print(); });
    var sugs = document.querySelectorAll('.k-sug');
    for (var i = 0; i < sugs.length; i++) {
      sugs[i].addEventListener('click', function () { $('k-msg').value = this.textContent.trim(); actualizar(); });
    }
    actualizar();
  })();
</script>

> ⚠️ **Si el correo no se abre:** en móvil puede que no tengas correo configurado. Usa **📋 Copiar** y mándalo por WhatsApp o Aules. Y recuerda: si es para la profe, ella recibe la tarjeta igual que tú recibirías la tuya.

---

## 🌐 Kudos a distancia: otras vías

- **kudobox.co** — servicio gratuito de Management 3.0 para enviar kudos a distancia (si alguien falta o es de otro grupo).
- **LinkedIn** — el propio LinkedIn permite reconocimientos: "Crear publicación" → "Celebrar ocasión especial" → "Dar reconocimiento". Ideal para FCT o para el módulo que sea: se practica la herramienta y se agradece a la vez.
- **Escanear a mano** — escribe tu tarjeta de papel, hazle una foto y mándala. El canal da igual; la intención es la que cuenta.

---

## 🧠 Mini-chequeo

1. Rellena la herramienta con un kudo real y mándalo por correo.
2. ¿En qué situaciones usarías el botón "anónimo"?
3. ¿Qué dos vías usarías si alguien de la clase falta esa semana?

---

## ✅ Resumen en 3 frases

1. La herramienta crea tu kudo y lo envía por correo (mailto prellenado), lo copia para WhatsApp/Aules o lo imprime.
2. El anónimo está para la tensión viva; la firma vuelve cuando el grupo funciona.
3. A distancia: kudobox.co, LinkedIn o una foto de la tarjeta de papel.

---

## 🐛 Vocabulario rápido

- **mailto:** el enlace que abre tu correo con destinatario, asunto y cuerpo ya escritos.
- **Reconocimiento (LinkedIn):** la función de la red para celebrar logros de otros; herramienta del mundo del trabajo.

---

📚 [Volver al índice de Kudo Cards](/TutoriaFPB/09-kudo-cards) · **Anterior:** [Banco de tarjetas](/TutoriaFPB/09-kudo-cards/04-banco-de-tarjetas) · **Siguiente:** Tu sesión en 50 minutos (próximamente)
