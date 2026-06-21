import { config, fields, collection } from '@keystatic/core';

const isProd = process.env.NODE_ENV === 'production';

export default config({
  storage: isProd
    ? {
        kind: 'github',
        repo: 'CesarOlivares/Usach-Space-Program',
      }
    : {
        kind: 'local',
      },
  collections: {
    proyectos: collection({
      label: 'Proyectos',
      slugField: 'title',
      path: 'src/content/proyectos/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        description: fields.text({ label: 'Descripción', multiline: true }),
        axisLevel: fields.select({
          label: 'Eje del Proyecto (Level)',
          options: [
            { label: 'Level 1', value: 'Level 1' },
            { label: 'Level 2', value: 'Level 2' },
          ],
          defaultValue: 'Level 1',
        }),
        layoutType: fields.select({
          label: 'Tipo de Diseño (Layout)',
          options: [
            { label: 'Timeline Horizontal (Style A - CanSat)', value: 'timeline-horizontal' },
            { label: 'Timeline Vertical (Style A - Rover)', value: 'timeline-vertical' },
            { label: 'Sidebar Azul (Style B - Cohete, Egg Drop, Impresión 3D)', value: 'sidebar-blue' },
            { label: 'Sidebar Dorado (Style C - Cubesat/Rover Avanzado)', value: 'sidebar-gold' },
          ],
          defaultValue: 'sidebar-blue',
        }),
        backgroundImage: fields.image({
          label: 'Imagen de Fondo',
          directory: 'src/assets/proyectos',
          publicPath: '../../assets/proyectos/',
        }),
        missionPatch: fields.image({
          label: 'Parche de la Misión',
          directory: 'src/assets/proyectos',
          publicPath: '../../assets/proyectos/',
        }),
        specs: fields.object({
          label: 'Especificaciones del Proyecto (Sidebar)',
          fields: {
            costo: fields.text({ label: 'Costo Aproximado' }),
            tiempo: fields.text({ label: 'Tiempo Estimado' }),
            rol: fields.text({ label: 'Rol Organizador / Eje' }),
            recompensa: fields.text({ label: 'Recompensa de Misión', multiline: true }),
            referenceLink: fields.text({ label: 'Enlace de Referencia (Opcional)' }),
            referenceLabel: fields.text({ label: 'Etiqueta del Enlace (Opcional)' }),
            techStack: fields.text({ label: 'Stack Tecnológico (Opcional, viñetas con saltos de línea)', multiline: true }),
          }
        }),
        content: fields.markdoc({
          label: 'Contenido del Proyecto',
          extension: 'md',
          options: {
            image: {
              directory: 'src/assets/proyectos',
              publicPath: '../../assets/proyectos/',
            },
          },
        }),
      },
    }),
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        author: fields.text({ label: 'Autor' }),
        publishDate: fields.date({ label: 'Fecha de Publicación' }),
        category: fields.select({
          label: 'Categoría',
          options: [
            { label: 'Tutorial', value: 'tutorial' },
            { label: 'Hito (Milestone)', value: 'milestone' },
          ],
          defaultValue: 'tutorial',
        }),
        content: fields.markdoc({
          label: 'Contenido',
          extension: 'md',
          options: {
            image: {
              directory: 'src/assets/blog',
              publicPath: '../../assets/blog/',
            },
          },
        }),
      },
    }),
  },
});
