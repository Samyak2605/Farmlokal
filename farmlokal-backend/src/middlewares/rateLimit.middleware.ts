import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';

const MAX_REQUESTS = 100;
const WINDOW_SECONDS = 60;

export async function rateLimitMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key = `rate:${req.ip}`;

  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, WINDOW_SECONDS);
  }

  if (current > MAX_REQUESTS) {
    return res.status(429).json({
      message: 'Too many requests. Please try again later.',
    });
  }

  next();
}
