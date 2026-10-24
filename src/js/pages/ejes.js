// Ejes: el selector del hero y la barra fija cambian el panel visible.
// El eje activo queda en la URL (#robotica, #coheteria, #orbital) para poder enlazarlo.
const EJES = ['robotica', 'coheteria', 'orbital'];
const ALIAS = { satelital: 'orbital', sistemas: 'orbital', cohete: 'coheteria', rover: 'robotica' };

const selectors = [...document.querySelectorAll('.eje-select')];
const barTabs = [...document.querySelectorAll('.ejes-bar-tab')];
const bar = document.querySelector('.ejes-bar');

function show(eje, { scroll = false, focus = false } = {}) {
    if (!EJES.includes(eje)) return;

    selectors.forEach((btn) => {
        const active = btn.dataset.eje === eje;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
        btn.tabIndex = active ? 0 : -1;
        if (active && focus) btn.focus();
    });

    barTabs.forEach((btn) => btn.classList.toggle('is-active', btn.dataset.eje === eje));
    bar.style.setProperty('--eje', `var(--eje-${eje})`);

    EJES.forEach((id) => {
        document.getElementById(`eje-${id}`).hidden = id !== eje;
    });

    history.replaceState(null, '', `#${eje}`);

    if (scroll) {
        const panel = document.getElementById(`eje-${eje}`);
        const top = bar.getBoundingClientRect().top + window.scrollY;
        // Solo baja si el panel no está ya a la vista
        if (window.scrollY < top - 10 || panel.getBoundingClientRect().top < 0) {
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }
}

selectors.forEach((btn, i) => {
    btn.addEventListener('click', () => show(btn.dataset.eje, { scroll: true }));
    btn.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + selectors.length) % selectors.length;
        show(selectors[next].dataset.eje, { focus: true });
    });
});

barTabs.forEach((btn) => {
    btn.addEventListener('click', () => show(btn.dataset.eje, { scroll: true }));
});

const ejeFromHash = () => {
    const id = location.hash.replace('#', '');
    return ALIAS[id] || id;
};

show(ejeFromHash());
window.addEventListener('hashchange', () => show(ejeFromHash(), { scroll: true }));
