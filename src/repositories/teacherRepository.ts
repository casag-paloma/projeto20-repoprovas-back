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
}