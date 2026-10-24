# 07 · Transiciones de color, movimiento y fotos (inicio)

**Alcance:** página principal, Ejes, Proyectos y las 5 fichas de proyecto. Registro, Talleres y Login siguen con el diseño anterior.
**Archivos:** `src/styles/base/variables.css`, `src/styles/components/ui.css`, `src/styles/components/header.css`, `src/styles/pages/home.css`, `src/js/components/motion.js`, `src/js/pages/home.js`, `index.html`

## Pauta de diseño acordada

- **Esencia:** técnico pero estudiantil; el negro del espacio y el hueso del papel de taller; las fotos propias primero.
- **Objetivos:** que postular sea lo más visible, mostrar actividad, explicar ejes y proyectos rápido y generar confianza en aliados.
- **Criterios de evaluación:**
  - **Continuidad:** sin cortes secos entre secciones.
  - **Contraste:** el texto cumple WCAG AA.
  - **Movimiento con propósito:** una sola animación ambiental por pantalla.
  - **Rendimiento:** solo se anima `transform` y `opacity`, sin librerías.
  - **Accesibilidad:** todo se apaga con `prefers-reduced-motion`.
  - **Autenticidad:** el stock lleva el tratamiento del sitio y no compite con las fotos propias.

## Fricción que se corrigió

1. Cortes de 1 px entre negro `#030508` y crema `#F3F0E8`, repetidos 4 o 5 veces por página (efecto "zebra").
2. Faltaba un tono intermedio entre los dos extremos.
3. El menú negro quedaba como un bloque pesado sobre las secciones claras.
4. El degradado del hero terminaba en negro y la sección siguiente cortaba a crema.
5. Las tarjetas en zonas oscuras solo se distinguían por un borde de 1 px.
6. El contenido aparecía de golpe al hacer scroll.
7. Las fotos de la NASA y las fotos de celular no se sentían parte del mismo sitio.

## Qué se cambió

### Transiciones de color
- **Escala de tonos** en `variables.css`: `--void #05080F`, `--night #0B1120`, `--dusk #1A2233`, `--haze #8C8E93`, `--mist #E4E1D9` y `--paper`.
- **Puentes de degradado** (`.tone-bridge`) de 48 a 90 px (se redujeron a la mitad tras revisarlos) en cada cambio oscuro ↔ claro, pasando por dusk, haze y mist.
- **Secciones reordenadas** para tener menos cambios de tono. Quedaron 4 transiciones suaves en lugar de 8 cortes:
  - Hero (void → dusk) → Métricas (dusk)
  - → *puente* → Novedades (papel) → Proyectos (papel → mist)
  - → *puente* → Ejes (night) → Filosofía (night → void)
  - → *puente* → Galería (mist → papel) → Alianzas (papel → mist)
  - → *puente* → Súmate (night) → Pie de página
- **Hero:** ahora termina en `dusk`, el mismo tono de las métricas, sin corte.
- **Menú adaptable:** al pasar sobre una sección clara toma fondo crema traslúcido y texto oscuro, con una transición de 0,4 s. `motion.js` detecta la sección con `data-tone="light"` que queda bajo el menú. En móvil el panel del menú sigue oscuro.
- **Tarjetas "Súmate":** sin borde, con un leve degradado, brillo superior de 1 px y sombra difusa. Se elevan al pasar el cursor.

### Animaciones
| Animación | Dónde | Detalle |
|---|---|---|
| Aparición al scroll | Encabezados, ciclo, manifiesto, súmate y, como bloque completo, las grillas de métricas, noticias, proyectos, galería y alianzas | Opacidad y 18 px hacia arriba en 0,35–0,45 s, con 40 ms de escalonado. Las grillas entran como un solo bloque y no tarjeta por tarjeta, para no saturar zonas con muchos elementos. Al terminar se quitan las clases y cada elemento recupera su hover |
| Campo de estrellas | Hero y sección Filosofía | Puntos en CSS que se desplazan 200 px en 140 s, casi imperceptible |
| Flotación | Logo del centro del ciclo Piensa–Crea–Aprende | ±7 px en 9 s |
| Parallax leve | Video del planeta (0,12, con bordes inferior e izquierdo desvanecidos con `mask-image` para que no se vea un rectángulo cortado) y video de la ISS en el manifiesto (0,1) | `translate3d` con `requestAnimationFrame`, solo mientras está en pantalla |
| Ya existentes | Contadores, ciclo, carrusel, pulso de "Convocatoria", zoom de fotos | Se mantienen |

