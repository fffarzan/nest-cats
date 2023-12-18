import { Injectable } from "@nestjs/common";
import { Prisma } from '@prisma/client';
import { Cat } from "src/cats/interfaces/cat.interface";
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CatsService {
    constructor(private prisma: PrismaService) { }

    findAll(): Promise<Cat[]> {
        return this.prisma.cat.findMany()
    }

    findOne(catWhereUniqueInput: Prisma.CatWhereUniqueInput): Promise<Cat | null> {
        return this.prisma.cat.findUnique({ where: catWhereUniqueInput })
    }

    create(data: Prisma.CatCreateInput): Promise<Cat> {
        return this.prisma.cat.create({ data })
    }

    async update(params: { where: Prisma.CatWhereUniqueInput; data: Prisma.CatUpdateInput; }): Promise<Cat> {
        const { where, data } = params;
        return this.prisma.cat.update({ data, where })
    }

    async delete(where: Prisma.CatWhereUniqueInput): Promise<Cat> {
        return this.prisma.cat.delete({ where });
    }
}