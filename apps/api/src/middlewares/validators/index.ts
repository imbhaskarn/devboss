import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';
const validator = {
    userSignUp: (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(
                    new RegExp(
                        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,16}$'
                    )
                )
                .required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        next();
    },
    userLogin: (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30),
            email: Joi.string().min(3),
            password: Joi.string()
                .pattern(
                    new RegExp(
                        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,16}$'
                    )
                )
                .required(),
        }).xor('username', 'email');
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    },
    Username: (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
        });
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    },
};

export default validator;
