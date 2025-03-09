import { NextFunction, Request, Response } from "express";
import { AuthUseCase } from "../../app/AuhtUseCase";

export class AuthUserControll {
  constructor(readonly getUserUseCase: AuthUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    console.log(data);

    try {
      const userN = await this.getUserUseCase.run(data.email, data.password);
      console.log(userN);

      if (userN != null) {
        res.locals.user = userN;
        res.status(200).json({
          messages: "Credenciales validas",
          data: userN,
        });
      } else {
        res.status(401).json({
          error: "Credenciales invalidas",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error,
      });
    }
  }
}
