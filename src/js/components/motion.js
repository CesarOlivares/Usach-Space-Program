// Movimiento ambiental del sitio: aparición al hacer scroll, menú que se adapta
// al tono de la sección y parallax leve. Sin librerías; solo transform y opacity.
// Con "reducir movimiento" activado no se oculta ni se anima nada.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Elementos que aparecen al hacer scroll. Las grillas con muchos elementos
// (métricas, noticias, proyectos, galería...) entran como un solo bloque, no
// tarjeta por tarjeta, para no saturar. Los hermanos de un mismo contenedor
// entran escalonados (--reveal-i).
const REVEAL_SELECTORS = [
    '.section-head',
    '.metrics-grid',
    '.news-grid',
    '.filter-bar',
    '.projects-grid',
    '.ejes-tabs',
    '.cycle-copy',
    '.cycle-diagram',
    '.manifesto',
    '.gallery',
    '.join-card',
    '.marquee',
    '.section-cta',
    '.feature-cards',
    '.expand-grid',
    '.timeline',
    '.goal-cards',
    '.split > *',
    '.cta-panel',
    '.ficha-quote',
    '.video-frame',
    '.steps',
    '.vision',
    '.callout-row',
    '.profile',
    '.kinds'
];

export function initReveal(root = document) {
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const items = [...root.querySelectorAll(REVEAL_SELECTORS.join(','))]
        .filter((el) => !el.closest('.hero, .ficha-hero, .page-hero'));
    if (!items.length) return;

    // Índice de escalonado por contenedor (máximo 5 pasos para no demorar)
    const counters = new Map();
    items.forEach((el) => {
        const parent = el.parentElement;
        const i = counters.get(parent) || 0;
        counters.set(parent, i + 1);
        el.style.setProperty('--reveal-i', Math.min(i, 5));
        el.classList.add('reveal');
    });

    document.documentElement.classList.add('motion-ready');

    // Al terminar de aparecer se quitan las clases, para que el elemento recupere
    // sus propias transiciones (hover, filtros) sin el retraso del escalonado
    const settle = (el) => {
        el.classList.remove('reveal', 'is-visible');
        el.style.removeProperty('--reveal-i');
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Si ya quedó arriba de la pantalla (salto con ancla, recarga a mitad
            // de página) también se muestra, para no dejar huecos al volver
            const passed = entry.boundingClientRect.bottom < 0;
            if (!entry.isIntersecting && !passed) return;
            const el = entry.target;
            el.classList.add('is-visible');
            el.addEventListener('transitionend', (e) => {
                if (e.target === el && e.propertyName === 'transform') settle(el);
            });
            // Respaldo por si la transición no dispara (elemento oculto, pestaña inactiva)
            setTimeout(() => settle(el), 900);
            observer.unobserve(el);
        });
    // Se activa apenas el bloque asoma (y un poco antes), para que ninguna zona
    // quede vacía mientras se hace scroll rápido o al llegar al final de la página
    }, { rootMargin: '0px 0px 10% 0px', threshold: 0 });

    items.forEach((el) => observer.observe(el));
}

// El menú fijo y las barras fijas [data-adaptive-bar] toman tono claro cuando
// pasan sobre una sección [data-tone="light"]
export function initAdaptiveHeader() {
    const zones = [...document.querySelectorAll('[data-tone]')];
    const bars = [document.querySelector('header'), ...document.querySelectorAll('[data-adaptive-bar]')].filter(Boolean);
    if (!bars.length || !zones.length || !('IntersectionObserver' in window)) return;

    let observers = [];
    const build = () => {
        observers.forEach((o) => o.disconnect());
        observers = bars.map((bar) => {
            // Altura del centro de la barra cuando está fija (top de sticky + mitad)
            const stickyTop = parseFloat(getComputedStyle(bar).top) || 0;
            const probe = Math.round(stickyTop + bar.offsetHeight / 2);
            const bottom = Math.max(window.innerHeight - probe - 2, 0);
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        bar.classList.toggle('over-light', entry.target.dataset.tone === 'light');
                    }
                });
            }, { rootMargin: `-${probe}px 0px -${bottom}px 0px` });
            zones.forEach((zone) => observer.observe(zone));
            return observer;
        });
    };

    build();
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(build, 200);
    });
}

// Parallax leve: [data-parallax="0.15"] se desplaza más lento que el scroll
export function initParallax() {
    if (reduceMotion) return;
    const items = [...document.querySelectorAll('[data-parallax]')];
    if (!items.length) return;

    let ticking = false;
    const update = () => {
        const vh = window.innerHeight;
        items.forEach((el) => {
            const rect = el.parentElement.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > vh) return;
            const speed = parseFloat(el.dataset.parallax) || 0.1;
            const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        });
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
        }
    }, { passive: true });
    update();
}

export function initMotion() {
    initReveal();
    initAdaptiveHeader();
    initParallax();
}
