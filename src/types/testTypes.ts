import { Test } from "@prisma/client";

export type ITestData = Omit <Test, 'id'> 

export type ITestSchema = {
    name:string,
    pdfUrl: string,
    category: string,
    discipline: string,
    teacher: string
}