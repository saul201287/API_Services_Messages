import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { EUser } from "./EUser";
import { EShopping } from "./EShopping";
import { ESubscribe } from "./ESubscripbe";

@Entity("products")
export class EProduct {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 255 })
  name?: string;

  @Column({ type: "double" })
  costo?: number;

  @Column()
  cantidad?: number;

  @Column({ type: "varchar", length: 255 })
  url_imagen?: string;

  @OneToMany(() => EShopping, (shopping) => shopping.product)
  shopping?: EShopping[];

  @ManyToOne(() => EUser, { nullable: true })
  @JoinColumn({ name: "id_user" })
  user?: EUser;

  @OneToMany(() => ESubscribe, (subscribe) => subscribe.product)
  subscribe?: ESubscribe[];
}
