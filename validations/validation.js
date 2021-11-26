const Joi = require("joi");

const validateSignIn = (usr) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(8).max(200).required(),
  });
  return schema.validate(usr);
};
const validateUserSchema = (usr) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role_id: Joi.number().required(),
  });
  return schema.validate(usr);
};

const addPropertySchema = (prop) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    status: Joi.string().required(),
    location: Joi.string().required(),
    no_of_bedroom: Joi.number().required(),
    no_of_bathroom: Joi.number().required(),
    no_of_floor: Joi.number().required(),
    garage: Joi.string().required(),
    area: Joi.string().required(),
    size: Joi.string().required(),
    price: Joi.number().required(),
    feature_id: Joi.array().required(),
  });
  return schema.validate(prop);
};
const validateAdminSchema = (usr) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(usr);
};
module.exports = {
  validateSignIn,
  validateUserSchema,
  addPropertySchema,
  validateAdminSchema,
};
