import mongoose from 'mongoose';
import { Event } from '../models/event.model';
import { AppError } from '../errors/AppError';
import type { CreateEventDto, UpdateEventDto } from '../schemas/event.schema';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function findAll(page: number, limit: number, search?: string): Promise<PaginatedResult<unknown>> {
  const skip = (page - 1) * limit;
  const filter = search ? { title: { $regex: search, $options: 'i' } } : {};
  const [data, total] = await Promise.all([
    Event.find(filter).populate('staff').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Event.countDocuments(filter),
  ]);
  return { data, total, page, totalPages: Math.ceil(total / limit) };
}

export async function findById(id: string) {
  try {
    const doc = await Event.findById(id).populate('staff').lean();
    if (!doc) throw new AppError(404, 'Evento no encontrado');
    return doc;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de evento inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateEventDto) {
  try {
    return await Event.create(dto);
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un evento con ese valor único');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateEventDto) {
  try {
    const doc = await Event.findByIdAndUpdate(id, dto, { new: true, runValidators: true }).populate('staff').lean();
    if (!doc) throw new AppError(404, 'Evento no encontrado');
    return doc;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de evento inválido');
    }
    throw err;
  }
}

export async function remove(id: string) {
  try {
    const doc = await Event.findByIdAndDelete(id).lean();
    if (!doc) throw new AppError(404, 'Evento no encontrado');
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de evento inválido');
    }
    throw err;
  }
}
