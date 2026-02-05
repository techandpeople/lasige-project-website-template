import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sections = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/sections' }),
  schema: z.object({
    title: z.string(),
    navLabel: z.string().optional(),
    order: z.number().default(10),
    background: z.enum(['default', 'surface']).default('default'),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    institution: z.string().optional(),
    order: z.number().default(0),
    links: z.object({
      email: z.string().optional(),
      website: z.string().optional(),
      orcid: z.string().optional(),
      scholar: z.string().optional(),
    }).optional(),
  }),
});

const funders = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/funders' }),
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
    url: z.string().optional(),
    grant: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { sections, team, funders };
