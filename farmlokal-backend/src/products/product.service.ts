import { redis } from '../config/redis';
import { getProducts } from './product.repository';

export async function listProducts(params: any) {
  const cacheKey = `products:${JSON.stringify(params)}`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const data = await getProducts(params);
  await redis.set(cacheKey, JSON.stringify(data), 'EX', 30);
  return data;
}
