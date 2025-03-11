import { Request, Response } from "express";
import { Shopping } from "../domain/Shopping";
import { CreateShoppingUseCase } from "../app/CreateUseCase";

export class CreateShoppingController {
  constructor(readonly createUseCase: CreateShoppingUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;

    const userData = new Shopping(
      0,
      data.total,
      data.cantidad,
      "pendiente",
      data.id_user,
      data.id_product
    );

    try {
      const product = await this.createUseCase.run(userData);
      if (product) {
        return res.status(201).send({
          status: "recurso creado",
          data: product,
        });
      } else {
        return res.status(409).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: "error",
        data: "Ocurrió un error",
        messages: error,
      });
    }
  }
}
