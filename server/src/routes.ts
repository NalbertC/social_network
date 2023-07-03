import "dotenv/config";
import express, { Router } from "express";
import SessionController from "./controllers/SessionController";

import path from "path";
import { likeRoutes } from "./routes/like.routes";
import { postRoutes } from "./routes/post.routes";
import { uploadRoutes } from "./routes/upload.routes";
import { userRoutes } from "./routes/user.routes";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json("Helo World!");
});

// acessar fotos armazenadas localmente como arquivos estaticos
routes.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

// authentication
routes.post("/login", SessionController.create);

// users
routes.use("/users", userRoutes);
routes.use("/uploads", uploadRoutes);

// posts
routes.use("/posts", postRoutes);

// like
routes.use("/like", likeRoutes);

export { routes };
