import * as z from 'zod';

export const ProfileUpdateSchema = z.object({
  website: z
    .string()
    .url()
    .includes('https://', { message: 'Invalid web address' }),
  github: z
    .string()
    .url()
    .includes('https://github.com/', { message: 'Invalid GitHub URL' }),
  facebook: z
    .string()
    .url()
    .includes('https://facebook.com/', { message: 'Invalid facebook URL' }),
  twitter: z
    .string()
    .url()
    .includes('https://twitter.com/', { message: 'Invalid twitter URL' }),
  linkedIn: z
    .string()
    .url()
    .includes('https://linkedIn.com/', { message: 'Invalid linkedIn URL' }),
  instagram: z
    .string()
    .url()
    .includes('https://instagram.com/', { message: 'Invalid instagram URL' }),
  hashnode: z
    .string()
    .url()
    .includes('https://hashnode.com/', { message: 'Invalid hashnode URL' }),
  stackoverflow: z
    .string()
    .url()
    .includes('https://', { message: 'Invalid stackoverflow URL' }),
  youtube: z
    .string()
    .url()
    .includes('https://youtube.com/', { message: 'Invalid youtube URL' }),
  mastodon: z
    .string()
    .url()
    .includes('https://', { message: 'Invalid mastodon URL' }),
});
