import { Request, Response } from "express";
import * as userService from "../services/userService"
import { IUserSchema } from "../types/userType";

export async function createUser(req: Request, res: Response) {
    const data : IUserSchema = req.body;

    await userService.createUser(data)
    
    res.sendStatus(201);

}

export async function loginUser(req: Request, res: Response) {
    const data = req.body

    const token = await userService.loginUser(data);
    res.status(200).send(token);

}