import type { Event, CreateEventDto, UpdateEventDto } from './types.js';

const events: Event[] = [];
let nextId = 1;

export function getAll(): Event[] {
  return events;
}

export function getById(id: number): Event | undefined {
  return events.find(event => event.id === id);
}

export function create(data: CreateEventDto): Event {
  const newEvent: Event = { id: nextId++, ...data };
  events.push(newEvent);
  return newEvent;
}

export function update(id: number, data: UpdateEventDto): Event | undefined {
  const index = events.findIndex(event => event.id === id);
  if (index === -1) return undefined;
  events[index] = { ...events[index], ...data };
  return events[index];
}

export function remove(id: number): boolean {
  const index = events.findIndex(event => event.id === id);
  if (index === -1) return false;
  events.splice(index, 1);
  return true;
}
