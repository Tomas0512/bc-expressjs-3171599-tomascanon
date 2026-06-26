import { z } from 'zod';

export const createStaffSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  role: z.string().min(1, 'El rol es requerido').max(80),
  phone: z.string().max(20).optional(),
  email: z.string().max(120).email('Email inválido').optional().or(z.literal('')),
});

export const updateStaffSchema = createStaffSchema.partial();

export type CreateStaffDto = z.infer<typeof createStaffSchema>;
export type UpdateStaffDto = z.infer<typeof updateStaffSchema>;
