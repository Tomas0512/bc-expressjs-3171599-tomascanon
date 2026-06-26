import * as repo from '../repositories/event.repository';
import type { CreateEventDto, UpdateEventDto } from '../schemas/event.schema';

export async function getAll(page: number, limit: number, search?: string) {
  return repo.findAll(page, limit, search);
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createEvent(dto: CreateEventDto) {
  return repo.create(dto);
}

export async function updateEvent(id: string, dto: UpdateEventDto) {
  return repo.update(id, dto);
}

export async function deleteEvent(id: string) {
  return repo.remove(id);
}
