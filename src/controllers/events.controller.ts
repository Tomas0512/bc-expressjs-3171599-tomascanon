import { Request, Response, NextFunction } from 'express';
import * as service from '../services/events.service';
import { CreateEventDto, UpdateEventDto, SingleResponse } from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string, 10) || 10));
    const result = await service.findAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Bad Request', message: 'Invalid id' });
      return;
    }
    const event = await service.findById(id);
    if (!event) {
      res.status(404).json({ error: 'Not Found', message: 'Event not found' });
      return;
    }
    const response: SingleResponse<typeof event> = { data: event };
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = req.body as CreateEventDto;
    const event = await service.create(dto);
    const response: SingleResponse<typeof event> = { data: event };
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Bad Request', message: 'Invalid id' });
      return;
    }
    const dto = req.body as UpdateEventDto;
    const updated = await service.update(id, dto);
    if (!updated) {
      res.status(404).json({ error: 'Not Found', message: 'Event not found' });
      return;
    }
    const response: SingleResponse<typeof updated> = { data: updated };
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Bad Request', message: 'Invalid id' });
      return;
    }
    const removed = await service.remove(id);
    if (!removed) {
      res.status(404).json({ error: 'Not Found', message: 'Event not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
