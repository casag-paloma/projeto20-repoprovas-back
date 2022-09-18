"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.createUser = void 0;
const database_1 = require("../database");
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.prisma.user.create({ data });
    });
}
exports.createUser = createUser;
;
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield database_1.prisma.user.findUnique({ where: { email } });
        return user;
    });
}
exports.getUser = getUser;
;
