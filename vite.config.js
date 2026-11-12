import { resolve, dirname } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

// Fuente única de datos: cada {{clave}} del HTML se reemplaza con src/data/programa.json
function programaDataPlugin() {
  const leer = () => JSON.parse(fs.readFileSync(resolve(__dirname, 'src/data/programa.json'), 'utf8'));
  return {
    name: 'programa-data-plugin',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const datos = leer();
        return html.replace(/\{\{\s*([a-z0-9_]+)\s*\}\}/gi, (todo, clave) => {
          if (!(clave in datos)) throw new Error(`programa.json no tiene la clave "${clave}"`);
          return datos[clave];
        });
      }
    },
    configureServer(server) {
      server.watcher.add(resolve(__dirname, 'src/data/programa.json'));
      server.watcher.on('change', (f) => { if (f.endsWith('programa.json')) server.ws.send({ type: 'full-reload' }); });
    }
  };
}

const cleanRoutes = {
  '/ejes/': '/src/pages/ejes.html',
  '/ejes': '/src/pages/ejes.html',
  '/quienes-somos/': '/src/pages/quienes-somos.html',
  '/quienes-somos': '/src/pages/quienes-somos.html',
  '/novedades/': '/src/pages/novedades.html',
  '/novedades': '/src/pages/novedades.html',
  '/proyectos/': '/src/pages/proyectos.html',
  '/proyectos': '/src/pages/proyectos.html',
  '/registro/': '/src/pages/registro.html',
  '/registro': '/src/pages/registro.html',
  '/talleres/': '/src/pages/admision_talleres.html',
  '/talleres': '/src/pages/admision_talleres.html',
  '/proyectos/rover/': '/src/pages/proyectos/rover_avanzado.html',
  '/proyectos/rover': '/src/pages/proyectos/rover_avanzado.html',
  '/proyectos/cubesat/': '/src/pages/proyectos/cubesat_avanzado.html',
  '/proyectos/cubesat': '/src/pages/proyectos/cubesat_avanzado.html',
  '/proyectos/cohete/': '/src/pages/proyectos/cohete.html',
  '/proyectos/cohete': '/src/pages/proyectos/cohete.html',
  '/proyectos/cansat/': '/src/pages/proyectos/cansat.html',
  '/proyectos/cansat': '/src/pages/proyectos/cansat.html',
  '/proyectos/eggdrop/': '/src/pages/proyectos/eggdrop.html',
  '/proyectos/eggdrop': '/src/pages/proyectos/eggdrop.html',
  '/panel/postulaciones/': '/src/pages/postulaciones.html',
  '/panel/postulaciones': '/src/pages/postulaciones.html',
  '/panel/': '/src/pages/panel.html',
  '/panel': '/src/pages/panel.html',
  '/privacidad/': '/src/pages/privacidad.html',
  '/privacidad': '/src/pages/privacidad.html',
  '/login/': '/login.html',
  '/login': '/login.html',
};

const cleanBuildCopies = [
  { src: 'src/pages/ejes.html', dest: 'ejes/index.html' },
  { src: 'src/pages/novedades.html', dest: 'novedades/index.html' },
  { src: 'src/pages/quienes-somos.html', dest: 'quienes-somos/index.html' },
  { src: 'src/pages/proyectos.html', dest: 'proyectos/index.html' },
  { src: 'src/pages/registro.html', dest: 'registro/index.html' },
  { src: 'src/pages/admision_talleres.html', dest: 'talleres/index.html' },
  { src: 'src/pages/proyectos/rover_avanzado.html', dest: 'proyectos/rover/index.html' },
  { src: 'src/pages/proyectos/cubesat_avanzado.html', dest: 'proyectos/cubesat/index.html' },
  { src: 'src/pages/proyectos/cohete.html', dest: 'proyectos/cohete/index.html' },
  { src: 'src/pages/proyectos/cansat.html', dest: 'proyectos/cansat/index.html' },
  { src: 'src/pages/proyectos/eggdrop.html', dest: 'proyectos/eggdrop/index.html' },
  { src: 'src/pages/privacidad.html', dest: 'privacidad/index.html' },
  { src: 'login.html', dest: 'login/index.html' },
  { src: 'src/pages/panel.html', dest: 'panel/index.html' },
  { src: 'src/pages/postulaciones.html', dest: 'panel/postulaciones/index.html' },
];

function cleanUrlsPlugin() {
  return {
    name: 'clean-urls-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlPath = req.url.split('?')[0];
        if (cleanRoutes[urlPath]) {
          req.url = cleanRoutes[urlPath] + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
        }
        next();
      });
    },
    closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      for (const { src, dest } of cleanBuildCopies) {
        const srcPath = resolve(distDir, src);
        const destPath = resolve(distDir, dest);
        if (fs.existsSync(srcPath)) {
          fs.mkdirSync(dirname(destPath), { recursive: true });
          fs.copyFileSync(srcPath, destPath);
        }
      }
      // Las páginas ya quedaron en su ruta limpia: se borra la copia en /src/pages
      fs.rmSync(resolve(distDir, 'src'), { recursive: true, force: true });
    }
  };
}

export default defineConfig({
  base: '/',
  plugins: [
    injectHTML({
      tagName: 'load'
    }),
    programaDataPlugin(),
    cleanUrlsPlugin()
  ],
  build: {
    // Sin source maps en producción: no se publica el código fuente original
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
        login: resolve(__dirname, 'login.html'),
        panel: resolve(__dirname, 'src/pages/panel.html'),
        postulaciones: resolve(__dirname, 'src/pages/postulaciones.html'),
        novedades: resolve(__dirname, 'src/pages/novedades.html'),
        quienesSomos: resolve(__dirname, 'src/pages/quienes-somos.html'),
        proyectos: resolve(__dirname, 'src/pages/proyectos.html'),
        ejes: resolve(__dirname, 'src/pages/ejes.html'),
        privacidad: resolve(__dirname, 'src/pages/privacidad.html'),
        registro: resolve(__dirname, 'src/pages/registro.html'),
        cansat: resolve(__dirname, 'src/pages/proyectos/cansat.html'),
        cubesat_avanzado: resolve(__dirname, 'src/pages/proyectos/cubesat_avanzado.html'),
        cohete: resolve(__dirname, 'src/pages/proyectos/cohete.html'),
        eggdrop: resolve(__dirname, 'src/pages/proyectos/eggdrop.html'),
        rover_avanzado: resolve(__dirname, 'src/pages/proyectos/rover_avanzado.html'),
        admision_talleres: resolve(__dirname, 'src/pages/admision_talleres.html')
      }
    }
  }
});
