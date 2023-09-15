import express from 'express';
// class CustomError extends Error {
//     httpStatusCode;
//     timestamp;
//     documentationUrl;

//     constructor(
//         httpStatusCode: number,
//         message: string,
//         documentationUrl: string
//     ) {
//         if (message) {
//             super(message);
//         } else {
//             super('A generic error occurred!');
//         }

//         // initializing the class properties
//         this.httpStatusCode = httpStatusCode;
//         this.timestamp = new Date().toISOString();
//         this.documentationUrl = documentationUrl;

//         // attaching a call stack to the current class,
//         // preventing the constructor call to appear in the stack trace
//         Error.captureStackTrace(this, this.constructor);
//     }
// }

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AsyncFunction } from '../../types';

export const asyncHandler = (fn: AsyncFunction): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
