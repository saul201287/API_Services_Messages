import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { database } from "./db/DataBase";
import { userRouter } from "./user/infraestructure/RouterUser";

dotenv.config();
const app = express();
app.use(helmet.hidePoweredBy());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use("/user",userRouter)

app.get("/", (req, res) => {
  res.send("API is running");
});
const options = {
  secrets: ["([0-9]{4}-?)+"],
};

const logger = new Signale(options);
const port = process.env.PORT;

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
