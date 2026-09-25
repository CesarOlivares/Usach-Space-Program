# Guía de Contribuidores y Arquitectura Web
**Usach Space Program (USP) - Plataforma Oficial**

Bienvenido a la documentación técnica del repositorio del Usach Space Program. Este documento detalla la estructura del proyecto, las especificaciones de desarrollo local y las directrices obligatorias para la integración de nuevo contenido.

La plataforma está construida utilizando una arquitectura de aplicación multipágina (MPA) basada en tecnologías nativas (HTML5, CSS3, JavaScript ES6) y gestionada a través del motor de construcción Vite.

---

## 1. Arquitectura y Árbol de Directorios

El repositorio se organiza bajo una estructura modular para separar el contenido estático expuesto de los recursos fuente utilizados durante la fase de compilación.

```text
Usach-Space-Program/
├── index.html / login.html       # Entradas públicas de la raíz
├── public/CNAME                  # Dominio de GitHub Pages
├── fotos_rover/
│   └── rover_prueba_giro.mp4      # Ruta heredada conservada
├── src/
│   ├── assets/images/
│   │   ├── gallery/              # Recursos y fotografías de proyectos
│   │   └── rover/                # Fotografías del rover
│   ├── components/
│   │   ├── header.html
│   │   └── footer.html
│   ├── pages/
│   │   ├── proyectos.html / ejes.html / registro.html
│   │   └── proyectos/            # Siete fichas; URLs conservadas
│   ├── styles/
│   │   ├── main.css              # Entrada global; mantiene el orden de la cascada
│   │   ├── base/                 # Variables, reglas globales y responsive
│   │   ├── components/           # Navegación, pie, tarjetas y bloques de proyectos
│   │   └── pages/
│   │       └── proyectos/        # Estilos de fichas; mision.css compartido
│   └── js/
│       ├── components/header.js  # Menú compartido
│       └── pages/
│           ├── proyectos.js     # Desplazamiento del catálogo
│           ├── registro.js      # Interfaz y envío existente a Google Forms
│           └── proyectos/rover_avanzado.js
├── vite.config.js                # Las 12 entradas multipágina
├── package.json / package-lock.json
└── dist/                         # Salida generada, no versionada
```

---

## 2. Guía de Desarrollo Local

Para trabajar de manera local en esta plataforma, asegúrese de contar con Node.js instalado (versión 18.0.0 o superior).

### 2.1 Instalación de dependencias
Ejecute la instalación de los paquetes necesarios definidos en el manifiesto del proyecto:
```bash
npm install
```
*Nota para entornos Windows con políticas de ejecución restringidas en PowerShell: Utilice la consola de comandos de Windows (cmd) para ejecutar el proceso:*
```cmd
cmd /c npm install
```

### 2.2 Servidor de desarrollo
Inicie el entorno local interactivo con recarga en caliente a través de:
```bash
npm run dev
```

### 2.3 Compilación para producción
Para procesar las plantillas, consolidar las hojas de estilo y generar el bundle final optimizado, ejecute:
```bash
npm run build
```

### 2.4 Visualización local de producción
Una vez generada la compilación, puede levantar un servidor local para verificar el estado de los archivos dentro de la carpeta `/dist/`:
```bash
npm run preview
```

---

## 3. Reglas de Compilación Obligatorias

El uso de un sistema MPA sobre Vite introduce dos reglas estrictas que todos los contribuidores deben respetar para evitar compilaciones incompletas o enlaces rotos en producción.

### 3.1 Registro Obligatorio en `vite.config.js`
Vite utiliza Rollup para rastrear el grafo de dependencias de la aplicación. Dado que se trata de un sitio multipágina, cada nuevo archivo HTML que se agregue a la estructura del proyecto **debe ser registrado explícitamente** en el archivo `vite.config.js` dentro del objeto `rollupOptions.input`.

Si crea una nueva página, por ejemplo `/src/pages/contacto.html`, debe editar `vite.config.js` y añadir la ruta absoluta utilizando `resolve`:

