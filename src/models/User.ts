import "reflect-metadata";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Feedback from "./Feedback";

@Entity()
class User extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;
  
  @Column({ nullable: true }) // To allow for users without images
  profileImageUrl: string;

  @OneToMany(() => Feedback, (feedback) => feedback.user)
  feedbacks: Feedback[];

  }
export default User;

