import { Schema, model, Types } from 'mongoose';

interface IEvent {
  title: string;
  description?: string;
  date: string;
  location: string;
  category: string;
  price: number;
  capacity: number;
  staff: Types.ObjectId;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: [true, 'El título es requerido'], trim: true, maxlength: 150 },
    description: { type: String, trim: true, maxlength: 500 },
    date: { type: String, required: [true, 'La fecha es requerida'] },
    location: { type: String, required: [true, 'La ubicación es requerida'], trim: true },
    category: { type: String, required: [true, 'La categoría es requerida'], trim: true },
    price: { type: Number, default: 0, min: 0 },
    capacity: { type: Number, default: 100, min: 1 },
    staff: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
      required: [true, 'El staff asignado es requerido'],
    },
  },
  { timestamps: true },
);

export const Event = model<IEvent>('Event', eventSchema);
