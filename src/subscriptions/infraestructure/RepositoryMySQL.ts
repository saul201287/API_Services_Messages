import { DataSource, In, Repository } from "typeorm";
import { EUser } from "../../db/entities/EUser";
import { ESubscribe } from "../../db/entities/ESubscripbe";
import { SubscripcionRepository } from "../domain/SubscripcionRepository";
import { Subscripcion } from "../domain/Subscription";
import { EProduct } from "../../db/entities/EProduct";

export class RepositoryMySqlSubscripcion implements SubscripcionRepository {
  private readonly userRepository: Repository<EUser>;
  private readonly subscribeRepository: Repository<ESubscribe>;
  private readonly productRepository: Repository<ESubscribe>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(EUser);
    this.subscribeRepository = this.dataSource.getRepository(ESubscribe);
    this.productRepository = this.dataSource.getRepository(EProduct);
  }

  async subscripcion(subscripcion: Subscripcion): Promise<Subscripcion | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: subscripcion.id_user },
        relations: ["subscribe"],
      });
      const product = await this.productRepository.findOne({
        where: { id: subscripcion.id_product },
        relations: ["subscribe"],
      });
      if (!user || !product) {
        return null;
      }

      const newSups = this.subscribeRepository.create({
        topic: subscripcion.topic,
        tipo: subscripcion.tipo,
        status: subscripcion.status,
        estado: subscripcion.estado,
        user: user,
        product: product,
      });

      const savedUser = await this.subscribeRepository.save(newSups);

      if (!savedUser || !savedUser.id) {
        return null;
      } else {
        return new Subscripcion(
          savedUser.id!,
          savedUser?.topic!,
          savedUser.tipo!,
          savedUser.status!,
          savedUser.estado!,
          savedUser.user?.id!,
          savedUser.product?.id!
        );
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async desubscripcion(id: number, id_user: number): Promise<Boolean> {
    try {
      const subscribe = await this.subscribeRepository.findOne({
        where: { user: { id: id_user }, product: { id: id }, status:true },
        relations: ["user", "product"],
      });
      if (!subscribe) {
        return false;
      }
      subscribe.status = false;
      const updatedSubs = await this.subscribeRepository.save(subscribe);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async getByUser(
    id_user: number
  ): Promise<{ tokens: string[]; subscripcions: Subscripcion[] } | null> {
    try {
      const tokens = await this.subscribeRepository.find({
        select: {
          user: {
            token: true,
          },
        },
        relations: ["user", "product"],
        where: {
          status: true,
          tipo: "seguimineto",
          estado: In(["Pendiente", "En tránsito"]),
        },
      });
      console.log(tokens);

      const subscribes = tokens.map(
        (subscribe) =>
          new Subscripcion(
            subscribe?.id!,
            subscribe?.topic!,
            subscribe?.tipo!,
            subscribe?.status!,
            subscribe?.estado!,
            subscribe.user?.id!,
            subscribe.product?.id!
          )
      );
      const tokenList = tokens.map(
        (subscribe) => subscribe.user?.token ?? null
      );

      if (
        !tokenList ||
        !Array.isArray(tokenList) ||
        !tokenList.every((item) => typeof item === "string")
      )
        return null;

      return { tokens: tokenList, subscripcions: subscribes };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateEstado(id: number, estado: string): Promise<Boolean> {
    try {
      const subscribe = await this.subscribeRepository.findOne({
        where: { id },
      });
      if (!subscribe) {
        return false;
      }
      subscribe.estado = estado;
      if (estado == "Entregado") {
        subscribe.status = false;
      }
      const updatedSubs = await this.subscribeRepository.save(subscribe);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
