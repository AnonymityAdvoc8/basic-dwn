// src/transport/api.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Storage } from '../core/storage';
import { Protocols } from '../core/protocols';

const app = express();
const storage = new Storage();

app.use(bodyParser.json());

app.post('/messages', async (req: Request, res: Response) => {
    try {
      const message = req.body;
      const response = await Protocols.processMessage(message);
  
      // Save message to storage
      storage.save(message.id, message);
  
      res.status(200).send({ status: 'success', response });
    } catch (error) {
      // Handle unknown error safely
      if (error instanceof Error) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: 'An unknown error occurred.' });
      }
    }
  });

  app.get(
    '/messages/:id',
    (req: Request<{ id: string }>, res: Response): void => {
      const id = req.params.id;
      const item = storage.fetch(id);
      if (!item) {
        res.status(404).send({ error: 'Message not found' });
        return;
      }
      res.send(item);
    }
  );

export const api = app;