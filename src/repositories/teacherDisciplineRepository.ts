import { prisma } from "../database";

export async function getTeacherDisciplineId(teacherId:number, disciplineId: number) {
    const teacherDisciplineId = await prisma.teacherDiscipline.findFirst(
        {where:{teacherId, disciplineId},
        select: { id: true}
        }
    ) 
    console.log(teacherDisciplineId);
    if(!teacherDisciplineId) throw {type: 'not_found', message: 'this teacher dont teach this discipline'}
    
    return teacherDisciplineId.id
}