import { CreateUseCase } from "../app/CreateUseCase";
import { AuthUseCase } from "../app/AuhtUseCase";
import { GetAllUseCase } from "../app/GetAllUseCase";
import { CreateUserController } from "./controllers/CreateController";
import { AuthUserControll } from "./controllers/AuthController";
import { GetAllController } from "./controllers/GetAllController";
import { RepositoryMysql } from "./RepositoryMySQL";
import { EncryptServices } from "./servicesEncript";
import { database } from "../../db/DataBase";

const dataSource = database.getDataSource();

const mysqlUserRepository = new RepositoryMysql(dataSource);
const encryptServices = new EncryptServices();

const createUserUseCase = new CreateUseCase(
  mysqlUserRepository,
  encryptServices
);
const authUserUseCase = new AuthUseCase(mysqlUserRepository, encryptServices);
const getAllUseCase = new GetAllUseCase(mysqlUserRepository);

export const createUserController = new CreateUserController(createUserUseCase);
export const authUserController = new AuthUserControll(authUserUseCase);
export const getAllController = new GetAllController(getAllUseCase);
