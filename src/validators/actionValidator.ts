// validators/actionValidator.ts
import { Request, Response, NextFunction } from "express";

const VALID_ACTION_TYPES = ["like", "dislike", "save"];

export function validateCreateAction(req: Request, res: Response, next: NextFunction): void {
  const { type, userid, postid, commentid } = req.body;

  if (!type || !VALID_ACTION_TYPES.includes(type)) {
    res.status(400).json({ message: `type is required and must be one of: ${VALID_ACTION_TYPES.join(", ")}` });
    return;
  }

  if (!userid || isNaN(Number(userid))) {
    res.status(400).json({ message: "userid is required and must be a number" });
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

  if (postid && isNaN(Number(postid))) {
    res.status(400).json({ message: "postid must be a number" });
    return;
  }

  if (commentid && isNaN(Number(commentid))) {
    res.status(400).json({ message: "commentid must be a number" });
    return;
  }

  next();
}

export function validateUpdateAction(req: Request, res: Response, next: NextFunction): void {
  const { type, postid, commentid } = req.body;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "At least one field must be provided" });
    return;
  }

  if (type !== undefined && !VALID_ACTION_TYPES.includes(type)) {
    res.status(400).json({ message: `type must be one of: ${VALID_ACTION_TYPES.join(", ")}` });
    return;
  }

  if (postid !== undefined && commentid !== undefined) {
    res.status(400).json({ message: "Only one of postid or commentid can be provided" });
    return;
  }

  if (postid !== undefined && isNaN(Number(postid))) {
    res.status(400).json({ message: "postid must be a number" });
    return;
  }

  if (commentid !== undefined && isNaN(Number(commentid))) {
    res.status(400).json({ message: "commentid must be a number" });
    return;
  }

  next();
}
