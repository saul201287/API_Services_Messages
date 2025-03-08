import { UserRepository } from "../domain/UserRepository";

export class SubscribeUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async run(id: number, token: string, id_divece: string): Promise<boolean> {
    try {
      const status = await this.userRepository.subscribe(id, token, id_divece);
      return status;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
