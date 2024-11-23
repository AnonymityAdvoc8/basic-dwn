// src/middleware/protocolValidator.ts
import { Request, Response, NextFunction } from 'express';
import { Protocols } from '../core/protocols';
import { ProtocolDefinition } from '../interfaces/protocol';
import { EnhancedImageSharingProtocol } from '../core/protocolDefinitions';

const availableProtocols: Record<string, ProtocolDefinition> = {
  'image-sharing': EnhancedImageSharingProtocol,
};

export const protocolValidator = (action: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { type } = req.body;

      const [protocolName, messageType] = type.split(':');
      const protocolDefinition = availableProtocols[protocolName];
      if (!protocolDefinition) {
        throw new Error(`Protocol not found for type: ${type}`);
      }

      const protocols = new Protocols(protocolDefinition);

      const { role, data } = req.body;

      protocols.validateMessage({ ...req.body, type: messageType });
      protocols.validateAction({ ...req.body, type: messageType }, action);

      next();
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  };
};