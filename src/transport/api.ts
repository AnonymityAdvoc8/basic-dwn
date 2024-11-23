// src/transport/api.ts
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Storage } from '../core/storage';
import { protocolValidator } from '../middleware/protocolValidator';
import { roleAssigner } from '../middleware/roleAssigner';

const app = express();
const storage = new Storage();

// Define roles in this file
const roles = {
    user1: 'viewer',
    user2: 'author',
  };

  
app.use(bodyParser.json());

/**
 * POST /messages - Create a new message
 */
app.post(
  '/messages',
  roleAssigner(roles),
  protocolValidator('create'), // Dynamically validates based on protocol type
  (req: Request, res: Response) => {
    try {
      const { id, type, role, author, recipient, data, signature, timestamp } = req.body;

      // Save the valid message to storage
      storage.save(id, {
        id,
        type,
        role,
        author,
        recipient,
        data,
        signature,
        timestamp,
      });

      res.status(200).send({ status: 'success', message: 'Message processed successfully' });
    } catch (error) {
      res.status(400).send({ error: (error as Error).message });
    }
  }
);

/**
 * GET /messages/:id - Retrieve a message by ID
 */
app.get(
    '/messages/:id',
    roleAssigner(roles),
    (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
  
        // Fetch the message from storage
        const item = storage.fetch(id);
        if (!item) {
          res.status(404).send({ error: 'Message not found' });
          return;
        }
  
        // Ensure `data` exists and has the required properties
        if (!item.message.data || !item.message.data.schema) {
          throw new Error('Message data is malformed or missing required fields');
        }
  
        // Attach the message to the request for validation
        req.body = item.message;
  
        res.locals.message = item.message; // Save the message for later use
        next();
      } catch (error) {
        res.status(400).send({ error: (error as Error).message });
      }
    },
    protocolValidator('read'), // Validate the action
    (req: Request, res: Response) => {
      const message = res.locals.message; // Retrieve the stored message
      res.status(200).send(message);
    }
  );

export const api = app;