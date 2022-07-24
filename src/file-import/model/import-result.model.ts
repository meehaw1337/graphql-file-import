import { Field, ObjectType } from '@nestjs/graphql';
import { FailedUser } from './failed-user.model';

@ObjectType()
export class ImportResult {
  @Field(() => Number)
  importedUsersCount: number;

  @Field(() => [FailedUser])
  failedUsers: FailedUser[];

  constructor(count: number, failedUsers: FailedUser[]) {
    this.importedUsersCount = count;
    this.failedUsers = failedUsers;
  }
}
