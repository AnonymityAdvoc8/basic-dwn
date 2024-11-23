// src/core/protocolDefinitions.ts
import { ProtocolDefinition } from '../interfaces/protocol';

export const EnhancedImageSharingProtocol: ProtocolDefinition = {
  protocol: 'https://example.com/protocol/image-sharing',
  types: {
    image: {
      schema: 'https://example.com/schemas/image',
      dataFormats: ['image/png', 'image/jpeg', 'image/gif'],
    },
    metadata: {
      schema: 'https://example.com/schemas/metadata',
      dataFormats: ['application/json'],
    },
    viewer: {
      schema: 'https://example.com/schemas/viewer',
      dataFormats: ['application/json'],
    },
  },
  structure: {
    viewer: {
      $role: true,
      $actions: [
        { role: 'viewer', can: ['read', 'query'] },
      ],
    },
    image: {
      $size: { max: 500000000 }, // 500MB
      $actions: [
        { role: 'viewer', can: ['read', 'query'] },
        { role: 'author', can: ['create', 'update', 'delete', 'read'] },
      ],
      metadata: {
        $size: { max: 100000 }, // 100KB
        $actions: [
          { role: 'viewer', can: ['read', 'query'] },
          { role: 'author', can: ['create', 'update', 'delete', 'read'] },
        ],
      },
    },
  },
};