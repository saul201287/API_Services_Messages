export interface IMessages {
  SendNew(topic: string, title: string, body: string): Promise<boolean>;
  SendRastreo(
    token: string,
    title: string,
    body: string
  ): Promise<string | null>;
  SendStok(tokens: string[], title: string, body: string): Promise<boolean>;
}
