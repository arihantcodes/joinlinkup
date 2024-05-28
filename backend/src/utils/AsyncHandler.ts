import { Request, Response, NextFunction, RequestHandler } from "express";

const AsyncHandler = (requestHandler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
};

export default AsyncHandler;
