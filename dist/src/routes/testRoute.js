"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const testController_1 = require("../controllers/testController");
const authMiddleware_1 = require("../midllewares/authMiddleware");
const joiValidationMiddleware_1 = __importDefault(require("../midllewares/joiValidationMiddleware"));
const testSchema_1 = __importDefault(require("../schemas/testSchema"));
const testRouter = (0, express_1.Router)();
testRouter.post('/tests', (0, joiValidationMiddleware_1.default)(testSchema_1.default), authMiddleware_1.authUser, testController_1.createTest);
testRouter.get('/testsByDiscipline', authMiddleware_1.authUser, testController_1.getTestByDiscipline);
testRouter.get('/testsByTeacher', authMiddleware_1.authUser, testController_1.getTestByTeacher);
exports.default = testRouter;
