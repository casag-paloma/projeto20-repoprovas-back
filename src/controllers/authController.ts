import { Request, Response } from "express";

export async function createUser(req: Request, res: Response) {
    
    res.sendStatus(201);

}

export async function loginUser(req: Request, res: Response) {

    const token = 'token'
    res.status(200).send(token);

}