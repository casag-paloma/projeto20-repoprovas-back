import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";
import { testFactory } from "./factories/testFactory";
import userFactory from "./factories/authFactory"

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
    it('Deve retornar 201 e um token, se logando um user no formato correto',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        await supertest(app).post('/signin').send(newUser);
        const result = await supertest(app).post('/signup').send(user);
        const countData = result.text.length;
        console.log(result.body);

        expect(result.status).toBe(200);
        expect(countData).toBeGreaterThan(0);
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

describe('Testa POST /tests', ()=>{
    it('Deve retornar 201, se cadastrando um teste no formado correto',async () => {

        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        await supertest(app).post('/signin').send(newUser);
        const tokenData = await supertest(app).post('/signup').send(user);
        const token = tokenData.text;

        const test = await testFactory();
        const newTest = {...test,
            category: "Prática",
            discipline: "HTML e CSS",
            teacher: "Diego Pinho" 
        }

        const result = await supertest(app).post('/tests').set('Authorization', 'bearer ' + token).send(newTest)
        
        expect(result.status).toBe(201);
        
    });
    it('Deve retornar 404, se cadastrando um teste com uma categoria inexistente no banco de dados',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        await supertest(app).post('/signin').send(newUser);
        const tokenData = await supertest(app).post('/signup').send(user);
        const token = tokenData.text;

        const test = await testFactory();
        const newTest = {...test,
            category: 'categorias',
            discipline: "HTML e CSS",
            teacher: "Diego Pinho" 
        }

        const result = await supertest(app).post('/tests').set('Authorization', 'bearer ' + token).send(newTest)
        
        expect(result.status).toBe(404);
    });
    it('Deve retornar 404, se cadastrando um teste com uma disciplina inexistente no banco de dados',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        await supertest(app).post('/signin').send(newUser);
        const tokenData = await supertest(app).post('/signup').send(user);
        const token = tokenData.text;

        const test = await testFactory();
        const newTest = {...test,
            category: "Prática",
            discipline: "disciplina",
            teacher: "Diego Pinho" 
        }

        const result = await supertest(app).post('/tests').set('Authorization', 'bearer ' + token).send(newTest)
        
        expect(result.status).toBe(404);
    });
    it('Deve retornar 404, se cadastrando um teste com um professor inexistente no banco de dados',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        await supertest(app).post('/signin').send(newUser);
        const tokenData = await supertest(app).post('/signup').send(user);
        const token = tokenData.text;

        const test = await testFactory();
        const newTest = {...test,
            category: "Prática",
            discipline: "HTML e CSS",
            teacher: " professor" 
        }

        const result = await supertest(app).post('/tests').set('Authorization', 'bearer ' + token).send(newTest)
        
        expect(result.status).toBe(404);
    });
    it('Deve retornar 404, se cadastrando um teste com uma disciplina inexistente para o professor no banco de dados',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        await supertest(app).post('/signin').send(newUser);
        const tokenData = await supertest(app).post('/signup').send(user);
        const token = tokenData.text;

        const test = await testFactory();
        const newTest = {...test,
            category: "Prática",
            discipline: "HTML e CSS",
            teacher: "Bruna Hamori" 
        }

        const result = await supertest(app).post('/tests').set('Authorization', 'bearer ' + token).send(newTest)
        
        expect(result.status).toBe(404);
    })
    it('Deve retornar 401, se o token não for enviado',async () => {
        const test = await testFactory();
        const newTest = {...test,
            category: "Prática",
            discipline: "HTML e CSS",
            teacher: "Diego Pinho" 
        }

        const result = await supertest(app).post('/tests').send(newTest)
        
        expect(result.status).toBe(401);
    });
    it('Deve retornar 401, se um token inválido for enviado',async () => {

        const test = await testFactory();
        const newTest = {...test,
            category: "Prática",
            discipline: "HTML e CSS",
            teacher: "Diego Pinho" 
        }

        const result = await supertest(app).post('/tests').set('Authorization', 'bearer ' + 'token').send(newTest)
        
        expect(result.status).toBe(401);
    });
})

describe('TESTA GET /testsByDiscipline', ()=>{
    it('Deve retornar 200 e um objeto, se enviado o token corretamente',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        await supertest(app).post('/signin').send(newUser);
        const tokenData = await supertest(app).post('/signup').send(user);
        const token = tokenData.text;
        const result = await supertest(app).get('/testsByDiscipline').set('Authorization', 'bearer ' + token)
        
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);

    });
    it('Deve retornar 401, se o token não for enviado',async () => {
        
        const result = await supertest(app).get('/testsByDiscipline');
        
        expect(result.status).toBe(401);
    });
    it('Deve retornar 401, se um token inválido for enviado',async () => {
        const result = await supertest(app).get('/testsByDiscipline').set('Authorization', 'bearer ' + 'token')
        
        expect(result.status).toBe(401);

    });
})

describe('TESTA GET /testsByTeacher', ()=>{
    it('Deve retornar 200 e um objeto, se enviado o token corretamente',async () => {
        const user = await userFactory();
        const newUser = {...user, confirmPassword: user.password};
        
        await supertest(app).post('/signin').send(newUser);
        const tokenData = await supertest(app).post('/signup').send(user);
        const token = tokenData.text;
        const result = await supertest(app).get('/testsByTeacher').set('Authorization', 'bearer ' + token)
        
        expect(result.status).toBe(200);
        expect(result.body).toBeInstanceOf(Object);

    });
    it('Deve retornar 401, se o token não for enviado',async () => {
        const result = await supertest(app).get('/testsByTeacher');
        
        expect(result.status).toBe(401);

    });
    it('Deve retornar 401, se um token inválido for enviado',async () => {
        const result = await supertest(app).get('/testsByTeacher').set('Authorization', 'bearer ' + 'token')
        
        expect(result.status).toBe(401);
    });
});
