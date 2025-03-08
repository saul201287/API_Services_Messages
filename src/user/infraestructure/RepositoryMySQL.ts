import { DataSource, Repository } from "typeorm";
import { EUser } from "../../db/entities/EUser";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";

export class RepositoryMysql implements UserRepository {
  private readonly userRepository: Repository<EUser>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(EUser);
  }

  async create(user: User): Promise<User | null> {
    try {
      const newUser = this.userRepository.create({
        id: 0,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        password: user.password,
        tipo_user: user.tipo_user,
        id_divece: user.id_divece,
      });

      const savedUser = await this.userRepository.save(newUser);

      if (!savedUser || !savedUser.id) {
        return null;
      } else {
        return new User(
          savedUser.id!,
          savedUser.nombre!,
          savedUser.apellidos!,
          savedUser.email!,
          savedUser.password!,
          savedUser.tipo_user!,
          savedUser.id_divece!
        );
      }
    } catch (error) {
      console.error("Error: " + error);

      return null;
    }
  }
  async auth(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      console.log(user);

      if (!user) return null;
      return new User(
        user.id!,
        user.nombre!,
        user.apellidos!,
        user.email!,
        user.password!,
        user.tipo_user!,
        user.id_divece!
      );
    } catch (error) {
      console.error("Error: " + error);
      return null;
    }
  }

  async getAll(): Promise<User[] | null> {
    try {
      const users = await this.userRepository.find();

      return users.map(
        (user) =>
          new User(
            user.id!,
            user.nombre!,
            user.apellidos!,
            user.email!,
            user.password!,
            user.tipo_user!,
            user.id_divece!
          )
      );
    } catch (error) {
      console.error("Error: " + error);
      return null;
    }
  }
  async subscribe(
    id: number,
    token: string,
    id_divece: string
  ): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        console.log("no se encontro el usuario con el id proporcionado");

        return false;
      }

      user.token = token;
      user.id_divece = id_divece;

      const updateUser = await this.userRepository.save(user);

      return true;
    } catch (error) {
      console.log("Error al actualizar el gimnasio: " + error);
      return false;
    }
  }
}