- **Sin JS o con reducción de movimiento:** el contenido nunca se oculta. Solo se oculta si `motion.js` agregó la clase `motion-ready` a `<html>`.
- **Saltos con ancla o recarga a mitad de página:** los elementos que ya quedaron arriba se muestran de inmediato.

### Fotos
- **Proyectos emblema:** pasaron a fotos propias (rover en el taller, plataforma de lanzamiento, FlatSat) en vez de imágenes de la NASA.
- **Imágenes referenciales** (`.project-media.is-reference`, en los 3 desafíos formativos):
  - **Duotono** con el color del eje: la imagen queda en escala de grises y se tiñe con el color del eje por `mix-blend-mode: color`.
  - **Grano fino** encima, y una **etiqueta** "Imagen referencial" en la esquina.
- **Grano fotográfico común** (textura SVG al 18% en modo overlay) en tarjetas, noticias, galería y figuras de ejes. Unifica fotos de celular y de stock.

## Estrategia de fotos de stock (para el futuro)

- **Dónde sí:** heros de desafíos sin fotos propias, texturas de fondo (regolito, circuitos en macro, curvatura de la Tierra al 10–15%), referencias aspiracionales de cada eje y la página 404.
- **Dónde no:** hitos, galerías, equipo y "Así se ve el trabajo". Ahí solo van fotos reales.
- **Fuentes:**
  - **NASA** (images.nasa.gov): dominio público, con crédito.
  - **ESA** (CC BY-SA 3.0 IGO): exige crédito.
  - **Unsplash y Pexels:** para manos, laboratorios y electrónica.
- **Qué evitar:** astronautas genéricos, la Tierra completa, gente en traje dándose la mano y renders brillantes.
- **Tratamiento:** siempre duotono con el color del eje, grano y la etiqueta "Imagen referencial", más el crédito de la fuente cuando la licencia lo pida.

## Extensión a las subpáginas

- **Fichas (Rover, CubeSat, Cohete, Mini CubeSat, Salva a Usachín):** sin reordenar el contenido, las 3 primeras secciones quedan claras (mist → papel → mist) y el resto oscuras (night). Así hay 2 transiciones suaves en vez de 6 cortes: un puente tras la subnavegación y otro antes de la primera sección oscura. El hero tiene un parallax leve (0,12).
- **Ejes:** dentro de cada eje, la sección "Perfil" se movió junto a la definición. Queda claro → claro → *puente* → oscuro (visión y ruta) → cierre oscuro.
- **Proyectos:** hero oscuro → *puente* → catálogo claro (mist → papel → mist) → *puente* → "Dos formas de participar" oscuro.
- **Barras fijas adaptables:** la subnavegación de las fichas y la barra de ejes (`[data-adaptive-bar]`) también cambian a tono claro sobre secciones claras, igual que el menú.
- **Campo de estrellas** en el hero de Ejes y de Proyectos.

## Velocidad de las animaciones

Después de revisarlas se aceleraron:

| Animación | Antes | Ahora |
|---|---|---|
| Aparición (opacidad / desplazamiento) | 0,6 / 0,7 s | 0,35 / 0,45 s |
| Escalonado entre elementos | 70 ms | 40 ms |
| Recorrido completo de un bloque | ~1,05 s | ~0,6 s |
| Contadores del inicio | 1,4 s | 0,9 s |
| Cambio de pestaña / panel | 0,5 s | 0,3 s |
| Entrada de tarjetas al filtrar | 0,45 s | 0,3 s |

## Pendiente

- [ ] Revisar en un teléfono real que el parallax y el campo de estrellas se mantengan fluidos.
- [ ] Reemplazar las 3 imágenes referenciales de los desafíos cuando haya fotos propias.
