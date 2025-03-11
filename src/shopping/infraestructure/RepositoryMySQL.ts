import { DataSource, Repository } from "typeorm";
import { EUser } from "../../db/entities/EUser";
import { EProduct } from "../../db/entities/EProduct";
import { ShoppingRepository } from "../domain/ShoppingRepository";
import { Shopping } from "../domain/Shopping";
import { EShopping } from "../../db/entities/EShopping";

export class MysqlSoppingRepository implements ShoppingRepository {
  private readonly userRepository: Repository<EUser>;
  private readonly productRepository: Repository<EProduct>;
  private readonly shoppingbeRepository: Repository<EShopping>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(EUser);
    this.productRepository = this.dataSource.getRepository(EProduct);
    this.shoppingbeRepository = this.dataSource.getRepository(EShopping);
  }
  async create(shopping: Shopping): Promise<Shopping | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: shopping.id_user },
      });
      const product = await this.productRepository.findOne({
        where: { id: shopping.id_product },
      });

      if (!user || !product) {
        console.log("no se encontro el usuario con el id proporcionado");
        return null;
      }

      const newProduct = await this.shoppingbeRepository.create({
        total: shopping.total,
        cantidad: shopping.cantidad,
        status: shopping.status,
        user: user,
        product: product,
      });
      product.cantidad = product?.cantidad! - shopping.cantidad;
      const updatedProduct = await this.productRepository.save(product);
      const savedProduct = await this.shoppingbeRepository.save(newProduct);

      if (!savedProduct || !savedProduct.id) {
        return null;
      } else {
        return new Shopping(
          savedProduct.id!,
          savedProduct.total!,
          savedProduct.cantidad!,
          savedProduct.status!,
          savedProduct.user?.id!,
          savedProduct.product?.id!
        );
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
