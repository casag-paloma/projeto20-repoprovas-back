import {prisma} from "../src/database"

async function main() {
    const termNumbers = [1,2,3,4,5,6];
    const categoriesNames = ['Projeto', 'Prática', 'Recuperação'];
    const teachersNames = ['Diego Pinho', 'Bruna Hamori'];
    const disciplinesValues = [
    {name: 'HTML e CSS', termId: 1 },
    {name: 'JavaScript', termId: 2 },
    {name: 'React', termId: 3 },
    {name: 'Humildade', termId: 1 },
    {name: 'Planejamento', termId: 2 },
    {name: 'Autoconfiança', termId: 3 }
    ]
    const teachersDisciplinesValues = [
        {teacherId: 1, disciplineId: 1},
        {teacherId: 1, disciplineId: 2},
        {teacherId: 1, disciplineId: 3},
        {teacherId: 2, disciplineId: 4},
        {teacherId: 2, disciplineId: 5},
        {teacherId: 2, disciplineId: 6}
    ]
    
    
    termNumbers.forEach(async(value) => {
        await prisma.term.upsert({ 
            where: { id: value},
            update: {},
            create: {
                id: value,
                number: value
            }
        })
    });

    categoriesNames.forEach(async(value, index) => {
        await prisma.category.upsert({ 
            where: { id: index+1},
            update: {},
            create: {
                id: index+1,
                name: value
            }
        })
    });

    teachersNames.forEach(async(value, index) => {
        await prisma.teacher.upsert({ 
            where: { id: index+1},
            update: {},
            create: {
                id: index+1,
                name: value
            }
        })
    });

    disciplinesValues.forEach(async(value, index) => {
        await prisma.discipline.upsert({ 
            where: { id: index+1},
            update: {},
            create: {
                id: index+1,
                name: value.name,
                termId: value.termId
            }
        })
    });

    teachersDisciplinesValues.forEach(async(value, index) => {
        await prisma.teacherDiscipline.upsert({ 
            where: { id: index+1},
            update: {},
            create: {
                id: index+1,
                teacherId: value.teacherId,
                disciplineId: value.disciplineId
            }
        })
    });


}


main()
    .catch( e=>{
        console.log(e);
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect();
    })