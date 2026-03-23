// validators/userValidator.ts
import { Request, Response, NextFunction } from "express";

export function validateCreateUser(req: Request, res: Response, next: NextFunction): void {
  const { name, email } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ message: "name is required and must be a non-empty string" });
    return;
  }

  if (!email || typeof email !== "string") {
    res.status(400).json({ message: "email is required" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "email format is invalid" });
    return;
  }

  next();
}

export function validateUpdateUser(req: Request, res: Response, next: NextFunction): void {
  const { name, email } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "At least one field must be provided" });
    return;
  }

  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    res.status(400).json({ message: "name must be a non-empty string" });
    return;
  }

  if (email !== undefined) {
    if (typeof email !== "string") {
      res.status(400).json({ message: "email must be a string" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "email format is invalid" });
      return;
    }
  }

  next();
}
