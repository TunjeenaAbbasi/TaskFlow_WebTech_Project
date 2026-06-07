import express from "express";

import {
  getTasks,
  createTask,
  deleteTask,
  bulkDeleteTasks,
  updateTask
} from "../controllers/taskController.js";


const router = express.Router();

//PUT change
// router.put("/tasks:id", updateTask);
router.put("/:id", updateTask);
// GET
router.get("/", getTasks);


// POST
router.post("/", createTask);


// BULK DELETE
router.delete("/bulk", bulkDeleteTasks);


// DELETE SINGLE
router.delete("/:id", deleteTask);

export default router;
