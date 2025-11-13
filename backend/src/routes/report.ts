import { Router } from 'express';
import { salesReport, stockReport } from '../controllers/ReportController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/sales', authMiddleware, salesReport);
router.get('/stock', authMiddleware, stockReport);

export default router;
