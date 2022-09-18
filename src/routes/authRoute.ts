import { Router } from "express";
import { createUser, loginUser } from "../controllers/authController";
import joiValidation from "../midllewares/joiValidationMiddleware";
import authSchema from "../schemas/authSchema";
import loginSchema from "../schemas/loginSchema";


const authRouter = Router();

authRouter.post('/signin', joiValidation(authSchema), createUser);
authRouter.post('/signup', joiValidation(loginSchema),loginUser)

export default authRouter;