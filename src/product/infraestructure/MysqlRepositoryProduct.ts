import { DataSource, Repository } from "typeorm";
import { EUser } from "../../db/entities/EUser";
import { EProduct } from "../../db/entities/EProduct";
import { ProductRepository } from "../domain/ProductRepository";
import { Product } from "../domain/Product";

export class MysqlProductRepository implements ProductRepository {
  private readonly userRepository: Repository<EUser>;
  private readonly productRepository: Repository<EProduct>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(EUser);
    this.productRepository = this.dataSource.getRepository(EProduct);
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
      const products = await this.productRepository.find();

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

  async update(id: number, cantidad: number): Promise<string | null> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) return null;

      product.cantidad = cantidad;
      const updatedProduct = await this.productRepository.save(product);
      return "Elemento actualizado";
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
