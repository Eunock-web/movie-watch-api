import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient({
    log: 
    process.env.NODE_ENV === 'development' 
        ? ['query', 'error', 'warn'] 
        : ['error'],
})

//Fonction de connexion a notre base de donnée
const connect = async () =>{
    try{
        await prisma.$connect();
        console.log("DB connected via Prisma");
    }catch(error){
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

//Fonction de deconnexion a notre base de donnée
const deconnect = async () =>{
    await prisma.$disconnect();
};

export  {prisma, connect, deconnect} 