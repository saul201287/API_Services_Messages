import { NextFunction, Request, Response } from "express";
import { GetAllUseCase } from "../../app/GetAllUseCase";

export class GetAllController {
  constructor(readonly getAllUsers: GetAllUseCase) {}

  async run(req: Request, res: Response) {
    try {
        console.log("ss");
        
      const users = await this.getAllUsers.run();
      if (users) {
        return res.status(201).send({
          status: "recurso obtenido",
          data: users,
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
