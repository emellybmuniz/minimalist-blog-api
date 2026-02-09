import 'typeorm'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, BaseEntity } from "typeorm"
import { Post } from "./Post"


@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column( { nullable: false } )
    name: string

    @ManyToMany(() => Post, post => post.categories)
    posts: Post[]

}