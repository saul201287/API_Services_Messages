import { IMessages } from "../domain/services/IMessages";
import admin from "../../services/faribase";

export class ServicesFireBase implements IMessages {
  async SendNew(topic: string, title: string, body: string): Promise<boolean> {
    try {
      const message = {
        notification: { title, body },
        data: { triggerIAM: "true" },
        token:
          "dmhPpnl9S_e1iNXb4OXP80:APA91bFeNk-7BxdMjXEw2G4IFVemFH7ttJ8hhZTzQqNw7byMri2OeiFTRmzgHPlV_hnarQleUh94BZrWiAouWEIDk3zti0exJ0Ltu756lYl7BrlWUhJvJDo",
      };

      const result = await admin.messaging().send(message);
      console.log(result);

      console.log(`Notificación enviada al topic ${topic}`);
      return true;
    } catch (error) {
      console.error("Error enviando la notificación:", error);
      return false;
    }
  }

  SendRastreo(
    token: string,
    title: string,
    body: string
  ): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  SendStok(topic: string, title: string, body: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
