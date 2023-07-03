import { Request, Response } from "express";
import z from "zod";
import { prisma } from "./../database/index";

export default {
  async index(req: Request, res: Response) {
    try {
      const allPosts = await prisma.post.findMany({
        include: {
          image: true,
          User: {
            include: {
              image: true,
            },
          },
          likes: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });

      return res.status(200).json(allPosts);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async create(req: Request, res: Response) {
    try {
      const createPostReqFile = z.object({
        originalname: z.string().optional(),
        key: z.string().optional(),
      });

      const createPostBody = z.object({
        legend: z.string().optional(),
      });

      const userAutenticated = z.object({
        userId: z.string(),
      });

      const { userId } = userAutenticated.parse(req);

      const userExists = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        return res.status(401).json("User does not exists");
      }

      const { originalname, key } = createPostReqFile.parse(req.file);

      const { legend } = createPostBody.parse(req.body);

      let url = req.file.location;

      if (!url) {
        url = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/files/${key}`;
      }

      const newPost = await prisma.post.create({
        data: {
          userId: userExists.id,
          legend,
          image: {
            create: {
              key,
              name: originalname,
              url,
            },
          },
        },
      });

      return res.status(201).json({
        req: req.file,
        newPost,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async post(req: Request, res: Response) {
    try {
      const userAutenticated = z.object({
        userId: z.string(),
      });

      const viewPostParams = z.object({
        postId: z.string(),
      });

      const { userId } = userAutenticated.parse(req);

      const userExists = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!userExists) {
        return res.status(401).json("User does not exists");
      }

      const { postId } = viewPostParams.parse(req.params);

      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          image: true,
          User: {
            include: {
              image: true,
            },
          },
          likes: true,
        },
      });

      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async delete(req: Request, res: Response) {},
};
