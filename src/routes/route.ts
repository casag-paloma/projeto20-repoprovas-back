import { Router } from "express";
import authRouter from "./authRoute";
import testRouter from "./testRoute";

const route = Router();

route.use(authRouter)
route.use(testRouter);


export default route;