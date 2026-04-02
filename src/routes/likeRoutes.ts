import { Router } from "express";
import { LikeController } from "../controllers/likeController";

const router = Router();
const likeController = new LikeController();

// Rota para alternar entre curtir e descurtir um post
router.post("/posts/:postId/like", (req, res) => likeController.toggleLike(req, res));

// Rota para contar o número de curtidas de um post
router.get("/posts/:postId/likes", (req, res) => likeController.countLikes(req, res));

export default router;