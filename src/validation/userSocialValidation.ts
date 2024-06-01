import * as z from 'zod';

export const ProfileUpdateSchema = z.object({
  github: z
    .string()
    .url()
    .refine(
      (value) =>
        value.includes('https://github.com/') ||
        value.includes('https://www.github.com/'),
      {
        message: 'Invalid GitHub URL',
      },
    )
    .or(z.literal('')),
  facebook: z
    .string()
    .url()
    .refine(
      (value) =>
        value.includes('https://facebook.com/') ||
        value.includes('https://www.facebook.com/'),
      {
        message: 'Invalid Facebook URL',
      },
    )
    .or(z.literal('')),
  x: z
    .string()
    .url()
    .refine(
      (value) =>
        value.includes('https://twitter.com/') ||
        value.includes('https://x.com/') ||
        value.includes('https://www.twitter.com/') ||
        value.includes('https://www.x.com/'),
      {
        message:
          'Invalid URL: must include either https://twitter.com/ or https://x.com/',
      },
    )
    .or(z.literal('')),
  linkedin: z
    .string()
    .url()
    .refine(
      (value) =>
        value.includes('https://www.linkedin.com/') ||
        value.includes('https://linkedin.com/'),
      {
        message: 'Invalid LinkedIn URL',
      },
    )
    .or(z.literal('')),
  instagram: z
    .string()
    .url()
    .refine(
      (value) =>
        value.includes('https://www.instagram.com/') ||
        value.includes('https://instagram.com/'),
      {
        message: 'Invalid Instagram URL',
      },
    )
    .or(z.literal('')),

  stackoverflow: z
    .string()
    .url()
    .includes('https://', { message: 'Invalid stackoverflow URL' })
    .or(z.literal('')),
  youtube: z
    .string()
    .url()
    .refine(
      (value) =>
        value.includes('https://youtube.com/') ||
        value.includes('https://www.youtube.com/'),
      {
        message: 'Invalid YouTube URL',
      },
    )
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
