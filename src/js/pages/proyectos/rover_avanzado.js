// Cargar video diferido al hacer clic en el cover
        document.getElementById('video-cover').addEventListener('click', function() {
            const wrapper = document.getElementById('video-wrapper');
            wrapper.innerHTML = `
                <video autoplay loop muted controls style="width: 100%; display: block; background: #000;">
                    <source src="../../../fotos_rover/rover_prueba_giro.mp4" type="video/mp4">
                    Tu navegador no soporta la reproducción de video HTML5.
                </video>
            `;
        });

        // Generador simple de estrellas dinámicas
        const starsContainer = document.getElementById('stars');
        for(let i = 0; i < 45; i++) {
            let star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 2.5 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDuration = (Math.random() * 3 + 2.5) + 's';
            star.style.animationDelay = (Math.random() * 2) + 's';
            starsContainer.appendChild(star);
        }
