import { DataSource, Repository } from "typeorm";
import { EUser } from "../../db/entities/EUser";
import { EProduct } from "../../db/entities/EProduct";
import { ProductRepository } from "../domain/ProductRepository";
import { Product } from "../domain/Product";
import { ESubscribe } from "../../db/entities/ESubscripbe";

export class MysqlProductRepository implements ProductRepository {
  private readonly userRepository: Repository<EUser>;
  private readonly productRepository: Repository<EProduct>;
  private readonly subscribeRepository: Repository<ESubscribe>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(EUser);
    this.productRepository = this.dataSource.getRepository(EProduct);
    this.subscribeRepository = this.dataSource.getRepository(ESubscribe);
  }

  async create(product: Product): Promise<Product | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: product.id_user },
      });

      if (!user) {
        console.log("no se encontro el usuario con el id proporcionado");
        return null;
      }

      const newProduct = await this.productRepository.create({
        id: 0,
        name: product.name,
        costo: product.costo,
        cantidad: product.cantidad,
        url_imagen: product.url_imagen,
        user: user,
      });

      const savedProduct = await this.productRepository.save(newProduct);

      if (!savedProduct || !savedProduct.id) {
        return null;
      } else {
        return new Product(
          savedProduct.id!,
          savedProduct.name!,
          savedProduct.costo!,
          savedProduct.cantidad!,
          savedProduct.url_imagen!,
          savedProduct.user?.id!
        );
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAll(): Promise<Product[] | null> {
    try {
      const products = await this.productRepository.find({
        relations: ["user"],
      });

      return products.map(
        (product) =>
          new Product(
            product.id!,
            product.name!,
            product.costo!,
            product.cantidad!,
            product.url_imagen!,
            product.user?.id!
          )
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getById(id: number): Promise<Product | null> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });
      if (product) {
        return new Product(
          product.id!,
          product.name!,
          product.costo!,
          product.cantidad!,
          product.url_imagen!,
          product.user?.id!
        );
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getByIdUser(id_user: number): Promise<Product[] | null> {
    try {
      const products = await this.productRepository.find({
        where: {
          user: { id: id_user },
        },
        relations: ["user"],
      });

      if (products.length === 0) {
        return null;
      }

      return products.map(
        (product) =>
          new Product(
            product.id!,
            product.name!,
            product.costo!,
            product.cantidad!,
            product.url_imagen!,
            product.user?.id!
          )
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(
    id: number,
    cantidad: number
  ): Promise<{ producto: Product; tokens: string[] } | null> {
    try {
      const tokens = await this.subscribeRepository.find({
        select: {
          user: {
            token: true,
          },
        },
        relations: ["user","product"],
        where: {
          product:{id:id},
          status: true,
          tipo: "add",
        },
      });

      const tokenList = tokens.map(
        (subscribe) => subscribe.user?.token ?? null
      );
      console.log(tokenList);

      if (
        !tokenList ||
        !Array.isArray(tokenList) ||
        !tokenList.every((item) => typeof item === "string")
      ) {
        return null;
      }

      const stado = await tokens.map(async (subscribe) =>{
        await this.subscribeRepository.update({ id:subscribe.id }, { status: false });
      })
      console.log(stado);
      
      const productN = await this.productRepository.findOne({ where: { id } });
      if (!productN) return null;

      productN.cantidad = cantidad + productN?.cantidad!;
      console.log(productN.cantidad);
      
      const updatedProduct = await this.productRepository.save(productN);
      const productUpdate = new Product(
        updatedProduct.id!,
        updatedProduct.name!,
        updatedProduct.costo!,
        updatedProduct.cantidad!,
        updatedProduct.url_imagen!,
        updatedProduct.user?.id!
      );

      const data = {
        producto: productUpdate,
        tokens: tokenList,
      };

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
