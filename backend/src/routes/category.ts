import { Router } from 'express';
import { getCategories, createCategory, deleteCategory } from '../controllers/CategoryController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getCategories);
router.post('/', authMiddleware, createCategory);
router.delete('/:id', authMiddleware, deleteCategory);

export default router;
