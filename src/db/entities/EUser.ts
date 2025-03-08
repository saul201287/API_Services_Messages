import { Entity, PrimaryColumn, Column, UpdateDateColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EProduct } from "./EProduct";
import { EShopping } from "./EShopping";

@Entity("users")
export class EUser {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id?: number;

  @Column({ type: "varchar", length: 255 })
  nombre?: string;

  @Column({ type: "varchar", length: 255 })
  apellidos?: string;

  @Column({ type: "varchar", length: 255 })
  email?: string;

  @Column({ type: "varchar", length: 255 })
  password?: string;

  @Column({ type: "varchar", length: 255 })
  tipo_user?: string;

  @Column({ type: "varchar", length: 255 })
  id_divece?: string;

  @Column({ type: "varchar", length: 255 })
  token?: string;

  @OneToMany(() => EProduct, (product) => product.user)
  products?: EProduct[];

  @OneToMany(() => EShopping, (shopping) => shopping.user)
  shopping?: EShopping[];
}
