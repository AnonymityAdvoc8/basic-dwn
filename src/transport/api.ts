// src/transport/api.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Storage } from '../core/storage';
import { protocolValidator } from '../middleware/protocolValidator';
import { roleAssigner } from '../middleware/roleAssigner';

const app = express();
const storage = new Storage();

// Define roles
const roles = {
  user1: 'viewer',
  user2: 'writer',
};

app.use(bodyParser.json());

app.post(
    '/messages',
    roleAssigner(roles),
    protocolValidator('create'), // Dynamically validates based on protocol type
    (req: Request, res: Response) => {
      const { id, data } = req.body;
  
      // Save the valid message
      storage.save(id, {
          id, data,
          type: '',
          from: '',
          to: '',
          signature: ''
      });
  
      res.status(200).send({ status: 'success', message: 'Message processed successfully' });
    }
  );

  
/**
 * POST /messages/image
 */
app.post(
  '/messages/image',
  roleAssigner(roles),
  protocolValidator('create'),
  (req: Request, res: Response) => {
    const { id, data } = req.body;

    // Save the valid message
    storage.save(id, {
        id, data,
        type: '',
        from: '',
        to: '',
        signature: ''
    });

    res.status(200).send({ status: 'success', message: 'Message processed successfully' });
  }
);

/**
 * GET /messages/:id
 */
app.get(
  '/messages/:id',
  roleAssigner(roles),
  (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const role = req.body.role; // Role assigned by roleAssigner middleware

    const item = storage.fetch(id);
    if (!item) {
      res.status(404).send({ error: 'Message not found' });
      return;
    }

    // Allow only viewers or writers to access messages
    if (!['viewer', 'writer'].includes(role)) {
      res.status(403).send({ error: 'Unauthorized access to the message' });
      return;
    }

    res.status(200).send(item);
  }
);

export const api = app;