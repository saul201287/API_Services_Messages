import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class GetByIdUseCase {
  constructor(readonly productRepository: ProductRepository) {}

  async run(id: number): Promise<Product | null> {
    try {
      const products = await this.productRepository.getById(id);

      return products;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
