import { ProductRepository } from "../domain/ProductRepository";
import { SendStokUseCase } from "./services/SendStokUseCase";

export class UpdateProductUseCase {
  constructor(
    readonly productRepository: ProductRepository,
    readonly services: SendStokUseCase
  ) {}

  async run(id: number, cantidad: number): Promise<string | null> {
    try {
      const productNew = await this.productRepository.update(id, cantidad);

      if (typeof productNew != null) {
        if (
          await this.services.run(
            "add-products",
            "¡El producto que esperabas ya esta disponible!",
            `Se han añadido mas ${productNew} al Stok.`
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
