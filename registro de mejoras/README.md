# Registro de mejoras

Bitácora de los cambios hechos a la página del USACH Space Program: qué se cambió, por qué y qué queda pendiente. Cada documento cubre una etapa del trabajo.

| Documento | Contenido |
|---|---|
| [01-auditoria-inicial.md](01-auditoria-inicial.md) | Diagnóstico UX de la página antes de los cambios y feedback recibido |
| [02-rediseno-inicio.md](02-rediseno-inicio.md) | Nueva paleta, secciones claras y rediseño de la página principal con novedades |
| [03-subpaginas.md](03-subpaginas.md) | Fichas de proyecto, página de Ejes y página de Proyectos |
| [04-entorno-y-rutas.md](04-entorno-y-rutas.md) | Node.js, servidor de desarrollo, rutas y correcciones técnicas |
| [05-pendientes.md](05-pendientes.md) | Lo que falta hacer, decidir o confirmar |

## Resumen en una línea por etapa

1. **Auditoría:** la página era casi toda negra, con mucho texto plano, sin animaciones ni interacción, y el inicio no mostraba novedades.
2. **Inicio:** se alternan secciones oscuras y claras, cada eje tiene su color y se agregaron novedades, contadores, pestañas, un ciclo animado, galería con visor y carrusel de alianzas.
3. **Subpáginas:** las 5 fichas de proyecto comparten una plantilla nueva. Ejes y Proyectos se rediseñaron con el contenido de `estatus actual.md`.
4. **Entorno:** el sitio funciona con `npm run dev` y `npm run build`, y las rutas limpias (`/ejes/`, `/proyectos/rover/`) cargan con estilos.

## Cómo seguir agregando registros

Agrega un nuevo archivo numerado (`06-...md`) con la misma estructura: **qué se cambió**, **por qué** y **qué queda pendiente**. Después súmalo a la tabla de arriba.
