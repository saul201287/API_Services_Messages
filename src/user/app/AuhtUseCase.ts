import { UserRepository } from "../domain/UserRepository";
import { IEncrypt } from "./services/IEncrypt";

export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypt: IEncrypt
  ) {}

  async run(user: string, password: string): Promise<string | null> {
    try {
      const userN = await this.userRepository.auth(user, password);

      if (userN !== null) {
        const isPasswordCorrect = await this.encrypt.compareTo(
          password,
          userN.password
        );
        if (!isPasswordCorrect) {
          console.log("error");

          return null;
        }
        return userN.id_divece;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
