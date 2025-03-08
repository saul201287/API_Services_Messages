import { CreateProductUseCase } from "../app/CreateUseCase";
import { GetAllUseCase } from "../app/GetAllUseCase";
import { GetByIdUseCase } from "../app/GetByIdUseCase";
import { GetByIdUserUseCase } from "../app/GetByIdUserUseCase";
import { UpdateProductUseCase } from "../app/UpdateUseCase";
import { CreateProductController } from "./controllers/CreateController";
import { GetAllProductsController } from "./controllers/GetAllController";
import { GetByIdProductController } from "./controllers/GetByIdController";
import { GetByIdUserController } from "./controllers/GetByIdUserController";
import { UpdateProductController } from "./controllers/UpdateProductController";
import { MysqlProductRepository } from "./MysqlRepositoryProduct";
import { SendNewUseCase } from "../app/services/SendNewUseCase";
import { SendRastreoUseCase } from "../app/services/SendRastreoUseCase";
import { SendStokUseCase } from "../app/services/SendStokUseCase";
import { ServicesFireBase } from "./servicesFireBase";
import { database } from "../../db/DataBase";

const dataSource = database.getDataSource();
const servicesFireBase = new ServicesFireBase();

const mysqlRepository = new MysqlProductRepository(dataSource);
const sendNewUseCase = new SendNewUseCase(servicesFireBase);
const sendRastreo = new SendRastreoUseCase(servicesFireBase);
const sendStokUseCase = new SendStokUseCase(servicesFireBase);

const createProductUseCase = new CreateProductUseCase(
  mysqlRepository,
  sendNewUseCase
);
const getAllUseCase = new GetAllUseCase(mysqlRepository);
const getByIdUseCase = new GetByIdUseCase(mysqlRepository);
const getByIdUserUseCase = new GetByIdUserUseCase(mysqlRepository);
const updateProductUseCase = new UpdateProductUseCase(
  mysqlRepository,
  sendStokUseCase
);

export const createProductController = new CreateProductController(
  createProductUseCase
);
export const getAllProductsController = new GetAllProductsController(
  getAllUseCase
);
export const getByIdProductController = new GetByIdProductController(
  getByIdUseCase
);
export const getByIdUserController = new GetByIdUserController(
  getByIdUserUseCase
);
export const updateProductController = new UpdateProductController(
  updateProductUseCase
);
