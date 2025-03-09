import { NextFunction, Request, Response } from "express";
import { CreateUseCase } from "../../app/CreateUseCase";
import { User } from "../../domain/User";

export class CreateUserController {
  constructor(readonly createUserUseCase: CreateUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    const userData = new User(
      0,
      data.nombre,
      data.apellidos,
      data.email,
      data.password,
      data.tipo_user,
      ""
    );
    try {
      const user = await this.createUserUseCase.run(userData);
      if (user) {
        const responseData = {
          id_divece: user?.id_divece,
        };
        return res.status(201).send({
          status: "recurso creado",
          data: responseData,
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
        mesagges: error,
      });
    }
  }
}
