// src/middleware/protocolValidator.ts
import { Request, Response, NextFunction } from 'express';
import { Protocols } from '../core/protocols';
import { ProtocolDefinition } from '../interfaces/protocol';
import { ImageSharingProtocol, BlobProtocol } from '../core/protoclTemplates';

// Map of available protocols
const availableProtocols: Record<string, ProtocolDefinition> = {
  'image-sharing': ImageSharingProtocol,
  'blob-storage': BlobProtocol,
};

export const protocolValidator = (action: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { type } = req.body;

      // Split protocol name and type (e.g., 'image-sharing:image')
      const [protocolName, messageType] = type.split(':');

      // Find the protocol definition
      const protocolDefinition = availableProtocols[protocolName];
      if (!protocolDefinition) {
        throw new Error(`Protocol not found for type: ${type}`);
      }

      // Initialize the Protocols class with the selected protocol
      const protocols = new Protocols(protocolDefinition);

      const { role, data } = req.body;

      // Validate the message structure
      protocols.validateMessage({ ...req.body, type: messageType }); // Pass the extracted message type

      // Validate role and action
      protocols.validateAction({ ...req.body, type: messageType }, role, action);

      next();
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  };
};