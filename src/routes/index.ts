// routes/index.ts
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { PostController } from "../controllers/PostController";
import { CommentController } from "../controllers/CommentController";
import { ActionController } from "../controllers/ActionController";
import { validateCreateUser, validateUpdateUser } from "../validators/userValidator";
import { validateCreatePost, validateUpdatePost } from "../validators/postValidator";
import { validateCreateComment, validateUpdateComment } from "../validators/commentValidator";
import { validateCreateAction, validateUpdateAction } from "../validators/actionValidator";

const router = Router();
const users    = new UserController();
const posts    = new PostController();
const comments = new CommentController();
const actions  = new ActionController();

// Users
router.get   ("/users",                      (req, res) => users.getAll(req, res));
router.get   ("/users/:id",                  (req, res) => users.getById(req, res));
router.post  ("/users",          validateCreateUser, (req, res) => users.create(req, res));
router.put   ("/users/:id",      validateUpdateUser, (req, res) => users.update(req, res));
router.delete("/users/:id",                  (req, res) => users.delete(req, res));

// Posts
router.get   ("/posts",                      (req, res) => posts.getAll(req, res));
router.get   ("/posts/:id",                  (req, res) => posts.getById(req, res));
router.get   ("/posts/user/:userid",         (req, res) => posts.getByUserId(req, res));
router.post  ("/posts",          validateCreatePost, (req, res) => posts.create(req, res));
router.put   ("/posts/:id",      validateUpdatePost, (req, res) => posts.update(req, res));
router.delete("/posts/:id",                  (req, res) => posts.delete(req, res));

// Comments
router.get   ("/comments",                   (req, res) => comments.getAll(req, res));
router.get   ("/comments/:id",               (req, res) => comments.getById(req, res));
router.get   ("/comments/post/:postid",      (req, res) => comments.getByPostId(req, res));
router.get   ("/comments/user/:userid",      (req, res) => comments.getByUserId(req, res));
router.post  ("/comments",    validateCreateComment, (req, res) => comments.create(req, res));
router.put   ("/comments/:id", validateUpdateComment,(req, res) => comments.update(req, res));
router.delete("/comments/:id",               (req, res) => comments.delete(req, res));

// Actions
router.get   ("/actions",                    (req, res) => actions.getAll(req, res));
router.get   ("/actions/:id",                (req, res) => actions.getById(req, res));
router.get   ("/actions/user/:userid",       (req, res) => actions.getByUserId(req, res));
router.get   ("/actions/post/:postid",       (req, res) => actions.getByPostId(req, res));
router.get   ("/actions/comment/:commentid", (req, res) => actions.getByCommentId(req, res));
router.post  ("/actions",      validateCreateAction, (req, res) => actions.create(req, res));
router.put   ("/actions/:id",  validateUpdateAction, (req, res) => actions.update(req, res));
router.delete("/actions/:id",                (req, res) => actions.delete(req, res));

export default router;
