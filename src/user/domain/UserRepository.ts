import { User } from "./User";

export interface UserRepository {
  create(user: User): Promise<User | null>;
  getAll(): Promise<User[] | null>;
  auth(email: string, password: string): Promise<User | null>;
  subscribe(id:number, token:string, id_divece:string):Promise<boolean>
}
