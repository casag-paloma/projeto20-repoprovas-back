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
const database_1 = require("../src/database");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const termNumbers = [1, 2, 3, 4, 5, 6];
        const categoriesNames = ['Projeto', 'Prática', 'Recuperação'];
        const teachersNames = ['Diego Pinho', 'Bruna Hamori'];
        const disciplinesValues = [
            { name: 'HTML e CSS', termId: 1 },
            { name: 'JavaScript', termId: 2 },
            { name: 'React', termId: 3 },
            { name: 'Humildade', termId: 1 },
            { name: 'Planejamento', termId: 2 },
            { name: 'Autoconfiança', termId: 3 }
        ];
        const teachersDisciplinesValues = [
            { teacherId: 1, disciplineId: 1 },
            { teacherId: 1, disciplineId: 2 },
            { teacherId: 1, disciplineId: 3 },
            { teacherId: 2, disciplineId: 4 },
            { teacherId: 2, disciplineId: 5 },
            { teacherId: 2, disciplineId: 6 }
        ];
        termNumbers.forEach((value) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.prisma.term.upsert({
                where: { id: value },
                update: {},
                create: {
                    id: value,
                    number: value
                }
            });
        }));
        categoriesNames.forEach((value, index) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.prisma.category.upsert({
                where: { id: index + 1 },
                update: {},
                create: {
                    id: index + 1,
                    name: value
                }
            });
        }));
        teachersNames.forEach((value, index) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.prisma.teacher.upsert({
                where: { id: index + 1 },
                update: {},
                create: {
                    id: index + 1,
                    name: value
                }
            });
        }));
        disciplinesValues.forEach((value, index) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.prisma.discipline.upsert({
                where: { id: index + 1 },
                update: {},
                create: {
                    id: index + 1,
                    name: value.name,
                    termId: value.termId
                }
            });
        }));
        teachersDisciplinesValues.forEach((value, index) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.prisma.teacherDiscipline.upsert({
                where: { id: index + 1 },
                update: {},
                create: {
                    id: index + 1,
                    teacherId: value.teacherId,
                    disciplineId: value.disciplineId
                }
            });
        }));
    });
}
main()
    .catch(e => {
    console.log(e);
    process.exit(1);
})
    .finally(() => {
    database_1.prisma.$disconnect();
});
