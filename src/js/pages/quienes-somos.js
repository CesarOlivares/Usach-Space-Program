import { equipo } from '../data/equipo.js';

const EJE_LABEL = {
    robotica: 'Robótica',
    coheteria: 'Cohetería',
    orbital: 'Sistemas Orbitales'
};

const escapeHtml = (text = '') =>
    String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function renderEquipo() {
    const list = document.getElementById('equipo');
    if (!list) return;

    list.innerHTML = equipo.map((p) => `
        <li class="qs-persona" id="${escapeHtml(p.slug)}" data-eje="${escapeHtml(p.ejes[0] || '')}">
            <div class="qs-foto"><img src="${escapeHtml(p.foto)}" alt="${escapeHtml(p.nombre)}" loading="lazy" style="object-position: ${escapeHtml(p.foco || '50% 30%')}"></div>
            <p class="qs-cargo">${escapeHtml(p.cargo)}</p>
            <h3 class="qs-nombre">${escapeHtml(p.nombre)}</h3>
            <p class="qs-eje">${escapeHtml(p.rolEje)}</p>
            <p class="qs-carrera">${escapeHtml(p.carrera)}</p>
            <button class="qs-abrir" type="button" data-slug="${escapeHtml(p.slug)}" aria-haspopup="dialog">Ver perfil <span aria-hidden="true">→</span></button>
        </li>`).join('');
}

function fichaHtml(p) {
    const bio = p.bio.length
        ? p.bio.map((t) => `<p>${escapeHtml(t)}</p>`).join('')
        : '<p class="qs-pendiente">Bio en preparación.</p>';
    const destacados = p.destacados?.length
        ? `<ul>${p.destacados.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}</ul>`
        : '';
    const c = p.contacto || {};
    const contacto = (c.correo || c.linkedin)
        ? `<div class="qs-contacto">
               ${c.correo ? `<a href="mailto:${escapeHtml(c.correo)}">${escapeHtml(c.correo)}</a>` : ''}
               ${c.linkedin ? `<a href="${escapeHtml(c.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>` : ''}
           </div>`
        : '';
    const ejes = p.ejes.map((e) => EJE_LABEL[e]).filter(Boolean).join(' · ');

    return `
        <div class="qs-ficha-grid">
            <figure class="qs-ficha-foto"><img src="${escapeHtml(p.foto)}" alt="${escapeHtml(p.nombre)}" style="object-position: ${escapeHtml(p.foco || '50% 30%')}"></figure>
            <div class="qs-ficha-texto" data-eje="${escapeHtml(p.ejes[0] || '')}">
                <p class="qs-cargo">${escapeHtml(p.cargo)}${ejes ? ` · ${escapeHtml(ejes)}` : ''}</p>
                <h2 id="ficha-titulo">${escapeHtml(p.nombre)}</h2>
                <p class="qs-eje">${escapeHtml(p.rolEje)}</p>
                <p><em>${escapeHtml(p.carrera)}</em></p>
                ${bio}
                ${destacados}
                ${contacto}
            </div>
        </div>`;
}

function initFicha() {
    const dialog = document.getElementById('ficha');
    const body = document.getElementById('fichaContenido');
    if (!dialog || !body) return;

    const abrir = (slug) => {
        const p = equipo.find((x) => x.slug === slug);
        if (!p) return;
        body.innerHTML = fichaHtml(p);
        dialog.showModal();
        history.replaceState(null, '', `#${slug}`);
    };

    document.getElementById('equipo')?.addEventListener('click', (e) => {
        const btn = e.target.closest('.qs-abrir');
        if (btn) abrir(btn.dataset.slug);
    });

    dialog.querySelector('.qs-cerrar')?.addEventListener('click', () => dialog.close());
    // Clic fuera del contenido cierra la ficha
    dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => history.replaceState(null, '', location.pathname));

    // Enlace directo a una persona: /quienes-somos/#cesar-olivares
    const slug = decodeURIComponent(location.hash.slice(1));
    if (slug) abrir(slug);
}

renderEquipo();
initFicha();
