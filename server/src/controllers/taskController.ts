import { Request, Response } from "express";
//import Task from "../models/Task";
import Task from "../models/Task.js"; //  Add .js

// GET TASKS
export const getTasks = async (
  req: Request,
  res: Response
) => {
  try {
    const filter = req.query.activeOnly === 'true' ? { status: { $ne: 'Done' as const } } : {};
    const tasks = await Task.find(filter).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};


// CREATE TASK
export const createTask = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
    });
  }
};


// DELETE SINGLE TASK
export const deleteTask = async (
  req: Request,
  res: Response
) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};


// BULK DELETE
export const bulkDeleteTasks = async (
  req: Request,
  res: Response
) => {
  try {
    const { ids } = req.body;

    await Task.deleteMany({
      _id: { $in: ids },
    });

    res.json({
      message: "Selected tasks deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Bulk delete failed",
    });
  }
};


// UPDATE TASK ✅ add this at the bottom
export const updateTask = async (
  req: Request,
  res: Response
) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
 if (!updated) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
    });
  }
};
