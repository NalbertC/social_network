import { Router } from "express";
import multer from "multer";
import multerConfig from "../configs/multer";
import UploadController from "../controllers/UploadController";
import { ensureAuthenticated } from "../middlewares/authentication";

const uploadRoutes = Router();

uploadRoutes.get("/", UploadController.getAllUploads);
uploadRoutes.post(
  "/user",
  ensureAuthenticated,
  multer(multerConfig).single("file"),
  UploadController.uploadImageUser
);

export { uploadRoutes };
