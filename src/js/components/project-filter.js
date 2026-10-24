// Filtro de tarjetas de proyecto con uno o más grupos de chips.
// Chip:    <button class="filter-chip" data-group="tipo" data-filter="emblema">
// Tarjeta: <a class="project-card" data-tipo="emblema" data-eje="robotica">
// data-filter="all" muestra todo dentro de su grupo.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initProjectFilter(root = document) {
    const chips = [...root.querySelectorAll('.filter-chip')];
    const cards = [...root.querySelectorAll('.project-card')];
    const empty = root.querySelector('.filter-empty');
    if (!chips.length) return;

    const active = {};
    chips.filter((c) => c.classList.contains('is-active')).forEach((c) => {
        active[c.dataset.group] = c.dataset.filter;
    });

    const matches = (card) =>
        Object.entries(active).every(([group, value]) => value === 'all' || card.dataset[group] === value);

    const apply = () => {
        cards.forEach((card) => {
            if (!matches(card) && !card.hidden) card.classList.add('is-leaving');
        });

        setTimeout(() => {
            let visible = 0;
            cards.forEach((card) => {
                const show = matches(card);
                const wasHidden = card.hidden;
                card.classList.remove('is-leaving', 'is-entering');
                card.hidden = !show;
                if (show) visible++;
                if (show && wasHidden) {
                    void card.offsetWidth;
                    card.classList.add('is-entering');
                }
            });
            if (empty) empty.hidden = visible > 0;
        }, reduceMotion ? 0 : 250);
    };

    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            const group = chip.dataset.group;
            chips.filter((c) => c.dataset.group === group).forEach((c) => {
                c.classList.toggle('is-active', c === chip);
                c.setAttribute('aria-pressed', String(c === chip));
            });
            active[group] = chip.dataset.filter;
            apply();
        });
    });
}
