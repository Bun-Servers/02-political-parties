import { SERVER_CONFIG } from "./config/server.config";
import indexHtlm from "../public/index.html";
import { generateUUID } from "./utils/generate-uuid";
import type { WebSocketData } from "./types";

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
      message(ws, message) {
        console.log(`Message from ${ws.data.clientId}: ${message}`);
      },
      open(ws) {
        console.log(`WebSocket opened for client: ${ws.data.clientId}`);
      },
      close(ws, code, message) {
        console.log(
          `WebSocket closed for client: ${ws.data.clientId}, Code: ${code}, Message: ${message}`,
        );
      },
    },
  });
};
