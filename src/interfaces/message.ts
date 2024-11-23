// src/interfaces/message.ts
export interface DWNMessage {
  id: string;
  type: string; // Example: "image"
  role: string; // Role of the actor (e.g., "author", "viewer")
  author: string; // DID of the creator
  recipient: string; // DID of the recipient
  data: {
    schema: string; // Schema URI
    dataFormat: string; // MIME type
    payload: any; // Actual data
  };
  timestamp: string; // ISO timestamp of the message creation
  signature: string; // Digital signature for authenticity
}