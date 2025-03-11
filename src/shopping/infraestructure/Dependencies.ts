import { CreateShoppingUseCase } from "../app/CreateUseCase";
import { CreateShoppingController } from "./CreateShoppingController";
import { MysqlSoppingRepository } from "./RepositoryMySQL";
import { database } from "../../db/DataBase";

const dataSource = database.getDataSource();
const repo = new MysqlSoppingRepository(dataSource)

const createShoppingUseCase = new CreateShoppingUseCase(repo);
export const createShoppingController = new CreateShoppingController(
  createShoppingUseCase
);