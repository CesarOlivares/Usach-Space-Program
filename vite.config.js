import { resolve, dirname } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

const cleanRoutes = {
  '/ejes/': '/src/pages/ejes.html',
  '/ejes': '/src/pages/ejes.html',
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
  '/login/': '/login.html',
  '/login': '/login.html',
};

const cleanBuildCopies = [
  { src: 'src/pages/ejes.html', dest: 'ejes/index.html' },
  { src: 'src/pages/proyectos.html', dest: 'proyectos/index.html' },
  { src: 'src/pages/registro.html', dest: 'registro/index.html' },
  { src: 'src/pages/admision_talleres.html', dest: 'talleres/index.html' },
  { src: 'src/pages/proyectos/rover_avanzado.html', dest: 'proyectos/rover/index.html' },
  { src: 'src/pages/proyectos/cubesat_avanzado.html', dest: 'proyectos/cubesat/index.html' },
  { src: 'src/pages/proyectos/cohete.html', dest: 'proyectos/cohete/index.html' },
  { src: 'src/pages/proyectos/cansat.html', dest: 'proyectos/cansat/index.html' },
  { src: 'src/pages/proyectos/eggdrop.html', dest: 'proyectos/eggdrop/index.html' },
  { src: 'login.html', dest: 'login/index.html' },
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
    }
  };
}

export default defineConfig({
  base: '/',
  plugins: [
    injectHTML({
      tagName: 'load'
    }),
    cleanUrlsPlugin()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        proyectos: resolve(__dirname, 'src/pages/proyectos.html'),
        ejes: resolve(__dirname, 'src/pages/ejes.html'),
        registro: resolve(__dirname, 'src/pages/registro.html'),
        cansat: resolve(__dirname, 'src/pages/proyectos/cansat.html'),
        cubesat_avanzado: resolve(__dirname, 'src/pages/proyectos/cubesat_avanzado.html'),
        cohete: resolve(__dirname, 'src/pages/proyectos/cohete.html'),
        eggdrop: resolve(__dirname, 'src/pages/proyectos/eggdrop.html'),
        impresion3d: resolve(__dirname, 'src/pages/proyectos/impresion3d.html'),
        rover: resolve(__dirname, 'src/pages/proyectos/rover.html'),
        rover_avanzado: resolve(__dirname, 'src/pages/proyectos/rover_avanzado.html'),
        admision_talleres: resolve(__dirname, 'src/pages/admision_talleres.html')
      }
    }
  }
});
