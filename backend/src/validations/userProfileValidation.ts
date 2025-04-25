// backend/src/validations/userProfileValidation.ts
import Joi from 'joi';

/**
 * Validation schema for profile update
 */
export const validateProfileUpdate = (data: any) => {
  const schema = Joi.object({
    full_name: Joi.string().min(3).max(100),
    phone_number: Joi.string().pattern(/^[0-9+\-\s]{8,15}$/),
    city: Joi.string().allow('', null),
    province: Joi.string().allow('', null)
  }).min(1); // At least one field should be provided

  return schema.validate(data);
};

/**
 * Validation schema for password change
 */
export const validatePasswordChange = (data: any) => {
  const schema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .required()
      .messages({
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        'string.min': 'Password must be at least 8 characters long'
      }),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
      'any.only': 'Passwords do not match'
    })
  });

  return schema.validate(data);
};