# 🏛️ Proyecto Semanal – API REST con Express

Bootcamp: bc-expressjs
Estudiante: Tomas Cañón

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

Campos: id, title, description, date, location, category, price, capacity, staff

### 👤 Staff

Representa el personal que trabaja en los eventos.

Campos: id, name, role, phone, email

---

## 🏷️ Tipado del Dominio

Se usa la interfaz `IEvent` e `IStaff` con tipos explícitos.
El campo `status` usa un type union con valores:
- upcoming | ongoing | completed | cancelled

---

## ⚙️ Funcionalidades Implementadas

- CRUD completo de eventos y staff
- Validación de datos con Zod
- Paginación y búsqueda por título
- Manejo de errores con AppError (400, 404, 409, 500)
- Población de referencias (populate en Mongoose)
- Seed con datos de prueba

---

## 📂 Estructura del Proyecto

```
├── package.json
├── tsconfig.json
├── docker-compose.yml
├── .env
├── README.md
└── src/
    ├── app.ts
    ├── server.ts
    ├── seed.ts
    ├── controllers/
    ├── services/
    ├── repositories/
    ├── schemas/
    ├── models/
    ├── middlewares/
    ├── errors/
    └── lib/
```

---

## ▶️ Ejecución del Proyecto

```bash
pnpm install
pnpm run dev
```
