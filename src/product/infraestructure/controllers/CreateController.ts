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

    if (data.imageUrl) {
      try {
        let mimeType = "";
        let base64Data = "";

        if (data.imageUrl.includes(";base64,")) {
          const parts = data.imageUrl.split(";base64,");
          const mimeTypePart = parts[0];
          base64Data = parts[1];

          if (mimeTypePart.includes("data:")) {
            mimeType = mimeTypePart.split("data:")[1];
          }
        } else {
          base64Data = data.imageUrl;
        }

        let fileExtension = ".png"; 

        if (mimeType) {
          const extensionMap: { [key: string]: string } = {
            "image/jpeg": ".jpg",
            "image/jpg": ".jpg",
            "image/png": ".png",
            "image/gif": ".gif",
            "image/webp": ".webp",
            "image/svg+xml": ".svg",
          };

          fileExtension =
            extensionMap[mimeType] || "." + mimeType.split("/")[1] || ".png";
        }

        const filename = `product_${Date.now()}${fileExtension}`;
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
