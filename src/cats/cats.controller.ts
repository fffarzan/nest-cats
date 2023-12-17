import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat as CatModel } from '@prisma/client'

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) { }

    @Get()
    getCats(): Promise<CatModel[]> {
        return this.catsService.findAll()
    }

    @Get(':id')
    getCat(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<CatModel | null> {
        return this.catsService.findOne({ id })
    }

    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    createCat(@Body() createCatDto: CreateCatDto): Promise<CatModel> {
        return this.catsService.create(createCatDto)
    }

    @Put(':id')
    async updateCat(@Param('id') id: number, @Body() cat: CatModel): Promise<CatModel> {
        return this.catsService.update({
            where: { id },
            data: cat,
        });
    }

    @Delete(':id')
    removeCat(@Param('id') id: number): Promise<CatModel> {
        return this.catsService.delete({ id })
    }
}