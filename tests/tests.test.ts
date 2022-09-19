import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";

afterAll(async()=>{
    await prisma.$disconnect();
})

describe('Testa POST /tests', ()=>{
    it.todo('Deve retornar 201, se cadastrando um teste no formado correto');
    it.todo('Deve retornar 404, se cadastrando um teste com uma categoria inexistente no banco de dados');
    it.todo('Deve retornar 404, se cadastrando um teste com uma disciplina inexistente no banco de dados');
    it.todo('Deve retornar 404, se cadastrando um teste com um professor inexistente no banco de dados');
    it.todo('Deve retornar 404, se cadastrando um teste com uma disciplina inexistente para o professor no banco de dados')
    it.todo('Deve retornar 401, se o token não for enviado');
    it.todo('Deve retornar 401, se um token inválido for enviado');
})

describe('TESTA GET /testsByDiscipline', ()=>{
    it.todo('Deve retornar 200 e um objeto, se enviado o token corretamente');
    it.todo('Deve retornar 401, se o token não for enviado');
    it.todo('Deve retornar 401, se um token inválido for enviado');
})

describe('TESTA GET /testsByTeacher', ()=>{
    it.todo('Deve retornar 200 e um objeto, se enviado o token corretamente');
    it.todo('Deve retornar 401, se o token não for enviado');
    it.todo('Deve retornar 401, se um token inválido for enviado');
});
