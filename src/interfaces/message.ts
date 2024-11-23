// src/interfaces/message.ts
export interface DWNMessage {
    id: string;
    type: string;
    from: string; // DID of the sender
    to: string;   // DID of the recipient
    data: any;    // Payload
    signature: string; // Digital signature
  }