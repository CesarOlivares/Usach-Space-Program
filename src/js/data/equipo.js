/*
 * EQUIPO — directiva del USACH Space Program
 * ------------------------------------------
 * Alimenta la página "Quiénes somos". El orden de la lista es el orden en pantalla.
 *
 *   slug:     identificador corto (se usa para el ancla /quienes-somos/#slug)
 *   nombre:   nombre como se muestra
 *   cargo:    cargo en la directiva
 *   ejes:     [] de 'robotica' | 'coheteria' | 'orbital'; vacío si no lidera un eje
 *   rolEje:   texto corto del rol en el eje ('Co-líder de Robótica')
 *   carrera:  una línea
 *   bio:      párrafos; vacío = "bio pendiente"
 *   destacados: opcional, lista corta de puntos
 *   foto:     retrato; foco: posición del recorte (object-position)
 *   contacto: opcional { correo, linkedin }
 *
 * Las fotos van en src/assets/images/equipo/ (WebP).
 */
const foto = (url) => url.href;

export const fundacion = '2026-04-01';

export const equipo = [
    {
        slug: 'cesar-olivares',
        nombre: 'César Olivares',
        cargo: 'Presidente',
        ejes: ['robotica', 'coheteria'],
        rolEje: 'Líder de Cohetería · Co-líder de Robótica',
        carrera: 'Estudiante de 4.° año de Ingeniería Civil Mecatrónica',
        bio: [
            'Apasionado por la tecnología y la innovación aeroespacial, combino mi formación en Ingeniería Civil Mecatrónica en la USACH con el rol de cofundador y Presidente del USACH Space Program.',
            'Más allá del diseño y la ingeniería de sistemas, mi foco está en la gestión estratégica: guiar iniciativas interdisciplinarias y convertir ideas técnicas audaces en proyectos estructurados, con potencial de convertirse en soluciones tangibles y transferibles al sector productivo. Creo firmemente en el talento joven como motor de desarrollo, y trabajo para que cada desarrollo del programa cuente con la solidez técnica y la visión ejecutiva necesarias para trascender el laboratorio.'
        ],
        destacados: [
            'Liderazgo interdisciplinario y visión estratégica: coordinación de equipos técnicos en robótica, cohetería experimental y cargas útiles satelitales.',
            'Mentalidad venture-driven: experiencia en programas de aceleración e innovación tecnológica, con propuestas de transferencia real hacia la industria.'
        ],
        foto: foto(new URL('../../assets/images/equipo/cesar-olivares.webp', import.meta.url)),
        foco: '82% 40%',
        contacto: {
            correo: 'cesar.olivares.l@usach.cl',
            linkedin: 'https://www.linkedin.com/in/cesar-olivares-lavalovich-706311396'
        }
    },
    {
        slug: 'alessandro-orellano',
        nombre: 'H. Alessandro Orellano',
        cargo: 'Vicepresidente',
        ejes: ['robotica'],
        rolEje: 'Líder de Robótica',
        carrera: 'Estudiante de 5.° año de Ingeniería Civil Mecatrónica y ayudante de Electricidad y Magnetismo',
        bio: [
            'Me especializo en transformar conceptos de ingeniería en hardware tangible mediante impresión 3D, manufactura, electrónica aplicada y control autónomo, entre ellos ROS y visión artificial.',
            'En la USP coordino la ejecución operativa de los proyectos como Vicepresidente y co-lidero el Eje de Robótica. Estuve a cargo de la impresión 3D, el ensamblaje mecánico y el sistema de control inteligente de nuestro rover.'
        ],
        foto: foto(new URL('../../assets/images/equipo/alessandro-orellano.webp', import.meta.url)),
        foco: '50% 20%'
    },
    {
        slug: 'benjamin-saavedra',
        nombre: 'Benjamín Saavedra Palma',
        cargo: 'Secretario General',
        ejes: [],
        rolEje: 'Administración',
        carrera: 'Estudiante de 1.° año de Ingeniería de Ejecución en Electricidad',
        bio: [
            'Especializado en electricidad de potencia y electrónica, con competencias técnicas en instrumentación y diseño de PCBs bajo las normativas IPC (IPC-2221, IPC-A-610).',
            'Encargado del apoyo a la coordinación y administración dentro de las divisiones y proyectos.'
        ],
        foto: foto(new URL('../../assets/images/equipo/benjamin-saavedra.webp', import.meta.url)),
        foco: '30% 35%'
    },
    {
        slug: 'daniel',
        nombre: 'Daniel González',
        cargo: 'Tesorero',
        ejes: ['orbital'],
        rolEje: 'Líder de Sistemas Orbitales',
        carrera: 'Ingeniero de Ejecución en Mecánica y estudiante de Ingeniería Civil en Mecatrónica',
        bio: [
            'Soy Ingeniero de Ejecución en Mecánica y hoy continúo mi formación en Ingeniería Civil en Mecatrónica. Mi base en mecánica me da una mirada práctica sobre cómo se diseñan, fabrican y prueban los sistemas.',
            'En la USP lidero el Eje de Sistemas Orbitales, donde desarrollamos nuestro CubeSat 1U: la arquitectura del computador de a bordo, las comunicaciones y la integración de cada subsistema, avanzando por etapas y con todo documentado. Como Tesorero, además, administro los recursos del programa.'
        ],
        foto: foto(new URL('../../assets/images/equipo/daniel.webp', import.meta.url)),
        foco: '50% 30%'
    },
    {
        slug: 'simon-garcia-huidobro',
        nombre: 'Simón García-Huidobro',
        cargo: 'Admisión',
        ejes: [],
        rolEje: 'Admisión y actividades abiertas',
        carrera: 'Estudiante de 4.° año de Ingeniería Civil Mecatrónica',
        bio: [
            'Tengo experiencia en manufactura, prototipado y diseño 3D, además de conocimientos en soldadura y electrónica.',
            'Actualmente estoy a cargo de la admisión en las actividades de la USP y lidero el taller "Cohete de Agua".'
        ],
        foto: foto(new URL('../../assets/images/equipo/simon-garcia-huidobro.webp', import.meta.url)),
        foco: '50% 15%'
    },
    {
        slug: 'martin-castillo',
        nombre: 'Martín Castillo',
        cargo: 'Director de Transferencia Tecnológica Interdisciplinaria',
        ejes: ['orbital'],
        rolEje: 'Co-líder de Sistemas Orbitales',
        carrera: 'Estudiante de 5.° año de Ingeniería Civil Mecatrónica',
        bio: [
            'Me especializo en el diseño, prototipado y validación de sistemas electrónicos complejos y de potencia para proyectos multidisciplinarios de alto impacto. Dentro de la USP lidero la arquitectura eléctrica y de circuitería de nuestra misión CubeSat, además de gestionar los repositorios de información y los canales de transferencia tecnológica de la organización. Mi trayectoria abarca desde el modelado matemático y la comunicación con brazos robóticos industriales hasta la simulación y optimización de sistemas fotovoltaicos avanzados.',
            'Para estructurar y transmitir este conocimiento técnico me he valido de mi base pedagógica, forjada como ayudante de cálculo multivariable y profesor particular de matemática avanzada, lo que me permite organizar la información de forma efectiva y traducir conceptos abstractos en hardware funcional. Actualmente sigo expandiendo mis límites con el diseño de PCBs de grado profesional y la arquitectura de sistemas embebidos.'
        ],
        foto: foto(new URL('../../assets/images/equipo/martin-castillo.webp', import.meta.url)),
        foco: '22% 40%',
        contacto: { correo: 'martin.castillo@usach.cl' }
    }
];
