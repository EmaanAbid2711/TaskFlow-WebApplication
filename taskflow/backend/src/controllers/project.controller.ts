import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {createProject, getProjects, getProjectById, updateProject, deleteProject} from "../services/project.service";
import {createProjectSchema, updateProjectSchema} from "../validations/project.validation";


export const createProjectController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;
  }

  const data =
    createProjectSchema.parse(req.body);

  const project =
    await createProject(
      req.user.id,
      data
    );

  res.status(201).json({
    success: true,
    data: project,
  });

});

export const getProjectsController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;
  }

  const projects =
    await getProjects(req.user.id);

  res.status(200).json({
    success: true,
    data: projects,
  });

});

export const getProjectController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;
  }

  const project =
    await getProjectById(
      req.user.id,
      String(req.params.id)
    );

  if (!project) {

    res.status(404).json({
      success: false,
      message: "Project not found",
    });

    return;

  }

  res.status(200).json({
    success: true,
    data: project,
  });

});


export const updateProjectController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;

  }

  const data =
    updateProjectSchema.parse(req.body);

  const project =
    await updateProject(
      req.user.id,
      String(req.params.id),
      data
    );

  if (!project) {

    res.status(404).json({
      success: false,
      message: "Project not found",
    });

    return;

  }

  res.status(200).json({
    success: true,
    data: project,
  });

});

export const deleteProjectController =
asyncHandler(async (req: Request, res: Response) => {

  if (!req.user) {

    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

    return;

  }

  const deleted =
    await deleteProject(
      req.user.id,
      String(req.params.id)
    );

  if (!deleted) {

    res.status(404).json({
      success: false,
      message: "Project not found",
    });

    return;

  }

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });

});