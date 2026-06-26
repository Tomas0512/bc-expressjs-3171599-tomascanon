export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  active: boolean;
  createdAt: string;
}

export type CreateEventDto = Omit<Event, 'id' | 'createdAt'>;
export type UpdateEventDto = Partial<CreateEventDto>;

export interface SingleResponse<T> {
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
