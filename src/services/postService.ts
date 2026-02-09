// Post Service - Contains business logic for post operations

import { Repository } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Category } from "../entity/Category";

export class PostService {
  constructor(
    private postRepository: Repository<Post>,
    private categoryRepository: Repository<Category>,
    private userRepository?: Repository<User>,
  ) {}

  async registerPost(
    title: string,
    body: string,
    is_published: boolean,
    authorId: string,
    categoryIds: number[] = [],
  ): Promise<Post> {
    // Validate required fields
    if (!title || !body) {
      throw new Error("Título e corpo do post são obrigatórios");
    }

    if (!authorId) {
      throw new Error("Autor do post é obrigatório");
    }

    try {
      const author = await this.userRepository?.findOne({
        where: { id: authorId },
      });
      if (!author) {
        throw new Error("Autor não encontrado");
      }

      let categories: Category[] = [];
      if (categoryIds.length > 0) {
        categories = await this.categoryRepository.findByIds(categoryIds);
      }

      const post = this.postRepository.create({
        title,
        body,
        is_published,
        createdAt: new Date(),
        author,
        authorId: author.id,
        categories,
      });

      await this.postRepository.save(post);
      return post;
    } catch (error) {
      throw new Error(
        `Erro ao criar o post: ${error instanceof Error ? error.message : "Erro desconhecido"}`,
      );
    }
  }

  /**
   * Get all posts with their author and categories
   * @returns Array of posts
   */
  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find({
      relations: { author: true, categories: true },
      order: { id: "ASC" },
    });
  }

  async getPostsByAuthor(authorId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { authorId },
      relations: { author: true, categories: true },
    });
  }

  async searchPostsByTitle(searchTerm: string): Promise<Post[]> {
    const { Like } = await import("typeorm");
    return this.postRepository.find({
      where: {
        title: Like(`%${searchTerm}%`),
      },
      relations: { author: true, categories: true },
    });
  }

  async getPostById(id: string): Promise<Post | null> {
    return this.postRepository.findOne({
      where: { id },
      relations: { author: true, categories: true },
    });
  }

  async updatePost(
    id: string,
    title?: string,
    body?: string,
    is_published?: boolean,
  ): Promise<Post | null> {
    const post = await this.getPostById(id);
    if (!post) {
      throw new Error("Post não encontrado");
    }

    if (title) post.title = title;
    if (body) post.body = body;
    if (is_published !== undefined) post.is_published = is_published;

    await this.postRepository.save(post);
    return post;
  }

  /**
   * Delete a post
   * @param id - Post ID
   */
  async deletePost(id: string): Promise<void> {
    const post = await this.getPostById(id);
    if (!post) {
      throw new Error("Post não encontrado");
    }
    await this.postRepository.remove(post);
  }
}
