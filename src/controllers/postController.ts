import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { Category } from "../entity/Category";
import { User } from "../entity/User";

export class PostController {
  private postService: PostService;

  constructor() {
    const postRepository = AppDataSource.getRepository(Post);
    const categoryRepository = AppDataSource.getRepository(Category);
    const userRepository = AppDataSource.getRepository(User);
    this.postService = new PostService(
      postRepository,
      categoryRepository,
      userRepository,
    );
  }

  async getAllPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await this.postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getPostsByAuthor(req: Request, res: Response): Promise<void> {
    try {
      const authorId = req.params.authorId;
      const posts = await this.postService.getPostsByAuthor(authorId as string);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async searchPostsByTitle(req: Request, res: Response): Promise<void> {
    try {
      const searchTerm = req.params.searchTerm;
      const posts = await this.postService.searchPostsByTitle(
        searchTerm as string,
      );
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const post = await this.postService.getPostById(id as string);
      if (!post) {
        res.status(404).json({ error: "Post não encontrado" });
        return;
      }
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async createPost(req: Request, res: Response): Promise<void> {
    try {
      const { title, body, is_published, authorId, categoryIds } = req.body;
      const post = await this.postService.registerPost(
        title,
        body,
        is_published,
        authorId,
        categoryIds || [],
      );
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, body, is_published } = req.body;
      const post = await this.postService.updatePost(
        id as string,
        title,
        body,
        is_published,
      );
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.postService.deletePost(id as string);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
