import Joi from 'joi';
export const NewPostSchema = Joi.object({
    title: Joi.string().alphanum().min(10).max(60).required(),
    meta: Joi.string().alphanum().min(3).max(30).required(),
    description: Joi.string().alphanum().min(3).max(30).required(),
    status: Joi.string().alphanum().min(3).max(30).required(),
    content: Joi.string().alphanum().min(200).max(1000).required(),
});
