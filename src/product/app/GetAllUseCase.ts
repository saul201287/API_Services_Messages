import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class GetAllUseCase {
  constructor(readonly productRepository: ProductRepository) {}

  async run(): Promise<Product[] | null> {
    try {
      const products = await this.productRepository.getAll();

      return products
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
