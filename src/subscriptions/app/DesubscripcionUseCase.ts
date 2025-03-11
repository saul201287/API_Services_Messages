import { SubscripcionRepository } from "../domain/SubscripcionRepository";

export class DesubscripcionUseCase {
  constructor(readonly subscripcionRepository: SubscripcionRepository) {}

  async run(id: number, id_user: number): Promise<Boolean> {
    try {
      const subscripcionNew = await this.subscripcionRepository.desubscripcion(
        id,
        id_user
      );
      return subscripcionNew;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
