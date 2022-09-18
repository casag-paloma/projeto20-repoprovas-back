import { Request, Response } from "express";

export async function createTest(req:Request, res:Response) {
    
    res.sendStatus(201);
}

export async function getTestByDiscipline(req:Request, res:Response) {

    const result = 'testesByDiscipline'
    
    res.status(200).send(result);
}

export async function getTestByTeacher(req:Request, res:Response) {

    const result = 'testesByTeacher'
    
    res.status(200).send(result);
}