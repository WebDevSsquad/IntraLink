import Joi from "joi";

// Sign up validation schema
const addSchema = Joi.object({
  projectID: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
});

// Log in validation schema
const deleteSchema = Joi.object({
  postID: Joi.number().required(),
});

export { addSchema, deleteSchema };
