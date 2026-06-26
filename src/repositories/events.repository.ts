import { Event, CreateEventDto, UpdateEventDto } from '../types';

const store: Event[] = [
  { id: 1, title: 'Concierto de Rock', description: 'Banda internacional en vivo', date: '2026-07-15', location: 'Auditorio Nacional', category: 'música', active: true, createdAt: new Date().toISOString() },
  { id: 2, title: 'Feria Gastronómica', description: 'Degustación de platos típicos', date: '2026-08-01', location: 'Centro de Convenciones', category: 'gastronomía', active: true, createdAt: new Date().toISOString() },
  { id: 3, title: 'Obra de Teatro', description: 'Adaptación de un clásico literario', date: '2026-07-20', location: 'Teatro Municipal', category: 'teatro', active: false, createdAt: new Date().toISOString() },
];
let nextId = 4;

export async function findAll(): Promise<Event[]> {
  return [...store];
}

export async function findById(id: number): Promise<Event | undefined> {
  return store.find((event) => event.id === id);
}

export async function create(dto: CreateEventDto): Promise<Event> {
  const event: Event = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(event);
  return { ...event };
}

export async function update(id: number, dto: UpdateEventDto): Promise<Event | undefined> {
  const index = store.findIndex((event) => event.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index], ...dto };
  return { ...store[index] };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((event) => event.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
