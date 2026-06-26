import mongoose from 'mongoose';
import { Staff } from '../models/staff.model';
import { AppError } from '../errors/AppError';
import type { CreateStaffDto, UpdateStaffDto } from '../schemas/staff.schema';

export async function findAll() {
  return Staff.find().sort({ name: 1 }).lean();
}

export async function findById(id: string) {
  try {
    const doc = await Staff.findById(id).lean();
    if (!doc) throw new AppError(404, 'Staff no encontrado');
    return doc;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de staff inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateStaffDto) {
  try {
    return await Staff.create(dto);
  } catch (err) {
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un staff con ese email');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateStaffDto) {
  try {
    const doc = await Staff.findByIdAndUpdate(id, dto, { new: true, runValidators: true }).lean();
    if (!doc) throw new AppError(404, 'Staff no encontrado');
    return doc;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de staff inválido');
    }
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe un staff con ese email');
    }
    throw err;
  }
}

export async function remove(id: string) {
  try {
    const doc = await Staff.findByIdAndDelete(id).lean();
    if (!doc) throw new AppError(404, 'Staff no encontrado');
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID de staff inválido');
    }
    throw err;
  }
}
