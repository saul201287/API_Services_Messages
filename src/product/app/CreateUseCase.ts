import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";
import { SendNewUseCase } from "./services/SendNewUseCase";

export class CreateProductUseCase {
  constructor(
    readonly productRepository: ProductRepository,
    readonly services: SendNewUseCase
  ) {}

  async run(product: Product): Promise<Product | null> {
    try {
      const productNew = await this.productRepository.create(product);

      if (typeof productNew != null) {
        if (
          await this.services.run(
            "new-products",
            "¡Nuevo producto disponible!",
            `Se ha añadido ${productNew?.name} al catálogo.`
          )
        ) {
          return productNew;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
