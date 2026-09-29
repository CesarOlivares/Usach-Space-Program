// ==========================================================================
// USACH Space Program - Admisión Talleres JavaScript
// Conexión preparada para Google Forms & Experiencia Interactiva HUD
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selector y Buscador Inteligente de Carreras USACH
    const inputCarrera = document.getElementById('carrera');
    const dropdownCarrera = document.getElementById('carreraDropdown');
    
    if (inputCarrera && dropdownCarrera) {
        const itemsCarrera = dropdownCarrera.getElementsByClassName('option-item');

        inputCarrera.addEventListener('focus', () => {
            dropdownCarrera.style.display = 'block';
        });

        inputCarrera.addEventListener('input', () => {
            const filter = inputCarrera.value.toLowerCase();
            dropdownCarrera.style.display = 'block';
            
            for (let i = 0; i < itemsCarrera.length; i++) {
                const txtValue = itemsCarrera[i].textContent || itemsCarrera[i].innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    itemsCarrera[i].style.display = "";
                } else {
                    itemsCarrera[i].style.display = "none";
                }
            }
        });

        dropdownCarrera.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('option-item')) {
                inputCarrera.value = e.target.textContent.trim();
                dropdownCarrera.style.display = 'none';
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-select-container')) {
                dropdownCarrera.style.display = 'none';
            }
        });
    }

    // 2. Preselección Automática por Parámetro URL (?mision=salva_usachin / ?mision=mini_cubesat)
    const urlParams = new URLSearchParams(window.location.search);
    const misionParam = urlParams.get('mision');
    const equipoPrimario = document.getElementById('equipo_primario');

    if (misionParam && equipoPrimario) {
        if (misionParam === 'salva_usachin' || misionParam === 'eggdrop') {
            equipoPrimario.value = "Misión: Salva a Usachín (Paracaídas y Mecánica Pasiva)";
        } else if (misionParam === 'mini_cubesat' || misionParam === 'cansat') {
            equipoPrimario.value = "Misión: Mini Cube-Sat (Electrónica y Telemetría Aérea)";
        }
    }

    // 3. Manejo del Formulario de Admisión (Preparado para Google Forms)
    const form = document.getElementById('admisionTalleresForm');
    const successCard = document.getElementById('submissionSuccessCard');
    const submitBtn = document.getElementById('btnSubmitAdmision');

    // CONFIGURACIÓN DE GOOGLE FORM (SE ACTUALIZARÁ CON EL ENLACE DEL USUARIO)
    const GOOGLE_FORM_ACTION_URL = ''; // Enlace de formResponse se colocará aquí

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const btnOriginalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>TRANSMITIENDO POSTULACIÓN...</span>';
            submitBtn.disabled = true;

            // Recolección de Datos
            const payload = {
                nombre: document.getElementById('nombre')?.value || '',
                correo: document.getElementById('correo')?.value || '',
                telefono: document.getElementById('telefono')?.value || '',
                carrera: document.getElementById('carrera')?.value || '',
                bloqueW3: document.querySelector('input[name="bloque_w3"]:checked')?.value || '',
                skillElectronica: document.getElementById('skill_electronica')?.value || '',
                skillProgramacion: document.getElementById('skill_programacion')?.value || '',
                skillDiseno3d: document.getElementById('skill_diseno3d')?.value || '',
                skillPrototipado: document.getElementById('skill_prototipado')?.value || '',
                equipoPrimario: document.getElementById('equipo_primario')?.value || '',
                equipoSecundario: document.getElementById('equipo_secundario')?.value || '',
                modalidad: document.querySelector('input[name="modalidad_postulacion"]:checked')?.value || '',
                integrantesEquipo: document.getElementById('integrantes_equipo')?.value || '',
                expectativasAporte: document.getElementById('expectativas_aporte')?.value || ''
            };

            // Si hay enlace a Google Forms configurado, despachar vía fetch no-cors
            if (GOOGLE_FORM_ACTION_URL && GOOGLE_FORM_ACTION_URL.trim() !== '') {
                const formData = new URLSearchParams();
                // Mapear con los entry.XXXX correspondientes
                formData.append('entry.NOMBRE', payload.nombre);
                formData.append('entry.CORREO', payload.correo);
                formData.append('entry.CARRERA', payload.carrera);
                formData.append('entry.BLOQUE_W3', payload.bloqueW3);
                // etc...

                fetch(GOOGLE_FORM_ACTION_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData.toString()
                }).then(() => {
                    mostrarExito();
                }).catch(() => {
                    // Fallback visual positivo
                    mostrarExito();
                });
            } else {
                // Modo Vista Previa / Interfaz: Simulación fluida de 800ms
                setTimeout(() => {
                    console.log('Datos capturados en interfaz de admisión:', payload);
                    mostrarExito();
                }, 800);
            }

            function mostrarExito() {
                form.style.display = 'none';
                if (successCard) {
                    successCard.style.display = 'block';
                    successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // 4. Mostrar/Ocultar campo de integrantes según modalidad
    const modalidadRadios = document.querySelectorAll('input[name="modalidad_postulacion"]');
    const campoIntegrantes = document.getElementById('campoIntegrantesGroup');

    if (modalidadRadios.length > 0 && campoIntegrantes) {
        modalidadRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'Equipo Formado') {
                    campoIntegrantes.style.display = 'flex';
                    campoIntegrantes.querySelector('input')?.setAttribute('required', 'required');
                } else {
                    campoIntegrantes.style.display = 'none';
                    campoIntegrantes.querySelector('input')?.removeAttribute('required');
                }
            });
        });
    }

    // 5. Menú Móvil
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-active');
            menuToggle.classList.toggle('is-open');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-active');
                menuToggle.classList.remove('is-open');
            });
        });
    }

    // 6. Generador de estrellas de fondo (Deep Space Ambient)
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 45; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2 + 0.8;
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
