import * as express from "express";
import * as cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import type { OpenAPIV3 } from "openapi-types";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import categoryRoutes from "./routes/categoryRoutes";

const app = express();

app.use(cors());
app.use(express.json());

const swaggerSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Minimalist Blog API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "string", description: "User UUID" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          posts: {
            type: "array",
            items: { $ref: "#/components/schemas/Post" },
          },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "string", description: "Category UUID" },
          name: { type: "string" },
          posts: {
            type: "array",
            items: { $ref: "#/components/schemas/Post" },
          },
        },
      },
      Post: {
        type: "object",
        properties: {
          id: { type: "string", description: "Post UUID" },
          title: { type: "string" },
          body: { type: "string" },
          is_published: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          authorId: { type: "string" },
          author: { $ref: "#/components/schemas/User" },
          categories: {
            type: "array",
            items: { $ref: "#/components/schemas/Category" },
          },
        },
      },
    },
  },
  paths: {
    // populate with endpoints
    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        responses: {
          "200": { description: "List of all users" },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Create a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  firstName: { type: "string" },
                  lastName: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "User created" },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get user by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "User found" },
          "404": { description: "User not found" },
        },
      },
    },
    "/api/posts": {
      get: {
        tags: ["Posts"],
        summary: "Get all posts",
        responses: {
          "200": { description: "List of all posts" },
        },
      },
      post: {
        tags: ["Posts"],
        summary: "Create a new post",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "body", "is_published", "authorId"],
                properties: {
                  title: { type: "string", description: "Post title" },
                  body: { type: "string", description: "Post content" },
                  is_published: {
                    type: "boolean",
                    description: "Publication status",
                  },
                  authorId: {
                    type: "string",
                    description: "UUID of the user creating the post",
                  },
                  categoryIds: {
                    type: "array",
                    items: { type: "number" },
                    description: "Category IDs to associate with post",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Post created successfully",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Post" },
              },
            },
          },
        },
      },
    },
    "/api/posts/{id}": {
      get: {
        tags: ["Posts"],
        summary: "Get post by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Post found" },
          "404": { description: "Post not found" },
        },
      },
      put: {
        tags: ["Posts"],
        summary: "Update a post",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  body: { type: "string" },
                  is_published: { type: "boolean" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Post updated" },
        },
      },
      delete: {
        tags: ["Posts"],
        summary: "Delete a post",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": { description: "Post deleted" },
        },
      },
    },
    "/api/posts/author/{authorId}": {
      get: {
        tags: ["Posts"],
        summary: "Get posts by author",
        parameters: [
          {
            name: "authorId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Posts by author" },
        },
      },
    },
    "/api/posts/search/{searchTerm}": {
      get: {
        tags: ["Posts"],
        summary: "Search posts by title",
        parameters: [
          {
            name: "searchTerm",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Search results" },
        },
      },
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",
        responses: {
          "200": { description: "List of all categories" },
        },
      },
      post: {
        tags: ["Categories"],
        summary: "Create a new category",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Category created" },
        },
      },
    },
    "/api/categories/{id}": {
      get: {
        tags: ["Categories"],
        summary: "Get category by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": { description: "Category found" },
          "404": { description: "Category not found" },
        },
      },
      put: {
        tags: ["Categories"],
        summary: "Update a category",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Category updated" },
        },
      },
      delete: {
        tags: ["Categories"],
        summary: "Delete a category",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": { description: "Category deleted" },
        },
      },
    },
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Running in ${PORT} Port`);
      console.log(`Server URL: http://localhost:${PORT}`);
      console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
