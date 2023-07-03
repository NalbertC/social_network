import { Router } from "express";
import LikeController from "../controllers/LikeController";
import { ensureAuthenticated } from "../middlewares/authentication";

const likeRoutes = Router();

likeRoutes.patch("/:postId", ensureAuthenticated, LikeController.like);

export { likeRoutes };
