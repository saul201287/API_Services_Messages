import { Request, Response } from "express";
import { UpdateProductUseCase } from "../../app/UpdateUseCase";

export class UpdateProductController {
  constructor(readonly updateProduct: UpdateProductUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const products = await this.updateProduct.run(data.id, data.cantidad);
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
