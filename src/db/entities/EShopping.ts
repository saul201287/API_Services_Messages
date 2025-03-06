import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { EUser } from "./EUser";
import { EProduct } from "./EProduct";

@Entity("shopping")
export class EShopping {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 255 })
  name?: string;

  @Column({ type: "double" })
  total?: number;

  @Column()
  cantidad?: number;

  @Column({ type: "varchar", length: 255 })
  url_imagen?: string;

  @ManyToOne(() => EUser, { nullable: true })
  @JoinColumn({ name: "id_user" })
  user?: EUser;

  @ManyToOne(() => EProduct, { nullable: true })
  @JoinColumn({ name: "id_product" })
  product?: EProduct; 
}
