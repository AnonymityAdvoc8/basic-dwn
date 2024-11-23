// src/core/protocols.ts
import { ProtocolDefinition } from '../interfaces/protocol';
import { DWNMessage } from '../interfaces/message';

export class Protocols {
  constructor(private definition: ProtocolDefinition) {}

  /**
   * Validates a DWNMessage against the protocol definition.
   */
  validateMessage(message: DWNMessage): void {
    const typeDefinition = this.definition.types[message.type];
    if (!typeDefinition) {
      throw new Error(`Invalid type: ${message.type}`);
    }

    // Validate schema
    if (message.data.schema !== typeDefinition.schema) {
      throw new Error(`Invalid schema for type ${message.type}`);
    }

    // Validate data format
    if (!typeDefinition.dataFormats.includes(message.data.dataFormat)) {
      throw new Error(`Invalid data format for type ${message.type}`);
    }

    // Validate payload size
    const structure = this.definition.structure[message.type];
    const payloadSize = JSON.stringify(message.data).length;
    if (structure?.$size && payloadSize > structure.$size.max) {
      throw new Error(`Payload size exceeds the allowed maximum of ${structure.$size.max} bytes`);
    }
  }

  /**
   * Validates actions based on roles and permissions.
   */
  validateAction(message: DWNMessage, role: string, action: string): void {
    const structure = this.definition.structure[message.type];
    if (!structure?.$actions) {
      throw new Error(`No actions defined for type ${message.type}`);
    }

    const allowedActions = structure.$actions.filter((a) => a.role === role);
    if (!allowedActions.some((a) => a.can.includes(action))) {
      throw new Error(`Role ${role} is not allowed to perform ${action} on type ${message.type}`);
    }
  }
}