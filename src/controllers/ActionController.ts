import { Request, Response } from "express";
import { ActionRepository } from "../repositories/ActionRepository";

const repo = new ActionRepository();

export class ActionController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const actions = await repo.findAll();
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch actions", error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const action = await repo.findById(Number(req.params.id));
      if (!action) {
        res.status(404).json({ message: "Action not found" });
        return;
      }
      res.status(200).json(action);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch action", error });
    }
  }

  async getByUserId(req: Request, res: Response): Promise<void> {
    try {
      const actions = await repo.findByUserId(Number(req.params.userid));
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch actions by user", error });
    }
  }

  async getByPostId(req: Request, res: Response): Promise<void> {
    try {
      const actions = await repo.findByPostId(Number(req.params.postid));
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch actions by post", error });
    }
  }

  async getByCommentId(req: Request, res: Response): Promise<void> {
    try {
      const actions = await repo.findByCommentId(Number(req.params.commentid));
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch actions by comment", error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { type, userid, postid, commentid } = req.body;
      if (!type || !userid) {
        res.status(400).json({ message: "type and userid are required" });
        return;
      }
      if (!["like", "dislike", "save"].includes(type)) {
        res.status(400).json({ message: "type must be 'like', 'dislike' or 'save'" });
        return;
      }
      if (!postid && !commentid) {
        res.status(400).json({ message: "Either postid or commentid must be provided" });
        return;
      }
      if (postid && commentid) {
        res.status(400).json({ message: "Only one of postid or commentid can be provided" });
        return;
      }
      const action = await repo.create({ type, userid, postid: postid ?? null, commentid: commentid ?? null });
      res.status(201).json(action);
    } catch (error) {
      res.status(500).json({ message: "Failed to create action", error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { type, postid, commentid } = req.body;
      if (type && !["like", "dislike", "save"].includes(type)) {
        res.status(400).json({ message: "type must be 'like', 'dislike' or 'save'" });
        return;
      }
      if (postid && commentid) {
        res.status(400).json({ message: "Only one of postid or commentid can be provided" });
        return;
      }
      const action = await repo.update(Number(req.params.id), req.body);
      if (!action) {
        res.status(404).json({ message: "Action not found or no fields provided" });
        return;
      }
      res.status(200).json(action);
    } catch (error) {
      res.status(500).json({ message: "Failed to update action", error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await repo.delete(Number(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: "Action not found" });
        return;
      }
      res.status(200).json({ message: "Action deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete action", error });
    }
  }
}
