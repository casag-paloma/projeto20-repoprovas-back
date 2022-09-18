import * as testRepository from '../repositories/testRepository';
import * as categoryRepository from '../repositories/categoryRepository';
import * as disciplineRepository from '../repositories/disciplineRepository'
import * as teacherRepository from '../repositories/teacherRepository';
import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository'

import { ITestData, ITestSchema } from '../types/testTypes';

export async function createTest(testData: ITestSchema) {
    
    const categoryId :number = await categoryRepository.getCategoryIdByName(testData.category);
    const disciplineId :number = await disciplineRepository.getDisciplineIdByName(testData.discipline);
    const teacherId : number = await teacherRepository.getTeacherIdByName(testData.teacher);

    console.log(categoryId, disciplineId, teacherId);

    const teacherDisciplineId :number = await teacherDisciplineRepository.getTeacherDisciplineId(teacherId, disciplineId);

    const data : ITestData = {
        name: testData.name,
        pdfUrl: testData.pdfUrl,
        categoryId,
        teacherDisciplineId
    };

    console.log(data);

    await testRepository.createTest(data);
    
}