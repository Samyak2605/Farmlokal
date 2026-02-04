import { Router } from 'express';
import { getProductsHandler } from './products/product.controller';
import { webhookHandler } from './external/webhook.controller';

const router = Router();

router.get('/products', getProductsHandler);
router.post('/webhook', webhookHandler);

export default router;
