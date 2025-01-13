import Joi from "joi";
import { User } from "../types/objects.types";

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
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "Confirm password is required"
  })
});

// Validator functions
export const validateLogin = (payload: User) =>
  loginSchema.validate(payload, { abortEarly: false });
export const validateSignup = (payload: User) =>
  signupSchema.validate(payload, { abortEarly: false });
