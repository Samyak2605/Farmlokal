import express from 'express';
import routes from './routes';
import { rateLimitMiddleware } from './middlewares/rateLimit.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

export const app = express();

app.use(express.json());
app.use(rateLimitMiddleware);

app.use(routes);

app.use(errorMiddleware);
