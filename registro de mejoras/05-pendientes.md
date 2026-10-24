# 05 · Pendientes

Lista viva de lo que falta hacer, decidir o confirmar. Marca con `[x]` lo que se vaya cerrando.

## Contenido por confirmar (equipo)

- [ ] **Noticias reales.** Las de junio 2026 en `src/js/data/noticias.js` se armaron con las fotos de la galería y la fecha del nombre del archivo. Confirmar o reemplazar.
- [ ] **Líderes de Sistemas Orbitales.** El sitio dice "Daniel González y Martín Castillo", pero `estatus actual.md` solo dice "Daniel". Confirmar.
- [ ] **Fases del CubeSat.** En `estatus actual.md` las fases 1 y 2 tienen fechas sin completar ("M-Mes", "Mes-Mes"). Agregar los meses cuando estén definidos.
- [ ] **Estado actual de cada proyecto.** Las líneas de tiempo muestran fases, pero no cuál está en curso. Si el equipo lo confirma, se puede marcar la fase activa.

## Fotos propias (equipo)

- [ ] **Mini CubeSat y Salva a Usachín** usan fotos de la NASA en el hero porque no hay fotos propias de esos desafíos.
- [ ] Más fotos reales de **Cohetería** y **Sistemas Orbitales**.
- [ ] Foto real de las **visitas a colegios** con el rover.
- [ ] Fotos de **eventos y talleres** para acompañar nuevas noticias.

## Próximas mejoras de diseño (fase 3 propuesta)

- [ ] Animaciones de aparición al hacer scroll en todas las páginas (con `IntersectionObserver` y respetando `prefers-reduced-motion`).
- [ ] Barra de progreso en las fichas para indicar el avance de cada proyecto.
- [ ] Rediseñar **Registro**, **Talleres** y **Login** con el nuevo menú, la paleta y los componentes compartidos (hoy siguen con el diseño anterior).
- [ ] Página o archivo de noticias completo, si la cantidad de novedades crece.

## Técnico

- [ ] **Videos pesados:** `planeta_loop.mp4` (33 MB) e `iss_loop.mp4` (41 MB). Comprimir a menos de 5 MB cada uno o reemplazarlos por versiones más cortas.
- [ ] **Imágenes pesadas:** `rover_armado_foto_grupal.jpg` (3 MB) y varias de más de 700 KB. Convertir a WebP y redimensionar.
- [ ] **Limpiar archivos sin uso:** `index.css`, `rover_avanzado.css`, `mision.css`, `cubesat_avanzado.css`, `rover_avanzado.js`, `rover.html` e `impresion3d.html`. Confirmar que nadie los necesita antes de borrarlos.
- [ ] **Vulnerabilidades de npm:** revisar las 2 alertas "high" con `npm audit` y actualizar con cuidado.
- [ ] **Header y footer duplicados:** se repiten en cada HTML. El proyecto ya tiene `vite-plugin-html-inject` y `src/components/header.html` y `footer.html`, que se podrían usar para tener una sola copia.
