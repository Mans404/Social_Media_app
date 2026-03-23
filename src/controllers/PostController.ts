import { Request, Response } from "express";
import { PostRepository } from "../repositories/PostRepository";

const repo = new PostRepository();

export class PostController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const posts = await repo.findAll();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts", error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const post = await repo.findById(Number(req.params.id));
      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch post", error });
    }
  }

  async getByUserId(req: Request, res: Response): Promise<void> {
    try {
      const posts = await repo.findByUserId(Number(req.params.userid));
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts by user", error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, userid, content, type } = req.body;
      if (!title || !userid || !content || !type) {
        res.status(400).json({ message: "title, userid, content and type are required" });
        return;
      }
      if (!["text", "video"].includes(type)) {
        res.status(400).json({ message: "type must be 'text' or 'video'" });
        return;
      }
      const post = await repo.create({ title, userid, content, type });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create post", error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.body;
      if (type && !["text", "video"].includes(type)) {
        res.status(400).json({ message: "type must be 'text' or 'video'" });
        return;
      }
      const post = await repo.update(Number(req.params.id), req.body);
      if (!post) {
        res.status(404).json({ message: "Post not found or no fields provided" });
        return;
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to update post", error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await repo.delete(Number(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete post", error });
    }
  }
}
