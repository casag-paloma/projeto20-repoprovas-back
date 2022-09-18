"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const userRepository = __importStar(require("../repositories/userRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = data;
        const user = yield userRepository.getUser(email);
        if (user)
            throw { type: 'conflict', message: 'this user is already cadastred on the db' };
        const encryptedPassword = bcrypt_1.default.hashSync(password, 10);
        const userData = {
            email,
            password: encryptedPassword
        };
        yield userRepository.createUser(userData);
    });
}
exports.createUser = createUser;
;
function loginUser(data) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = data;
        const user = yield userRepository.getUser(email);
        if (!user)
            throw { type: 'not_found', message: 'this user is not cadastred on the db' };
        const comparePasswords = bcrypt_1.default.compareSync(password, user.password);
        if (!comparePasswords)
            throw { type: 'unauthorized' };
        const tokenData = { userId: user.id };
        const SECRET = (_a = process.env.TOKEN_SECRET_KEY) !== null && _a !== void 0 ? _a : '123';
        const EXPIRES_IN = (_b = process.env.TOKEN_EXPIRES_IN) !== null && _b !== void 0 ? _b : '30 minutes';
        const jwtConfig = {
            expiresIn: EXPIRES_IN
        };
        const token = jsonwebtoken_1.default.sign(tokenData, SECRET, jwtConfig);
        return token;
    });
}
exports.loginUser = loginUser;
;
