import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

const router = Router();
router.get(

"/profile",

authMiddleware,

(req,res)=>{
  res.json({
    success:true,
    message:
      "Profile fetched successfully",
    data:{
      user:req.user
    }
  });
}
);

export default router;