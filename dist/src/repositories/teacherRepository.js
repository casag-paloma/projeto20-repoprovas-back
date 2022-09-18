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
exports.getTestsByTeachers = exports.getTeacherIdByName = void 0;
const database_1 = require("../database");
function getTeacherIdByName(teacherName) {
    return __awaiter(this, void 0, void 0, function* () {
        const teacherId = yield database_1.prisma.teacher.findUnique({ where: { name: teacherName },
            select: { id: true }
        });
        console.log(teacherId);
        if (!teacherId)
            throw { type: 'not_found', message: 'this teacher dont exist in the database' };
        return teacherId.id;
    });
}
exports.getTeacherIdByName = getTeacherIdByName;
;
function getTestsByTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield database_1.prisma.teacher.findMany({
            orderBy: { id: 'asc' },
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
                                                        discipline: {
                                                            select: {
                                                                name: true
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            orderBy: [{ teacherDisciplineId: 'asc' }, { name: 'asc' }]
                                        }
                                    }
                                }
                            },
                            distinct: ['categoryId'],
                            orderBy: { categoryId: 'asc' }
                        }
                    }
                }
            }
        });
        return result;
    });
}
exports.getTestsByTeachers = getTestsByTeachers;
