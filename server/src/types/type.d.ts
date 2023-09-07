import { Request, Response, NextFunction } from "express";

declare global {
  type ExpressControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response<any, Record<string, any>>>;
}

