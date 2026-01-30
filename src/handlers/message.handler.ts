import type { WebSocketResponse } from "../types";

const createErrorResponse = (error: string): WebSocketResponse => {
  return {
    type: "ERROR",
    payload: { error },
  };
};

export const handleMessage = (message: string): WebSocketResponse => {
  try {
    const jsonData = JSON.parse(message);
    console.log({ payload: jsonData });

    const { type, payload } = jsonData;

    switch (type) {
      case "ADD_PARTY":
        return { type: "PARTY_ADDED", payload: [] };
      default:
        return createErrorResponse(`Unknown message type: ${type}`);
    }
  } catch (error) {
    return createErrorResponse("Invalid JSON format");
  }
};
