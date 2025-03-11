import { Subscripcion } from "../domain/Subscription";
import { SubscripcionRepository } from "../domain/SubscripcionRepository";

export class GetByUserUseCase {
  constructor(readonly subscripcionRepository: SubscripcionRepository) {}

  async run(
    id_user: number
  ): Promise<{ tokens: string[]; subscripcions: Subscripcion[] } | null> {
    try {
      const subscripcionNew = await this.subscripcionRepository.getByUser(
        id_user
      );
      if (!subscripcionNew) {
        return null;
      }
      return subscripcionNew;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
