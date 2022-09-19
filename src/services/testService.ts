import * as testRepository from '../repositories/testRepository';
import * as categoryRepository from '../repositories/categoryRepository';
import * as disciplineRepository from '../repositories/disciplineRepository'
import * as teacherRepository from '../repositories/teacherRepository';
import * as teacherDisciplineRepository from '../repositories/teacherDisciplineRepository'
import * as termRepository from '../repositories/termRepository'

import { ITestData, ITestSchema } from '../types/testTypes';

export async function createTest(testData: ITestSchema) {
    
    const category = await categoryRepository.getCategoryIdByName(testData.category);
    if(!category) throw {type: 'not_found', message: 'this category dont exist in the database'}

    const discipline = await disciplineRepository.getDisciplineIdByName(testData.discipline);
    if(!discipline) throw {type: 'not_found', message: 'this discipline dont exist in the database'}

    const teacher  = await teacherRepository.getTeacherIdByName(testData.teacher);
    if(!teacher) throw {type: 'not_found', message: 'this teacher dont exist in the database'}

    const categoryId: number = category.id;
    const disciplineId: number = discipline.id;
    const teacherId: number = teacher.id;

    const teacherDiscipline = await teacherDisciplineRepository.getTeacherDisciplineId(teacherId, disciplineId);
    if(!teacherDiscipline) throw {type: 'not_found', message: 'this teacher dont teach this discipline'}
    
    const teacherDisciplineId: number = teacherDiscipline.id
    const data : ITestData = {
        name: testData.name,
        pdfUrl: testData.pdfUrl,
        categoryId,
        teacherDisciplineId
    };

    await testRepository.createTest(data);
    
}

export async function getTestsByDiscipline() {

    const result = await termRepository.getTestsByDisciplineAndTerm();

    return result;
    
};

export async function getTestsByTeacher() {

    const result = await teacherRepository.getTestsByTeachers();

    return result;
    
}