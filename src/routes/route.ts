import { Router } from "express";
import testRouter from "./testRoute";

const route = Router();

route.use(testRouter);

export default route;