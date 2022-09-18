import { prisma } from "../database";

export async function getTeacherIdByName(teacherName:string) {
    const teacherId = await prisma.teacher.findUnique(
        {where:{name: teacherName},
        select: { id: true}
        }
    ) 
    console.log(teacherId);
    if(!teacherId) throw {type: 'not_found', message: 'this teacher dont exist in the database'}
    
    return teacherId.id
};

export async function getTestsByTeachers() {
    const result = await prisma.teacher.findMany({
        orderBy:{id: 'asc' },
        include:{
            teacherDiscipline:{
                select:{
                    test: {
                        select:{
                            category: {
                                include:{
                                    test:{
                                        include:{
                                            teacherDiscipline:{
                                                select:{
                                                    discipline: {
                                                        select:{
                                                            name: true
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        orderBy: [{teacherDisciplineId: 'asc'}, {name: 'asc'}]
                                    }
                                }
                            }
                        },
                        distinct: ['categoryId'],
                        orderBy: {categoryId: 'asc'}
                    
                    }
                }
            }
        }
    });

    return result;
}