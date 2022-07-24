import { Field, ObjectType } from '@nestjs/graphql';
import { CsvUserInterface } from './interface/csv-user.interface';

@ObjectType()
export class FailedUser {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  roleDescription: string;

  @Field(() => String)
  team: string;

  @Field(() => [String])
  reasons: string[];

  constructor(user: CsvUserInterface, reasons: string[]) {
    this.firstName = user['first name'];
    this.lastName = user['last name'];
    this.email = user.email;
    this.roleDescription = user['role description'];
    this.team = user.team;
    this.reasons = reasons;
  }
}
