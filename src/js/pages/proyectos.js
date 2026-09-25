document.addEventListener('DOMContentLoaded', () => {
            const slider = document.querySelector('.projects-slider');
            const btnPrev = document.getElementById('btnPrev');
            const btnNext = document.getElementById('btnNext');

            if (slider && btnPrev && btnNext) {
                const scrollAmount = window.innerWidth * 0.8;
                
                btnPrev.addEventListener('click', () => {
                    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });
                
                btnNext.addEventListener('click', () => {
                    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });
            }
        });
