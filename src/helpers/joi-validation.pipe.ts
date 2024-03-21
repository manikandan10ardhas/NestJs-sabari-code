import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';

export class ValidatorPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  public transform(value: Record<string, unknown>) {
    const result = this.schema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join(',');
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
