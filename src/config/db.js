import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL);

const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
});

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