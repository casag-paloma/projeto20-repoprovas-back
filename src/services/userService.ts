import * as userRepository from "../repositories/userRepository";
import { IUserSchema } from "../types/userType";
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

export async function loginUser(data:{}) {
    
};
