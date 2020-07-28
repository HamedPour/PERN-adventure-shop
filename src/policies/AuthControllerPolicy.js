const Joi = require("joi");

module.exports = {
  signup(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
    });
    const { error, value } = schema.validate({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "Email is not valide",
          });
          break;
        case "password":
          res.status(400).send({
            error: "Password not valide",
          });
          break;
        default:
          res.status(400).send({
            error: error.message,
          });
      }
    } else {
      next();
    }
  },
};
