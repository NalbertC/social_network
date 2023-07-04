import { Request, Response } from "express";

export default {
  async (req: Request, res: Response) {
    try {
      return res.status(200).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal server error");
    }
  },

  async create(req: Request, res: Response) {},

  async update(req: Request, res: Response) {},

  async delete(req: Request, res: Response) {},
};
