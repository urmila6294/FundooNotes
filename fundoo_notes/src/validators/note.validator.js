import Joi from '@hapi/joi';
export const noteValidator = (req, res, next) => {
    const schema = Joi.object({
        Title: Joi.string().min(4).alphanum().required(),
        Description: Joi.string().min(4).required(),
        Color: Joi.string().optional(),
        isArchived:Joi.boolean().default(false),
        isDeleted:Joi.boolean().default(false)
    });
    const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};  