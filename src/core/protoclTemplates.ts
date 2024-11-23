// src/core/protocolTemplates.ts
import { ProtocolDefinition } from '../interfaces/protocol';

export const ImageSharingProtocol: ProtocolDefinition = {
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
  },
  structure: {
    image: {
      $size: { max: 500000000 },
      $actions: [
        {
          role: 'viewer',
          can: ['read', 'query'],
        },
        {
          role: 'writer',
          can: ['create', 'update', 'delete'],
        },
      ],
      metadata: {
        $size: { max: 100000 },
        $actions: [
          {
            role: 'viewer',
            can: ['read', 'query'],
          },
          {
            who: 'author',
            of: 'image',
            can: ['create', 'update', 'delete'],
          },
        ],
      },
    },
  },
};

export const BlobProtocol: ProtocolDefinition = {
    protocol: 'https://example.com/protocol/blob-storage',
    types: {
      blob: {
        schema: 'https://example.com/schemas/blob',
        dataFormats: ['application/octet-stream'],
      },
    },
    structure: {
      blob: {
        $size: { max: 1000000000 }, // 1GB
        $actions: [
          {
            role: 'viewer',
            can: ['read', 'query'],
          },
          {
            role: 'writer',
            can: ['create', 'update', 'delete'],
          },
        ],
      },
    },
  };