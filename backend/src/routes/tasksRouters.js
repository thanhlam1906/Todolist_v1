import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controllers/tasksControllers.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// Tất cả routes đều yêu cầu xác thực
router.use(authMiddleware);

router.get("/", getAllTasks);

router.post("/", createTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
