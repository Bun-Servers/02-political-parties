import { partyService } from "../services/party.service";
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
    payload: partyService.getAll(),
  };
};

const handleAddParty = (payload: any): WebSocketResponse => {
  if (!payload.name || !payload.color || !payload.borderColor) {
    return createErrorResponse("Invalid payload for ADD_PARTY");
  }

  const newParty = partyService.add(
    payload.name,
    payload.color,
    payload.borderColor,
  );

  return {
    type: "PARTY_ADDED",
    payload: newParty,
  };
};

const handleUpdateParty = (payload: any): WebSocketResponse => {
  if (!payload.id) {
    return createErrorResponse("Invalid payload for UPDATE_PARTY");
  }

  const updatedParty = partyService.update(payload.id, {
    name: payload.name,
    color: payload.color,
    borderColor: payload.borderColor,
    votes: payload.votes,
  });

  if (!updatedParty) {
    return createErrorResponse("Party not found for UPDATE_PARTY");
  }

  return {
    type: "PARTY_UPDATED",
    payload: updatedParty,
  };
};

const handleDeleteParty = (payload: any): WebSocketResponse => {
  if (!payload.id) {
    return createErrorResponse("Invalid payload for DELETE_PARTY");
  }

  const deleted = partyService.delete(payload.id);

  if (!deleted) {
    return createErrorResponse("Party not found for DELETE_PARTY");
  }

  return {
    type: "PARTY_DELETED",
    payload: {
      id: payload.id,
    },
  };
};

const handleIncrementVotes = (payload: any): WebSocketResponse => {
  if (!payload.id) {
    return createErrorResponse("Invalid payload for INCREMENT_VOTES");
  }

  const updatedPartyVotes = partyService.incrementVotes(payload.id);

  if (!updatedPartyVotes) {
    return createErrorResponse("Party not found for INCREMENT_VOTES");
  }

  return {
    type: "VOTES_UPDATED",
    payload: updatedPartyVotes,
  };
};

const handleDecrementVotes = (payload: any): WebSocketResponse => {
  if (!payload.id) {
    return createErrorResponse("Invalid payload for DECREMENT_VOTES");
  }

  const updatedPartyVotes = partyService.decrementVotes(payload.id);

  if (!updatedPartyVotes) {
    return createErrorResponse("Party not found for DECREMENT_VOTES");
  }

  return {
    type: "VOTES_UPDATED",
    payload: updatedPartyVotes,
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
