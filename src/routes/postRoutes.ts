import { Router } from "express";
import { PostController } from "../controllers/postController";

const router = Router();
const postController = new PostController();

router.get("/", (req, res) => postController.getAllPosts(req, res));

router.get("/author/:authorId", (req, res) =>
  postController.getPostsByAuthor(req, res),
);

router.get("/search/:searchTerm", (req, res) =>
  postController.searchPostsByTitle(req, res),
);

router.get("/:id", (req, res) => postController.getPostById(req, res));

router.post("/", (req, res) => postController.createPost(req, res));

router.put("/:id", (req, res) => postController.updatePost(req, res));

router.delete("/:id", (req, res) => postController.deletePost(req, res));

export default router;