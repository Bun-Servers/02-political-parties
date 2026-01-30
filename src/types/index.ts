export interface PoliticalParty {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  votes: number;
}

export interface WebSocketData {
  clientId: string;
}

export interface WebSocketResponse {
  type: RESPONSE_TYPE;
  payload: unknown;
}

export interface WebSocketMessage {
  type: MESSAGE_TYPE;
  payload: unknown;
}

export type RESPONSE_TYPE =
  | "PARTIES_LIST"
  | "PARTY_ADDED"
  | "PARTY_UPDATED"
  | "PARTY_DELETED"
  | "VOTES_UPDATED"
  | "ERROR";

export type MESSAGE_TYPE =
  | "GET_PARTIES"
  | "ADD_PARTY"
  | "UPDATE_PARTY"
  | "DELETE_PARTY"
  | "INCREMENT_VOTES"
  | "DECREMENT_VOTES";
