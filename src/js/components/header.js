(function() {
        const initMenu = () => {
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');
            if (menuToggle && navLinks) {
                // Remove class on init just in case
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                
                // Toggle action
                menuToggle.addEventListener('click', () => {
                    menuToggle.classList.toggle('active');
                    navLinks.classList.toggle('active');
                });
                
                // Close navigation when clicking a link
                document.querySelectorAll('#navLinks a').forEach(link => {
                    link.addEventListener('click', () => {
                        menuToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                    });
                });
            }
        };
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initMenu);
        } else {
            initMenu();
        }
    })();
