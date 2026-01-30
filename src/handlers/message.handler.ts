import type { WebSocketMessage, WebSocketResponse } from "../types";

const createErrorResponse = (error: string): WebSocketResponse => {
  return {
    type: "ERROR",
    payload: { error },
  };
};

const handleGetParties = (): WebSocketResponse => {
  return {
    type: "PARTIES_LIST",
    payload: [],
  };
};

const handleAddParty = (payload: unknown): WebSocketResponse => {
  return {
    type: "PARTY_ADDED",
    payload: "Partido creado",
  };
};

const handleUpdateParty = (payload: unknown): WebSocketResponse => {
  return {
    type: "PARTY_UPDATED",
    payload: "Partido actualizado",
  };
};

const handleDeleteParty = (payload: unknown): WebSocketResponse => {
  return {
    type: "PARTY_DELETED",
    payload: "Partido eliminado",
  };
};

const handleIncrementVotes = (payload: unknown): WebSocketResponse => {
  return {
    type: "VOTES_UPDATED",
    payload: "Votos actualizados",
  };
};

const handleDecrementVotes = (payload: unknown): WebSocketResponse => {
  return {
    type: "VOTES_UPDATED",
    payload: "Votos actualizados",
  };
};

export const handleMessage = (message: string): WebSocketResponse => {
  try {
    const jsonData: WebSocketMessage = JSON.parse(message);

    const { type, payload } = jsonData;

    switch (type) {
      case "GET_PARTIES":
        return handleGetParties();
      case "ADD_PARTY":
        return handleAddParty(payload);
      case "UPDATE_PARTY":
        return handleUpdateParty(payload);
      case "DELETE_PARTY":
        return handleDeleteParty(payload);
      case "INCREMENT_VOTES":
        return handleIncrementVotes(payload);
      case "DECREMENT_VOTES":
        return handleDecrementVotes(payload);
      default:
        return createErrorResponse(`Unknown message type: ${type}`);
    }
  } catch (error) {
    return createErrorResponse("Invalid JSON format");
  }
};
