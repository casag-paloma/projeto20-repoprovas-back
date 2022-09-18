import { prisma } from "../database";

export async function getTestsByDisciplineAndTerm() {
    const result = await prisma.term.findMany({
        orderBy: {number: 'asc'},
        include: { 
            disciplines: {
                include:{
                    teacherDiscipline:{
                        select:{
                            test:{
                                select:{
                                    category: {
                                        include:{
                                            test:{
                                                include:{
                                                    teacherDiscipline:{
                                                        select:{
                                                            teacher: true
                                                        }
                                                    }
                                                },
                                                orderBy: {name: 'asc'}
                                            }
                                        }
                                    }
                                },
                                distinct: ['categoryId'],
                                orderBy: {categoryId: 'asc'}
                            }
                        },
                    }
                },
                orderBy: {id: 'asc'},
            },
            }
        },
        
    );

    return result;
}