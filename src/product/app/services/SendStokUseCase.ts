import { IMessages } from "../../domain/services/IMessages";

export class SendStokUseCase {
  constructor(readonly service: IMessages) {}
  async run(tokens: string[], title: string, body: string): Promise<boolean> {
    try {
      const status = await this.service.SendStok(tokens, title, body);
      return status;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
