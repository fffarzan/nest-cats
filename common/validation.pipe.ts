import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { ZodObject } from 'zod'

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) { }

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value)
    } catch (error) {
      throw new BadRequestException('Validation failed!')
    }
    return value
  }
}