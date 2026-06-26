import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(100).trim(),
  description: z.string().max(500).optional(),
  date: z.string().min(1, 'La fecha es obligatoria'),
  location: z.string().min(1, 'La ubicación es obligatoria').trim(),
  category: z.string().min(1, 'La categoría es obligatoria').trim(),
  price: z.coerce.number().nonnegative('El precio no puede ser negativo').default(0),
  capacity: z.coerce.number().int().positive('La capacidad debe ser mayor a 0').default(100),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
