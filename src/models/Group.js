import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Group {
    static async findOne({ where = {} }) {
        return await prisma.group.findUnique({ where });
    }

    static async findMany({ params = {} }) {
        return await prisma.group.findMany(
            Object.assign(
                params,
                {
                    skip: params?.skip ?? undefined,
                    take: params?.take ?? undefined,
                }
            )
        );
    }

    static async create({ data }) {
        return await prisma.group.create({ data });
    }

    static async update({ where, data }) {
        return await prisma.group.update({ where, data });
    }

    static async delete({ where }) {
        return await prisma.group.delete(where);
    }
}