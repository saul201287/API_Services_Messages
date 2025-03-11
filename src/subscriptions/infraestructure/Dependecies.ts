import { DesubscripcionUseCase } from "../app/DesubscripcionUseCase";
import { GetByUserUseCase } from "../app/GetByUserUseCase";
import { SubscripcionUseCase } from "../app/SubscripcionUseCase";
import { DesubscribeController } from "./controllers/DesubscripcionController";
import { GetByUserController } from "./controllers/GetByUserController";
import { SubscribeController } from "./controllers/SubscripcionController";
import { RepositoryMySqlSubscripcion } from "./RepositoryMySQL";
import { database } from "../../db/DataBase";
import { ServicesCroonJob } from "../../services/croon-job";
import { UpdateEstadoUseCase } from "../app/UpdateEstadoUseCase";

const dataSource = database.getDataSource();
const repo = new RepositoryMySqlSubscripcion(dataSource)

const desubscripcionUseCase = new DesubscripcionUseCase(repo);
const getByUserUseCase = new GetByUserUseCase(repo);
const subscripcionUseCase = new SubscripcionUseCase(repo)
const updateEstadoUseCase = new UpdateEstadoUseCase(repo)

export const desubscribeController = new DesubscribeController(desubscripcionUseCase);
export const getByUserController = new GetByUserController(getByUserUseCase)
export const subscribeController = new SubscribeController(subscripcionUseCase)
export const cronJobService = new ServicesCroonJob(
  getByUserUseCase,
  updateEstadoUseCase
);