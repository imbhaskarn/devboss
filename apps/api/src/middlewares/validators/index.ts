import { Response, Request, NextFunction } from 'express';
import { AnySchema } from 'joi';

const validator = (schema: AnySchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export default validator;
