import { initLightbox } from '../components/lightbox.js';
import { initMotion } from '../components/motion.js';

// Marca en la subnavegación la sección que está en pantalla
function initSubnav() {
    const links = [...document.querySelectorAll('.ficha-subnav a')];
    if (!links.length || !('IntersectionObserver' in window)) return;

    const sections = links
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const setActive = (id) => {
        links.forEach((link) => {
            const active = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('is-active', active);
            if (active) {
                link.setAttribute('aria-current', 'true');
                const list = link.closest('ul');
                list.scrollTo({ left: link.parentElement.offsetLeft - 24, behavior: 'smooth' });
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach((section) => observer.observe(section));
}

initSubnav();
initLightbox();
initMotion();
