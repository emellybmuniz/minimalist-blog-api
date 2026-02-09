import { Request, Response } from "express";
import { CategoryService } from "../services/categoryService";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    const categoryRepository = AppDataSource.getRepository(Category);
    this.categoryService = new CategoryService(categoryRepository);
  }


  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }


  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id as string;
      const category = await this.categoryService.getCategoryById(id);
      if (!category) {
        res.status(404).json({ error: "Category not found" });
        return;
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }


  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const category = await this.categoryService.createCategory(name);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }


  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await this.categoryService.updateCategory(id as string, name);
      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // DELETE category
  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.categoryService.deleteCategory(id as string);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
