import express from "express";
import {
  createProductController,
  getAllProductsController,
  getByIdProductController,
  getByIdUserController,
  updateProductController,
} from "./Dependencies";

export const productRouter = express.Router();

productRouter.post("/", (req, res) => {
  createProductController
    .run(req, res)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

productRouter.get("/", (req, res) => {
  getAllProductsController
    .run(req, res)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

productRouter.get("/:id", (req, res) => {
  getByIdProductController
    .run(req, res)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

productRouter.get("/user/:id", (req, res) => {
  getByIdUserController
    .run(req, res)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

productRouter.put("/", (req, res) => {
  updateProductController
    .run(req, res)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
