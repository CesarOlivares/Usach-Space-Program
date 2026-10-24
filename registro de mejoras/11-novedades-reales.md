# 11 · Novedades reales y página de Novedades

## Qué se cambió

**Noticias reales.** Las novedades provisionales, armadas con fotos de la galería, se reemplazaron por 7 actividades reales del programa. El material salió de la carpeta "Multimedia" del Drive del equipo. Cada texto se escribió con la descripción que dio el equipo de cada evento.

| Fecha | Actividad | Eje |
|---|---|---|
| 30 sep 2026 | Organizafest (feria de organizaciones de la VRAE), con lanzamiento de un cohete de agua a baja escala | Comunidad |
| 28 sep 2026 | Pruebas del cohete de agua de una etapa (500 ml): 4 lanzamientos, ~60 m | Cohetería |
| 9 sep 2026 | Armado de un CubeSat 1U a escala real con motores que giran los paneles | Sistemas Orbitales |
| 1 sep 2026 | Feria de Admisión USACH, invitados por la organización y la VRAE | Comunidad |
| 29 ago 2026 | 3D Printer Party Chile: premios al rover | Robótica |
| 18 ago 2026 | Feria Vector, junto a Full 3D y el Centro de Innovación: primera demostración del rover en movimiento | Robótica |
| 29 jul 2026 | Visita a un colegio de Rancagua, organizada en parte por Full 3D | Comunidad |

**Fuera de la publicación:** la prueba de cohetería del 27 de septiembre, a pedido del equipo. También quedaron fuera las fotos del cohete roto.

**Página `/novedades/`.** Tiene:
- **Hero:** foto propia del lanzamiento en el Organizafest.
- **Filtro por eje:** el mismo componente de chips de Proyectos.
- **Cada noticia:** fecha grande con el color del eje, lugar, texto completo y galería de fotos.
- **Visor:** la galería se abre en el visor, y las flechas recorren solo las fotos de esa noticia.
- **Llamado final:** para que colegios y eventos inviten al equipo.

Se agregó a `vite.config.js`, al `sitemap.xml` y al menú de todas las páginas (antes el menú apuntaba a `/#novedades`).

**Inicio:**
- **Noticia destacada:** la del premio en la 3D Printer Party (campo `destacada: true`). Las otras 4 siguen el orden cronológico.
- **Enlaces:** cada tarjeta lleva a su noticia en `/novedades/#slug`, y hay un botón "Ver todas las novedades".
- **Galería "Así se ve el trabajo":** usa 5 fotos de los eventos.

**Fotos.**
- **Cantidad y ubicación:** 29 fotos en `src/assets/images/eventos/<evento>/`, con un total de 5,3 MB.
- **Formato:** máximo 1.400 px por lado, JPEG al 78%.
- **Videos:** algunas son el cuadro de un video (lanzamientos, rover andando), porque esos momentos solo se grabaron en video.

## Por qué

- Las noticias provisionales tenían fechas deducidas del nombre de los archivos. Las reales muestran que el programa está activo: ferias, colegios, un premio y pruebas de campo en tres meses.
- Con 7 noticias, el inicio ya no alcanza a mostrarlas todas, así que se hizo una página propia en vez de alargar el inicio.
- El premio es el hito más fuerte para quien llega por primera vez, por eso va destacado aunque no sea la noticia más reciente.

## Detalles técnicos

- **Datos:** `src/js/data/noticias.js` ahora tiene `slug`, `lugar`, `cuerpo` (párrafos) y `fotos` (con `alt`). Cada ruta va escrita completa dentro de `new URL()`. Con una plantilla (`${ruta}`), Vite no incluye las imágenes de subcarpetas en el build.
- **Filtro:** `project-filter.js` ahora también filtra elementos con `data-filter-item`.
- **Visor:** `lightbox.js` agrupa las fotos por `[data-gallery]`.
- **Salto a la noticia:** como la página se arma con JavaScript, el salto a `#slug` se hace a mano después de dibujar las noticias.

## Pendiente

- [ ] **Confirmar el nombre del premio.** En las fotos hay dos placas, "Mejor Mecánica 3D Impresa" y "Mejor Impresión 3D Aplicada", y la noticia menciona ambas. La ficha del rover dice "Mejor Impresión Aplicada".
- [ ] Subir más fotos de la Feria de Admisión cuando estén.
- [ ] Para agregar una noticia: sumar el objeto al inicio de `noticias.js` y sus fotos en `eventos/<slug>/`.
