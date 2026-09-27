// ==========================================================================
// USACH Space Program - Rover Avanzado JavaScript
// ==========================================================================

import roverVideoUrl from '../../../assets/videos/rover_prueba_giro.mp4';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cargar video de prueba dinámico en el reproductor HUD
    const videoCover = document.getElementById('video-cover-hud');
    const videoWrapper = document.getElementById('video-wrapper');

    if (videoCover && videoWrapper) {
        videoCover.addEventListener('click', () => {
            videoWrapper.innerHTML = `
                <video autoplay loop controls playsinline style="width: 100%; height: 100%; object-fit: contain; display: block; background: #000;">
                    <source src="${roverVideoUrl}" type="video/mp4">
                    Tu navegador no soporta reproducción de video HTML5.
                </video>
            `;
        });
    }

    // 2. Generador de estrellas de fondo (Deep Space Ambient)
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        const starCount = 50;
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

    // 3. Smooth scrolling para botones ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 4. Menú móvil interactivo
    const menuToggle = document.getElementById('roverMenuToggle');
    const mobileMenu = document.getElementById('roverMobileMenu');

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
});
