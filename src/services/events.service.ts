import * as repo from '../repositories/events.repository';
import { AppError } from '../errors/AppError';

export async function listItems(page: number, limit: number) {
  return repo.findAll(page, limit);
}

export async function getItem(id: number) {
  const item = await repo.findById(id);
  if (!item) throw new AppError(404, `Evento con id ${id} no encontrado`);
  return item;
}

export async function createItem(data: Parameters<typeof repo.create>[0]) {
  return repo.create(data);
}

export async function updateItem(id: number, data: Parameters<typeof repo.update>[1]) {
  return repo.update(id, data);
}

export async function deleteItem(id: number): Promise<void> {
  await repo.remove(id);
}
