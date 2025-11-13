import { Router } from 'express';
import { getCustomers, createCustomer, deleteCustomer } from '../controllers/CustomerController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getCustomers);
router.post('/', authMiddleware, createCustomer);
router.delete('/:id', authMiddleware, deleteCustomer);

export default router;
