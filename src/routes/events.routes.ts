import { Router } from 'express';
import * as store from '../store.js';
import type { CreateEventDto, UpdateEventDto } from '../types.js';

export const eventsRouter = Router();

eventsRouter.get('/', (_req, res) => {
  const events = store.getAll();
  res.json(events);
});

eventsRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }
  const event = store.getById(id);
  if (!event) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }
  res.json(event);
});

eventsRouter.post('/', (req, res) => {
  const body = req.body as CreateEventDto;
  if (!body.title || !body.description || !body.date || !body.location || !body.category) {
    res.status(400).json({ error: 'Missing required fields: title, description, date, location, category' });
    return;
  }
  const event = store.create(body);
  res.status(201).json(event);
});

eventsRouter.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }
  const data = req.body as UpdateEventDto;
  const event = store.update(id, data);
  if (!event) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }
  res.json(event);
});

eventsRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: 'Invalid id' });
    return;
  }
  const removed = store.remove(id);
  if (!removed) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }
  res.status(204).send();
});
