import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z.string().regex(objectIdRegex, 'ID inválido');

export const createEventSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(150),
  description: z.string().max(500).optional(),
  date: z.string().min(1, 'La fecha es requerida'),
  location: z.string().min(1, 'La ubicación es requerida'),
  category: z.string().min(1, 'La categoría es requerida'),
  price: z.coerce.number().nonnegative('El precio no puede ser negativo').default(0),
  capacity: z.coerce.number().int().positive('La capacidad debe ser mayor a 0').default(100),
  staff: z.string().regex(objectIdRegex, 'ID de staff inválido'),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
