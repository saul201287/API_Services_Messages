import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { EUser } from "./EUser";
import { EProduct } from "./EProduct";

@Entity("suscripcions")
export class EShopping {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "varchar", length: 255 })
  topic?: string;

  @Column({ type: "boolean" })
  status?: boolean;

  @ManyToOne(() => EUser, { nullable: true })
  @JoinColumn({ name: "id_user" })
  user?: EUser;

}
