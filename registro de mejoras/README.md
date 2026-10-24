# Registro de mejoras

Bitácora de los cambios hechos a la página del USACH Space Program: qué se cambió, por qué y qué queda pendiente. Cada documento cubre una etapa del trabajo.

| Documento | Contenido |
|---|---|
| [01-auditoria-inicial.md](01-auditoria-inicial.md) | Diagnóstico UX de la página antes de los cambios y feedback recibido |
| [02-rediseno-inicio.md](02-rediseno-inicio.md) | Nueva paleta, secciones claras y rediseño de la página principal con novedades |
| [03-subpaginas.md](03-subpaginas.md) | Fichas de proyecto, página de Ejes y página de Proyectos |
| [04-entorno-y-rutas.md](04-entorno-y-rutas.md) | Node.js, servidor de desarrollo, rutas y correcciones técnicas |
| [05-pendientes.md](05-pendientes.md) | Lo que falta hacer, decidir o confirmar |
| [06-seo-y-produccion.md](06-seo-y-produccion.md) | Auditoría de SEO técnico: metadatos, Open Graph, sitemap, robots, llms.txt, 404 y build |
| [07-transiciones-y-movimiento.md](07-transiciones-y-movimiento.md) | Pauta de diseño, transiciones de color suaves, animaciones ambientales y tratamiento de fotos en el inicio |
| [08-revision-taste-skill.md](08-revision-taste-skill.md) | Revisión con taste-skill: fuente, contraste, tamaño de texto, títulos de 2 líneas y franjas vacías |
| [09-mejoras-sugeridas.md](09-mejoras-sugeridas.md) | Hero con video propio del rover, menos etiquetas monoespaciadas y tono en vez de bordes |
| [10-portada-e-imagenes.md](10-portada-e-imagenes.md) | Vuelta a la portada del planeta e imágenes de referencia de la NASA con créditos |
| [11-novedades-reales.md](11-novedades-reales.md) | 7 noticias reales con fotos del Drive del equipo y nueva página `/novedades/` |

## Resumen en una línea por etapa

1. **Auditoría:** la página era casi toda negra, con mucho texto plano, sin animaciones ni interacción, y el inicio no mostraba novedades.
2. **Inicio:** se alternan secciones oscuras y claras, cada eje tiene su color y se agregaron novedades, contadores, pestañas, un ciclo animado, galería con visor y carrusel de alianzas.
3. **Subpáginas:** las 5 fichas de proyecto comparten una plantilla nueva. Ejes y Proyectos se rediseñaron con el contenido de `estatus actual.md`.
4. **Entorno:** el sitio funciona con `npm run dev` y `npm run build`, y las rutas limpias (`/ejes/`, `/proyectos/rover/`) cargan con estilos.
5. **SEO y producción:** cada página tiene metadatos completos, Open Graph y canonical. Se agregaron favicons, página 404, `sitemap.xml`, `robots.txt`, `llms.txt` y datos estructurados.
6. **Transiciones y movimiento:** puentes de degradado entre secciones oscuras y claras, menú y barras que se adaptan al tono, animaciones por bloque más rápidas y un tratamiento común para las fotos. Aplicado al inicio, Ejes, Proyectos y las fichas.

## Cómo seguir agregando registros

Agrega un nuevo archivo numerado (`06-...md`) con la misma estructura: **qué se cambió**, **por qué** y **qué queda pendiente**. Después súmalo a la tabla de arriba.
