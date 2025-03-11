import express from "express";
import {
  subscribeController,
  desubscribeController,
  getByUserController,
} from "./Dependecies";

export const subscripcionsRouter = express.Router();

subscripcionsRouter.post("/subscribe", (req, res) => {
  subscribeController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

subscripcionsRouter.post("/desubscribe", (req, res) => {
  desubscribeController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

subscripcionsRouter.get("/", (req, res) => {
  getByUserController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});