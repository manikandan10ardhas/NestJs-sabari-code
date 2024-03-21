/* eslint-disable unicorn/no-thenable */
import * as Joi from 'joi';

// SERVER Configurations
export default {
  NODE_ENV: Joi.string().allow('development', 'production', 'test', 'staging', 'provision', 'qa'),
  LANG: Joi.string().allow('en', 'es'),
  TIMEZONE: Joi.string(),
  HTTP_PORT: Joi.number().required(),
  ENABLE_CORS: Joi.boolean().required(),
  API_RELEASE_VERSION: Joi.string().required(),
  ENABLE_DEBUG: Joi.string().required(),
  ALLOWED_ORIGINS: Joi.string()
    .required()
    .when('ENABLE_CORS', {
      is: Joi.boolean().valid(true),
      then: Joi.string().required(),
      otherwise: Joi.string().optional().allow(null).allow('')
    })
    .description('ALLOWED_ORIGINS required'),

  // JWT Configurations
  JWT_SECRET: Joi.string().required().description('JWT Secret required'),
  JWT_SECRET_TOKEN_EXPIRED_IN: Joi.number().required(),
  JWT_SECRET_REFRESH_TOKEN: Joi.string().required().description('JWT Refresh required'),
  JWT_SECRET_REFRESH_TOKEN_EXPIRED_IN: Joi.number().required(),
  CACHE_ENABLED: Joi.boolean().required(),
  CACHE_LIBRARY_NAME: Joi.string()
    .required()
    .when('CACHE_ENABLED', {
      is: Joi.boolean().valid(true),
      then: Joi.string().required(),
      otherwise: Joi.string().optional().allow(null).allow('')
    })
    .description('CACHE_LIBRARY_NAME required'),
  CACHE_CLIENT_URL: Joi.string()
    .required()
    .when('CACHE_ENABLED', {
      is: Joi.boolean().valid(true),
      then: Joi.string().required(),
      otherwise: Joi.string().optional().allow(null).allow('')
    })
    .description('CACHE_CLIENT_URL required')
};
