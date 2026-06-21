import { defineCollection, z } from 'astro:content';

const proyectos = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      axisLevel: z.enum(['Level 1', 'Level 2']),
      backgroundImage: image().optional(),
      missionPatch: image().optional(),
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
