// Movimiento guiado por el scroll (GSAP + ScrollTrigger) y scroll suave (Lenis).
// Criterio: cada animación explica algo (entrada en orden de lectura, profundidad
// en las fotos, la ruta que avanza); nunca bloquea la lectura.
// Con "reducir movimiento" no se carga nada de esto.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

const ESCRITORIO = '(min-width: 761px)';

// --- Scroll suave ---
function scrollSuave() {
    const header = document.querySelector('header');
    const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        anchors: { offset: -((header?.offsetHeight || 72) + 16) },
        // dentro de diálogos y listas desplegables el scroll es el nativo
        prevent: (nodo) => !!nodo.closest?.('dialog, .options-dropdown, .ejes-bar-inner, .p-dialogo')
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
    // al abrir un diálogo se detiene el scroll de fondo
    document.addEventListener('toggle', () => {
        if (document.querySelector('dialog[open]')) lenis.stop(); else lenis.start();
    }, true);
}

// --- Hero del inicio: el nombre se arma letra por letra ---
function partirEnLetras(el) {
    const texto = el.textContent.trim();
    el.setAttribute('aria-label', texto);
    el.textContent = '';
    texto.split(/\s+/).forEach((palabra, i, todas) => {
        const caja = document.createElement('span');
        caja.className = 'fx-palabra';
        caja.setAttribute('aria-hidden', 'true');
        for (const letra of palabra) {
            const s = document.createElement('span');
            s.className = 'fx-letra';
            s.textContent = letra;
            caja.append(s);
        }
        el.append(caja);
        if (i < todas.length - 1) el.append(' ');
    });
    return el.querySelectorAll('.fx-letra');
}

function hero() {
    const heroEl = document.querySelector('.hero');
    if (!heroEl) return;
    const titulo = heroEl.querySelector('.hero-title');
    const letras = titulo ? partirEnLetras(titulo) : [];
    const resto = heroEl.querySelectorAll('.hero-status, .hero-lede, .hero-actions, .hero-axes li');

    gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from(letras, { yPercent: 115, duration: 1.1, stagger: 0.035 })
        .from(resto, { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, '-=0.75');

    // Al bajar, el texto se aleja y el planeta se acerca
    gsap.matchMedia().add(ESCRITORIO, () => {
        const salida = { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to(heroEl.querySelector('.hero-inner'), { yPercent: -18, autoAlpha: 0.15, ease: 'none', scrollTrigger: salida });
        const video = heroEl.querySelector('.hero-video');
        if (video) gsap.to(video, { scale: 1.14, ease: 'none', scrollTrigger: salida });
    });
}

// --- Ruta 2027 ---
function ruta() {
    const seccion = document.querySelector('[data-ruta]');
    if (!seccion) return;
    gsap.matchMedia().add(ESCRITORIO, () => {
        seccion.querySelectorAll('.estacion').forEach((est, i) => {
            const par = i % 2 === 1;
            const recorrido = { trigger: est, start: 'top bottom', end: 'bottom top', scrub: true };
            // El número grande avanza en sentido contrario a la foto: profundidad
            const num = est.querySelector('.estacion-num');
            if (num) gsap.fromTo(num, { x: par ? 50 : -50 }, { x: par ? -30 : 30, ease: 'none', scrollTrigger: recorrido });
            const img = est.querySelector('.estacion-foto img');
            if (img) gsap.fromTo(img, { yPercent: -7 }, { yPercent: 7, ease: 'none', scrollTrigger: recorrido });
        });

        // El rótulo vertical baja con la lectura
        const vertical = seccion.querySelector('.ruta-vertical span');
        if (vertical) gsap.fromTo(vertical, { yPercent: -10 }, { yPercent: 25, ease: 'none', scrollTrigger: { trigger: seccion.querySelector('.ruta-cuerpo'), start: 'top center', end: 'bottom center', scrub: true } });
    });

    // Las siglas de las aspiraciones se rellenan a medida que entran
    seccion.querySelectorAll('.aspira-sigla').forEach((sigla) => {
        gsap.fromTo(sigla, { color: 'rgba(245, 245, 240, 0)' }, {
            color: 'rgba(245, 245, 240, 0.92)', ease: 'none',
            scrollTrigger: { trigger: sigla, start: 'top 88%', end: 'top 45%', scrub: true }
        });
    });
}

// --- Títulos de sección: se descubren de abajo hacia arriba ---
function titulos() {
    document.querySelectorAll('main .section h2, main .page-hero h1, main .ficha-hero h1').forEach((h) => {
        if (h.closest('.hero, dialog, .cta-panel')) return;
        gsap.from(h, {
            clipPath: 'inset(0 0 100% 0)', yPercent: 35, duration: 1, ease: 'expo.out',
            clearProps: 'clipPath,transform',
            scrollTrigger: { trigger: h, start: 'top 90%', once: true }
        });
    });
}

// --- Fotos con profundidad dentro de su marco ---
function fotos() {
    gsap.matchMedia().add(ESCRITORIO, () => {
        const candidatas = document.querySelectorAll('.project-media:not(.is-poster) img, .vision-figure img, .wide-figure img, .ficha-hero-media img, .page-hero-media img, .eje-figure img');
        candidatas.forEach((img) => {
            const marco = img.parentElement;
            if (!/(hidden|clip)/.test(getComputedStyle(marco).overflow)) return;
            gsap.fromTo(img, { yPercent: -6 }, {
                yPercent: 6, ease: 'none',
                scrollTrigger: { trigger: marco, start: 'top bottom', end: 'bottom top', scrub: true }
            });
        });
    });
}

// --- Métricas: la cifra cuenta mientras la fila entra (ya lo hace home.js);
//     aquí solo se escalonan las tarjetas de noticias y de equipo al entrar ---
function grillas() {
    const grupos = ['.news-grid', '.qs-equipo', '.ruta-hitos'];
    grupos.forEach((sel) => {
        const g = document.querySelector(sel);
        if (!g) return;
        // se espera a que el contenido dinámico (noticias, equipo) esté en la página
        const animar = () => {
            const hijos = [...g.children];
            if (!hijos.length || g.dataset.fx) return;
            g.dataset.fx = '1';
            gsap.from(hijos, {
                y: 40, autoAlpha: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, clearProps: 'transform,opacity,visibility',
                scrollTrigger: { trigger: g, start: 'top 88%', once: true }
            });
        };
        animar();
        if (!g.dataset.fx) new MutationObserver((_, obs) => { animar(); if (g.dataset.fx) obs.disconnect(); }).observe(g, { childList: true });
    });
}

export function initScrollFx() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('fx');
    scrollSuave();
    hero();
    ruta();
    titulos();
    fotos();
    grillas();
    // las medidas cambian al cargar fuentes e imágenes
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
