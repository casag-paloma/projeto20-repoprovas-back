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
exports.getDisciplineIdByName = void 0;
const database_1 = require("../database");
function getDisciplineIdByName(disciplineName) {
    return __awaiter(this, void 0, void 0, function* () {
        const disciplineId = yield database_1.prisma.discipline.findUnique({ where: { name: disciplineName },
            select: { id: true }
        });
        console.log(disciplineId);
        if (!disciplineId)
            throw { type: 'not_found', message: 'this discipline dont exist in the database' };
        return disciplineId.id;
    });
}
exports.getDisciplineIdByName = getDisciplineIdByName;
