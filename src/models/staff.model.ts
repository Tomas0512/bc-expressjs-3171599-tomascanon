import { Schema, model } from 'mongoose';

interface IStaff {
  name: string;
  role: string;
  phone?: string;
  email?: string;
}

const staffSchema = new Schema<IStaff>(
  {
    name: { type: String, required: [true, 'El nombre es requerido'], trim: true, maxlength: 100 },
    role: { type: String, required: [true, 'El rol es requerido'], trim: true, maxlength: 80 },
    phone: { type: String, trim: true, maxlength: 20 },
    email: { type: String, trim: true, maxlength: 120, unique: true, sparse: true },
  },
  { timestamps: true },
);

export const Staff = model<IStaff>('Staff', staffSchema);
