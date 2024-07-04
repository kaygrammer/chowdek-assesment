import Joi from "joi";

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {};
    }
    req.value["body"] = req.body;
    next();
  };
};

const schemas = {
  authSchema: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string()
      .length(11)
      .pattern(/[6-9]{1}[0-9]{9}/)
      .required(),
  }),
};

const menuSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
});

const customerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .length(11)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .required(),
  password: Joi.string().min(6).required(),
});

export { validateRequest, schemas, menuSchema, customerSchema };
