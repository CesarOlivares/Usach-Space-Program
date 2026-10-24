# 09 · Mejoras sugeridas por la revisión

**Base:** las 3 mejoras principales de la revisión con taste-skill ([08-revision-taste-skill.md](08-revision-taste-skill.md)) más análisis propio.
**Herramientas:**
- **Figma:** no estaba conectado en la sesión; se dejó la tarjeta para conectarlo. Para traer elementos de Figma hace falta, además, el enlace a un archivo del programa.
- **Playwright:** no está en el catálogo de conectores. Su rol (revisar en un navegador real) lo cumplieron el navegador integrado y el inspector de la skill, que maneja un Chrome sin interfaz con CDP.

## 1. Hero con material propio

**Antes:** video del planeta Tierra (NASA, 33 MB). Servía para cualquier club espacial y no mostraba nada del programa.
**Ahora:** el texto va a la izquierda y, a la derecha, el **video de prueba de giro del Rover Perseverance en el taller** (`rover_prueba_giro.mp4`, propio, 2,2 MB, en bucle y sin sonido).

- El video es vertical (478×850) y se recorta a 4:5 en escritorio y a 16:10 en móvil, centrado en el rover.
- Imagen de carga: `src/assets/images/rover/rover_prueba_giro_poster.jpg`, sacada de un cuadro del mismo video.
- Pie de foto que explica qué es: "Nuestro Rover Perseverance en prueba de giro, en el taller del programa".
- La etiqueta superior ahora es un dato real ("Convocatoria 2026 abierta", con un pulso), y la frase de apoyo dice qué es el programa.
- Los 3 ejes pasan a ser enlaces directos a cada eje (`/ejes/#robotica`, etc.).
- La página ya no descarga el video del planeta: el hero pesa unos 31 MB menos.

## 2. Menos letra monoespaciada y menos mayúsculas pequeñas

- **Tipografía normal:** las etiquetas, menús, pies de foto, metadatos de tarjetas, chips, migas de pan, subnavegación y títulos del pie de página pasan de JetBrains Mono en mayúsculas espaciadas a la tipografía del sitio (Now), en minúsculas, a 15–16 px.
- **Dónde queda la monoespaciada:** solo para datos técnicos de rutas (fechas de fase como "Sep–Ene") y siglas.
- **Numeración decorativa eliminada:** el orden ya se ve por la posición.
  - 01/02/03 en las pestañas de ejes y en las fases del ciclo.
  - 01–04 en las tarjetas de ingeniería, en los objetivos de Ejes y en los pilares de los desafíos.
  - Los ceros a la izquierda de las métricas (03 → 3).

Se implementó con un bloque en `ui.css` (`body.site :is(...)`) que tiene más prioridad que los estilos de cada página, así los cambios se ven en todo el sitio sin editar cada archivo.

## 3. Tono en vez de líneas

- **Sin bordes de 1 px** en tarjetas, chips, botones secundarios, tarjetas de objetivos, logos de alianzas, recuadros de video y paneles finales. Se separan por un paso de tono: blanco hueso sobre papel en las secciones claras, y blanco al 5% sobre el fondo en las oscuras.
- **Botón secundario:** relleno suave en vez de contorno.
- **Sin líneas divisorias:** se quitaron las del menú, el pie de página, las métricas, las pestañas de ejes, los datos de las fichas y las estadísticas de Proyectos. Separan el espacio y el tono.
- **Desenfoque solo en el menú principal:** la subnavegación de las fichas y la barra de ejes ahora son opacas.
- **Sin sombras en reposo:** las tarjetas solo se elevan al pasar el cursor.

## Resultado del inspector (FAIL por página)

| Página | Antes de la revisión | Ahora |
|---|---|---|
| Inicio | 13 | 3 |
| Ejes | 11 | 2 |
| Proyectos | – | 2 |
| Rover | 9 | 3 |
| CubeSat | – | 3 |
| Cohete | – | 3 |
| Mini CubeSat | – | 2 |
| Salva a Usachín | – | 2 |

**FAIL que quedan, todos por decisión de diseño o por límite de la herramienta:**
- **`gradient`:** son los puentes de color entre secciones, pedidos explícitamente.
- **`eyebrow`:** las etiquetas cortas sobre los títulos ("Bitácora", "Resumen"…). Se mantienen como guía de lectura, ya en tipografía normal.
- **`icon-cards`:** el inspector cuenta las tarjetas de ingeniería expandibles como una fila de tarjetas iguales. Es un acordeón con contenido distinto en cada una.
- **`blank-gap` (inicio en móvil):** el inspector recorre como máximo 11 pantallas, y el final del inicio en móvil queda fuera de su recorrido. Se verificó que todo aparece.

## Pendiente

- [ ] Conectar Figma y compartir un archivo, si existe, para alinear el sitio con él (componentes, colores, imágenes del programa).
- [ ] Un video o foto propia de Cohetería y Sistemas Orbitales para sus fichas, como se hizo con el rover.
- [ ] Decidir si se eliminan del repositorio `planeta_loop.mp4` (33 MB) y `planeta_earth_still.jpg`, que ya no se usan en el hero.
- [ ] Comprimir `iss_loop.mp4` (41 MB) del manifiesto.
