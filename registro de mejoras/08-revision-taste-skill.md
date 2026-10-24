# 08 · Revisión con taste-skill y correcciones de legibilidad

**Herramienta:** [taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT). Se leyó su código y se ejecutó su inspector (`inspect.mjs`) desde una carpeta temporal, sin instalarlo en el proyecto. El inspector abre cada página en un navegador real a 1440, 768 y 390 px y mide tipografía, contraste, títulos y espacios.
**Páginas revisadas:** inicio, Ejes, Proyectos y las 5 fichas.

## Qué se corrigió (problemas reales)

| Problema | Antes | Ahora |
|---|---|---|
| Fuente equivocada | El texto de las fases Piensa / Crea / Aprende salía en **Arial**: los `<button>` no heredan la fuente | `ui.css` fija la fuente del sitio en `button`, `input`, `select` y `textarea` |
| Contraste ilegible | "Líder", "Integrantes" y "Emblema" a 2,5:1; pie de página a 2,6:1; textos tenues a 3,7–4,4:1 | Todo sobre 4,5:1. Se ajustaron `--ink-faint` (#5F6778), `--eje-orbital-ink` (#11657F), `--eje-coheteria-ink` (#85550F) y el gris de `.muted` |
| Texto corrido pequeño | 14,7 px | 16 px (los párrafos que estaban entre 0,88 y 0,98 rem pasan a 1 rem) |
| Texto bajo 13 px | 27 bloques en el inicio | Ninguno: las etiquetas tienen como mínimo 0,8125 rem (13 px) |
| Tamaños de letra | 17 distintos | Se agruparon en una escala más corta (13, 14, 16, 17 y 18 px para el texto) |
| Títulos de 3 o 4 líneas | "USACH SPACE PROGRAM" en 3 líneas; "Piensa. Crea. Aprende. Y vuelve a empezar." en 4; títulos largos de Ejes y CubeSat | Máximo 2 líneas en todas las pantallas (ver abajo) |
| Franja vacía en escritorio | 416 px entre "Nos respaldan" y "Súmate" (margen + puente + margen) | Los márgenes junto a cada puente de color se acortan a 40–64 px |

### Cómo se resolvieron los títulos
Horizon es muy ancha: cada letra ocupa unos 0,7 em. Con esa medida se calcularon los tamaños:

- **Hero:** se quitó el `max-width: 9ch` que forzaba 3 líneas, y el tamaño pasó a `clamp(2.3rem, 7vw, 6rem)`. "USACH SPACE / PROGRAM" queda en 2 líneas desde 390 px.
- **Títulos de sección:** `clamp(1.5rem, 3.4vw + 0.5rem, 2.6rem)`, sin espaciado entre letras.
- **Textos acortados:**
  - "Piensa. Crea. Aprende." queda como título, y "Y vuelve a empezar…" pasa a ser la frase de apoyo.
  - "¿En cuál de estos ejes te gustaría aprender?" → "¿En qué eje te gustaría aprender?"
  - "El satélite desplegado sobre la mesa" → "El satélite sobre la mesa"
  - "¿Te interesa la electrónica satelital?" → "¿Quieres construir un satélite?"

### Animaciones de aparición
Ahora se activan apenas el bloque asoma en pantalla (`threshold: 0` y un 10% de margen anticipado), para que ninguna zona se vea vacía al hacer scroll rápido.

## Resultado final del inspector (puntos corregidos)

Contraste, tamaño de texto, texto pequeño, líneas por título y franjas vacías: **sin problemas en las 8 páginas**, con una excepción explicada abajo.

**Excepción, el inicio en móvil:** el inspector marca una franja vacía al final. Es un límite de la herramienta: recorre como máximo 11 pantallas (unos 10.100 px a 390 px), y el inicio en móvil mide ~12.500 px, así que las animaciones de las últimas secciones no alcanzan a activarse en su recorrido. Con un recorrido completo se verificó que todo ese tramo (Alianzas y Súmate) se ve con opacidad completa.

## Lo que la skill marca y quedó igual (decisión de diseño)

La skill tiene un estilo propio muy estricto. Estos puntos se mantuvieron porque son parte de la identidad del sitio o fueron pedidos explícitamente:

- **Degradados:** son los puentes de color entre secciones, pedidos para suavizar el contraste.
- **Elementos de la identidad "técnica":** las etiquetas sobre los títulos, la letra monoespaciada (JetBrains Mono), las mayúsculas pequeñas con espaciado y la numeración 01/02/03.
- **Líneas, bordes y desenfoque:** líneas finas de 1 px, recuadros con borde, y el desenfoque del menú y de las barras fijas.
- **Color crema `#F3F0E8`:** la skill lo considera una "paleta típica de IA".
- **Tres tipografías** (Now, Horizon y JetBrains Mono), cuando la skill pide dos como máximo.

Si más adelante se quiere seguir la skill al pie de la letra, el orden recomendado es:
1. Cambiar el hero por material propio del programa (video o foto grande del rover o del taller).
2. Reducir las etiquetas monoespaciadas.
3. Reemplazar los bordes por pasos de tono.
