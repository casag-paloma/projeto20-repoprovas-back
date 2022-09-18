import { prisma } from "../database";
import { ITestData } from "../types/testTypes";


export async function createTest(testData : ITestData) {
    await prisma.test.create({data: testData})
}