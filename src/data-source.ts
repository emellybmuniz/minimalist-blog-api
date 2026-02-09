import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";

const isProduction = process.env.NODE_ENV === "production";

const config: any = {
  type: "postgres",
  synchronize: false,
  logging: true,
  entities: [User, Post, Category],
  migrations: [isProduction ? "build/migration/*.js" : "src/migration/*.ts"],
  subscribers: [],
};

if (process.env.DATABASE_URL) {
  config.url = process.env.DATABASE_URL;
  config.ssl = { rejectUnauthorized: false };
} else {
  config.host = process.env.DB_HOST || "localhost";
  config.port = parseInt(process.env.DB_PORT || "5432");
  config.username = process.env.DB_USER || "postgres";
  config.password = process.env.DB_PASSWORD;
  config.database = process.env.DB_NAME || "mydatabase";
}

export const AppDataSource = new DataSource(config);
