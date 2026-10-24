// Visor a pantalla completa para galerías.
// Espera botones .gallery-item con data-full y data-caption, y un <dialog id="lightbox">.
export function initLightbox() {
    const dialog = document.getElementById('lightbox');
    const items = [...document.querySelectorAll('.gallery-item')];
    if (!dialog || !items.length || typeof dialog.showModal !== 'function') return;

    const img = dialog.querySelector('img');
    const caption = dialog.querySelector('figcaption');
    let index = 0;

    const open = (i) => {
        index = (i + items.length) % items.length;
        const item = items[index];
        img.src = item.dataset.full;
        img.alt = item.dataset.caption;
        caption.textContent = item.dataset.caption;
    };

    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            open(i);
            dialog.showModal();
        });
    });

    dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('.lightbox-prev').addEventListener('click', () => open(index - 1));
    dialog.querySelector('.lightbox-next').addEventListener('click', () => open(index + 1));
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') open(index + 1);
        if (e.key === 'ArrowLeft') open(index - 1);
    });
}
