import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [CatsController],
    providers: [CatsService, PrismaService],
    exports: [CatsService],
})
export class CatsModule { }