import { Request, Response } from "express";
import { DesubscripcionUseCase } from "../../app/DesubscripcionUseCase";

export class DesubscribeController {
  constructor(readonly desubscribeUseCase: DesubscripcionUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.desubscribeUseCase.run(data.id, data.id_user);
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
