// validators/postValidator.ts
import { Request, Response, NextFunction } from "express";

const VALID_POST_TYPES = ["text", "video"];

export function validateCreatePost(req: Request, res: Response, next: NextFunction): void {
  const { title, userid, content, type } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    res.status(400).json({ message: "title is required and must be a non-empty string" });
    return;
  }

  if (!userid || isNaN(Number(userid))) {
    res.status(400).json({ message: "userid is required and must be a number" });
    return;
  }

  if (!content || typeof content !== "string" || content.trim() === "") {
    res.status(400).json({ message: "content is required and must be a non-empty string" });
    return;
  }

  if (!type || !VALID_POST_TYPES.includes(type)) {
    res.status(400).json({ message: `type is required and must be one of: ${VALID_POST_TYPES.join(", ")}` });
    return;
  }

  next();
}

export function validateUpdatePost(req: Request, res: Response, next: NextFunction): void {
  const { title, userid, content, type } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "At least one field must be provided" });
    return;
  }

  if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
    res.status(400).json({ message: "title must be a non-empty string" });
    return;
  }

  if (userid !== undefined && isNaN(Number(userid))) {
    res.status(400).json({ message: "userid must be a number" });
    return;
  }

  if (content !== undefined && (typeof content !== "string" || content.trim() === "")) {
    res.status(400).json({ message: "content must be a non-empty string" });
    return;
  }

  if (type !== undefined && !VALID_POST_TYPES.includes(type)) {
    res.status(400).json({ message: `type must be one of: ${VALID_POST_TYPES.join(", ")}` });
    return;
  }

  next();
}
