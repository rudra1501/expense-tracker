import { Router } from "express";
import { addIncome, deleteIncome, getIncomes, updateIncome } from "../controllers/income.controller.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/', requireAuth, addIncome);
router.get('/', requireAuth, getIncomes);
router.put('/:id', requireAuth, updateIncome);
router.delete('/:id', requireAuth, deleteIncome);


export default router;