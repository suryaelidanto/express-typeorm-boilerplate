import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reply } from "./Reply";
import { User } from "./User";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column()
  content: string;

  @OneToMany(() => Reply, (reply) => reply.post)
  replies: Reply[];

  @Column()
  createdAt: Date;

  @Column({ default: () => "now()", onUpdate: "now()" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  createdBy: User;

  @Column()
  createdById: string;

  @ManyToOne(() => User, (user) => user.updatedPosts)
  updatedBy: User;

  @Column({ nullable: true })
  updatedById: string;
}
