import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { EUser } from "./EUser";
import { EProduct } from "./EProduct";

@Entity("subscripcions")
export class ESubscribe {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 255 })
  topic?: string;

  @Column({ type: "varchar", length: 255 })
  tipo?: string;

  @Column({ type: "boolean" })
  status?: boolean;

  @Column({ type: "varchar", length: 35, nullable: true })
  estado?: string;

  @ManyToOne(() => EUser, (user) => user.subscribe, { nullable: true })
  @JoinColumn({ name: "id_user" })
  user?: EUser;

  @ManyToOne(() => EProduct, (product) => product.subscribe, { nullable: true })
  @JoinColumn({ name: "id_product" })
  product?: EProduct;
}
