import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("profiles")
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true, length: 255 })
  address: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @Column({ unique: true })
  userId: string;

  @Column({ default: () => "now()" })
  createdAt: Date;

  @Column({ default: () => "now()", onUpdate: "now()" })
  updatedAt: Date;
}
