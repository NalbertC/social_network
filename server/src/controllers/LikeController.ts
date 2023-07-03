import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database";

export default {
  async like(req: Request, res: Response) {
    try {
      const userAutenticated = z.object({
        userId: z.string(),
      });

      const likeInPostParams = z.object({
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
      const { postId } = likeInPostParams.parse(req.params);

      const isLike = await prisma.like.findUnique({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      if (!isLike) {
        await prisma.like.create({
          data: {
            postId,
            userId,
          },
        });

        return res.status(200).json(true);
      }

      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      return res.status(200).json(false);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },
};
