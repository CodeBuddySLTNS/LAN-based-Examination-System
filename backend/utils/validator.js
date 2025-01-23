const Joi = require("joi");

// Schemas
const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required"
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required"
  })
});
const signupSchema = Joi.object({
  name: Joi.string().max(20).required().messages({
    "string.max": "Name should not exceed {#limit} characters",
    "any.required": "Name is required"
  }),
  username: Joi.string().max(15).required().messages({
    "string.max": "Username should not exceed {#limit} characters",
    "any.required": "Username is required"
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": "Password is required"
  })
});

// Validator functions
module.exports.validateLogin = payload =>
  loginSchema.validate(payload, { abortEarly: false });
module.exports.validateSignup = payload =>
  signupSchema.validate(payload, { abortEarly: false });
