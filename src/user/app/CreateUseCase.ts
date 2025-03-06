import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { IEncrypt } from "./services/IEncrypt";

export class CreateUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly options: IEncrypt
  ) {}

  async run(user: User): Promise<User | null> {
    try {
      const newPassword = await this.options.encodePassword(user.password);
      const userWithEncodedPassword = new User(
        user.id,
        user.nombre,
        user.apellidos,
        user.email,
        newPassword,
        user.tipo_user,
        user.id_divece
      );
      const userNew = await this.userRepository.create(userWithEncodedPassword);

      if (typeof userNew != null) {
        return userNew;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
