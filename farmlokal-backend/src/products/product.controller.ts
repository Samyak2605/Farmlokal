import { Request, Response } from 'express';
import { listProducts } from './product.service';

export async function getProductsHandler(req: Request, res: Response) {
  const data = await listProducts(req.query);
  res.json(data);
}
