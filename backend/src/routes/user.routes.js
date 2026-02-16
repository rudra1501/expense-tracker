import { deleteProfile, getProfile, updateProfile } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import express from "express"

const router = express.Router();

router.get("/profile", requireAuth, getProfile);
router.put("/profile", requireAuth, updateProfile);
router.delete("/profile", requireAuth, deleteProfile);

export default router;