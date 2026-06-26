import express from 'express';
import staffRouter from './routes/staff.routes';
import eventRouter from './routes/event.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/staff', staffRouter);
app.use('/api/v1/events', eventRouter);

app.use(notFound);
app.use(errorHandler);
