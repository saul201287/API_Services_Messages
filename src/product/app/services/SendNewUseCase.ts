import { IMessages } from "../../domain/services/IMessages";

export class SendNewUseCase {
  constructor(readonly service: IMessages) {}
  async run(topic: string, title: string, body: string): Promise<boolean> {
    try {
      const status = await this.service.SendNew(topic, title, body);
      return status;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
