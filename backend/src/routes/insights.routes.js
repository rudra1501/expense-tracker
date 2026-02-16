import express from "express"
import { requireAuth } from "../middleware/authMiddleware.js";
import { getInsights } from "../controllers/insights.controller.js";

const router = express.Router();

router.get("/", requireAuth, getInsights);

export default router;