import { Shopping } from "../domain/Shopping";
import { ShoppingRepository } from "../domain/ShoppingRepository";

export class CreateShoppingUseCase {
  constructor(readonly shoppingRepository: ShoppingRepository) {}

  async run(shopping: Shopping): Promise<Shopping | null> {
    try {
      const shoppingNew = await this.shoppingRepository.create(shopping);
      return shoppingNew;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
