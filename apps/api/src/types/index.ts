import { Response, Request, NextFunction } from 'express';
export type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;
export type ExpressController = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;
