import { IMessages } from "../domain/services/IMessages";
import admin from "../../services/faribase";

export class ServicesFireBase implements IMessages {
  async SendNew(topic: string, title: string, body: string): Promise<boolean> {
    try {
      const message = {
        notification: { title, body },
        data: { triggerIAM: "true" },
        topic:topic,
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

  async SendRastreo(
    token: string,
    title: string,
    body: string
  ): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  async SendStok(
    tokens: string[],
    title: string,
    body: string
  ): Promise<boolean> {
    try {
      if (!tokens || tokens.length === 0) {
        console.error("La lista de tokens está vacía o no es válida");
        return false;
      }

      const message: admin.messaging.MulticastMessage = {
        notification: { title, body },
        data: { triggerIAM: "true" },
        tokens, 
      };

      const result = await admin.messaging().sendEachForMulticast(message);
      console.log("Resultado del envío:", result);

      if (result.failureCount > 0) {
        console.warn(
          `${result.failureCount} notificaciones fallaron al enviarse`
        );
        result.responses.forEach((response, index) => {
          if (!response.success) {
            console.error(
              `Error en el token ${tokens[index]}:`,
              response.error
            );
          }
        });
      }

      console.log(`Notificación enviada a ${result.successCount} dispositivos`);
      return result.successCount > 0; 
    } catch (error) {
      console.error("Error enviando la notificación:", error);
      return false;
    }
  }
}
