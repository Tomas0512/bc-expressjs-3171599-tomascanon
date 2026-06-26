import { z } from 'zod';

export const createEventSchema = z.object({
  title: z
    .string()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede superar los 100 caracteres')
    .trim(),
  description: z.string().max(500, 'La descripción no puede superar 500 caracteres').default(''),
  date: z.string().min(1, 'La fecha del evento es obligatoria'),
  location: z.string().min(1, 'La ubicación es obligatoria').trim(),
  category: z.string().min(1, 'La categoría es obligatoria').trim(),
  price: z.coerce.number().nonnegative('El precio no puede ser negativo'),
  capacity: z.coerce.number().int('La capacidad debe ser un número entero').positive('La capacidad debe ser mayor a 0').default(100),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
