// src/middleware/roleAssigner.ts
import { Request, Response, NextFunction } from 'express';

const roles: { [key: string]: string } = {
    user1: 'viewer',
    user2: 'author',
  };

export const roleAssigner = (roles: any) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const userId = req.headers['x-user-id'] as string;

      if (!userId || !roles[userId]) {
        throw new Error('User role not found or unauthorized');
      }

      // Assign the role dynamically
      req.body.role = roles[userId];
      next();
    } catch (error) {
      res.status(403).send({ error: (error as Error).message });
    }
  };
};