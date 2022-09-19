import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";
import userFactory from "./factories/authFactory";

afterAll(async()=>{
    await prisma.$disconnect();
})

describe('Testa POST /signin', ()=>{
    it('Deve retornar 201, se cadastrado um user no formato correto',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        const result = await supertest(app).post('/signin').send(newUser);

        expect(result.status).toBe(201);
    });
    it('Deve retornar 409, ao tentar cadastrar email que já exista',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        await supertest(app).post('/signin').send(newUser)
        const result = await supertest(app).post('/signin').send(newUser);

        expect(result.status).toBe(409);
    });
})

describe('Testa POST /signup', ()=>{
    it('Deve retornar 201, se logando um user no formato correto',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        await supertest(app).post('/signin').send(newUser);
        const result = await supertest(app).post('/signup').send(user);

        expect(result.status).toBe(200);
    });
    it('Deve retornar 404, ao tentar logar email que não cadastrado anteriormente',async () => {
        
        const user = await userFactory();
        
        const result = await supertest(app).post('/signup').send(user);

        expect(result.status).toBe(404);
    });
    it('Deve retornar 401, ao tentar logar um email com senha incorreta',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        const userWithWrongPassword = {
            email: user.email,
            password: '1234'
        }
        
        await supertest(app).post('/signin').send(newUser);
        const result = await supertest(app).post('/signup').send(userWithWrongPassword);

        expect(result.status).toBe(401);
    });
})
