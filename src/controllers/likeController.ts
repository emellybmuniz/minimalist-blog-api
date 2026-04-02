import { Request, Response } from "express";
import { LikeService } from "../services/likeService";

const likeService = new LikeService();

export class LikeController {
    // Controlador para alternar entre curtir e descurtir um post
    async toggleLike(req: Request, res: Response) {
        try {
            const userId = String(req.body.userId); // O ID do usuário é passado no corpo da requisição
            const postId = String(req.params.postId); // O ID do post é passado como parâmetro na URL

            if (!userId || !postId) {
                return res.status(400).json({ error: "userId e postId são obrigatórios" });
            }

            const result = await likeService.toggleLike(userId, postId);

            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    // Controlador para contar o número de curtidas de um post
    async countLikes(req: Request, res: Response) {
        try {
            const postId = String(req.params.postId);
            const likeCount = await likeService.countLikes(postId);
            res.json({ likeCount });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}