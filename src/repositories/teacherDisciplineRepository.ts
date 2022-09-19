import { prisma } from "../database";

export async function getTeacherDisciplineId(teacherId:number, disciplineId: number) {
    const teacherDisciplineId = await prisma.teacherDiscipline.findFirst(
        {where:{teacherId, disciplineId},
        select: { id: true}
        }
    ) 
    return teacherDisciplineId;
}