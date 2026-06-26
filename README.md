# 🏛️ Proyecto Semanal – API REST con Express

**Bootcamp:** bc-expressjs
**Estudiante:** Tomas Cañón

---

## 🎪 Dominio del Proyecto

**Sistema de Gestión de Eventos – Productora de Eventos**

API REST para la gestión de eventos corporativos y sociales, desarrollada con Express 5 + TypeScript. Su propósito es modelar las entidades del dominio de una productora de eventos exponiendo endpoints CRUD con arquitectura en capas.

---

## 🎯 Objetivo

Aplicar los fundamentos de Express.js para:

- Construir un servidor HTTP con Express 5 y TypeScript
- Implementar endpoints CRUD para las entidades del dominio
- Validar datos de entrada con Zod
- Persistir datos con Prisma + PostgreSQL o Mongoose + MongoDB
- Aplicar middleware de errores, logging y seguridad

---

## 🧩 Entidades del Dominio

### 🎪 Evento (Event)

Representa un evento producido por la empresa.

| Campo       | Tipo                  | Descripción                      |
| ----------- | --------------------- | -------------------------------- |
| id          | number / ObjectId     | Identificador único              |
| title       | string                | Nombre del evento                |
| description | string (opcional)     | Descripción del evento           |
| date        | string                | Fecha del evento                 |
| location    | string                | Ubicación del evento             |
| category    | string                | Categoría (Música, Gastronomía…) |
| price       | number                | Precio de entrada                |
| capacity    | number                | Capacidad máxima                 |
| staff       | ObjectId (ref Staff)  | Staff asignado al evento         |

### 👤 Staff

Representa el personal que trabaja en los eventos.

| Campo  | Tipo              | Descripción                 |
| ------ | ----------------- | --------------------------- |
| id     | ObjectId          | Identificador único         |
| name   | string            | Nombre del miembro          |
| role   | string            | Rol (Fotógrafo, Chef, etc.) |
| phone  | string (opcional) | Teléfono de contacto        |
| email  | string (opcional) | Correo electrónico (único)  |

---

## 📐 Arquitectura

El proyecto sigue una arquitectura en capas (`controller → service → repository`), implementada progresivamente a lo largo de las semanas del bootcamp.

```
src/
├── app.ts                  # Configuración de Express
├── server.ts               # Punto de entrada
├── controllers/            # Manejadores HTTP (req/res)
├── services/               # Lógica de negocio
├── repositories/           # Acceso a datos
├── schemas/                # Validación con Zod
├── models/                 # Modelos de Mongoose
├── middlewares/             # Middleware personalizado
├── errors/                 # Clase AppError
├── lib/                    # Conexión a base de datos
└── seed.ts                 # Datos de prueba
```

---

## ⚙️ Funcionalidades Implementadas

- CRUD completo de eventos y staff
- Validación de datos con Zod
- Paginación, búsqueda por título
- Manejo de errores con AppError (400, 404, 409, 500)
- Población de referencias (populate en Mongoose)
- Seed con datos de prueba

---

## ▶️ Ejecución del Proyecto

```bash
pnpm install
pnpm run dev
```

### Seed de datos

```bash
pnpm run seed
```

---

## 📡 Endpoints

| Método | Ruta                  | Descripción              |
| ------ | --------------------- | ------------------------ |
| GET    | `/health`             | Health check             |
| GET    | `/api/v1/events`      | Listar eventos           |
| GET    | `/api/v1/events/:id`  | Obtener evento por ID    |
| POST   | `/api/v1/events`      | Crear evento             |
| PUT    | `/api/v1/events/:id`  | Actualizar evento        |
| DELETE | `/api/v1/events/:id`  | Eliminar evento          |
| GET    | `/api/v1/staff`       | Listar staff             |
| GET    | `/api/v1/staff/:id`   | Obtener staff por ID     |
| POST   | `/api/v1/staff`       | Crear staff              |
| PUT    | `/api/v1/staff/:id`   | Actualizar staff         |
| DELETE | `/api/v1/staff/:id`   | Eliminar staff           |
