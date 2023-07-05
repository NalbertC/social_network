import { Router } from "express";
import multer from "multer";
import multerConfig from "../configs/multer";
import PostController from "../controllers/PostController";
import { ensureAuthenticated } from "../middlewares/authentication";

const postRoutes = Router();

postRoutes.get("/",  PostController.index);
postRoutes.post(
  "/",
  ensureAuthenticated,
  multer(multerConfig).single("file"),
  PostController.create
);
postRoutes.get("/post/:postId",
// ensureAuthenticated,
 PostController.post);

export { postRoutes };
