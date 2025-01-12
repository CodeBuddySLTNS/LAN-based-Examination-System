import Joi from "joi";
import { SignupData } from "../types/objects.types";

const signupSchema = Joi.object({
  name: Joi.string().max(20).required(),
  username: Joi.string().max(15).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref("password")
});

export const validateSignup = (payload: SignupData) =>
  signupSchema.validate(payload, { abortEarly: false });
