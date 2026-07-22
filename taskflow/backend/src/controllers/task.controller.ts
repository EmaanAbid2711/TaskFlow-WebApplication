import { Request, Response } from "express";
import path from "path";
import asyncHandler from "express-async-handler";

import {createTask, getProjectTasks, getTaskById, updateTask, deleteTask, uploadTaskAttachment,} from "../services/task.service";
import {createTaskSchema, updateTaskSchema} from "../validations/task.validation";

export const createTaskController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;
  }

  const data =
    createTaskSchema.parse(req.body);

  const task =
    await createTask(
      req.user.id,
      data
    );

  res.status(201).json({
    success: true,
    data: task,
  });

});

export const getProjectTasksController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;
  }

  const projectId = String(req.params.projectId);

  const tasks =
    await getProjectTasks(
      req.user.id,
      projectId
    );

  res.status(200).json({
    success: true,
    data: tasks,
  });

});

export const getTaskController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;
  }

  const task =
    await getTaskById(
      req.user.id,
      String(req.params.id)
    );

  if (!task) {

    res.status(404).json({
      success: false,
      message: "Task not found",
    });

    return;

  }

  res.status(200).json({
    success: true,
    data: task,
  });

});

export const updateTaskController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;
  }

  const data =
    updateTaskSchema.parse(req.body);

  const task =
    await updateTask(
      req.user.id,
      String(req.params.id),
      data
    );

  res.status(200).json({
    success: true,
    data: task,
  });

});


export const uploadTaskAttachmentController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;
  }

  if (!req.file) {

    res.status(400).json({
      success: false,
      message: "No file uploaded.",
    });

    return;
  }

  const attachment =
    await uploadTaskAttachment(

      req.user.id,

      String(req.params.id),

      {
        fileName: req.file.originalname,

        fileUrl:
          `/uploads/task-attachments/${req.file.filename}`,

        fileType:
          req.file.mimetype,

        fileSize:
          `${(
            req.file.size / 1024
          ).toFixed(1)} KB`,
      }

    );

  res.status(201).json({

    success: true,

    data: attachment,

  });

});


export const deleteTaskController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;
  }

  await deleteTask(
    req.user.id,
    String(req.params.id)
  );

  res.status(200).json({
    success: true,
    message: "Task deleted successfully.",
  });

});