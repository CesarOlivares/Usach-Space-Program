(async () => {
const RUTAS = ['/', '/ejes/', '/proyectos/', '/proyectos/cohete/', '/proyectos/cubesat/', '/proyectos/rover/', '/proyectos/cansat/', '/proyectos/eggdrop/', '/talleres/', '/novedades/', '/quienes-somos/', '/registro/', '/privacidad/', '/login/', '/no-existe'];
const ANCHOS = window.__ANCHOS || [1440, 1024, 768, 375];
const SEL = 'h1,h2,h3,h4,p,a.btn,button,img,dt,dd,label,input,select,textarea,blockquote,figcaption,time,.estacion-num,.aspira-sigla,.metric-value,.hero-stats dd,.nav-links a';
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const out = [];
for (const ancho of ANCHOS) {
  for (const ruta of RUTAS) {
    const f = document.createElement('iframe');
    f.style.cssText = `position:fixed;left:-20000px;top:0;width:${ancho}px;height:900px;border:0`;
    f.src = ruta;
    document.body.appendChild(f);
    await new Promise((r) => { f.onload = r; setTimeout(r, 8000); });
    await espera(1800);
    const d = f.contentDocument, w = f.contentWindow;
    const st = d.createElement('style');
    st.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}.motion-ready .reveal{opacity:1!important;transform:none!important}.estacion-num span{transform:none!important}';
    d.head.appendChild(st);
    d.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible'));
    d.querySelectorAll('.estacion').forEach((e) => e.classList.add('is-in'));
    d.querySelectorAll('[data-ruta]').forEach((e) => e.classList.add('is-on'));
    // pestañas ocultas fuera
    await espera(300);
    const visible = (el) => {
      if (el.closest('[hidden],[aria-hidden="true"],dialog:not([open]),.deco,.marquee-track,.lightbox,.skip-link,.hero-media,.page-hero-media,.ficha-hero-media,.manifesto-media,.join-backdrop')) return false;
      const cs = w.getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.05) return false;
      if (el.closest('#navLinks:not(.active)')) return false;
      const r = el.getBoundingClientRect();
      if (r.width <= 2 || r.height <= 2) return false;
      // recortado por un ancestro con overflow oculto (acordeones cerrados, etc.)
      for (let a = el.parentElement; a && a !== d.body; a = a.parentElement) {
        const ca = w.getComputedStyle(a);
        if (/(hidden|clip)/.test(ca.overflow + ca.overflowY)) {
          const ra = a.getBoundingClientRect();
          const vis = Math.min(r.bottom, ra.bottom) - Math.max(r.top, ra.top);
          if (vis < r.height * 0.3) return false;
        }
      }
      return true;
    };
    const enScroll = (el) => { for (let a = el.parentElement; a && a !== d.body; a = a.parentElement) { if (/(auto|scroll)/.test(w.getComputedStyle(a).overflowX)) return true; } return false; };
    const els = [...d.querySelectorAll(SEL)].filter(visible);
    const cajas = els.map((el) => { const r = el.getBoundingClientRect(); return { el, x: r.left, y: r.top + w.scrollY, r: r.right, b: r.bottom + w.scrollY }; });
    const nombre = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '') + ' "' + (el.textContent || el.alt || '').trim().replace(/\s+/g, ' ').slice(0, 28) + '"';
    const vistos = new Set();
    for (let i = 0; i < cajas.length; i++) {
      const A = cajas[i];
      // desborde horizontal
      if ((A.r > ancho + 1 || A.x < -1) && !enScroll(A.el)) {
        const k = 'desborde ' + nombre(A.el);
        if (!vistos.has(k)) { vistos.add(k); out.push(`${ancho} ${ruta} DESBORDE ${nombre(A.el)} x=${Math.round(A.x)}..${Math.round(A.r)}`); }
      }
      // texto cortado
      if (/^H[1-4]$/.test(A.el.tagName) && A.el.scrollWidth > A.el.clientWidth + 2) out.push(`${ancho} ${ruta} CORTADO ${nombre(A.el)} ${A.el.scrollWidth}>${A.el.clientWidth}`);
      for (let j = i + 1; j < cajas.length; j++) {
        const B = cajas[j];
        if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
        const ix = Math.min(A.r, B.r) - Math.max(A.x, B.x);
        const iy = Math.min(A.b, B.b) - Math.max(A.y, B.y);
        if (ix <= 2 || iy <= 2) continue;
        const area = ix * iy;
        const menor = Math.min((A.r - A.x) * (A.b - A.y), (B.r - B.x) * (B.b - B.y));
        if (area < 60 || area / menor < 0.12) continue;
        // superposiciones de diseño: leyenda sobre su propia foto, tarjetas con foto
        const comun = A.el.parentElement && A.el.parentElement.closest('figure,.gallery-item,.project-media,.eje-select,.news-media,.estacion-foto,.qs-foto,.actividad-afiche,.p-foto,.cycle-diagram');
        if (comun && comun.contains(B.el)) continue;
        out.push(`${ancho} ${ruta} SUPERPOSICION ${Math.round(area / menor * 100)}% ${nombre(A.el)} <> ${nombre(B.el)}`);
      }
    }
    f.remove();
  }
}
window.__AUDIT = out;
return out.length + ' hallazgos';
})()
