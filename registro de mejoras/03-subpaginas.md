# 03 · Subpáginas: fichas, Ejes y Proyectos

## Base compartida

**Archivos:** `src/styles/components/ui.css`, `src/js/components/lightbox.js`, `src/js/components/project-filter.js`

- **Mismo menú y pie de página en todas las páginas.** Antes había tres menús distintos. Ahora el menú marca la página actual con `aria-current="page"`.
- **Componentes reutilizables en `ui.css`:** botones, secciones claras y oscuras, encabezados, tarjetas de proyecto, chips de filtro, línea de tiempo, tarjetas que se expanden (`<details>`), galería con visor y bloque final de llamado a la acción. El inicio también los usa.
- **Módulos JS compartidos:** el visor de galería y el filtro de proyectos (que acepta uno o más grupos de filtros) se escribieron una sola vez y se importan donde hacen falta.

**Por qué:** un solo sistema visual hace que el sitio se sienta como un todo, y cualquier mejora futura a un componente se aplica en todas las páginas a la vez.

## Fichas de proyecto (plantilla única)

**Archivos:** `src/styles/pages/ficha.css`, `src/js/pages/ficha.js` y las 5 páginas de `src/pages/proyectos/` (`rover_avanzado`, `cubesat_avanzado`, `cohete`, `cansat`, `eggdrop`).

Cada ficha define su color en `<body>` (`--eje` y `--eje-ink`) y sigue la misma estructura:

1. **Hero a pantalla completa** con foto real, ruta de navegación (Proyectos / Eje), etiqueta, título, resumen, botones y 4 datos clave.
2. **Subnavegación fija** que marca la sección que estás leyendo.
3. **Resumen** con texto, lista de puntos clave e imagen.
4. **Ingeniería o cómo funciona:** tarjetas que se expanden con el detalle.
5. **Línea de tiempo** de fases u objetivos.
6. **Galería** con visor.
7. **Cierre:** cita, llamado a la acción y "Otros proyectos".

### Cambios de contenido por ficha

| Ficha | Cambio | Por qué |
|---|---|---|
| Rover Perseverance | La ruta pasó a navegación autónoma, BMS, espectrógrafo y LiDAR (antes: brazo robótico y FPV). Se agregó el reproductor del video de pruebas. Líder: César Olivares, 2 integrantes. | Alinear con `estatus actual.md`. |
| Cohete | Pasó de "Cohete Experimental 3U" a **Cohete de agua**: Fase 1 (Sep–Ene), Fase 2 multietapa (Mar–Jul), Fase 3 competencias y permisos (Ago–Dic), propulsión sólida en 2028. | La ficha describía un proyecto que todavía no existe. |
| CubeSat | Pasó de 3U a **1U**. Se quitó lo propio del 3U (estructura de aluminio, Banda S, celdas GaAs, control de actitud) y quedaron OBC, EPS, COMMS y carga útil. | El proyecto emblema es un CubeSat 1U. |
| Mini CubeSat | Se arreglaron imágenes rotas y la "herencia" ahora apunta solo al CubeSat 1U. | Rutas a carpetas equivocadas. |
| Salva a Usachín | Misma estructura que Mini CubeSat (misión, objetivos, cronograma, jornada final, inscripción). | Consistencia entre desafíos formativos. |

## Página de Ejes

**Archivos:** `src/pages/ejes.html`, `src/styles/pages/ejes.css`, `src/js/pages/ejes.js`

- **Selección de eje:** 3 tarjetas con foto en el hero, más una barra fija para cambiar de eje mientras se lee.
- **Cada eje incluye** definición, objetivos, proyección a largo plazo, ruta 2026–2027, resultado esperado, próximos pasos y perfil buscado, con botón para postular a ese eje.
- **Enlaces directos:** el eje activo queda en la URL (`/ejes/#robotica`, `#coheteria`, `#orbital`), y las fichas enlazan directo a su eje. También se aceptan los alias antiguos (`#satelital`).

**Por qué:** antes el detalle reemplazaba toda la vista y faltaba casi todo lo que define a cada eje en `estatus actual.md`. Ahora la página es la referencia completa de cada eje.

## Página de Proyectos

**Archivos:** `src/pages/proyectos.html`, `src/styles/pages/proyectos.css`, `src/js/pages/proyectos.js`

- **Hero compacto** con los totales (3 emblema, 3 formativos, 3 ejes), para que las tarjetas aparezcan en la primera pantalla.
- **Dos filtros combinables:** por tipo (emblema o formativo) y por eje, con mensaje cuando una combinación no tiene resultados.
- **Sección "Dos formas de participar":** explica la diferencia entre proyectos emblema (todo el año, para integrantes) y desafíos formativos (4 semanas, abiertos a toda la USACH).

## Archivos que quedaron sin uso

Las páginas rediseñadas ya no usan estos archivos, pero **no se borraron**:

- `src/styles/pages/index.css`
- `src/styles/pages/proyectos/rover_avanzado.css`, `mision.css`, `cubesat_avanzado.css`
- `src/js/pages/proyectos/rover_avanzado.js`, que todavía usan `rover.html` e `impresion3d.html`
- `src/pages/proyectos/rover.html` e `impresion3d.html`, que no tienen ruta en `vite.config.js`

Ver [05-pendientes.md](05-pendientes.md).
