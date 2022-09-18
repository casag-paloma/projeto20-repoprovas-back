import * as userRepository from "../repositories/userRepository";
import { IUserData, IUserSchema } from "../types/userType";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function createUser(data: IUserSchema) {
    const {email, password} = data;

    const user = await userRepository.getUser(email);
    if(user) throw {type: 'conflict', message: 'this user is already cadastred on the db'}

    const encryptedPassword = bcrypt.hashSync(password, 10);
    const userData = {
        email, 
        password: encryptedPassword};

    await userRepository.createUser(userData);

};

export async function loginUser(data:IUserData) {
    const {email, password} = data;

    const user = await userRepository.getUser(email);
    if(!user) throw {type: 'not_found', message: 'this user is not cadastred on the db'}

    const comparePasswords = bcrypt.compareSync(password, user.password);
    if(!comparePasswords) throw{ type: 'unauthorized'}

    const tokenData = {userId: user.id};
    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '123';
    const EXPIRES_IN: string = process.env.TOKEN_EXPIRES_IN ?? '30 minutes';
    const jwtConfig = {
        expiresIn: EXPIRES_IN
    };
    const token = jwt.sign(tokenData, SECRET, jwtConfig);

    return token
};
