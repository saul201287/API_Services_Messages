import { IMessages } from "../../domain/services/IMessages";

export class SendRastreoUseCase {
  constructor(readonly service: IMessages) {}
  async run(token: string, title: string, body: string): Promise<string | null> {
    try {
      const status = await this.service.SendRastreo(token, title, body);
      return status;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
