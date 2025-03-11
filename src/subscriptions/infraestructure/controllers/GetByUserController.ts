import { Request, Response } from "express";
import { GetByUserUseCase } from "../../app/GetByUserUseCase";

export class GetByUserController {
  constructor(readonly subscribeUseCase: GetByUserUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const idNum = parseInt(id);

      if (isNaN(idNum)) {
        return res.status(400).json({
          success: false,
          messages: "Request mal formulado",
          error: "ID inválido",
        });
      }
      const result = await this.subscribeUseCase.run(idNum);
      if (result) {
        return res.status(200).send({
          status: "recursos obtenidos",
          data: result,
        });
      } else {
        return res.status(409).send({
          status: "error",
          data: "NO fue posible obtener los recursos",
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
