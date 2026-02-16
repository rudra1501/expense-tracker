import { Router } from 'express'
import { getCategory, getMonthlyTotals, getSummary } from '../controllers/analytics.controller.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { exportData } from '../controllers/export.controller.js';

const router = Router();

router.get('/summary',requireAuth, getSummary);
router.get('/by-category',requireAuth, getCategory);
router.get('/monthly',requireAuth, getMonthlyTotals);
router.get('/export', requireAuth, exportData);

export default router;