// backend/src/validations/roleValidation.ts
import Joi from 'joi';

/**
 * Validation schema for roles
 */
export const validateRole = (data: any) => {
  const schema = Joi.object({
    role_name: Joi.string().min(3).max(50).required()
      .messages({
        'string.min': 'Role name must be at least 3 characters long',
        'string.max': 'Role name must be less than 50 characters long',
        'any.required': 'Role name is required'
      }),
    description: Joi.string().max(500).allow('', null)
      .messages({
        'string.max': 'Description must be less than 500 characters long'
      })
  });

  return schema.validate(data);
};