import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';

export async function findAll(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    prisma.event.findMany({ skip, take: limit, include: { clients: true }, orderBy: { createdAt: 'desc' } }),
    prisma.event.count(),
  ]);
  return { data, total, page, limit };
}

export async function findById(id: number) {
  return prisma.event.findUnique({ where: { id }, include: { clients: true } });
}

export async function create(data: {
  title: string; description?: string; date: string; location: string;
  category: string; price?: number; capacity?: number;
}) {
  try {
    return await prisma.event.create({ data, include: { clients: true } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new AppError(409, 'Ya existe un evento con ese valor único');
    }
    throw err;
  }
}

export async function update(id: number, data: Partial<{
  title: string; description?: string; date: string; location: string;
  category: string; price: number; capacity: number;
}>) {
  try {
    return await prisma.event.update({ where: { id }, data, include: { clients: true } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, `Evento con id ${id} no encontrado`);
    }
    throw err;
  }
}

export async function remove(id: number): Promise<void> {
  try {
    await prisma.event.delete({ where: { id } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      throw new AppError(404, `Evento con id ${id} no encontrado`);
    }
    throw err;
  }
}
