# 01 · Auditoría inicial

**Fecha:** octubre 2026
**Alcance:** página principal (`index.html`) y, en una segunda revisión, las subpáginas de información (Ejes, Proyectos y las 5 fichas de proyecto).
**Método:** revisión del sitio publicado (spaceprogram.cl) en escritorio (1440 px) y móvil (375 px), y del código del repositorio.

## Feedback recibido

- La página es "muy de negro".
- Tiene poco dinamismo: casi todo es texto plano.
- No hay animaciones ni elementos interactivos para presentar la información.
- En la página principal hay información estática y no se ven novedades.

## Diagnóstico de la página principal

### Demasiado negro
- Las 8 secciones del inicio usaban solo dos fondos casi idénticos (`#030508` y `#070B14`). Se veía como una sola pared negra de unos 10.000 px (17.000 px en móvil).
- Había un solo color de acento (ámbar). El cian y el teal estaban definidos en las variables, pero casi no se usaban.
- Las fotos de proyectos tenían un velo oscuro encima, y lo más llamativo (las fotos reales) quedaba apagado.

### Texto plano y sin ritmo
- Seis secciones seguían el mismo patrón: etiqueta `[ TAG ]`, título en mayúsculas, párrafo centrado y grilla de tarjetas.
- Las tarjetas de los ejes eran bloques de texto con pares etiqueta/valor, sin imágenes de los proyectos.
- Las métricas (03 / 16+ / 03 / 05) eran pequeñas y estáticas.
- La filosofía Piensa → Crea → Aprende se mostraba como 3 tarjetas sueltas, aunque es un ciclo.
- La cita del manifiesto aparecía dos veces.

### Sin interacción
- Una sola animación CSS activa. El único elemento interactivo era el filtro de proyectos, que cambiaba de golpe.
- En móvil se ocultaba el video del planeta y el hero quedaba como un muro de texto.

### Sin novedades
- No había noticias, hitos ni calendario. Quien entraba no podía saber qué hizo la organización recientemente.

### Otros problemas
- Los enlaces del menú aparecían pegados ("EJESPROYECTOSMANIFIESTO…") y el enlace de Contacto tenía un estilo distinto.
- Hero sobrecargado: logo, badge, título, cita, párrafo, 2 botones y 3 datos.
- Videos de 33 MB y 41 MB.
- Faltaban tildes ("divulgacion", "caracter", "basicos") y había frases como "u empresa".
- Algunos datos no coincidían con `estatus actual.md`.

## Diagnóstico de las subpáginas

- **Siguen siendo negras** y no tienen el color propio de cada eje.
- **Cada página tenía un menú distinto:** `header` en el inicio, `rover-navbar` con una segunda fila en las fichas y otro en Ejes y Proyectos.
- **Mucho texto y poca guía:** las fichas medían unos 9.700 px en móvil, sin indicar en qué sección estabas.
- **Emojis como íconos** (🚀 💧 ✉), que se ven distintos en cada sistema.
- **Fotos de la NASA en lugar de propias.** El hero de Cohetería mostraba una sala de control con la etiqueta "PROPULSION SYSTEM".
- **Imágenes rotas** en Mini CubeSat (rutas a carpetas equivocadas).
- **Ejes:** el detalle de cada eje reemplazaba toda la vista, y faltaban los objetivos, fases, perfil y próximos pasos de `estatus actual.md`.
- **Proyectos:** un hero gigante empujaba las tarjetas fuera de la primera pantalla.

## Contenido que se contradecía

| Página | Decía | Según `estatus actual.md` |
|---|---|---|
| Ficha de Cohete | "Cohete Experimental 3U" con fibra, pirotecnia y propulsión química | Cohete de agua (1 unidad y multietapa); propulsión sólida como meta 2028 |
| Ficha de CubeSat | "Bus satelital CubeSat 3U" | CubeSat 1U |
| Inicio | "Cohete de agua (3 unidades)" | Cohete de agua |
| Ejes / Inicio | Robótica liderada por César Olivares y Alessandro Orellano | Solo César Olivares |

**Decisión tomada:** usar `estatus actual.md` como fuente oficial para todo el contenido.
