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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const database_1 = require("../src/database");
const testFactory_1 = require("./factories/testFactory");
const authFactory_1 = __importDefault(require("./factories/authFactory"));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.prisma.$disconnect();
}));
describe('Testa POST /signin', () => {
    it('Deve retornar 201, se cadastrado um user no formato correto', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        const result = yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        expect(result.status).toBe(201);
    }));
    it('Deve retornar 409, ao tentar cadastrar email que já exista', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        const result = yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        expect(result.status).toBe(409);
    }));
});
describe('Testa POST /signup', () => {
    it('Deve retornar 201 e um token, se logando um user no formato correto', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        const result = yield (0, supertest_1.default)(app_1.default).post('/signup').send(user);
        const countData = result.text.length;
        expect(result.status).toBe(200);
        expect(countData).toBeGreaterThan(0);
    }));
    it('Deve retornar 404, ao tentar logar email que não cadastrado anteriormente', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const result = yield (0, supertest_1.default)(app_1.default).post('/signup').send(user);
        expect(result.status).toBe(404);
    }));
    it('Deve retornar 401, ao tentar logar um email com senha incorreta', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        const userWithWrongPassword = {
            email: user.email,
            password: '1234'
        };
        yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        const result = yield (0, supertest_1.default)(app_1.default).post('/signup').send(userWithWrongPassword);
        expect(result.status).toBe(401);
    }));
});
describe('Testa POST /tests', () => {
    it('Deve retornar 201, se cadastrando um teste no formado correto', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        const tokenData = yield (0, supertest_1.default)(app_1.default).post('/signup').send(user);
        const token = tokenData.text;
        const test = yield (0, testFactory_1.testFactory)();
        const newTest = Object.assign(Object.assign({}, test), { category: "Prática", discipline: "HTML e CSS", teacher: "Diego Pinho" });
        const result = yield (0, supertest_1.default)(app_1.default).post('/tests').set('Authorization', 'bearer ' + token).send(newTest);
        expect(result.status).toBe(201);
    }));
    it('Deve retornar 404, se cadastrando um teste com uma categoria inexistente no banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        const tokenData = yield (0, supertest_1.default)(app_1.default).post('/signup').send(user);
        const token = tokenData.text;
        const test = yield (0, testFactory_1.testFactory)();
        const newTest = Object.assign(Object.assign({}, test), { category: 'categorias', discipline: "HTML e CSS", teacher: "Diego Pinho" });
        const result = yield (0, supertest_1.default)(app_1.default).post('/tests').set('Authorization', 'bearer ' + token).send(newTest);
        expect(result.status).toBe(404);
    }));
    it('Deve retornar 404, se cadastrando um teste com uma disciplina inexistente no banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        const tokenData = yield (0, supertest_1.default)(app_1.default).post('/signup').send(user);
        const token = tokenData.text;
        const test = yield (0, testFactory_1.testFactory)();
        const newTest = Object.assign(Object.assign({}, test), { category: "Prática", discipline: "disciplina", teacher: "Diego Pinho" });
        const result = yield (0, supertest_1.default)(app_1.default).post('/tests').set('Authorization', 'bearer ' + token).send(newTest);
        expect(result.status).toBe(404);
    }));
    it('Deve retornar 404, se cadastrando um teste com um professor inexistente no banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        const tokenData = yield (0, supertest_1.default)(app_1.default).post('/signup').send(user);
        const token = tokenData.text;
        const test = yield (0, testFactory_1.testFactory)();
        const newTest = Object.assign(Object.assign({}, test), { category: "Prática", discipline: "HTML e CSS", teacher: " professor" });
        const result = yield (0, supertest_1.default)(app_1.default).post('/tests').set('Authorization', 'bearer ' + token).send(newTest);
        expect(result.status).toBe(404);
    }));
    it('Deve retornar 404, se cadastrando um teste com uma disciplina inexistente para o professor no banco de dados', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        const tokenData = yield (0, supertest_1.default)(app_1.default).post('/signup').send(user);
        const token = tokenData.text;
        const test = yield (0, testFactory_1.testFactory)();
        const newTest = Object.assign(Object.assign({}, test), { category: "Prática", discipline: "HTML e CSS", teacher: "Bruna Hamori" });
        const result = yield (0, supertest_1.default)(app_1.default).post('/tests').set('Authorization', 'bearer ' + token).send(newTest);
        expect(result.status).toBe(404);
    }));
    it('Deve retornar 401, se o token não for enviado', () => __awaiter(void 0, void 0, void 0, function* () {
        const test = yield (0, testFactory_1.testFactory)();
        const newTest = Object.assign(Object.assign({}, test), { category: "Prática", discipline: "HTML e CSS", teacher: "Diego Pinho" });
        const result = yield (0, supertest_1.default)(app_1.default).post('/tests').send(newTest);
        expect(result.status).toBe(401);
    }));
    it('Deve retornar 401, se um token inválido for enviado', () => __awaiter(void 0, void 0, void 0, function* () {
        const test = yield (0, testFactory_1.testFactory)();
        const newTest = Object.assign(Object.assign({}, test), { category: "Prática", discipline: "HTML e CSS", teacher: "Diego Pinho" });
        const result = yield (0, supertest_1.default)(app_1.default).post('/tests').set('Authorization', 'bearer ' + 'token').send(newTest);
        expect(result.status).toBe(401);
    }));
});
describe('TESTA GET /testsByDiscipline', () => {
    it('Deve retornar 200 e um objeto, se enviado o token corretamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        const tokenData = yield (0, supertest_1.default)(app_1.default).post('/signup').send(user);
        const token = tokenData.text;
        const result = yield (0, supertest_1.default)(app_1.default).get('/testsByDiscipline').set('Authorization', 'bearer ' + token);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    }));
    it('Deve retornar 401, se o token não for enviado', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/testsByDiscipline');
        expect(result.status).toBe(401);
    }));
    it('Deve retornar 401, se um token inválido for enviado', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/testsByDiscipline').set('Authorization', 'bearer ' + 'token');
        expect(result.status).toBe(401);
    }));
});
describe('TESTA GET /testsByTeacher', () => {
    it('Deve retornar 200 e um objeto, se enviado o token corretamente', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, authFactory_1.default)();
        const newUser = Object.assign(Object.assign({}, user), { confirmPassword: user.password });
        yield (0, supertest_1.default)(app_1.default).post('/signin').send(newUser);
        const tokenData = yield (0, supertest_1.default)(app_1.default).post('/signup').send(user);
        const token = tokenData.text;
        const result = yield (0, supertest_1.default)(app_1.default).get('/testsByTeacher').set('Authorization', 'bearer ' + token);
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);
    }));
    it('Deve retornar 401, se o token não for enviado', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/testsByTeacher');
        expect(result.status).toBe(401);
    }));
    it('Deve retornar 401, se um token inválido for enviado', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, supertest_1.default)(app_1.default).get('/testsByTeacher').set('Authorization', 'bearer ' + 'token');
        expect(result.status).toBe(401);
    }));
});
