import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside Validate Create User Pipe');
    console.log(value);
    console.log(metadata);

    // const parseAgeToInt = parseInt(value.age.toString());
    // if (isNaN(parseAgeToInt)) {
    //   console.log(`${value.age} is not a number`);
    //   throw new HttpException(
    //     'Invalid Data Type for property age. Excepted Number.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // return { ...value, age: parseAgeToInt };
    return value;
  }
}
