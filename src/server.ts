import { SERVER_CONFIG } from "./config/server.config";
import indexHtlm from "../public/index.html";
import { generateUUID } from "./utils/generate-uuid";
import type { WebSocketData } from "./types";
import { handleMessage } from "./handlers/message.handler";

export const createServer = () => {
  return Bun.serve<WebSocketData>({
    port: SERVER_CONFIG.port,
    routes: {
      "/": indexHtlm,
    },
    fetch(req, server) {
      const clientId = generateUUID();

      const upgraded = server.upgrade(req, { data: { clientId } });

      if (upgraded) return undefined;

      return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
      open(ws) {
        ws.subscribe(SERVER_CONFIG.defaultChannelName);
      },
      message(ws, message: string) {
        const response = handleMessage(message);
        const responseString = JSON.stringify(response);

        if (response.type === "ERROR") {
          ws.send(responseString);
          return;
        }

        if (response.type === "PARTIES_LIST") {
          ws.send(responseString);
          return;
        }

        ws.send(responseString);
        ws.publish(SERVER_CONFIG.defaultChannelName, responseString);
      },
      close(ws, code, message) {
        console.log(
          `WebSocket closed for client: ${ws.data.clientId}, Code: ${code}, Message: ${message}`,
        );
      },
    },
  });
};
