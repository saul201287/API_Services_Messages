import express from "express";
import { createUserController, authUserController, getAllController } from "./Dependecies";

export const userRouter = express.Router();

userRouter.post("/", (req, res) => {
  createUserController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.post("/login", (req, res) => {
  authUserController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.get("/", (req, res) => {
  getAllController
    .run(req, res)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
