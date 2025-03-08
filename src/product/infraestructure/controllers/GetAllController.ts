import { Request, Response } from "express";
import { GetAllUseCase } from "../../app/GetAllUseCase";

export class GetAllProductsController {
  constructor(readonly getAllProducts: GetAllUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const products = await this.getAllProducts.run();

      if (products) {
        const response = products.map((product) => ({
          id: product.id,
          name: product.name,
          costo: product.costo,
          cantidad: product.cantidad,
          imageUrl: product.url_imagen,
          idUser: product.id_user,
        }));
        return res.status(200).send({
          status: "recurso obtenido",
          data: response,
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
