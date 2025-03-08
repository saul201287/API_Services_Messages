import { Request, Response } from "express";
import { CreateProductUseCase } from "../../app/CreateUseCase";
import { Product } from "../../domain/Product";
import * as fs from "fs";
import * as path from "path";

export class CreateProductController {
  constructor(readonly createUseCase: CreateProductUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    let imageUrl = "";

    if (data.url_imagen) {
      try {
        const base64Data = data.url_imagen.includes(";base64,")
          ? data.url_imagen.split(";base64,").pop()
          : data.url_imagen;

        const filename = `product_${Date.now()}.png`;

        const uploadDir = path.join(process.cwd(), "upload");

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);

        fs.writeFileSync(filePath, base64Data, { encoding: "base64" });

        imageUrl = `/upload/${filename}`;
      } catch (err) {
        console.error("Error saving image:", err);
        return res.status(400).send({
          status: "error",
          data: "Error processing the image",
          message: err,
        });
      }
    }

    const userData = new Product(
      0,
      data.name,
      data.costo,
      data.cantidad,
      imageUrl, 
      data.id_user
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
