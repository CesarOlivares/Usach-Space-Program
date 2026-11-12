// Regla del sitio: ningún elemento decorativo (.deco) cruza ni roza un texto.
// Como las posiciones cambian con el ancho de pantalla, se comprueba en el
// navegador: cada elemento se achica hasta no tocar ningún texto de su sección,
// y si ni así cabe, se oculta. Se vuelve a calcular al cambiar el tamaño.
const TEXTO = 'h1,h2,h3,h4,p,li,dt,dd,a,button,label,figcaption,blockquote,input,select,textarea,.estacion-num,.aspira-sigla,img';
const MARGEN = 10;
const PASOS = [1, 0.82, 0.66, 0.5];

function cajasDeTexto(seccion, deco) {
    const cajas = [];
    seccion.querySelectorAll(TEXTO).forEach((el) => {
        if (el.closest('.deco, [hidden], [aria-hidden="true"]') || el.contains(deco)) return;
        // Una foto puede llevar decoración encima si la sección lo pide
        if (el.tagName === 'IMG' && deco.hasAttribute('data-sobre-foto')) return;
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') return;
        if (el.tagName === 'IMG' || el.matches('input, select, textarea, button')) {
            const r = el.getBoundingClientRect();
            if (r.width > 2 && r.height > 2) cajas.push(r);
            return;
        }
        // Para el texto se usan las líneas reales, no el bloque completo
        for (const nodo of el.childNodes) {
            if (nodo.nodeType !== 3 || !nodo.nodeValue.trim()) continue;
            const rango = document.createRange();
            rango.selectNodeContents(nodo);
            for (const r of rango.getClientRects()) if (r.width > 1 && r.height > 1) cajas.push(r);
        }
    });
    return cajas;
}

const choca = (a, cajas) => cajas.some((b) =>
    a.left < b.right + MARGEN && a.right > b.left - MARGEN && a.top < b.bottom + MARGEN && a.bottom > b.top - MARGEN);

function ajustar(deco) {
    if (deco.classList.contains('deco-linea')) return;
    deco.style.removeProperty('--deco-w');
    deco.removeAttribute('data-oculta');
    const seccion = deco.offsetParent || deco.parentElement;
    if (!seccion) return;
    const base = deco.getBoundingClientRect().width;
    if (!base) return;
    const cajas = cajasDeTexto(seccion, deco);
    const limite = seccion.getBoundingClientRect();
    for (const f of PASOS) {
        if (f < 1) deco.style.setProperty('--deco-w', `${Math.round(base * f)}px`);
        const r = deco.getBoundingClientRect();
        // solo cuenta la parte visible dentro de la sección
        const v = { left: Math.max(r.left, limite.left), right: Math.min(r.right, limite.right), top: Math.max(r.top, limite.top), bottom: Math.min(r.bottom, limite.bottom) };
        if (v.right <= v.left || v.bottom <= v.top || !choca(v, cajas)) return;
    }
    deco.setAttribute('data-oculta', '');
}

export function initDecoGuard() {
    const todas = () => document.querySelectorAll('.deco');
    const correr = () => todas().forEach(ajustar);
    const listo = document.fonts?.ready || Promise.resolve();
    // se espera a que la tipografía y las entradas animadas se asienten
    listo.then(() => setTimeout(correr, 700));
    window.addEventListener('load', () => setTimeout(correr, 300), { once: true });
    let t;
    window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(correr, 250); });
}
