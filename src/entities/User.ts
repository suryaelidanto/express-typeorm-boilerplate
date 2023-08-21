import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { Follows } from "./Follow";
import { Profile } from "./Profile";
import { Reply } from "./Reply";
import { Role } from "./Role";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role;

  @OneToOne(() => Profile)
  profile: Profile;

  @OneToMany(() => Follows, (follows) => follows.follower)
  followedBy: Follows[];

  @OneToMany(() => Follows, (follows) => follows.following)
  following: Follows[];

  @OneToMany(() => Post, (post) => post.createdBy)
  posts: Post[];

  @OneToMany(() => Post, (post) => post.updatedBy)
  updatedPosts: Post[];

  @OneToMany(() => Reply, (reply) => reply.createdBy)
  replies: Reply[];

  @OneToMany(() => Reply, (reply) => reply.updatedBy)
  updatedReplies: Reply[];

  @Column({ default: () => "now()" })
  createdAt: Date;

  @Column({ default: () => "now()", onUpdate: "now()" })
  updatedAt: Date;
}
