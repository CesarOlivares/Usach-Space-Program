# Elementos gráficos del sitio

Máscaras (blanco con transparencia) extraídas del kit de referencias del equipo. El color lo pone CSS con `--deco-color`, así que un mismo archivo sirve para cualquier eje y para fondos claros u oscuros. Las clases están en `src/styles/components/deco.css`.

**Reglas de uso**

- Un elemento distinto por sección. Si se necesita decorar una sección nueva, usar uno de los libres antes de repetir.
- Nunca encima de un texto: van en márgenes, esquinas o detrás de una figura.
- Movimiento lento y sutil (`data-anim="gira" | "titila" | "deriva"`), desactivado con "reducir movimiento".
- En celular se ocultan los grandes.

## Inventario

| Archivo | Qué es | Dónde se usa |
|---|---|---|
| `destello-luz.webp` | Destello de luz | Inicio, sobre el borde del planeta |
| `micrograficos.webp` | Lámina de micrográficos técnicos | Inicio, fondo de Ruta 2027 |
| `glifo-a.webp`, `glifo-c.webp` | Destellos | Inicio, marcadores de Robótica y Orbitales en la regla de Ruta 2027 |
| `glifo-b.webp` | Destello con círculo | Libre |
| `hud-arco.webp` | Arco de instrumentos | A.T.L.A.S., ruta |
| `glifo-d.webp` | Destello con rombo | Marca de la fase en curso en todas las líneas de tiempo |
| `hud-rango.webp` | Arco de rango con marcas | Ejes, encabezado |
| `estrella-fugaz.webp` | Estrella fugaz | Inicio, junto al título de Proyectos |
| `trayectorias.webp` | Líneas de trayectoria | Inicio, fondo de Ejes |
| `anillo-destellos.webp` | Anillo de destellos | Inicio, alrededor del ciclo Piensa, Crea, Aprende (gira) |
| `orbita-destello.webp` | Destello con órbitas | Inicio, esquina de la foto de Quiénes somos |
| `orbita-arco.webp` | Destellos con arco orbital | Inicio, sección Súmate |
| `mira.webp` | Mira con rayos | A.T.L.A.S., sección de seguridad |
| `radial.webp` | Líneas radiales | CubeSat LLN-1, ruta |
| `orbita-estela.webp` | Estela orbital | Rover, ruta |
| `destellos-arco.webp` | Grupo de destellos | Privacidad, encabezado |
| `marco-esquinas.webp` | Marco de esquinas | Quiénes somos, misión y visión |
| `estrella-ocho.webp` | Estrella de ocho puntas | Libre |
| `destello.webp` | Destello de cuatro puntas | Libre |
| `divisor-b.webp` | Divisor con estrellas | Postular, columna lateral |
| `divisor-a.webp` | Divisor con destello | Ejes, bajo "Qué queremos lograr" |
| `aro-estrellas.webp` | Aro de estrellas | Proyectos, "Dos formas de participar" (gira) |
| `leon.webp` | Cabeza de león | Quiénes somos, "Cómo empezó todo" |
| `esfera.webp` | Planeta con estela | Página 404 |
| `llama.webp` | Llama | A.T.L.A.S., áreas |
| `cohete-cometa.webp` | Cohete cometa | A.T.L.A.S., de dónde venimos |
| `franjas.webp` | Franjas de advertencia | A.T.L.A.S., bajo "La seguridad va primero" |
| `cohete-a.webp` | Cohete con estrella | Inicio, marca del vuelo a 3 km en la regla de Ruta 2027 |
| `cohete-circulo.webp` | Cohete en círculo | Inicio, ícono de LASC |
| `orbita-flecha.webp` | Órbita con flecha | Inicio, ícono de HERC |
| `agujero-negro.webp` | Agujero negro | CubeSat, resumen |
| `diagrama-orbital.webp` | Diagrama orbital | CubeSat, subsistemas |
| `estrella-gran.webp` | Estrella grande | Postular, encabezado |
| `destellos-flecha.webp` | Destellos con flechas | Ejes, cierre |

## Guardián

`src/js/components/deco-guard.js` revisa en cada ancho de pantalla que ninguna decoración toque un texto: la achica y, si no cabe, la oculta. Por eso un elemento puede no verse en algunos anchos.

## Origen y licencia

Las formas salen de imágenes de referencia reunidas por el equipo en `Elementos visuales`.

Las referencias vienen de Pinterest. El equipo confirmó que se descargaron para este uso (12 nov 2026).
