import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { createProject,  getProjects, getProjectById, updateProject, deleteProject, moveProjectToRecycleBin, restoreProject, permanentlyDeleteProject} from "../services/project.service";
import { createProjectSchema, updateProjectSchema} from "../validations/project.validation";
import AppError from "../utils/AppError";

// --------------------------------------------------------------------------
// Create Project
// --------------------------------------------------------------------------

export const createProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const data = createProjectSchema.parse(req.body);

    const project = await createProject(req.user.id, data);

    res.status(201).json({
      success: true,
      data: project,
    });
  }
);

// --------------------------------------------------------------------------
// Get Projects
// --------------------------------------------------------------------------

export const getProjectsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const projects = await getProjects(req.user.id);

    res.status(200).json({
      success: true,
      data: projects,
    });
  }
);

// --------------------------------------------------------------------------
// Get Single Project
// --------------------------------------------------------------------------

export const getProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const project = await getProjectById(
      req.user.id,
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      data: project,
    });
  }
);

// --------------------------------------------------------------------------
// Update Project
// --------------------------------------------------------------------------

export const updateProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const data = updateProjectSchema.parse(req.body);

    const project = await updateProject(
      req.user.id,
      String(req.params.id),
      data
    );

    res.status(200).json({
      success: true,
      data: project,
    });
  }
);

// --------------------------------------------------------------------------
// Legacy Permanent Delete
// --------------------------------------------------------------------------

export const deleteProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    await deleteProject(
      req.user.id,
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  }
);

// --------------------------------------------------------------------------
// Move Project To Recycle Bin
// --------------------------------------------------------------------------

export const moveProjectToRecycleBinController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const project = await moveProjectToRecycleBin(
      req.user.id,
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      message: "Project moved to recycle bin",
      data: project,
    });
  }
);

// --------------------------------------------------------------------------
// Restore Project
// --------------------------------------------------------------------------

export const restoreProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    const project = await restoreProject(
      req.user.id,
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      message: "Project restored successfully",
      data: project,
    });
  }
);

// --------------------------------------------------------------------------
// Permanently Delete Project
// --------------------------------------------------------------------------

export const permanentlyDeleteProjectController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError("Unauthorized", 401);
    }

    await permanentlyDeleteProject(
      req.user.id,
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      message: "Project permanently deleted",
    });
  }
);