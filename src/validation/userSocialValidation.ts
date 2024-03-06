import * as z from 'zod';

export const ProfileUpdateSchema = z.object({
  github: z
    .string()
    .url()
    .includes('https://github.com/', { message: 'Invalid GitHub URL' })
    .or(z.literal('')),
  facebook: z
    .string()
    .url()
    .includes('https://facebook.com/', { message: 'Invalid facebook URL' })
    .or(z.literal('')),
  x: z
    .string()
    .url()
    .includes('https://x.com/', { message: 'Invalid twitter URL' })
    .or(z.literal('')),
  linkedIn: z
    .string()
    .url()
    .includes('https://linkedIn.com/', { message: 'Invalid linkedIn URL' })
    .or(z.literal('')),
  instagram: z
    .string()
    .url()
    .includes('https://instagram.com/', { message: 'Invalid instagram URL' })
    .or(z.literal('')),

  stackoverflow: z
    .string()
    .url()
    .includes('https://', { message: 'Invalid stackoverflow URL' })
    .or(z.literal('')),
  youtube: z
    .string()
    .url()
    .includes('https://youtube.com/', { message: 'Invalid youtube URL' })
    .or(z.literal('')),
  mastodon: z
    .string()
    .url()
    .includes('https://', { message: 'Invalid mastodon URL' })
    .or(z.literal('')),
});

export const professionalDetailSchema = z.object({
  stack: z.string().or(z.literal('')),
  portfolio: z.string().url().or(z.literal('')),
  blog: z.string().url().or(z.literal('')),
});

export const personalDetailSchema = z.object({
  bio: z.string().or(z.literal('')),
  location: z.string().or(z.literal('')),
});
