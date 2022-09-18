"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joiValidation = (schema) => {
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            const message = validation.error.details.map((details) => details.message);
            throw { type: 'unprocessable_entity', message };
        }
        next();
    };
};
exports.default = joiValidation;
