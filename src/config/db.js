import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasource: {
        url: process.env.DATABASE_URL
    },  
    log: 
    process.env.NODE_ENV === 'development' 
        ? ['query', 'error', 'warn'] 
        : ['error'],
})

//Fonction de connexion a notre base de donnée
const connectDB = async () =>{
    try{
        await prisma.$connect();
        console.log("DB connected via Prisma");
    }catch(error){
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

//Fonction de deconnexion a notre base de donnée
const disconnectDB = async () =>{
    await prisma.$disconnect();
};

export  {prisma, connectDB, disconnectDB} 