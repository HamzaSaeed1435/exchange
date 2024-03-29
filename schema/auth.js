const Joi = require('joi');

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const registrationSchema = Joi.object({
  email: Joi.string()
    .regex(emailRegex)
    .required(),
  password: Joi.string().min(6).required(),
});

// Login Schema
const loginSchema = Joi.object({
  email: Joi.string().regex(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

// Refresh Token Schema
const refreshTokenSchema = Joi.object({
  refresh_token: Joi.string().required(),
});

module.exports = {
  registrationSchema,
  loginSchema,
  refreshTokenSchema,
};
