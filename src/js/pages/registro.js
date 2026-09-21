// Lógica del mini-buscador de carreras
        (function() {
            const inputCarrera = document.getElementById('carrera');
            const dropdownCarrera = document.getElementById('carreraDropdown');
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
                    inputCarrera.value = e.target.textContent;
                    dropdownCarrera.style.display = 'none';
                }
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-select-container')) {
                    dropdownCarrera.style.display = 'none';
                }
            });
        })();

        // Envío invisible a Google Sheets (Solo Google Form)
        document.getElementById('reclutamientoForm').addEventListener('submit', function(e) {
            e.preventDefault(); 

            const btn = document.querySelector('.btn-submit');
            const textoOriginal = btn.innerHTML;
            btn.innerHTML = 'REGISTRANDO TRIPULANTE...';
            btn.disabled = true;

            const correo = document.getElementById('correo').value;
            const carrera = document.getElementById('carrera').value;
            const proyecto = document.getElementById('proyecto_interes').value;

            const urlGoogleForm = 'https://docs.google.com/forms/d/e/1FAIpQLSf5ad1kQyhQqIUZXvP8V7Yt5WdOlDS4ruzRX9Rizw7PdsRE7w/formResponse';
            
            const formData = new URLSearchParams();
            formData.append('entry.957077564', correo);
            formData.append('entry.2006805985', carrera);
            formData.append('entry.1483108375', proyecto);

            fetch(urlGoogleForm, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }).then(() => {
                btn.innerHTML = '¡MANIFIESTO COMPLETADO CON ÉXITO!';
                btn.style.backgroundColor = '#1e4620'; 
                btn.style.borderColor = '#2e7d32';
                btn.style.color = '#ffffff';
                
                document.getElementById('reclutamientoForm').reset();
            }).catch((error) => {
                console.error('Error en la transmisión:', error);
                btn.innerHTML = 'FALLO DE CONEXIÓN. REINTENTANDO...';
                btn.disabled = false;
                setTimeout(() => {
                    btn.innerHTML = textoOriginal;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                }, 3000);
            });
        });
