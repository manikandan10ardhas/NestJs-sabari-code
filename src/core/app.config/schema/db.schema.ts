import * as Joi from 'joi';

// DB Configurations

export default {
  DB_ORM_NAME: Joi.string().allow('sequelize').default('sequelize'),
  DB_DIALECT: Joi.string().required().description('Database dialect required'),
  DB_HOSTNAME: Joi.string().required().description('Database host required'),
  DB_PORT: Joi.number().required().description('Database Port required'),
  DB_USERNAME: Joi.string().required().description('Database username required'),
  DB_PASSWORD: Joi.string().allow('').description('Database password required'),
  DB_NAME: Joi.string().required().description('Database Name required'),
  DB_OPERATOR_ALIASES: Joi.boolean().default(false),

  DB_LOG_QUERY: Joi.boolean().default(false),
  DB_CONNECTION_MAX: Joi.number().default(300),
  DB_CONNECTION_MIN: Joi.number().default(0),
  DB_CONNECTION_ACQUIRE: Joi.number().default(30_000),
  DB_CONNECTION_IDLE: Joi.number().default(10_000)
};
