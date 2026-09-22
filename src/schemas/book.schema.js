import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().trim().min(1, 'title darf nicht leer sein'),
  author: z.string().trim().min(1, 'author darf nicht leer sein'),
  read: z.boolean().optional(),
});

export const updateBookSchema = createBookSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Mindestens ein Feld angeben',
  });