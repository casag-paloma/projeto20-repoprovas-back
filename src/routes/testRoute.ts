import { Router } from "express";
import { createTest, getTestByDiscipline, getTestByTeacher } from "../controllers/testController";
import joiValidation from "../midllewares/joiValidationMiddleware";
import testSchema from "../schemas/testSchema";

const testRouter = Router();

testRouter.post('/tests', joiValidation(testSchema) ,createTest)

testRouter.get('/testsByDiscipline', getTestByDiscipline);
testRouter.get('/testsByTeacher', getTestByTeacher);

export default testRouter;