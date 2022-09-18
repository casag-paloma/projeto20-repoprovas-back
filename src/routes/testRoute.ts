import { Router } from "express";
import { createTest, getTestByDiscipline, getTestByTeacher } from "../controllers/testController";
import { authUser } from "../midllewares/authMiddleware";
import joiValidation from "../midllewares/joiValidationMiddleware";
import testSchema from "../schemas/testSchema";

const testRouter = Router();

testRouter.post('/tests', joiValidation(testSchema), authUser ,createTest)

testRouter.get('/testsByDiscipline', authUser, getTestByDiscipline);
testRouter.get('/testsByTeacher', authUser, getTestByTeacher);

export default testRouter;