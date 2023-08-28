// middleware/errorHandler.js

import { NextFunction, Request, Response } from 'express';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack);
    return res.status(500).json({ error: 'Something went wrong' });
};

export default errorHandler;
