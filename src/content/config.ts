import { defineCollection, z } from 'astro:content';

const proyectos = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      axisLevel: z.enum(['Level 1', 'Level 2']),
      layoutType: z.enum(['timeline-horizontal', 'timeline-vertical', 'sidebar-blue', 'sidebar-gold']),
      backgroundImage: image().optional(),
      missionPatch: image().optional(),
      specs: z.object({
        costo: z.string().optional(),
        tiempo: z.string().optional(),
        rol: z.string().optional(),
        recompensa: z.string().optional(),
        referenceLink: z.string().optional(),
        referenceLabel: z.string().optional(),
        techStack: z.string().optional(),
      }).optional(),
    }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    publishDate: z.coerce.date(),
    category: z.enum(['tutorial', 'milestone']),
  }),
});

export const collections = {
  proyectos,
  blog,
};
