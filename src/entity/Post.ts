import "typeorm";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  BaseEntity
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  body: string;

  @Column({ nullable: false })
  is_published: boolean;

  @Column({ nullable: false })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Column()
  authorId: string;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories: Category[]; // bi-directional relationship
}
