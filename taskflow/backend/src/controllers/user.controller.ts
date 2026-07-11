import {Request, Response} from "express";
import asyncHandler from "express-async-handler";

import {getUserProfile, updateUserProfile} from "../services/user.service";
import {updateProfileSchema} from "../validations/user.validation";

export const profile =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const userId = req.user.id;
      const user =
        await getUserProfile(userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    }
  );

export const updateProfile =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<void> => {
    
    
      if (!req.user) {
        res.status(401).json({
          success: false,
          message:
            "Unauthorized",
        });
      
        return;
      }
    
    
      const userId =
        req.user.id;
    
    
      const avatar =
        req.file
          ? `/uploads/profile-images/${req.file.filename}`
          : undefined;
    
    
    
      const data = {
      
        name:
          req.body.name,
      
        username:
          req.body.username,
      
        bio:
          req.body.bio,
      
        location:
          req.body.location,
      
        website:
          req.body.website,
      
        role:
          req.body.role,
      
        timezone:
          req.body.timezone,
      
      
        ...(avatar && {
          avatar,
        }),
      
      };
    
    
    
      const updatedUser =
        await updateUserProfile(
          userId,
          data
        );
      
      
      
      res.status(200).json({
      
        success:true,
      
        data:updatedUser,
      
      });
    
    }
  );