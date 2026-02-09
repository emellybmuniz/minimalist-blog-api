import { Repository } from "typeorm";
import { Category } from "../entity/Category";
import { AppDataSource } from "../data-source";

// Service = Business logic (validation, database operations, calculations)

export class CategoryService {
  constructor(private categoryRepository: Repository<Category>) {}

  async createCategory(name: string): Promise<Category> {
    const category = this.categoryRepository.create({
      name,
    });
    return this.categoryRepository.save(category);
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find(
        { order: { id: "ASC" } }
    );
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }

  async updateCategory(id: string, name: string): Promise<Category> {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new Error("Categoria não encontrada");
    }

    if (name && name.trim() !== "") {
      category.name = name;
    }

    return this.categoryRepository.save(category);
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.getCategoryById(id);
    if (!category) {
      throw new Error("Categoria não encontrada");
    }
    await this.categoryRepository.remove(category);
  }
}


