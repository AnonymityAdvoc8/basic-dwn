// src/interfaces/protocol.ts

export interface ProtocolType {
    schema: string;
    dataFormats: string[];
  }
  
  export interface ProtocolAction {
    role?: string;
    who?: string;
    of?: string;
    can: string[];
  }
  
  export interface ProtocolStructure {
    $size?: {
      max: number;
    };
    $actions?: ProtocolAction[];
    [key: string]: any;
  }
  
  export interface ProtocolDefinition {
    protocol: string;
    types: Record<string, ProtocolType>;
    structure: Record<string, ProtocolStructure>;
  }