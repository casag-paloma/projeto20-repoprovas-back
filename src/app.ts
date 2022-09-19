import express, { json } from "express";
import cors from "cors";
import "express-async-errors";
import route from "./routes/route";
import { errorHandler } from "./midllewares/errorHandlerMiddleware";

const app = express();
app.use(json());
app.use(cors());
app.use(route);
app.use(errorHandler);


export default app;