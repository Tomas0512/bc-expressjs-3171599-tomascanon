import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import { eventsRouter } from './routes/events.routes.js';

export function createApp(): Application {
  const app = express();

  app.use(express.json());
  app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
  });
  app.get('/health', (_req, res) => { res.json({ status: 'ok' }); });
  app.use('/api/v1/events', eventsRouter);
  app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}
