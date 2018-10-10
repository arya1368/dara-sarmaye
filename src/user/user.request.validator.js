const Joi = require('joi');

module.exports = function (user) {
    const schema = {
        username: Joi.string().required().max(20),
        password: Joi.string().required().min(3).max(20)
    };

    return Joi.validate(user, schema);
};