```javascript
input: {
  main: resolve(__dirname, 'index.html'),
  contacto: resolve(__dirname, 'src/pages/contacto.html'),
  // Mantener los registros existentes...
}
```
*ADVERTENCIA: Cualquier archivo HTML que no esté declarado en este objeto de configuración será completamente ignorado por Vite durante el proceso de empaquetado final (`npm run build`).*

### 3.2 Inyección de Componentes Estáticos (`vite-plugin-html-inject`)
Para mantener el portal modular sin incurrir en la sobrecarga de un framework como React o dependencias de ejecución (runtime), utilizamos el plugin `vite-plugin-html-inject` para procesar la barra de navegación (`header.html`) y el pie de página (`footer.html`) en tiempo de compilación.

#### Sintaxis de Inyección
Use la etiqueta `<load>` especificando la ruta al archivo y declarando el parámetro de profundidad `root`:
```html
<load src="src/components/header.html" root="../../" />
```

#### Regla de Resolución de Caminos (El token `{=$root}`)
Dado que los archivos HTML se encuentran a diferentes profundidades dentro de la jerarquía de directorios (por ejemplo, `index.html` en la raíz frente a `rover.html` en `src/pages/proyectos/`), los enlaces relativos dentro de un componente estático se romperían al inyectarse.

Para resolver esto, la barra de navegación utiliza el token dinámico `{=$root}` antes de cada enlace relativo:

```html
<!-- Fragmento de header.html -->
<nav class="nav-links">
    <a href="{=$root}index.html">Inicio</a>
    <a href="{=$root}src/pages/proyectos.html">Proyectos</a>
</nav>
```

Al declarar un componente, debe pasar la variable `root` correspondiente al nivel de profundidad del archivo actual:
- **Páginas en la raíz** (`index.html`, `login.html`): `root="./"`
- **Páginas en el primer subnivel** (`/src/pages/`): `root="../../"`
- **Páginas en el segundo subnivel** (`/src/pages/proyectos/`): `root="../../../"`

---

## 4. Flujo de Trabajo y Despliegue

La rama de desarrollo contiene el código fuente estructurado detallado en esta guía. El servidor de integración continua o el administrador encargado del despliegue ejecutará el comando de construcción:

```bash
npm run build
```

Esto generará la carpeta de distribución `/dist/` con el sitio optimizado, los recursos renombrados con hashes únicos para evitar problemas de caché, las plantillas inyectadas y los estilos unificados. **Únicamente el contenido de la carpeta `/dist/` debe ser desplegado al servidor de producción o a la rama de distribución de GitHub Pages.**

## 5. Organización del frontend

- Las páginas conservan sus ubicaciones: mover un HTML cambia su URL de salida. Las entradas de Vite permanecen sin cambios.
- Cada página conserva el enlace global y un bloque `<style>` con un único `@import` hacia su hoja específica. Este punto de entrada mantiene la cascada previa tanto en desarrollo como en producción: Vite inserta el CSS global después del bloque de página al compilar. No sustituir este bloque por un segundo `<link>` sin revisar la prioridad de las reglas. Los `@import` globales mantienen también el orden de las reglas responsive.
- `components/project-sections.css` contiene reglas idénticas compartidas por cohete, Egg Drop y talleres; `pages/proyectos/mision.css` reúne los estilos idénticos de cohete y Egg Drop. Mantener las excepciones en las hojas de página.
- Los scripts son módulos nativos cargados con `type="module"`. La cabecera incluye el módulo de menú mediante el parámetro `root`; los demás módulos pertenecen a sus páginas. El registro mantiene su envío y tratamiento de respuestas actuales, sin introducir servicios ni nuevas integraciones.
- Las rutas `url(...)` de CSS se resuelven respecto de la hoja, mientras que los enlaces de HTML se resuelven respecto de cada página. Vite procesa las imágenes de `src/assets/images`.
- El video conserva su ubicación y referencia heredadas: actualmente su URL se inserta como texto al hacer clic y no se incluye en la compilación. Corregir su publicación es una tarea funcional separada. No se crean carpetas vacías de videos, utilidades o integraciones.
- Después de reorganizar recursos, ejecutar `npm run build` y revisar las 12 páginas, las 12 cabeceras y los 11 pies declarados; el catálogo ya carece de pie. Comprobar navegación móvil, formulario y CSS en desarrollo y preview.
