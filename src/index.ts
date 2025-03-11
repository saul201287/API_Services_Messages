import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { database } from "./db/DataBase";
import { userRouter } from "./user/infraestructure/RouterUser";
import { productRouter } from "./product/infraestructure/RouterProduct";
import { subscripcionsRouter } from "./subscriptions/infraestructure/Routers";
import { shoppingRouter } from "./shopping/infraestructure/Router";
import path from "path";
import { cronJobService } from "./subscriptions/infraestructure/Dependecies";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet.hidePoweredBy());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/subscribe", subscripcionsRouter);
app.use("/shopping", shoppingRouter);
app.use("/upload", express.static(path.join(__dirname, "../upload")));
app.get("/", (req, res) => {
  res.send("API is running");
});
const options = {
  secrets: ["([0-9]{4}-?)+"],
};

const logger = new Signale(options);
const port = process.env.PORT;

cronJobService.run();

async function startServer() {
  try {
    await database.connect();

    app.listen(port, () => {
      logger.success(`Server listening on port: ${port}`);
    });
  } catch (error) {
    logger.error("No se pudo iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();
