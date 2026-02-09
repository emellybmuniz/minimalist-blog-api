import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "mydatabase",
  synchronize: false,
  logging: true,
  entities: [User, Post, Category],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
  ssl: isProduction ? { rejectUnauthorized: false } : false, // To Render
});
