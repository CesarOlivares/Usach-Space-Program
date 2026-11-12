/*
 * Opciones del formulario de postulación y nombres que usa el panel.
 * Para sumar o quitar un área, edita AREAS_POR_EJE: el formulario se actualiza solo.
 */
export const EJE_LABEL = {
    robotica: 'Robótica',
    coheteria: 'Cohetería',
    orbital: 'Sistemas Orbitales',
    'no-se': 'Aún no lo sabe'
};

const TRANSVERSALES = ['Gestión y fondos', 'Comunicaciones y redes', 'Documentación'];

export const AREAS_POR_EJE = {
    robotica: ['Navegación autónoma', 'Visión artificial', 'Brazo robótico', 'Software de control', 'Electrónica y sensores', ...TRANSVERSALES],
    coheteria: ['Propulsión', 'Estructuras y manufactura', 'Aerodinámica y recuperación', 'Aviónica e instrumentación', 'Seguridad', ...TRANSVERSALES],
    orbital: ['Ingeniería de sistemas', 'Aviónica y potencia', 'Telecomunicaciones y software', 'Mecánica e integración', ...TRANSVERSALES],
    'no-se': ['Mecánica y manufactura', 'Electrónica', 'Software', ...TRANSVERSALES]
};

export const HORAS_LABEL = { '2-4': '2 a 4 h', '5-8': '5 a 8 h', '9-12': '9 a 12 h', '13+': '13 h o más' };

export const CARRERAS = [
    'Ingeniería Civil Mecatrónica', 'Ingeniería Civil Mecánica', 'Ingeniería Civil en Electricidad', 'Ingeniería Civil Informática',
    'Ingeniería Civil Industrial', 'Ingeniería Civil Química', 'Ingeniería Civil en Biotecnología', 'Ingeniería Civil en Metalurgia',
    'Ingeniería Civil en Minas', 'Ingeniería Civil en Obras Civiles', 'Ingeniería Civil en Geomensura', 'Ingeniería Civil en Ambiente',
    'Ingeniería de Ejecución en Mecánica', 'Ingeniería de Ejecución en Electricidad', 'Ingeniería de Ejecución en Electrónica',
    'Ingeniería de Ejecución en Computación e Informática', 'Ingeniería de Ejecución en Metalurgia', 'Ingeniería de Ejecución en Minas',
    'Ingeniería de Ejecución en Geomensura', 'Ingeniería de Ejecución en Climatización', 'Ingeniería de Ejecución en Química',
    'Licenciatura en Ciencia de la Computación', 'Licenciatura en Física Aplicada', 'Licenciatura en Matemática',
    'Analista en Computación Científica', 'Ingeniería Estadística', 'Pedagogía en Física y Matemática', 'Pedagogía en Matemática y Computación',
    'Química y Farmacia', 'Bioquímica', 'Química', 'Pedagogía en Química y Biología',
    'Ingeniería Comercial', 'Contador Público y Auditor', 'Administración Pública',
    'Medicina', 'Enfermería', 'Kinesiología', 'Obstetricia y Puericultura', 'Terapia Ocupacional',
    'Psicología', 'Periodismo', 'Publicidad', 'Sociología', 'Licenciatura en Estudios Internacionales', 'Licenciatura en Historia',
    'Licenciatura en Lingüística Aplicada a la Traducción', 'Pedagogía en Educación Física', 'Pedagogía en Inglés', 'Pedagogía en Castellano',
    'Pedagogía en Historia y Ciencias Sociales',
    'Arquitectura', 'Diseño Industrial', 'Diseño en Comunicación Visual', 'Derecho',
    'Tecnología en Alimentos', 'Tecnología en Automatización Industrial', 'Tecnología en Construcciones Civiles',
    'Tecnología en Gestión de la Producción', 'Tecnología en Mantenimiento Industrial', 'Tecnología en Telecomunicaciones',
    'Técnico Universitario', 'Bachillerato en Ciencias y Humanidades', 'Postgrado USACH', 'Otra carrera'
];
