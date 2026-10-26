/*
 * NOVEDADES
 * ---------
 * Alimenta las tarjetas del inicio (las 5 primeras) y la página /novedades/ (todas).
 * Para publicar una noticia, agrega un objeto al INICIO de la lista.
 *
 *   slug:      identificador corto para el enlace (/novedades/#slug)
 *   titulo:    texto corto (máx. ~70 caracteres)
 *   fecha:     'AAAA-MM-DD'
 *   eje:       'robotica' | 'coheteria' | 'orbital' | 'comunidad'
 *   lugar:     dónde fue
 *   resumen:   1–2 líneas para la tarjeta del inicio
 *   cuerpo:    párrafos de la noticia completa
 *   fotos:     [{ src, alt }]; la primera es la portada
 *   destacada: opcional; la noticia que se muestra grande en el inicio
 *   afiches:   opcional; las fotos son afiches verticales y se muestran completos
 *
 * Las fotos van en src/assets/images/eventos/<slug>/ (máx. 1.400 px, JPEG ~78%).
 */
// La ruta va escrita completa dentro de new URL() para que Vite la incluya en el build
const foto = (url, alt) => ({ src: url.href, alt });

export const noticias = [
    {
        slug: 'inscripciones-actividades-abiertas',
        titulo: 'Inscripciones abiertas: cohetes de agua, Salva a Usachín y CubeSats',
        fecha: '2026-10-26',
        eje: 'comunidad',
        lugar: 'Universidad de Santiago de Chile',
        resumen: 'Tres actividades para cualquier carrera de la USACH, en equipos de 3 y sin experiencia previa. Inscripciones hasta el 4 de noviembre.',
        cuerpo: [
            'Abrimos las inscripciones para las tres actividades abiertas del semestre: el Concurso de diseño de cohetes de agua, la competencia Salva a Usachín y el Taller de desarrollo de CubeSats.',
            'Pueden participar estudiantes de cualquier carrera de la USACH y no se necesita experiencia previa: aprendemos haciendo. Se trabaja en equipos de 3, los miércoles en el bloque W3, y las actividades se desarrollan hasta diciembre.',
            'En el concurso, cada equipo diseña, construye y pone a prueba su propio cohete de agua; el ganador se lleva un kit de electrónica y una sorpresa. En Salva a Usachín, el desafío es diseñar y construir el paracaídas de un cohete, con un peluche de Usachín como premio. En el taller, cada equipo arma y prueba su primer CubeSat funcional.',
            'Las inscripciones están abiertas hasta el 4 de noviembre. Al cerrarlas, el equipo del programa define los cupos de cada actividad.'
        ],
        fotos: [
            foto(new URL('../../assets/images/eventos/actividades-abiertas/afiche-cohetes-de-agua.webp', import.meta.url), 'Afiche del Concurso de diseño de cohetes de agua'),
            foto(new URL('../../assets/images/eventos/actividades-abiertas/afiche-salva-a-usachin.webp', import.meta.url), 'Afiche de Salva a Usachín: Usachín desciende con un paracaídas'),
            foto(new URL('../../assets/images/eventos/actividades-abiertas/afiche-taller-cubesats.webp', import.meta.url), 'Afiche del Taller de desarrollo de CubeSats')
        ],
        enlace: '/talleres/',
        destacada: true,
        afiches: true
    },
    {
        slug: 'organizafest-2026',
        titulo: 'Organizafest: lanzamos un cohete de agua en plena feria',
        fecha: '2026-09-30',
        eje: 'comunidad',
        lugar: 'Universidad de Santiago de Chile',
        resumen: 'En la feria de organizaciones estudiantiles de la VRAE mostramos nuestros prototipos y lanzamos un cohete de agua a baja escala.',
        cuerpo: [
            'El Organizafest es la feria que organiza la Vicerrectoría de Apoyo Estudiantil (VRAE) para dar a conocer todas las organizaciones estudiantiles de la universidad. Aunque el enfoque de la jornada fue principalmente cultural, también hubo un espacio para proyectos técnicos, y ahí estuvo el USACH Space Program.',
            'En el toldo que se nos asignó mostramos varios de nuestros prototipos: el rover, el modelo del CubeSat con sus paneles solares y los cohetes de agua. Además, hicimos un lanzamiento de un cohete de agua a baja escala frente al público.'
        ],
        fotos: [
            foto(new URL('../../assets/images/eventos/organizafest/stand-usp.jpg', import.meta.url), 'Toldo del USACH Space Program lleno de público en el Organizafest'),
            foto(new URL('../../assets/images/eventos/organizafest/lanzamiento.jpg', import.meta.url), 'Cohete de agua listo en su rampa antes del lanzamiento, con el equipo de fondo'),
            foto(new URL('../../assets/images/eventos/organizafest/prototipos.jpg', import.meta.url), 'Mesa con prototipos del programa y estudiantes conversando con el equipo'),
            foto(new URL('../../assets/images/eventos/organizafest/cubesat-paneles.jpg', import.meta.url), 'Modelo del CubeSat con paneles solares y rover en miniatura'),
            foto(new URL('../../assets/images/eventos/organizafest/astronauta.jpg', import.meta.url), 'Integrante del equipo junto a una persona con traje de astronauta'),
            foto(new URL('../../assets/images/eventos/organizafest/lienzo.jpg', import.meta.url), 'Dos integrantes sostienen el lienzo del USACH Space Program')
        ]
    },
    {
        slug: 'pruebas-cohete-de-agua',
        titulo: 'Cuatro lanzamientos del cohete de agua y unos 60 metros de altura',
        fecha: '2026-09-28',
        eje: 'coheteria',
        lugar: 'Universidad y un parque cercano',
        resumen: 'Probamos el cohete de una etapa con botella de 500 ml: 4 lanzamientos que alcanzaron cerca de 60 metros.',
        cuerpo: [
            'El eje de Cohetería salió a probar su cohete de agua de una sola etapa, construido sobre una botella de 500 ml y con piezas impresas en 3D.',
            'Los lanzamientos se hicieron en la universidad y en un parque cercano, en zonas despejadas para que ninguna persona estuviera en riesgo. Se hicieron 4 lanzamientos y el cohete alcanzó aproximadamente 60 metros de altura.'
        ],
        fotos: [
            foto(new URL('../../assets/images/eventos/pruebas-cohete/cohete-en-rampa.jpg', import.meta.url), 'Cohete de agua en la rampa, contra el cielo, mientras se presuriza'),
            foto(new URL('../../assets/images/eventos/pruebas-cohete/cohete-500ml.jpg', import.meta.url), 'Cohete de agua de una etapa armado sobre una botella de 500 ml'),
            foto(new URL('../../assets/images/eventos/pruebas-cohete/preparacion.jpg', import.meta.url), 'Integrante del equipo preparando el lanzamiento en el pasto'),
            foto(new URL('../../assets/images/eventos/pruebas-cohete/parque.jpg', import.meta.url), 'Lanzamiento de prueba en un parque cercano a la universidad'),
            foto(new URL('../../assets/images/eventos/pruebas-cohete/impresion.jpg', import.meta.url), 'Piezas del cohete saliendo de la impresora 3D')
        ],
        enlace: '/proyectos/cohete/'
    },
    {
        slug: 'cubesat-a-escala-real',
        titulo: 'Armamos un CubeSat a escala real para mostrar cómo funciona',
        fecha: '2026-09-09',
        eje: 'orbital',
        lugar: 'Laboratorio del programa, USACH',
        resumen: 'Un modelo de 10 × 10 × 10 cm con circuitos simples y motores que giran los paneles solares.',
        cuerpo: [
            'El equipo de Sistemas Orbitales se juntó a armar un modelo del CubeSat 1U a tamaño real, con circuitos simples y motores que giran los paneles solares.',
            'Es un modelo demostrativo: sirve para mostrar las dimensiones de un CubeSat real y las funciones que debe cumplir en órbita. La estructura se imprimió en 3D y se ensambló a mano durante la jornada.'
        ],
        fotos: [
            foto(new URL('../../assets/images/eventos/cubesat-escala/modelo.jpg', import.meta.url), 'Estructura del CubeSat 1U a escala real sobre una base con el logo del programa'),
            foto(new URL('../../assets/images/eventos/cubesat-escala/ensamblaje.jpg', import.meta.url), 'Integrante del equipo ensamblando la estructura del CubeSat'),
            foto(new URL('../../assets/images/eventos/cubesat-escala/impresion.jpg', import.meta.url), 'Impresora 3D fabricando una pieza del CubeSat'),
            foto(new URL('../../assets/images/eventos/cubesat-escala/estructura.jpg', import.meta.url), 'Vista lateral de la estructura del CubeSat'),
            foto(new URL('../../assets/images/eventos/cubesat-escala/paneles.jpg', import.meta.url), 'Estructura del CubeSat armada sobre la mesa de trabajo')
        ],
        enlace: '/proyectos/cubesat/'
    },
    {
        slug: 'feria-de-admision',
        titulo: 'Mostramos el rover en la Feria de Admisión USACH',
        fecha: '2026-09-01',
        eje: 'comunidad',
        lugar: 'Universidad de Santiago de Chile',
        resumen: 'Estudiantes de enseñanza media que piensan entrar a la USACH conocieron el rover del programa.',
        cuerpo: [
            'Por invitación de la organización de la Feria de Admisión y de la Vicerrectoría de Apoyo Estudiantil (VRAE), llevamos el rover a la feria para mostrárselo a estudiantes de enseñanza media que están pensando en entrar a la universidad.',
            'Fue una oportunidad para contarles qué hacemos en el programa y cómo pueden sumarse cuando entren a la universidad.'
        ],
        fotos: [
            foto(new URL('../../assets/images/eventos/feria-admision/rover.jpg', import.meta.url), 'El rover del programa bajo un toldo en la Feria de Admisión')
        ]
    },
    {
        slug: '3d-printer-party',
        titulo: 'El rover ganó en la 3D Printer Party Chile',
        fecha: '2026-08-29',
        eje: 'robotica',
        lugar: '3D Printer Party Chile',
        resumen: 'Llevamos nuestros prototipos como USACH Space Program y el rover fue premiado por su mecánica impresa en 3D.',
        cuerpo: [
            'Llegamos a la 3D Printer Party invitados como parte de Full 3D, pero esta vez presentándonos como USACH Space Program y mostrando nuestros propios prototipos.',
            'El rover, con su suspensión y su estructura impresas en 3D, se llevó los reconocimientos a Mejor Mecánica 3D Impresa y Mejor Impresión 3D Aplicada 2026.'
        ],
        fotos: [
            foto(new URL('../../assets/images/eventos/printer-party/rover-premio.jpg', import.meta.url), 'El rover junto al trofeo de la 3D Printer Party Chile'),
            foto(new URL('../../assets/images/eventos/printer-party/placa-mecanica.jpg', import.meta.url), 'Placa del premio Mejor Mecánica 3D Impresa 2026 sobre el rover'),
            foto(new URL('../../assets/images/eventos/printer-party/placa-aplicada.jpg', import.meta.url), 'Placa del premio Mejor Impresión 3D Aplicada 2026'),
            foto(new URL('../../assets/images/eventos/printer-party/stand.jpg', import.meta.url), 'El rover en exhibición en el stand durante el evento'),
            foto(new URL('../../assets/images/eventos/printer-party/rover-trofeo.jpg', import.meta.url), 'Vista lateral del rover con el trofeo')
        ],
        enlace: '/proyectos/rover/'
    },
    {
        slug: 'feria-vector',
        titulo: 'Primera demostración del rover en movimiento, en la Feria Vector',
        fecha: '2026-08-18',
        eje: 'robotica',
        lugar: 'Centro de Innovación USACH',
        resumen: 'Junto a Full 3D y al Centro de Innovación, mostramos el rover andando sobre el pasto.',
        cuerpo: [
            'Fuimos a la Feria Vector como parte de Full 3D para mostrar el rover. Para entonces el rover ya estaba empezando a moverse, así que la jornada fue sobre todo demostrativa, junto al Centro de Innovación.',
            'El rover recorrió el pasto frente al público, poniendo a prueba su suspensión y su tracción fuera del taller.'
        ],
        fotos: [
            foto(new URL('../../assets/images/eventos/feria-vector/rover-pasto.jpg', import.meta.url), 'El rover sobre el pasto durante la demostración'),
            foto(new URL('../../assets/images/eventos/feria-vector/rover-andando.jpg', import.meta.url), 'El rover avanzando por el pasto frente al público'),
            foto(new URL('../../assets/images/eventos/feria-vector/demostracion.jpg', import.meta.url), 'Vista general de la demostración del rover al aire libre'),
            foto(new URL('../../assets/images/eventos/feria-vector/stand.jpg', import.meta.url), 'El rover en el stand de la feria')
        ],
        enlace: '/proyectos/rover/'
    },
    {
        slug: 'visita-colegio-rancagua',
        titulo: 'Llevamos el rover a un colegio de Rancagua',
        fecha: '2026-07-29',
        eje: 'comunidad',
        lugar: 'Rancagua',
        resumen: 'Visitamos un colegio para mostrar el rover y los avances de robótica del programa.',
        cuerpo: [
            'Visitamos un colegio de Rancagua en una actividad organizada en parte por Full 3D. Nos invitaron principalmente a mostrar el rover y los avances del eje de Robótica.'
        ],
        fotos: [
            foto(new URL('../../assets/images/eventos/rancagua/equipo.jpg', import.meta.url), 'Integrantes del equipo junto al rover en el stand del colegio'),
            foto(new URL('../../assets/images/eventos/rancagua/rover.jpg', import.meta.url), 'El rover en el salón del colegio'),
            foto(new URL('../../assets/images/eventos/rancagua/sala.jpg', import.meta.url), 'Vista general del salón con el rover y los stands')
        ]
    }
];
