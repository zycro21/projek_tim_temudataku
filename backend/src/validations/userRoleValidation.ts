// backend/src/validations/userRoleValidation.ts
import Joi from 'joi';

/**
 * Validation schema for user role assignment
 */
export const validateUserRole = (data: any) => {
  const schema = Joi.object({
    role_id: Joi.number().integer().positive().required()
      .messages({
        'number.base': 'Role ID must be a number',
        'number.integer': 'Role ID must be an integer',
        'number.positive': 'Role ID must be positive',
        'any.required': 'Role ID is required'
      })
  });

  return schema.validate(data);
};