import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    Unique,
} from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity()
@Unique(["user", "post"]) // Garante que um usuário só pode curtir um post uma vez
export class Like {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
    post: Post;

    @CreateDateColumn()
    createdAt: Date;
}