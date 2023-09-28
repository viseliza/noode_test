import { Group } from './Group.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class User {
    static async findOne({ where = {} }) {
        return await prisma.user.findUnique({ where });
    }

    static async findMany({ params = {} }) {
        return await prisma.user.findMany(
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
        return await prisma.user.create({ data });
    }

    static async update({ where, data }) {
        return await prisma.user.update({ where, data });
    }

    static async delete({ where }) {
        return await prisma.user.delete(where);
    }

    static async include({ where }) {
        return await Group.findOne({
            where: { id: await User.findOne({
                where: { account_id: where  }
            }).then( ( result ) => { return result.group } )}
        })
    }
}
