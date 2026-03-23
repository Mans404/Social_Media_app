// validators/commentValidator.ts
import { Request, Response, NextFunction } from "express";

export function validateCreateComment(req: Request, res: Response, next: NextFunction): void {
  const { content, userid, postid } = req.body;

  if (!content || typeof content !== "string" || content.trim() === "") {
    res.status(400).json({ message: "content is required and must be a non-empty string" });
    return;
  }

  if (!userid || isNaN(Number(userid))) {
    res.status(400).json({ message: "userid is required and must be a number" });
    return;
  }

  if (!postid || isNaN(Number(postid))) {
    res.status(400).json({ message: "postid is required and must be a number" });
    return;
  }

  next();
}

export function validateUpdateComment(req: Request, res: Response, next: NextFunction): void {
  const { content } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "At least one field must be provided" });
    return;
  }

  if (content !== undefined && (typeof content !== "string" || content.trim() === "")) {
    res.status(400).json({ message: "content must be a non-empty string" });
    return;
  }

  next();
}
