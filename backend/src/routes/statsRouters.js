import express from "express";
import {
  getOverview,
  getWeeklyStats,
  getCategoryStats,
} from "../controllers/statsControllers.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/overview", getOverview);
router.get("/weekly", getWeeklyStats);
router.get("/categories", getCategoryStats);

export default router;
