import { Body, Controller, Delete, Get, Header, HttpCode, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "src/cats/interfaces/cat.interface";

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get()
    async findAll() {
        try {
            await this.catsService.findAll()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message'
            }, HttpStatus.FORBIDDEN, {
                cause: error
            })
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `#${id} cat is here!`
    }

    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string): string {
        return `#${id} cat is deleted!`
    }
}