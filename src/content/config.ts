import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    country: z.enum(['US', 'UK', 'Canada', 'Australia']).optional(),
    relatedTool: z.string(),
    /** Slug of the og:image to use — defaults to the related tool's banner */
    ogImage: z.string().optional(),
  }),
});

export const collections = { blog };
