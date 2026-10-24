# 06 · Auditoría de SEO técnico y producción

**Dominio base:** `https://spaceprogram.cl` (leído de `public/CNAME`). Se usa en canonical, `og:url`, `sitemap.xml`, `robots.txt` y `llms.txt`.

## Diagnóstico inicial y estado final

| # | Punto | Antes | Ahora |
|---|---|---|---|
| 1 | `lang="es"` en `<html>` | ✅ | ✅ |
| 2 | `<title>` único por página | ✅ (Registro y Talleres con formato distinto) | ✅ |
| 3 | `<meta name="description">` | ❌ Faltaba en Registro, Talleres y Login | ✅ |
| 4 | Open Graph y `twitter:card` | ❌ No había en ninguna página | ✅ |
| 5 | `<link rel="canonical">` | ❌ No había | ✅ |
| 6 | Exactamente un `<h1>` por página | ❌ Login no tenía | ✅ |
| 7 | `alt` descriptivo en imágenes | ❌ 45 imágenes con `alt=""` | ✅ |
| 8 | Favicon y `apple-touch-icon` | ❌ PNG de 151 KB desde `src/`, sin apple-touch-icon | ✅ |
| 9 | Página 404 propia | ❌ | ✅ |
| 10 | `sitemap.xml` | ❌ | ✅ |
| 11 | `robots.txt` | ❌ | ✅ |
| 12 | `llms.txt` | ❌ | ✅ |
| 13 | Datos estructurados (Schema.org) | ❌ | ✅ |
| 14 | HTML inicial con contenido (no SPA vacía) | ✅ Vite multipágina con HTML estático | ✅ |
| 15 | Source maps desactivados | ✅ por defecto, sin configurar | ✅ explícito |
| 16 | Bundle optimizado | ✅ JS por página de 0,2 a 5 KB | ✅ |
| 17 | Sin `console.*` huérfanos | ❌ 1 `console.log` con datos del formulario y 1 `console.error` | ✅ |
| 18 | Sin dominios temporales | ✅ | ✅ |
| 19 | Páginas antiguas fuera del build | ❌ `rover.html` e `impresion3d.html` se publicaban sin ruta | ✅ |
| 20 | Login fuera de buscadores | ❌ | ✅ `noindex` y `Disallow` |

## Qué se hizo

### Metadatos en cada página
Bloque estándar en el `<head>` de las 11 páginas: descripción, canonical, `theme-color`, favicons, manifest, Open Graph (`og:type`, `og:site_name`, `og:locale`, `og:title`, `og:description`, `og:url`, `og:image` de 1200×630 con su `alt`) y Twitter Card (`summary_large_image`).

- **Login:** lleva `noindex, nofollow` y no tiene Open Graph, porque es un portal privado.
- **404:** lleva `noindex` y no tiene canonical (GitHub Pages la sirve en cualquier URL inexistente).

### Imágenes nuevas en `public/`
Se generaron a partir del logo y de una foto del equipo:

- `favicon-16x16.png`, `favicon-32x32.png`: el sol y el león del logo.
- `apple-touch-icon.png` (180 px), `icon-192.png` e `icon-512.png`, usados por `site.webmanifest`.
- `og-image.jpg` (1200×630): foto del equipo con el rover, logo y texto. Es la imagen que aparece al compartir el enlace en WhatsApp, LinkedIn o X.

### H1 y textos alternativos
- **Login:** el título "Acceso Restringido" pasó de `<h2>` a `<h1>`.
- **Imágenes:** las 45 que tenían `alt=""` ahora tienen una descripción. Las fotos de la NASA se marcan como "imagen referencial".
- **Noticias:** usan el título como `alt` (o un campo `alt` opcional en `noticias.js`).
- **Visor de galería:** su imagen tiene un `alt` inicial, que se reemplaza por la descripción de cada foto al abrirla.

### Archivos estáticos
- **`404.html`** (raíz del proyecto, incluido en el build): mismo menú y estilo del sitio, con un "404" en órbita, botones al inicio y a proyectos, y enlaces rápidos. Usa rutas absolutas porque se sirve en cualquier URL.
- **`public/sitemap.xml`:** las 10 rutas públicas, sin Login.
- **`public/robots.txt`:** permite todo salvo `/login/`, permite explícitamente a los bots de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended y otros) y apunta al sitemap.
- **`public/llms.txt`:** resumen del sitio en Markdown para asistentes de IA, con propósito, ejes, proyectos, desafíos y cómo participar.
- **`public/site.webmanifest`:** nombre, colores e íconos del sitio.

### Datos estructurados
En `index.html` hay un bloque JSON-LD con `Organization` (nombre, logo, correo, ubicación, universidad como `parentOrganization` y temas) y `WebSite`.

### Build y código
- **`vite.config.js`:**
  - `sourcemap: false` explícito.
  - `404.html` agregado a las entradas del build.
  - `rover.html` e `impresion3d.html` quitados de las entradas: eran versiones antiguas sin ruta que se publicaban en `/src/pages/proyectos/` como contenido duplicado. Los archivos siguen en el repositorio.
- **Consola:**
  - Se quitó un `console.log` en `admision_talleres.js` que imprimía los datos personales del formulario.
  - Se quitó un `console.error` en `registro.js`. El botón ya avisa al usuario cuando falla el envío.

## Puntos que no aplican a este proyecto

- **React, `React.lazy()` y claves `key`:** el sitio no usa React. Es HTML multipágina con módulos JS pequeños, y cada página carga solo su JS (de 0,2 a 5 KB). No hace falta `manualChunks` ni code splitting.
- **SPA con `<div id="root">` vacío:** no ocurre. Cada página es HTML estático completo, así que los crawlers ven todo el contenido sin ejecutar JS. La única parte que se genera con JS son las novedades del inicio.

## Cómo mantenerlo

- **Página nueva:**
  - Copiar el bloque de metadatos de otra página y cambiar título, descripción, canonical y `og:url`.
  - Agregar la ruta en `public/sitemap.xml` y en `vite.config.js`.
  - Si es relevante para asistentes de IA, sumarla a `public/llms.txt`.
- **Fechas del sitemap:** actualizar `lastmod` cuando cambie el contenido de una página.
- **Imagen para compartir:** se puede tener una por página cambiando `og:image` y `twitter:image`. Hoy todas usan `og-image.jpg`.
