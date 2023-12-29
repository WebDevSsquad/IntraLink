import Joi from "joi";

// Sign up validation schema
const addSchema = Joi.object({
  projectID: Joi.number().required(),
  price: Joi.number().required(),
});

// Log in validation schema
const deleteSchema = Joi.object({
  postID: Joi.number().required(),
});

export { addSchema, deleteSchema };
