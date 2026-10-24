/*
 * NOVEDADES DE LA PÁGINA PRINCIPAL
 * --------------------------------
 * Para publicar una noticia, agrega un objeto al INICIO de la lista.
 * La primera noticia se muestra destacada (más grande).
 *
 *   titulo:  texto corto (máx. ~70 caracteres)
 *   fecha:   'AAAA-MM-DD', o null si es algo vigente (ej. una convocatoria)
 *   eje:     'robotica' | 'coheteria' | 'orbital' | 'comunidad'
 *   resumen: 1–2 líneas
 *   imagen:  ruta desde esta carpeta, siempre dentro de new URL(..., import.meta.url)
 *   enlace:  opcional, a dónde lleva la tarjeta
 *
 * NOTA: las noticias de junio 2026 están armadas a partir de las fotos de la
 * galería (la fecha sale del nombre del archivo). Confirmar y reemplazar.
 */
export const noticias = [
    {
        titulo: 'Convocatoria 2026 abierta',
        fecha: null,
        eje: 'comunidad',
        resumen: 'Buscamos estudiantes de cualquier carrera con ganas de construir. No necesitas experiencia previa.',
        imagen: new URL('../../assets/images/rover/posando_rover_1.jpg', import.meta.url).href,
        enlace: '/registro/'
    },
    {
        titulo: 'Presentamos el programa en un evento de la UAI',
        fecha: '2026-06-11',
        eje: 'comunidad',
        resumen: 'Llevamos nuestros proyectos a un evento de la UAI para compartir lo que hacemos.',
        imagen: new URL('../../assets/images/gallery/IMG-20260611-WA0050.jpg', import.meta.url).href
    },
    {
        titulo: 'Ensayos de movilidad del rover',
        fecha: '2026-06-07',
        eje: 'robotica',
        resumen: 'Probamos la suspensión y la tracción del rover en terreno irregular.',
        imagen: new URL('../../assets/images/gallery/IMG-20260607-WA0030.jpg', import.meta.url).href,
        enlace: '/proyectos/rover/'
    },
    {
        titulo: 'Avanza el banco de integración FlatSat',
        fecha: '2026-06-07',
        eje: 'orbital',
        resumen: 'Integramos en laboratorio los subsistemas del CubeSat 1U antes de montarlos en la estructura.',
        imagen: new URL('../../assets/images/gallery/IMG-20260607-WA0039.jpg', import.meta.url).href,
        enlace: '/proyectos/cubesat/'
    },
    {
        titulo: 'Nueva plataforma de lanzamiento hidroneumática',
        fecha: '2026-06-07',
        eje: 'coheteria',
        resumen: 'Construimos la rampa para los primeros lanzamientos del cohete de agua.',
        imagen: new URL('../../assets/images/gallery/IMG-20260607-WA0022.jpg', import.meta.url).href,
        enlace: '/proyectos/cohete/'
    }
];
