import { prisma } from "../database";

export async function getDisciplineIdByName(disciplineName:string) {
    const disciplineId = await prisma.discipline.findUnique(
        {where:{name: disciplineName},
        select: { id: true}
        }
    ) 
    console.log(disciplineId);
    if(!disciplineId) throw {type: 'not_found', message: 'this discipline dont exist in the database'}
    
    return disciplineId.id
}