const Joi = require("joi");

function validationPost(input) {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  const result = schema.validate({
    title: input.title,
    content: input.content,
  });

  return result;
}

module.exports = validationPost;
