import { PrismaClient, Role } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import bcrypt from 'bcryptjs';
import "dotenv/config";
import { env } from "prisma/config";

const adapter = new PrismaMariaDb({
    host: "localhost",
    port: 3306,
    connectionLimit: 5,
    user: env("DATABASE_USERNAME"),
    password: env("DATABASE_PASSWORD"),
    database: env("DATABASE_NAME")
});

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding database...');

    // Seed users
    await prisma.user.upsert({
        where: { email: 'superadmin@inventory.dev' },
        update: {},
        create: {
            email: 'superadmin@inventory.dev',
            name: 'Super Admin',
            role: Role.SUPER_ADMIN,
            password: await bcrypt.hash('password', 10),
        },
    });

    await prisma.user.upsert({
        where: { email: 'admin@inventory.dev' },
        update: {},
        create: {
            email: 'admin@inventory.dev',
            name: 'Admin',
            role: Role.ADMIN,
            password: await bcrypt.hash('password', 10),
        },
    });

    await prisma.user.upsert({
        where: { email: 'staff@inventory.dev' },
        update: {},
        create: {
            email: 'staff@inventory.dev',
            name: 'Staff',
            role: Role.STAFF,
            password: await bcrypt.hash('password', 10),
        },
    });

    // Seed categories
    const categories = await Promise.all([
        prisma.category.upsert({
            where: { name: "Electronics" },
            update: {},
            create: { name: "Electronics" },
        }),
        prisma.category.upsert({
            where: { name: "Office Supplies" },
            update: {},
            create: { name: "Office Supplies" },
        }),
        prisma.category.upsert({
            where: { name: "Furniture" },
            update: {},
            create: { name: "Furniture" },
        }),
    ]);

    // Seed products
    await Promise.all([
        prisma.product.upsert({
            where: { sku: "ELEC-001" },
            update: {},
            create: {
                sku: "ELEC-001",
                name: "Laptop ASUS VivoBook",
                description: "Laptop 14 inch, RAM 16GB, SSD 512GB",
                price: 8500000,
                stock: 15,
                minStock: 5,
                categoryId: categories[0].id,
            },
        }),
        prisma.product.upsert({
            where: { sku: "ELEC-002" },
            update: {},
            create: {
                sku: "ELEC-002",
                name: "Mouse Wireless Logitech",
                description: "Mouse wireless 2.4GHz",
                price: 350000,
                stock: 3,
                minStock: 10,
                categoryId: categories[0].id,
            },
        }),
        prisma.product.upsert({
            where: { sku: "OFF-001" },
            update: {},
            create: {
                sku: "OFF-001",
                name: "Kertas HVS A4 80gr",
                description: "1 rim = 500 lembar",
                price: 55000,
                stock: 50,
                minStock: 20,
                categoryId: categories[1].id,
            },
        }),
        prisma.product.upsert({
            where: { sku: "FUR-001" },
            update: {},
            create: {
                sku: "FUR-001",
                name: "Kursi Ergonomis",
                description: "Kursi kantor dengan lumbar support",
                price: 2200000,
                stock: 2,
                minStock: 3,
                categoryId: categories[2].id,
            },
        }),
    ]);

    console.log("Seed complete!");
    console.log("Demo accounts:");
    console.log("superadmin@inventory.dev / password (SUPER_ADMIN)");
    console.log("admin@inventory.dev / password (ADMIN)");
    console.log("staff@inventory.dev / password (STAFF)");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });