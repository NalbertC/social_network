import { Router } from "express";
import UserController from "../controllers/UserController";
import { ensureAuthenticated } from "../middlewares/authentication";

const userRoutes = Router();

userRoutes.post("/", UserController.create);
userRoutes.get("/", UserController.index);
userRoutes.get("/user", ensureAuthenticated, UserController.user);
userRoutes.delete("/user", ensureAuthenticated, UserController.delete);

export { userRoutes };
