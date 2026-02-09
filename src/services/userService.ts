// User Service - Contains business logic for user operations

import { Repository } from "typeorm";
import { User } from "../entity/User";

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async registerUser(
    firstName: string,
    lastName: string,
    email: string,
  ): Promise<User> {
    if (!firstName || !lastName || !email) {
      throw new Error(
        "Todos os campos são obrigatórios (firstName, lastName, email)",
      );
    }
    // validation
    if (!email.includes("@")) {
      throw new Error("Email com formato inválido");
    }

    try {
      const user = this.userRepository.create({
        firstName,
        lastName,
        email,
        createdAt: new Date(),
        posts: [],
      });

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new Error(
        `Erro ao criar o usuário: ${error instanceof Error ? error.message : "Erro ao salvar usuário"}`,
      );
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /**
   * Get all users
   * @returns Array of users
   */
  async getAllUsers(): Promise<(User & { postsCount: number })[]> {
    return this.userRepository
      .createQueryBuilder("user")
      .loadRelationCountAndMap("user.postsCount", "user.posts")
      .orderBy("user.id", "ASC")
      .getMany() as Promise<(User & { postsCount: number })[]>;
  }

  async getUserById(
    id: string,
  ): Promise<(User & { postsCount: number }) | null> {
    return this.userRepository
      .createQueryBuilder("user")
      .loadRelationCountAndMap("user.postsCount", "user.posts")
      .where("user.id = :id", { id })
      .getOne() as Promise<(User & { postsCount: number }) | null>;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    await this.userRepository.remove(user);
  }
}
