import { prisma } from "../database";

export async function getCategoryIdByName(categoryName:string) {
    const categoryId = await prisma.category.findUnique(
        {where:{name: categoryName},
        select: { id: true}
        }
    ) 
    
    return categoryId
}