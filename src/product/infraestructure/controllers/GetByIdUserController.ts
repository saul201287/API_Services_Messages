import { Request, Response } from "express";
import { GetByIdUserUseCase } from "../../app/GetByIdUserUseCase";

export class GetByIdUserController {
  constructor(readonly getByIdProducts: GetByIdUserUseCase) {}

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

      const products = await this.getByIdProducts.run(idNum);
      if (products) {
        return res.status(200).send({
          status: "recurso obtenido",
          data: products,
        });
      } else {
        return res.status(409).send({
          status: "error",
          data: "error",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: "error",
        data: "Ocurrió un error",
        mesagges: error,
      });
    }
  }
}
