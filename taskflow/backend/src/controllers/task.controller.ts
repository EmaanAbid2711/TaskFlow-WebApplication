import { Request, Response } from "express";
import path from "path";
import asyncHandler from "express-async-handler";

import {createTask, getProjectTasks, getTaskById, updateTask, deleteTask, uploadTaskAttachment,deleteTaskAttachment, createTaskComment} from "../services/task.service";
import {createTaskSchema, updateTaskSchema, createCommentSchema} from "../validations/task.validation";
import AppError from "../utils/AppError";

export const createTaskController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {
  throw new AppError(
    "Unauthorized",
    401
  );
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
  throw new AppError(
    "Unauthorized",
    401
  );
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
  throw new AppError(
    "Unauthorized",
    401
  );
}

  const task =
    await getTaskById(
      req.user.id,
      String(req.params.id)
    );

  res.status(200).json({
    success: true,
    data: task,
  });

});

export const updateTaskController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {
  throw new AppError(
    "Unauthorized",
    401
  );
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
  throw new AppError(
    "Unauthorized",
    401
  );
}

  if (!req.file) {
  throw new AppError(
    "No file uploaded.",
    400
  );
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

export const deleteTaskAttachmentController =
asyncHandler(async (

  req: Request,

  res: Response

) => {

  if (!req.user) {
  throw new AppError(
    "Unauthorized",
    401
  );
}

  await deleteTaskAttachment(

    req.user.id,

    String(req.params.id),

    String(req.params.attachmentId)

  );

  res.status(200).json({

    success: true,

    message: "Attachment deleted successfully.",

  });

});

export const deleteTaskController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {
  throw new AppError(
    "Unauthorized",
    401
  );
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

export const createTaskCommentController =
asyncHandler(async (
  req: Request,
  res: Response
) => {

  if (!req.user) {
  throw new AppError(
    "Unauthorized",
    401
  );
}

  const data =
    createCommentSchema.parse(
      req.body
    );

  const comment =
    await createTaskComment(
      req.user.id,
      String(req.params.id),
      data
    );

  res.status(201).json({
    success: true,
    data: comment,
  });

});