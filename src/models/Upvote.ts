import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import User from "./User";
import Products from "./Products";
import Feedback from "./Feedback";
@Entity()
class Upvote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;


  @ManyToOne(() => Feedback)
  feedback: Feedback;
}

export default Upvote;

