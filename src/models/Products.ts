import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import Feedback from "./Feedback";

@Entity()
class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @OneToMany(() => Feedback, (feedback) => feedback.product)
  feedbacks: Feedback[];
}

export default Products;
