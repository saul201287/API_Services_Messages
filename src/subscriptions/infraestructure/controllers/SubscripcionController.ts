import { Request, Response } from "express";
import { SubscripcionUseCase } from "../../app/SubscripcionUseCase";
import { Subscripcion } from "../../domain/Subscription";

export class SubscribeController {
  constructor(readonly subscribeUseCase: SubscripcionUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const subscribe = new Subscripcion(
        0,
        data.topic,
        data.tipo,
        true,
        "Pendiente",
        data.id_user,
        data.id_product
      );
      const result = await this.subscribeUseCase.run(subscribe);
      if (result) {
        return res.status(201).send({
          status: "recurso creado",
          data: result,
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
