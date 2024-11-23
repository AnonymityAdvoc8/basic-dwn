// src/middleware/roleAssigner.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to assign roles dynamically.
 * @param roles - A mapping of user identifiers to roles.
 */
export const roleAssigner = (roles: Record<string, string>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const userId = req.headers['x-user-id'] as string;

      if (!userId || !roles[userId]) {
        throw new Error('User role not found or unauthorized');
      }

      // Attach role to the request object
      req.body.role = roles[userId];
      next();
    } catch (error) {
      res.status(403).send({ error: (error as Error).message });
    }
  };
};