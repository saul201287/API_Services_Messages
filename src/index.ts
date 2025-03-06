import express from "express";
import morgan from "morgan";
import { Signale } from "signale";
import * as dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";


dotenv.config();
const app = express();
app.use(helmet.hidePoweredBy());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running");
});
const options = {
  secrets: ["([0-9]{4}-?)+"],
};

const logger = new Signale(options);
const port = process.env.PORT;

app.listen(port, () => {
  logger.success("server listening on port:", port);
});
