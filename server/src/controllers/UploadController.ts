import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import fs from "fs";
import { z } from "zod";

import path from "path";
import { promisify } from "util";
import multerConfig, { s3, storageTypes } from "../configs/multer";
import { prisma } from "../database";

export default {
  async getAllUploads(req: Request, res: Response) {
    try {
      const image = await prisma.image.findMany();
      return res.status(200).json(image);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async uploadImageUser(req: Request, res: Response) {
    try {
      const uploadImageUserReqFile = z.object({
        originalname: z.string().optional(),
        key: z.string().optional(),
      });

      const getUserParams = z.object({
        userId: z.string(),
      });

      const { userId } = getUserParams.parse(req);

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json("User does not exists");
      }

      const { originalname, key } = uploadImageUserReqFile.parse(req.file);

      let url = req.file.location;

      if (!url) {
        url = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/files/${key}`;
      }

      const veririfyImage = await prisma.image.findUnique({
        where: {
          userId: user.id,
        },
      });

      async function uploadImageUser(userId: string) {
        const image = await prisma.image.upsert({
          where: {
            userId,
          },
          create: {
            userId: user.id,
            key,
            name: originalname,
            url,
          },
          update: {
            userId: user.id,
            key,
            name: originalname,
            url,
          },
        });

        return image;
      }
      async function updateImageUser() {
        if (multerConfig.storage === storageTypes["local"]) {
          await promisify(fs.unlink)(
            path.resolve(
              __dirname,
              "..",
              "..",
              "tmp",
              "uploads",
              veririfyImage.key
            )
          );
        } else {
          const data = await s3.send(
            new DeleteObjectCommand({
              Bucket: process.env.BUCKET_NAME,
              Key: veririfyImage.key,
            })
          );
        }
      }

      if (!veririfyImage) {
        const createImage = await uploadImageUser(user.id);
        return res.status(201).json({
          req: req.file,
          createImage,
        });
      } else {
        updateImageUser();
        const createImage = await uploadImageUser(user.id);
        return res.status(201).json({
          req: req.file,
          createImage,
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },
};
