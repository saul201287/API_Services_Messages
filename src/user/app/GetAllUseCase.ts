import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class GetAllUseCase {
  constructor(
    readonly userRepository: UserRepository
  ) {}

  async run(): Promise<User[] | null> {
    try {
      
      const users = await this.userRepository.getAll();

      if (typeof users != null) {
        return users;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
