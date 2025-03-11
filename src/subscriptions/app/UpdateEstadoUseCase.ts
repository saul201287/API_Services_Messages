import { SubscripcionRepository } from "../domain/SubscripcionRepository";

export class UpdateEstadoUseCase {
  constructor(readonly subscripcionRepository: SubscripcionRepository) {}

  async run(id: number, estado: string): Promise<Boolean> {
    try {
      const subscripcionNew = await this.subscripcionRepository.updateEstado(
        id,
        estado
      );
      return subscripcionNew;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
