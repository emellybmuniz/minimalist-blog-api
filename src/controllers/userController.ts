import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserController {
  private userService: UserService;

  constructor() {
    const userRepository = AppDataSource.getRepository(User);
    this.userService = new UserService(userRepository);
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const user = await this.userService.getUserById(id as string);
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email } = req.body;
      const user = await this.userService.registerUser(
        firstName,
        lastName,
        email,
      );
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id as string);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

