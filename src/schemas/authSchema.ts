import joi from "joi";

const authSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(30).required(),
    confirmPassword: joi.ref('password')
}).with('password', 'confirmPassword');

export default authSchema