import { CreateUserInterface } from '../model/interface/create-user.interface';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto implements CreateUserInterface {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  roleDescription: string;

  @IsString()
  @IsNotEmpty()
  teamName: string;
}
