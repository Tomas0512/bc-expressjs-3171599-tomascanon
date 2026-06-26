import express from 'express';
import { morganMiddleware } from './config/logger';
import eventsRouter from './routes/events.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(morganMiddleware);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/events', eventsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
