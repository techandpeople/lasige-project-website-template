import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Content is organised as content/<lang>/<type>/<file>.md
// The language is derived from the first path segment — no lang field needed in frontmatter.

const sections = defineCollection({
  loader: glob({ pattern: '*/sections/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    navLabel: z.string().optional(),
    order: z.number().default(10),
    background: z.enum(['default', 'surface']).default('default'),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '*/team/*.md', base: './content' }),
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
  loader: glob({ pattern: '*/funders/*.md', base: './content' }),
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
    url: z.string().optional(),
    grant: z.string().optional(),
    order: z.number().default(0),
  }),
});

const deliverables = defineCollection({
  loader: glob({ pattern: '*/deliverables/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z.enum(['publication', 'software', 'dataset', 'report', 'other']).default('other'),
    date: z.string().optional(),
    url: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { sections, team, funders, deliverables };
