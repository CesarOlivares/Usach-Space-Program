// ==========================================================================
// USACH Space Program - Proyectos JavaScript (Filtros & Navegación)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Filtrado interactivo de proyectos por categoría
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.catalog-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('is-hidden');
                        card.style.animation = 'fadeInCard 0.35s ease forwards';
                    } else {
                        card.classList.add('is-hidden');
                    }
                });
            });
        });
    }

    // 2. Menú móvil interactivo
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            menuToggle.classList.toggle('is-open');
        });

        // Cerrar menú al hacer clic en cualquier enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                menuToggle.classList.remove('is-open');
            });
        });
    }

    // 3. Generador de estrellas de fondo (Deep Space Ambient)
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        const starCount = 45;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            const size = Math.random() * 2.2 + 0.8;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDuration = `${(Math.random() * 3 + 2.5).toFixed(1)}s`;
            star.style.animationDelay = `${(Math.random() * 3).toFixed(1)}s`;
            star.style.opacity = (Math.random() * 0.5 + 0.2).toFixed(2);
            
            fragment.appendChild(star);
        }

        starsContainer.appendChild(fragment);
    }
});
