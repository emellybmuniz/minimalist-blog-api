import "typeorm";
import { Post } from "./Post";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  // 'extends BaseEntity' to use Active Record
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[]; // bi-directional relationship
}

