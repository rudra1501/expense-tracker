import {Router} from 'express';
import { addExpense, deleteExpense, getExpenses, updateExpesnse } from '../controllers/expense.controller.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', requireAuth, addExpense);
router.get('/', requireAuth, getExpenses);
router.put('/:id', requireAuth, updateExpesnse);
router.delete('/:id', requireAuth, deleteExpense);

export default router;