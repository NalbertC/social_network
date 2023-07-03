import dotenv from "dotenv";
dotenv.config();

export const authConfig = {
  secret: process.env.API_SECRET!,
  expiresIn: "7d",
};