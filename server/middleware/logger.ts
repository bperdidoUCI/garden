import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, _res: Response, next: NextFunction) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
};

export default logger;

// Usage in server/index.ts (example)
// import logger from './middleware/logger.js';
// app.use(logger);