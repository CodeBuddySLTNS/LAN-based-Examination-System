const Joi = require("joi");

// Schemas
const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});
const signupSchema = Joi.object({
  name: Joi.string().max(20).required().messages({
    "string.max": "Name should not exceed {#limit} characters",
    "any.required": "Name is required",
  }),
  username: Joi.string().max(15).required().messages({
    "string.max": "Username should not exceed {#limit} characters",
    "any.required": "Username is required",
  }),
  department: Joi.string().messages({
    "any.required": "Department is required",
  }),
  year: Joi.number().min(1).max(4).messages({
    "number.min": "Year should be between 1 and 4",
    "number.max": "Year should be between 1 and 4",
    "any.required": "Year is required",
  }),
  password: Joi.string().min(3).required().messages({
    "string.min": "Password must be at least {#limit} characters long",
    "any.required": "Password is required",
  }),
});
const addQuestionSchema = Joi.object({
  subject: Joi.string().label("Subject").required().messages({
    "any.required": "Subject is required",
  }),
  question: Joi.string().max(255).label("Question").required().messages({
    "any.required": "Question is required",
  }),
  correctAnswer: Joi.string().label("Correct Answer").required().messages({
    "any.required": "Correct Answer is required",
  }),
  incorrectAnswer: Joi.string().label("Incorrect Answer").required().messages({
    "any.required": "Correct Answer is required",
  }),
});

// Validator functions
// login validation
module.exports.validateLogin = (payload) =>
  loginSchema.validate(payload, { abortEarly: false });
// signup valudation
module.exports.validateSignup = (payload) =>
  signupSchema.validate(payload, { abortEarly: false });
module.exports.validateQuestion = (payload) =>
  addQuestionSchema.validate(payload, { abortEarly: false });
