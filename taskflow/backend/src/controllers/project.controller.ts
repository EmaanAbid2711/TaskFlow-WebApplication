import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {createProject, getProjects, getProjectById} from "../services/project.service";
import { createProjectSchema } from "../validations/project.validation";

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

  const projectId = String(req.params.id);
    const project =
      await getProjectById(
        req.user.id,
        projectId
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