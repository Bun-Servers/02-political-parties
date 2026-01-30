export interface WebSocketData {
  clientId: string;
}

export interface WebSocketResponse {
  type: RESPONSE_TYPE;
  payload: unknown;
}

export type RESPONSE_TYPE =
  | "PARTIES_LIST"
  | "PARTY_ADDED"
  | "PARTY_UPDATED"
  | "PARTY_DELETED"
  | "VOTES_UPDATED"
  | "ERROR";
