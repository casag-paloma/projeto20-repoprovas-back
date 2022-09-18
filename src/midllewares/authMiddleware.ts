import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export async function authUser(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) throw {type: 'unauthorized'}

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '123';

    jwt.verify(token, SECRET, (err)=>{

        if(err) throw {type: 'unauthorized'}
        next()
    })
}