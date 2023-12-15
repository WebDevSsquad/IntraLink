import Joi from "joi";

// Sign up validation schema
const signUpSchema = Joi.object({
  image: Joi.string(),
  username: Joi.string().min(3).max(25).required(),
  firstname: Joi.string().min(3).max(25).required(),
  lastname: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required(),
});

// Log in validation schema
const logInSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { logInSchema, signUpSchema };
