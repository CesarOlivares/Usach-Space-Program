# 10 · Vuelta a la portada del planeta e imágenes de referencia

## Portada

Se volvió al hero con el **planeta en rotación de fondo**, que se prefirió frente a la versión con el video del rover. Se mantuvieron las mejoras posteriores:

- **Título en 2 líneas:** "USACH SPACE / PROGRAM", con tipografía y contraste legibles.
- **Etiqueta superior:** "Programa aeroespacial estudiantil · USACH", en la tipografía del sitio.
- **Ejes como enlaces:** los 3 ejes son enlaces directos a su sección en `/ejes/`.
- **Bordes del video:** inferior e izquierdo desvanecidos, con un parallax leve.
- **Tablet (761–1080 px):** se corrió el recorte del video (`object-position: 22%`) para que el planeta siga apareciendo; antes quedaba fuera del cuadro.

El video del rover se sigue usando en su ficha. La imagen de carga que se generó para él (`rover_prueba_giro_poster.jpg`) quedó sin uso.

## Imágenes nuevas

Se buscaron en la **NASA Image and Video Library** imágenes con relación directa con el programa (Chile, el rover que replican, cohetes y CubeSats de estudiantes). Se guardaron optimizadas (máximo 1.600 px, JPEG calidad 80) en `src/assets/images/referencias/`, con sus fuentes en `CREDITOS.md`.

| Imagen | Dónde | Por qué |
|---|---|---|
| Santiago de noche desde la ISS | Inicio, fondo de "Súmate" | El lugar desde donde trabaja el programa |
| Selfie del Perseverance en Marte | Ejes, visión de Robótica | Es el rover original que replica el equipo |
| Cohete sonda con experimentos de estudiantes | Ejes, visión de Cohetería | Hacia dónde apunta el eje: cohetes sonda |
| Dispensador de CubeSats en la ISS | Ejes, visión de Sistemas Orbitales | Cómo llega un CubeSat a la órbita |
| NASA Student Launch | Ficha del Cohete de agua, ciclo de lanzamiento | Estudiantes revisando un cohete antes del vuelo |
| Chile y los Andes desde órbita | Proyectos, fondo del hero (como el planeta del inicio) | Continuidad visual con la portada y contexto local |
| Laguna Verde, Atacama, desde la ISS | Página 404 | Un paisaje chileno que parece de otro planeta |

**Créditos:** cada imagen tiene su crédito en el pie de foto o en una línea bajo la sección, por ejemplo "Imagen: NASA" o "NASA/JPL-Caltech/MSSS".

**Descartadas:** las imágenes `pngwing.com*.png` del proyecto no se usaron, porque su licencia no es clara.

## Correcciones de paso

- **Métricas sin estilos:** al restaurar el hero se había borrado el bloque `.metrics` (fondo y márgenes). Se restauró.
- **404 en una sola columna:** la página siempre se veía así porque la regla general `.site main { display: block }` anulaba su grilla. Ahora usa `.site .error-hero` para mostrar sus dos columnas.

## Pendiente

- [ ] Reemplazar las imágenes de referencia por fotos propias a medida que el equipo las tenga (sobre todo de Cohetería y Sistemas Orbitales).
- [ ] Decidir si se borra `rover_prueba_giro_poster.jpg`, que quedó sin uso.
