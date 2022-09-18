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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsByTeacher = exports.getTestsByDiscipline = exports.createTest = void 0;
const testRepository = __importStar(require("../repositories/testRepository"));
const categoryRepository = __importStar(require("../repositories/categoryRepository"));
const disciplineRepository = __importStar(require("../repositories/disciplineRepository"));
const teacherRepository = __importStar(require("../repositories/teacherRepository"));
const teacherDisciplineRepository = __importStar(require("../repositories/teacherDisciplineRepository"));
const termRepository = __importStar(require("../repositories/termRepository"));
function createTest(testData) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = yield categoryRepository.getCategoryIdByName(testData.category);
        const disciplineId = yield disciplineRepository.getDisciplineIdByName(testData.discipline);
        const teacherId = yield teacherRepository.getTeacherIdByName(testData.teacher);
        console.log(categoryId, disciplineId, teacherId);
        const teacherDisciplineId = yield teacherDisciplineRepository.getTeacherDisciplineId(teacherId, disciplineId);
        const data = {
            name: testData.name,
            pdfUrl: testData.pdfUrl,
            categoryId,
            teacherDisciplineId
        };
        console.log(data);
        yield testRepository.createTest(data);
    });
}
exports.createTest = createTest;
function getTestsByDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield termRepository.getTestsByDisciplineAndTerm();
        return result;
    });
}
exports.getTestsByDiscipline = getTestsByDiscipline;
;
function getTestsByTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield teacherRepository.getTestsByTeachers();
        return result;
    });
}
exports.getTestsByTeacher = getTestsByTeacher;
