import { Router } from 'express';
import { createSale, getSales } from '../controllers/SaleController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createSale);
router.get('/', authMiddleware, getSales);

export default router;
