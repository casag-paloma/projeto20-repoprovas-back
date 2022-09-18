import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import route from "./routes/route";
import { errorHandler } from "./midllewares/errorHandlerMiddleware";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(route);
app.use(errorHandler);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
})