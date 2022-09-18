import { Request, Response } from "express";
import * as testService from "../services/testService"
import { ITestSchema } from "../types/testTypes";

export async function createTest(req:Request, res:Response) {
    const data : ITestSchema = req.body;

    await testService.createTest(data);
    
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