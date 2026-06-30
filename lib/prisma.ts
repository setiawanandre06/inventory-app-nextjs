import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Prevent multiple instances of Prisma Client in development
// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
const globalForPrisma = globalThis as unknown as { 
    prisma: PrismaClient 
};

let prismaInstance: PrismaClient;

if (globalForPrisma.prisma) {
    prismaInstance = globalForPrisma.prisma;
} else {
    const adapter = new PrismaMariaDb({
        host: process.env.DATABASE_HOST || "localhost",
        port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
        connectionLimit: 5,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    });
    prismaInstance = new PrismaClient({ adapter });
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}