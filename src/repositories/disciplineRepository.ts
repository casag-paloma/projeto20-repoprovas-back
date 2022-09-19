import { prisma } from "../database";

export async function getDisciplineIdByName(disciplineName:string) {
    const disciplineId = await prisma.discipline.findUnique(
        {where:{name: disciplineName},
        select: { id: true}
        }
    ) 
    
    return disciplineId
}