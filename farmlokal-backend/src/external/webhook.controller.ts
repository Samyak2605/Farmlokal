import { Request, Response } from 'express';
import { redis } from '../config/redis';

export async function webhookHandler(req: Request, res: Response) {
  const eventId = req.body.eventId;
  const exists = await redis.get(`event:${eventId}`);

  if (exists) return res.status(200).send('Duplicate');

  await redis.set(`event:${eventId}`, '1', 'EX', 86400);
  // process event here

  res.status(200).send('Processed');
}
