import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

const repo = new UserRepository();

export class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await repo.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await repo.findById(Number(req.params.id));
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user", error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
  try {
    const { name, email } = req.body;
    const user = await repo.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error });
  }
}

  async update(req: Request, res: Response): Promise<void> {
  try {
    const user = await repo.update(Number(req.params.id), req.body);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error });
  }
}

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await repo.delete(Number(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user", error });
    }
  }
}
