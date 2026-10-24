# 02 · Rediseño de la página principal

**Archivos principales:** `index.html`, `src/styles/pages/home.css`, `src/js/pages/home.js`, `src/js/data/noticias.js`, `src/styles/base/variables.css`

## Qué se cambió

### Paleta y ritmo (fase 1)

| Cambio | Detalle |
|---|---|
| Secciones claras | Se alternan secciones oscuras (`--space-black`) y claras en tono hueso (`--paper: #F3F0E8`) con texto oscuro (`--ink`). |
| Color por eje | Robótica `#E2622F` (naranja Marte), Cohetería `#E5A958` (ámbar), Sistemas Orbitales `#3FB8D9` (cian). Cada uno tiene una versión más oscura (`--eje-*-ink`) para texto sobre fondo claro. |
| Fotos sin velo | Las imágenes de proyectos y galería se muestran a color, sin capa oscura encima. |
| Menú | Los enlaces se separan con `gap`, y Contacto usa la clase `.nav-contact` en vez de un estilo inline. |

Orden de las secciones del inicio: hero (oscuro) → métricas (oscuro) → **novedades (claro)** → ejes (oscuro) → **proyectos (claro)** → filosofía y manifiesto (oscuro) → **galería (claro)** → súmate (oscuro) → **alianzas (claro)** → pie de página.

### Contenido e interacción (fase 2)

- **Hero más limpio:** título, una frase, dos botones y los 3 ejes con su color. En móvil se muestra el planeta de fondo. La cita duplicada del manifiesto quedó solo en su sección.
- **Métricas animadas:** los números cuentan desde 0 cuando entran en pantalla.
- **Novedades:** una noticia destacada grande y 4 secundarias. Se cargan desde `src/js/data/noticias.js`, así cualquier persona del equipo puede agregar una sin tocar el HTML.
- **Ejes en pestañas:** cada eje muestra foto, líderes, integrantes y su ruta 2026–2027. Se pueden recorrer con el teclado (flechas).
- **Filtro de proyectos:** con transición en vez de un cambio de golpe.
- **Ciclo Piensa → Crea → Aprende:** un diagrama circular que avanza solo mientras está en pantalla, y cada fase también se puede elegir a mano.
- **Galería:** mosaico de fotos con visor a pantalla completa (flechas, teclado y cierre al hacer clic fuera).
- **Alianzas:** carrusel continuo que se pausa al pasar el cursor. Los logos blancos (ACHIDE, VRAE) llevan un fondo oscuro para verse sobre la sección clara.
- **Ortografía:** se corrigieron tildes y frases.

## Por qué

- **Secciones claras y color por eje:** responden directamente al feedback de "muy negro". El color por eje además le da identidad a cada área y se repite en todo el sitio, así el visitante reconoce en qué eje está.
- **Novedades arriba:** para una agrupación estudiantil, mostrar actividad reciente es lo que más transmite que el grupo está vivo, y responde a que "más que noticias nuevas, hay información plana".
- **Interacción con propósito:** pestañas, contadores, ciclo y visor convierten bloques de texto en información que se explora, sin sumar librerías pesadas (todo es CSS y JS nativo).
- **Accesibilidad:** las animaciones se desactivan si el dispositivo pide reducir movimiento (`prefers-reduced-motion`), y los controles interactivos tienen roles ARIA y foco visible.

## Cómo agregar una noticia

Edita `src/js/data/noticias.js` y agrega un objeto **al inicio** de la lista (la primera noticia se muestra destacada):

```js
{
    titulo: 'Título corto',
    fecha: '2026-11-15',          // o null si es algo vigente
    eje: 'robotica',              // robotica | coheteria | orbital | comunidad
    resumen: 'Una o dos líneas.',
    imagen: new URL('../../assets/images/carpeta/foto.jpg', import.meta.url).href,
    enlace: '/proyectos/rover/'   // opcional
}
```

## Pendiente de esta etapa

- Las noticias de junio 2026 se armaron a partir de las fotos de la galería (la fecha sale del nombre del archivo). Hay que confirmarlas o reemplazarlas por noticias reales.
- Ver [05-pendientes.md](05-pendientes.md).
