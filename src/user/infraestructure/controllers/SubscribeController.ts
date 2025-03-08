import { Request, Response } from "express";
import { SubscribeUseCase } from "../../app/SubscribeUseCase";

export class SubscribeControll {
  constructor(readonly getUserUseCase: SubscribeUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    console.log(data);

    try {
      const userN = await this.getUserUseCase.run(data.id, data.token, data.id_divece);
      console.log(userN);

      if (userN) {
        res.locals.user = userN;
        res.status(200).json({
          messages: "Subscrito",
          data: userN,
        });
      } else {
        res.status(409).json({
          error: "Error",
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
