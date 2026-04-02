import { AppDataSource } from "../data-source";
import { Like } from "../entity/Likes";
import { User } from "../entity/User";
import { Post } from "../entity/Post";

// Repositórios para acessar as entidades
const likeRepo = AppDataSource.getRepository(Like);
const userRepo = AppDataSource.getRepository(User);
const postRepo = AppDataSource.getRepository(Post);

export class LikeService {
    // Método para alternar entre curtir e descurtir um post
    async toggleLike(userId: string, postId: string) {
        const user = await userRepo.findOneBy({ id: userId });
        const post = await postRepo.findOneBy({ id: postId });

        // Verifica se o usuário e o post existem
        if (!user || !post) {
            throw new Error("User or Post not found");
        }

        // Verifica se o usuário já curtiu o post
        const existingLike = await likeRepo.findOne({
            where: { 
                user: { id: userId }, 
                post: { id: postId } 
            },
            relations: ["user", "post"],
        });

        if (existingLike) {
            // Se já curtiu, remove a curtida (descurtir)
            await likeRepo.remove(existingLike);
            return { liked: false };
        }
        const like = likeRepo.create({
            user,
            post,
        });

        // Salva a nova curtida
        await likeRepo.save(like);
        return { liked: true };
    }
    // Método para contar o número de curtidas de um post
    async countLikes(postId: string) {
        return await likeRepo.count({
            where: { post: { id: postId } },
        });
    }
}