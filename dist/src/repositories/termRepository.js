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
exports.getTestsByDisciplineAndTerm = void 0;
const database_1 = require("../database");
function getTestsByDisciplineAndTerm() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.term.findMany({
            orderBy: { number: 'asc' },
            include: {
                disciplines: {
                    include: {
                        teacherDiscipline: {
                            select: {
                                test: {
                                    select: {
                                        category: {
                                            include: {
                                                test: {
                                                    include: {
                                                        teacherDiscipline: {
                                                            select: {
                                                                teacher: true
                                                            }
                                                        }
                                                    },
                                                    orderBy: { name: 'asc' }
                                                }
                                            }
                                        }
                                    },
                                    distinct: ['categoryId'],
                                    orderBy: { categoryId: 'asc' }
                                }
                            },
                        }
                    },
                    orderBy: { id: 'asc' },
                },
            }
        });
        return result;
    });
}
exports.getTestsByDisciplineAndTerm = getTestsByDisciplineAndTerm;
