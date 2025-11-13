import { Router } from 'express';
import { getSuppliers, createSupplier, deleteSupplier } from '../controllers/SupplierController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getSuppliers);
router.post('/', authMiddleware, createSupplier);
router.delete('/:id', authMiddleware, deleteSupplier);

export default router;
