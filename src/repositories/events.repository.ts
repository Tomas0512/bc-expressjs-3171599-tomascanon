import { Event } from '../types';

export type CreateEventRepoDto = Omit<Event, 'id' | 'createdAt'>;
export type UpdateEventRepoDto = Partial<CreateEventRepoDto>;

let items: Event[] = [
  { id: 1, title: 'Concierto de Rock', description: 'Banda internacional en vivo', date: '2026-07-15', location: 'Auditorio Nacional', category: 'música', price: 25000, capacity: 5000, createdAt: new Date() },
  { id: 2, title: 'Feria Gastronómica', description: 'Degustación de platos típicos de la región', date: '2026-08-01', location: 'Centro de Convenciones', category: 'gastronomía', price: 15000, capacity: 2000, createdAt: new Date() },
  { id: 3, title: 'Obra de Teatro', description: 'Adaptación contemporánea de un clásico literario', date: '2026-07-20', location: 'Teatro Municipal', category: 'teatro', price: 35000, capacity: 800, createdAt: new Date() },
];

let nextId = 4;

export async function findAll(): Promise<Event[]> {
  return [...items];
}

export async function findById(id: number): Promise<Event | undefined> {
  return items.find((i) => i.id === id);
}

export async function create(dto: CreateEventRepoDto): Promise<Event> {
  const item: Event = { id: nextId++, ...dto, createdAt: new Date() };
  items.push(item);
  return { ...item };
}

export async function update(id: number, dto: UpdateEventRepoDto): Promise<Event | undefined> {
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return undefined;
  items[index] = { ...items[index], ...dto };
  return { ...items[index] };
}

export async function remove(id: number): Promise<boolean> {
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}
