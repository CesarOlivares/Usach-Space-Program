// La tipografía de títulos (Horizon) no trae tildes ni ñ: dibuja "MISION" aunque
// el texto diga "Misión". Este módulo detecta el texto que usa esa fuente y le
// dibuja la tilde encima de la letra, sin cambiar de tipografía.
// El texto original queda en aria-label para lectores de pantalla.
const BASE = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u', Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', ñ: 'n', Ñ: 'N', ü: 'u', Ü: 'U' };
const MARCA = { ñ: 'virgulilla', Ñ: 'virgulilla', ü: 'dieresis', Ü: 'dieresis' };
const CON_TILDE = /[áéíóúÁÉÍÓÚñÑüÜ]/;

const usaHorizon = (el) => /^["']?Horizon/i.test(getComputedStyle(el).fontFamily);

function corregir(nodo) {
    const padre = nodo.parentElement;
    if (!padre || padre.closest('.tilde, script, style, textarea, input, [data-sin-tildes]')) return;
    if (!usaHorizon(padre)) return;

    // Se anota el texto real en el bloque más cercano que agrupa la frase
    const bloque = padre.closest('h1, h2, h3, h4, button, a');
    if (bloque && !bloque.hasAttribute('aria-label') && !bloque.querySelector('a, button')) {
        bloque.setAttribute('aria-label', bloque.textContent.replace(/\s+/g, ' ').trim());
    }

    const frag = document.createDocumentFragment();
    for (const parte of nodo.nodeValue.split(/([áéíóúÁÉÍÓÚñÑüÜ])/)) {
        if (!parte) continue;
        if (BASE[parte]) {
            const s = document.createElement('span');
            s.className = `tilde tilde--${MARCA[parte] || 'aguda'}`;
            s.textContent = BASE[parte];
            frag.append(s);
        } else {
            frag.append(parte);
        }
    }
    nodo.replaceWith(frag);
}

function recorrer(raiz) {
    const walker = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => (CON_TILDE.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT)
    });
    const nodos = [];
    while (walker.nextNode()) nodos.push(walker.currentNode);
    nodos.forEach(corregir);
}

export function initTildes() {
    const correr = () => recorrer(document.body);
    // Hay que esperar a que la fuente cargue: antes de eso el navegador usa otra
    (document.fonts?.ready || Promise.resolve()).then(() => {
        correr();
        // El contenido que llega después (noticias, equipo) también se corrige
        new MutationObserver((cambios) => {
            for (const c of cambios) {
                c.addedNodes.forEach((n) => {
                    if (n.nodeType === 1 && !n.classList?.contains('tilde')) recorrer(n);
                });
            }
        }).observe(document.body, { childList: true, subtree: true });
    });
}
