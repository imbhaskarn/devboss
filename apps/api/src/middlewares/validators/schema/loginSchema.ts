import Joi from 'joi';

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().min(3),
  password: Joi.string()
    .pattern(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,16}$')
    )
    .required(),
}).xor('username', 'email');
