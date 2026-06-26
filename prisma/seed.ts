import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env['DATABASE_URL'] ?? 'postgresql://bootcamp:bootcamp@localhost:5432/bootcamp_dev';
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  console.log('🌱 Iniciando seed...');

  await prisma.client.deleteMany();
  await prisma.event.deleteMany();

  const event1 = await prisma.event.create({
    data: { title: 'Concierto de Rock', description: 'Banda internacional en vivo', date: '2026-07-15', location: 'Auditorio Nacional', category: 'música', price: 25000, capacity: 5000 },
  });
  const event2 = await prisma.event.create({
    data: { title: 'Feria Gastronómica', description: 'Degustación de platos típicos', date: '2026-08-01', location: 'Centro de Convenciones', category: 'gastronomía', price: 15000, capacity: 2000 },
  });
  const event3 = await prisma.event.create({
    data: { title: 'Obra de Teatro', description: 'Adaptación de un clásico literario', date: '2026-07-20', location: 'Teatro Municipal', category: 'teatro', price: 35000, capacity: 800 },
  });
  const event4 = await prisma.event.create({
    data: { title: 'Festival de Cine', description: 'Muestra de cine independiente', date: '2026-09-10', location: 'Cinemateca Distrital', category: 'cine', price: 12000, capacity: 1500 },
  });
  const event5 = await prisma.event.create({
    data: { title: 'Maratón Benéfica', description: 'Carrera de 10km a favor de fundaciones', date: '2026-10-05', location: 'Parque Central', category: 'deporte', price: 0, capacity: 3000 },
  });

  await prisma.client.createMany({
    data: [
      { name: 'Ana López', email: 'ana@example.com', phone: '555-0101', eventId: event1.id },
      { name: 'Carlos Ruiz', email: 'carlos@example.com', phone: '555-0102', eventId: event1.id },
      { name: 'María García', email: 'maria@example.com', phone: '555-0103', eventId: event1.id },
      { name: 'Pedro Martínez', email: 'pedro@example.com', phone: '555-0104', eventId: event2.id },
      { name: 'Lucía Fernández', email: 'lucia@example.com', phone: '555-0105', eventId: event2.id },
      { name: 'Jorge Hernández', email: 'jorge@example.com', phone: '555-0106', eventId: event3.id },
    ],
  });

  const eventCount = await prisma.event.count();
  const clientCount = await prisma.client.count();
  console.log(`✅ ${eventCount} eventos y ${clientCount} clientes creados`);
}

main()
  .catch((err: unknown) => {
    console.error('❌ Error en seed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
