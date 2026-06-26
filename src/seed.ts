import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Staff } from './models/staff.model';
import { Event } from './models/event.model';

async function seed(): Promise<void> {
  await connectDB();

  await Event.deleteMany({});
  await Staff.deleteMany({});
  console.log('Collections cleared');

  const [staff1, staff2, staff3] = await Staff.insertMany([
    { name: 'Carlos López', role: 'Fotógrafo', phone: '3001112233', email: 'carlos@eventos.com' },
    { name: 'María García', role: 'Chef', phone: '3004445566', email: 'maria@eventos.com' },
    { name: 'Pedro Ramírez', role: 'Sonidista', phone: '3007778899' },
  ]);
  console.log('Staff inserted');

  await Event.insertMany([
    {
      title: 'Concierto de Jazz',
      description: 'Noche de jazz en vivo',
      date: '2026-12-15',
      location: 'Teatro Principal',
      category: 'Música',
      price: 50000,
      capacity: 300,
      staff: staff1._id,
    },
    {
      title: 'Feria Gastronómica',
      description: 'Degustación de platos típicos',
      date: '2026-11-20',
      location: 'Plaza Mayor',
      category: 'Gastronomía',
      price: 25000,
      capacity: 500,
      staff: staff2._id,
    },
    {
      title: 'Conferencia Tech',
      description: 'Innovación y tecnología 2026',
      date: '2026-10-10',
      location: 'Centro de Convenciones',
      category: 'Tecnología',
      price: 0,
      capacity: 200,
      staff: staff3._id,
    },
    {
      title: 'Boda Elegante',
      description: 'Ceremonia y recepción',
      date: '2027-02-14',
      location: 'Hacienda El Encanto',
      category: 'Social',
      price: 150000,
      capacity: 150,
      staff: staff1._id,
    },
    {
      title: 'Taller de Cocina',
      description: 'Aprende a cocinar sushi',
      date: '2026-09-05',
      location: 'Cocina Central',
      category: 'Taller',
      price: 80000,
      capacity: 20,
      staff: staff2._id,
    },
  ]);
  console.log('Events inserted');

  console.log('Seed completed successfully');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
