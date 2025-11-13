import { Router } from 'express';
import { stockEntry, stockExit, getMovements } from '../controllers/StockController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/entry', authMiddleware, stockEntry);
router.post('/exit', authMiddleware, stockExit);
router.get('/movements', authMiddleware, getMovements);

export default router;
