import express from "express";
import{createShoppingController} from "./Dependencies";

export const shoppingRouter = express.Router();

shoppingRouter.post("/", (req, res) => {
  createShoppingController
    .run(req, res)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
