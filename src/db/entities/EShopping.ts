import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { EUser } from "./EUser";
import { EProduct } from "./EProduct";

@Entity("shopping")
export class EShopping {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "double" })
  total?: number;

  @Column()
  cantidad?: number;

  @Column({ type: "varchar", length: 55 })
  status?: string;

  @ManyToOne(() => EUser, (user) => user.shopping, { nullable: true })
  @JoinColumn({ name: "id_user" })
  user?: EUser;

  @ManyToOne(() => EProduct, (product) => product.shopping, { nullable: true })
  @JoinColumn({ name: "id_product" })
  product?: EProduct;
}
