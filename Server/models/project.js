import Joi from "joi";

// Sign up validation schema
const addSchema = Joi.object({
  projectname: Joi.string().required(),
  description: Joi.string().required(),
});

// Log in validation schema
const deleteSchema = Joi.object({
  postID: Joi.number().required(),
});

export { addSchema, deleteSchema };
