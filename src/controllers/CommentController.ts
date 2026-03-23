import { Request, Response } from "express";
import { CommentRepository } from "../repositories/CommentRepository";

const repo = new CommentRepository();

export class CommentController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const comments = await repo.findAll();
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments", error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const comment = await repo.findById(Number(req.params.id));
      if (!comment) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comment", error });
    }
  }

  async getByPostId(req: Request, res: Response): Promise<void> {
    try {
      const comments = await repo.findByPostId(Number(req.params.postid));
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments by post", error });
    }
  }

  async getByUserId(req: Request, res: Response): Promise<void> {
    try {
      const comments = await repo.findByUserId(Number(req.params.userid));
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments by user", error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { content, userid, postid } = req.body;
      if (!content || !userid || !postid) {
        res.status(400).json({ message: "content, userid and postid are required" });
        return;
      }
      const comment = await repo.create({ content, userid, postid });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Failed to create comment", error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const comment = await repo.update(Number(req.params.id), req.body);
      if (!comment) {
        res.status(404).json({ message: "Comment not found or no fields provided" });
        return;
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update comment", error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await repo.delete(Number(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: "Comment not found" });
        return;
      }
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete comment", error });
    }
  }
}
