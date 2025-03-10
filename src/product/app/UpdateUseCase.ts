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

      if (productNew != null) {
        if (
          productNew.tokens.length > 0 &&
          productNew.producto.cantidad == cantidad
        ) {
          if (
            await this.services.run(
              productNew.tokens,
              "¡El producto que esperabas ya esta disponible!",
              `Se han añadido mas ${productNew.producto.name} al Stok.`
            )
          ) {
            return productNew.producto.name;
          }else{
            return null
          }
        }
        return productNew.producto.name;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
