import express from "express";

import {
  getTasks,
  createTask,
  deleteTask,
  bulkDeleteTasks,
  updateTask
} from "../controllers/taskController.js";


const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);

router.delete("/bulk", bulkDeleteTasks); // ALWAYS BEFORE :id
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
