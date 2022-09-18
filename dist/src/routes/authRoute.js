"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const joiValidationMiddleware_1 = __importDefault(require("../midllewares/joiValidationMiddleware"));
const authSchema_1 = __importDefault(require("../schemas/authSchema"));
const loginSchema_1 = __importDefault(require("../schemas/loginSchema"));
const authRouter = (0, express_1.Router)();
authRouter.post('/signin', (0, joiValidationMiddleware_1.default)(authSchema_1.default), authController_1.createUser);
authRouter.post('/signup', (0, joiValidationMiddleware_1.default)(loginSchema_1.default), authController_1.loginUser);
exports.default = authRouter;
