export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
}

export type CreateEventDto = Omit<Event, 'id'>;
export type UpdateEventDto = Partial<CreateEventDto>;
