import { noticias } from '../data/noticias.js';
import { initLightbox } from '../components/lightbox.js';
import { initProjectFilter } from '../components/project-filter.js';
import { initMotion } from '../components/motion.js';

const EJE_LABEL = {
    robotica: 'Robótica',
    coheteria: 'Cohetería',
    orbital: 'Sistemas Orbitales',
    comunidad: 'Comunidad'
};

const ENLACE_LABEL = {
    '/proyectos/rover/': 'Conoce el rover',
    '/proyectos/cohete/': 'Conoce el cohete de agua',
    '/proyectos/cubesat/': 'Conoce el CubeSat 1U'
};

const escapeHtml = (text = '') =>
    String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const parseDate = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
};

function renderNotas() {
    const list = document.getElementById('notas');
    if (!list) return;

    const stat = document.getElementById('statEventos');
    if (stat) stat.textContent = noticias.length;

    list.innerHTML = noticias.map((n) => {
        const date = parseDate(n.fecha);
        const dia = date.toLocaleDateString('es-CL', { day: 'numeric' });
        const mes = date.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
        const fotos = n.fotos.map((f, i) => `
            <button class="gallery-item${i === 0 ? ' is-cover' : ''}" data-full="${escapeHtml(f.src)}" data-caption="${escapeHtml(f.alt)}">
                <img src="${escapeHtml(f.src)}" alt="${escapeHtml(f.alt)}" loading="lazy">
            </button>`).join('');
        const enlace = n.enlace
            ? `<a class="text-link" href="${escapeHtml(n.enlace)}">${escapeHtml(ENLACE_LABEL[n.enlace] || 'Ver más')} <span aria-hidden="true">→</span></a>`
            : '';
        return `
            <article class="nota" id="${escapeHtml(n.slug)}" data-eje="${escapeHtml(n.eje)}" data-filter-item>
                <div class="nota-aside">
                    <time class="nota-fecha" datetime="${escapeHtml(n.fecha)}"><span class="nota-dia">${dia}</span><span class="nota-mes">${mes}</span></time>
                    <p class="nota-tag">${escapeHtml(EJE_LABEL[n.eje] || n.eje)}</p>
                    <p class="nota-lugar">${escapeHtml(n.lugar)}</p>
                </div>
                <div class="nota-main">
                    <h2>${escapeHtml(n.titulo)}</h2>
                    ${n.cuerpo.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
                    <div class="nota-galeria" data-gallery data-count="${Math.min(n.fotos.length, 5)}">${fotos}</div>
                    ${enlace}
                </div>
            </article>`;
    }).join('');

    // El contenido se arma después de cargar, así que el salto al ancla se hace a mano
    // (y otra vez al terminar de cargar, por si el navegador restaura el scroll arriba)
    const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) {
        target.scrollIntoView();
        window.addEventListener('load', () => target.scrollIntoView(), { once: true });
    }
}

renderNotas();
initProjectFilter(document.getElementById('bitacora'));
initLightbox();
initMotion();
