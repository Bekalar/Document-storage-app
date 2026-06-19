import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const customValidationPipe = new ValidationPipe({
  whitelist: true,
  stopAtFirstError: true,
  transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    const result = {};
    errors.forEach((error) => {
      if (error.constraints) {
        result[error.property] = Object.values(error.constraints)[0];
      }
    });
    return new BadRequestException({ errors: result });
  },
});
