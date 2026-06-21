import { resolve } from 'path';
import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  base: './',
  plugins: [
    injectHTML({
      tagName: 'load'
    })
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
        rover_avanzado: resolve(__dirname, 'src/pages/proyectos/rover_avanzado.html')
      }
    }
  }
});
