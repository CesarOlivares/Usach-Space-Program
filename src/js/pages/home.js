import { noticias } from '../data/noticias.js';
import { initLightbox } from '../components/lightbox.js';
import { initProjectFilter } from '../components/project-filter.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EJE_LABEL = {
    robotica: 'Robótica',
    coheteria: 'Cohetería',
    orbital: 'Sistemas Orbitales',
    comunidad: 'Comunidad'
};

const escapeHtml = (text = '') =>
    String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const formatDate = (iso) => {
    if (!iso) return 'Vigente';
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
};

// === Novedades ===
function renderNews() {
    const grid = document.getElementById('newsGrid');
    if (!grid) return;

    if (!noticias.length) {
        grid.innerHTML = '<p class="news-empty">Pronto publicaremos novedades.</p>';
        return;
    }

    grid.innerHTML = noticias.slice(0, 5).map((n, i) => {
        const tag = n.enlace ? 'a' : 'article';
        const href = n.enlace ? ` href="${escapeHtml(n.enlace)}"` : '';
        const featured = i === 0;
        return `
            <${tag} class="news-card${featured ? ' is-featured' : ''}" data-eje="${escapeHtml(n.eje)}"${href}>
                <div class="news-media">
                    <img src="${escapeHtml(n.imagen)}" alt="" loading="${featured ? 'eager' : 'lazy'}">
                </div>
                <div class="news-body">
                    <p class="news-meta">
                        <span class="news-tag">${escapeHtml(EJE_LABEL[n.eje] || n.eje)}</span>
                        <time${n.fecha ? ` datetime="${escapeHtml(n.fecha)}"` : ''}>${formatDate(n.fecha)}</time>
                    </p>
                    <h3>${escapeHtml(n.titulo)}</h3>
                    <p>${escapeHtml(n.resumen)}</p>
                    ${featured && n.enlace ? '<span class="news-cta">Más información →</span>' : ''}
                </div>
            </${tag}>`;
    }).join('');
}

// === Contadores ===
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const format = (el, value) => {
        const pad = Number(el.dataset.pad || 0);
        el.textContent = String(value).padStart(pad, '0') + (el.dataset.suffix || '');
    };

    if (reduceMotion || !('IntersectionObserver' in window)) return;

    counters.forEach((el) => format(el, 0));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = Number(el.dataset.count);
            const duration = 1400;
            const start = performance.now();
            const tick = (now) => {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                format(el, Math.round(target * eased));
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.6 });

    counters.forEach((el) => observer.observe(el));
}

// === Pestañas de ejes ===
function initEjeTabs() {
    const tabs = [...document.querySelectorAll('.eje-tab')];
    if (!tabs.length) return;

    const select = (tab, focus = false) => {
        tabs.forEach((t) => {
            const active = t === tab;
            t.classList.toggle('is-active', active);
            t.setAttribute('aria-selected', String(active));
            t.tabIndex = active ? 0 : -1;
            document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
        });
        if (focus) tab.focus();
    };

    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => select(tab));
        tab.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            e.preventDefault();
            const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
            select(tabs[next], true);
        });
    });
}

// === Ciclo Piensa — Crea — Aprende ===
function initCycle() {
    const phases = [...document.querySelectorAll('.cycle-phase')];
    const nodes = [...document.querySelectorAll('.cycle-node')];
    const progress = document.querySelector('.cycle-progress');
    if (!phases.length) return;

    let current = 0;
    let timer = null;

    const show = (index) => {
        current = index;
        phases.forEach((p, i) => {
            p.classList.toggle('is-active', i === index);
            p.setAttribute('aria-selected', String(i === index));
        });
        nodes.forEach((n, i) => n.classList.toggle('is-active', i === index));
        if (progress) {
            const length = (index + 1) * 100;
            progress.style.strokeDasharray = `${length} ${300 - length + 1}`;
        }
    };

    const stop = () => clearInterval(timer);

    phases.forEach((phase, i) => {
        phase.addEventListener('click', () => {
            stop();
            show(i);
        });
    });

    show(0);

    if (reduceMotion || !('IntersectionObserver' in window)) return;

    // Avanza solo mientras la sección está en pantalla y nadie ha interactuado
    let interacted = false;
    phases.forEach((p) => p.addEventListener('click', () => { interacted = true; }));

    new IntersectionObserver(([entry]) => {
        stop();
        if (entry.isIntersecting && !interacted) {
            timer = setInterval(() => show((current + 1) % phases.length), 4000);
        }
    }, { threshold: 0.4 }).observe(document.querySelector('.cycle-layout'));
}

// === Carrusel de alianzas (duplica la lista para el loop continuo) ===
function initMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track || reduceMotion) return;
    [...track.children].forEach((child) => {
        const clone = child.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.tabIndex = -1;
        track.appendChild(clone);
    });
}

renderNews();
initCounters();
initEjeTabs();
initProjectFilter();
initCycle();
initLightbox();
initMarquee();
