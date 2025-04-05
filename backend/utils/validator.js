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
  department: Joi.string().required().messages({
    "any.required": "Department is required",
  }),
  year: Joi.number().min(1).max(4).required().messages({
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
  question: Joi.string().label("Question").required().messages({
    "any.required": "Question is required",
  }),
  questionType: Joi.string().label("Question Type").required().messages({
    "any.required": "Question type is required",
  }),
  choices: Joi.array()
    .items(Joi.string().allow(""))
    .label("Question Type")
    .required()
    .messages({
      "any.required": "Choices is required",
    }),
  correctAnswer: Joi.array()
    .items(Joi.string())
    .label("Correct Answer")
    .required()
    .messages({
      "any.required": "Correct Answer is required",
    }),
});

const addExamSchema = Joi.object({
  subject: Joi.string().label("Subject").required().messages({
    "any.required": "Subject is required",
  }),
  department: Joi.string().label("Department").required().messages({
    "any.required": "Department is required",
  }),
  year: Joi.number().label("Year").required().messages({
    "any.required": "Year is required",
  }),
  label: Joi.string().label("Label").required().messages({
    "any.required": "Label is required",
  }),
  description: Joi.string().allow("").label("Description"),
  durationHours: Joi.number().label("Duration Hours").required().messages({
    "any.required": "Duration Hours is required",
  }),
  durationMinutes: Joi.number().label("Duration Minutes").required().messages({
    "any.required": "Duration Minutes is required",
  }),
  startTime: Joi.date().label("Start Time").required().messages({
    "any.required": "Start Time is required",
  }),
  questions: Joi.array()
    .items(Joi.object())
    .label("Questions")
    .required()
    .messages({
      "any.required": "Questions is required",
    }),
  // optional for editing the exam data
  examId: Joi.number().label("Examiner Id"),
  examinerId: Joi.number().label("Examiner Id"),
  examQuestionsId: Joi.number().label("Exam Questions Id"),
});

const multipleResponseSchema = Joi.object({
  examId: Joi.number().label("Exam Id").required().messages({
    "any.required": "Exam Id is required",
  }),
  responses: Joi.array()
    .items(Joi.object())
    .label("Responses")
    .required()
    .messages({
      "any.required": "Responses is required",
    }),
});

/* Validator functions */

// -> login validation
module.exports.validateLogin = (payload) =>
  loginSchema.validate(payload, { abortEarly: false });

// -> signup validation
module.exports.validateSignup = (payload) =>
  signupSchema.validate(payload, { abortEarly: false });

// -> question validation
module.exports.validateQuestion = (payload) =>
  addQuestionSchema.validate(payload, { abortEarly: false });

// -> exam validation
module.exports.validateExam = (payload) =>
  addExamSchema.validate(payload, { abortEarly: false });

// -> exam validation
module.exports.validateMultiResponse = (payload) =>
  multipleResponseSchema.validate(payload, { abortEarly: false });
