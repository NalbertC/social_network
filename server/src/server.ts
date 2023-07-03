import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { routes } from "./routes";

const server = express();
server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
server.use(express.urlencoded({ extended: true }));

//desacoplar o servidor hhtp do express
server.use(routes);

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server running in ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
  );
});
