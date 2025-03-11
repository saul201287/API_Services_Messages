import { Subscripcion } from "../domain/Subscription";
import { SubscripcionRepository } from "../domain/SubscripcionRepository";

export class SubscripcionUseCase {
  constructor(readonly subscripcionRepository: SubscripcionRepository) {}

  async run(subscripcion: Subscripcion): Promise<Subscripcion | null> {
    try {
      const subscripcionNew = await this.subscripcionRepository.subscripcion(
        subscripcion
      );
      if (subscripcionNew) {
        return subscripcionNew;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
