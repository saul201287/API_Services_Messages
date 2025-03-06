import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class GetByIdUserUseCase {
  constructor(readonly productRepository: ProductRepository) {}

  async run(id: number): Promise<Product[] | null> {
    try {
      const products = await this.productRepository.getByIdUser(id);

      return products;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
