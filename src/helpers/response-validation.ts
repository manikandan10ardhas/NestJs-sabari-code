import { plainToClass } from 'class-transformer';

export const transformApiResponse = <T>(responseData: object, responseDto: new () => T): T => {
  return plainToClass(responseDto, responseData, {
    excludeExtraneousValues: true
  });
};
