import { Request, Response } from "express";
import z from "zod";
import { prisma } from "../database";
import { comparePassword, encriptPassword } from "../services/auth";

export default {
  async index(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async create(req: Request, res: Response) {
    try {
      const createUserBody = z.object({
        name: z.string(),
        username: z.string(),
        email: z.string(),
        password: z.string(),
      });

      const { username, email, password, name } = createUserBody.parse(
        req.body
      );

      const emailExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      const usernameExists = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (!usernameExists && !emailExists) {
        const encriptedPass = await encriptPassword(password);

        const newUser = await prisma.user.create({
          data: {
            username,
            name,
            email,
            password: encriptedPass,
          },
        });

        return res.status(201).json({ message: "User created", newUser });
      }

      if (emailExists?.email === email) {
        return res.status(400).json("Email alread exists");
      }
      if (usernameExists?.username === username) {
        return res.status(400).json("Username alread exists");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async user(req: Request, res: Response) {
    try {
      const { userId } = req;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          image: true,
        },
      });

      if (!user) {
        return res.status(404).json("User does not exists");
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const userLoginRequestBody = z.object({
        username: z.string(),
        password: z.string(),
      });

      const { userId } = req;

      const { username, password } = userLoginRequestBody.parse(req.body);

      const userAlreadExists = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // verificar se usuario existe
      if (!userAlreadExists) {
        return res.status(400).json("User or password incorrect");
      }

      // verificar se a senha esta correta
      const verifyPassword = await comparePassword(
        password,
        userAlreadExists.password
      );

      if (!verifyPassword || userAlreadExists.username != username) {
        return res.status(403).json("User not deleted!");
      }

      await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      return res.status(200).json("user deleted");
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },
};
