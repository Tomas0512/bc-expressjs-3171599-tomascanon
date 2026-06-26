import { Event, PaginatedResponse } from '../types';
import * as repo from '../repositories/events.repository';
import { AppError } from '../errors/AppError';

interface FindAllOptions {
  page: number;
  limit: number;
}

export async function findAll(opts: FindAllOptions): Promise<PaginatedResponse<Event>> {
  const { page, limit } = opts;
  const all = await repo.findAll();
  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);
  return { data, total: all.length, page, limit };
}

export async function findById(id: number): Promise<Event> {
  const item = await repo.findById(id);
  if (!item) throw new AppError(404, `Evento con id ${id} no encontrado`);
  return item;
}

export async function create(dto: repo.CreateEventRepoDto): Promise<Event> {
  return repo.create(dto);
}

export async function update(id: number, dto: repo.UpdateEventRepoDto): Promise<Event> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Evento con id ${id} no encontrado`);
  const updated = await repo.update(id, dto);
  return updated!;
}

export async function remove(id: number): Promise<void> {
  const exists = await repo.findById(id);
  if (!exists) throw new AppError(404, `Evento con id ${id} no encontrado`);
  await repo.remove(id);
}
