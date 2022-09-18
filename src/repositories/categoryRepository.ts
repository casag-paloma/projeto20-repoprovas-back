import { prisma } from "../database";

export async function getCategoryIdByName(categoryName:string) {
    const categoryId = await prisma.category.findUnique(
        {where:{name: categoryName},
        select: { id: true}
        }
    ) 
    console.log(categoryId);
    if(!categoryId) throw {type: 'not_found', message: 'this category dont exist in the database'}
    
    return categoryId.id
}