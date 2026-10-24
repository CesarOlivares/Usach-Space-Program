# 04 · Entorno de desarrollo y rutas

## Cómo ver el sitio en tu computador

El sitio usa **Vite**. No se puede abrir `index.html` con doble clic: los enlaces son rutas limpias (`/ejes/`, `/proyectos/rover/`) que solo existen cuando Vite las sirve.

1. Instala Node.js LTS (una sola vez). En este computador ya está instalado (v24.22.1).
2. En la carpeta del proyecto, instala las dependencias (una sola vez):
   ```bash
   npm install
   ```
3. Levanta el servidor de desarrollo y abre http://localhost:5173:
   ```bash
   npm run dev
   ```
4. Para generar la versión que se publica (carpeta `dist/`):
   ```bash
   npm run build
   ```

El sitio se publica con el workflow de GitHub Actions (`.github/workflows/deploy.yml`) en spaceprogram.cl.

## Cómo funcionan las rutas limpias

- **En desarrollo:** `vite.config.js` tiene una tabla `cleanRoutes` que traduce, por ejemplo, `/ejes/` a `/src/pages/ejes.html`.
- **En el build:** el plugin `clean-urls-plugin` copia cada página a su carpeta (`dist/ejes/index.html`, `dist/proyectos/rover/index.html`, etc.).

Para agregar una página nueva hay que sumarla en tres lugares de `vite.config.js`: `cleanRoutes`, `cleanBuildCopies` y `build.rollupOptions.input`.

## Correcciones técnicas

### Rutas de recursos absolutas
**Problema:** en `npm run dev`, `/ejes/` cargaba sin estilos ni imágenes. Las subpáginas usaban rutas relativas (`../styles/main.css`), y el navegador las calculaba desde `/ejes/` y no desde `src/pages/`. Ya pasaba antes en Ejes, Registro y Talleres.
**Solución:** todas las subpáginas usan rutas absolutas desde la raíz (`/src/styles/...`, `/src/assets/...`, `/src/js/...`). Vite las resuelve igual en desarrollo y en el build.
**Regla para el futuro:** en los HTML de `src/pages/`, usar siempre rutas que empiecen con `/src/`.

### Barra fija (`position: sticky`)
**Problema:** la subnavegación de las fichas y la barra de Ejes no se quedaban pegadas al hacer scroll. `project-template.css` y `global.css` ponían `overflow-x: hidden` en `html` y `body`, lo que convierte a `body` en un contenedor de scroll y anula `sticky`.
**Solución:** se usa `overflow-x: clip` (en `global.css` y en `ui.css` para las páginas con clase `.site`). Evita el scroll horizontal igual que antes, pero no rompe `sticky`.

### Título del hero en móvil
**Problema:** la tipografía Horizon es muy ancha, y "PERSEVERANCE" no cabía a 375 px.
**Solución:** el título del hero de las fichas se reduce en pantallas pequeñas (`clamp(1.7rem, 7.4vw, 2.4rem)`).

### Visor de galería
El `<img>` del visor ya no lleva `src=""` (pedía la página actual como imagen); el JS le asigna la foto al abrirse.

## Verificación hecha

- `npm run build` termina sin errores y genera todas las rutas.
- En `npm run dev`, las rutas `/ejes/`, `/proyectos/`, las 5 fichas, `/registro/` y `/talleres/` cargan con estilos e imágenes y sin recursos con error.
- Revisado en escritorio (1440 px) y móvil (375 px), sin scroll horizontal.

## Avisos

- `npm install` reporta **2 vulnerabilidades "high"** en dependencias de desarrollo. No se corrigieron, porque `npm audit fix --force` puede actualizar Vite a una versión con cambios incompatibles. Revisar con `npm audit`.
- `npm install` avisa que el script de instalación de `esbuild` no se ejecutó (política de npm 11). El build funciona igual.
