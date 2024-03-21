/* eslint-disable unicorn/no-thenable */
import JoiDate from '@joi/date';
import * as JoiBase from 'joi';

const Joi = JoiBase.extend(JoiDate);

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const otpLoginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  code: Joi.number().integer().min(100_000).max(999_999)
});

export const loginSecretSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  isResend: Joi.boolean().optional()
});
