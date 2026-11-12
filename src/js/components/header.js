// Menú móvil, enlace activo y cierre con Escape.
import { initTildes } from './tildes.js';
import { initDecoGuard } from './deco-guard.js';

initTildes();
initDecoGuard();
function initMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navLinks');
    if (!toggle || !nav) return;

    const set = (open) => {
        toggle.classList.toggle('active', open);
        nav.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    set(false);

    toggle.addEventListener('click', () => set(!nav.classList.contains('active')));
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) { set(false); toggle.focus(); }
    });

    // Marca la sección actual
    const ruta = location.pathname.replace(/\/+$/, '/') || '/';
    nav.querySelectorAll('a[href^="/"]').forEach((a) => {
        const href = a.getAttribute('href');
        if (href.includes('#') || href === '/') return;
        if (ruta.startsWith(href)) a.setAttribute('aria-current', 'page');
    });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMenu);
else initMenu();
