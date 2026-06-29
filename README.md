# Guía de Contribuidores y Arquitectura Web
**Usach Space Program (USP) - Plataforma Oficial**

Bienvenido a la documentación técnica del repositorio del Usach Space Program. Este documento detalla la estructura del proyecto, las especificaciones de desarrollo local y las directrices obligatorias para la integración de nuevo contenido.

La plataforma está construida utilizando una arquitectura de aplicación multipágina (MPA) basada en tecnologías nativas (HTML5, CSS3, JavaScript ES6) y gestionada a través del motor de construcción Vite.

---

## 1. Arquitectura y Árbol de Directorios

El repositorio se organiza bajo una estructura modular para separar el contenido estático expuesto de los recursos fuente utilizados durante la fase de compilación.

```text
/Usach-Space-Program (Raíz del Proyecto)
├── /dist                       # Directorio autogenerado tras compilar (código de producción)
├── /public                     # Recursos estáticos transferidos directamente sin procesar
│   └── CNAME                   # Configuración del dominio personalizado para GitHub Pages
├── /src                        # Código fuente del desarrollo de la plataforma
│   ├── /assets                 # Recursos gráficos y de medios de comunicación
│   │   ├── Tierra.png          # Ilustración Earth de fondo
│   │   ├── luna.png            # Ilustración Moon de fondo
│   │   ├── marte.png           # Ilustración Mars de fondo
│   │   ├── logo.png            # Logotipo principal institucional
│   │   ├── logo_noTextBLACK.png # Favicon institucional oscuro
│   │   └── /gallery            # Registro fotográfico de operaciones análogas
│   ├── /components             # Fragmentos de HTML reutilizables (plantillas estáticas)
│   │   ├── header.html         # Barra de navegación superior
│   │   └── footer.html         # Pie de página institucional consolidado
│   ├── /styles                 # Hojas de estilo estructuradas
│   │   ├── variables.css       # Definición de tokens de diseño y variables CSS globales
│   │   └── main.css            # Estilos globales y reglas responsive unificadas
│   └── /pages                  # Páginas secundarias y vistas específicas
│       ├── proyectos.html      # Catálogo interactivo de misiones y talleres
│       ├── ejes.html           # Explicación de los cinco ejes estratégicos de la organización
│       ├── registro.html       # Manifiesto de vuelo y formulario de postulación
│       └── /proyectos          # Fichas técnicas detalladas de proyectos específicos
│           ├── cansat.html
│           ├── cubesat_avanzado.html
│           ├── cohete.html
│           ├── eggdrop.html
│           ├── impresion3d.html
│           ├── rover.html
│           └── rover_avanzado.html
├── index.html                  # Punto de entrada principal de la aplicación (Página de Inicio)
├── login.html                  # Portal de acceso y control restringido (fallback)
├── package.json                # Configuración de dependencias y scripts del proyecto
└── vite.config.js              # Configuración del servidor de desarrollo y del compilador Rollup
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
