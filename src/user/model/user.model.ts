import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Team } from './team.model';
import { UserEntity } from './entity/user.entity';

@ObjectType()
export class User {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => ID)
  email: string;

  @Field(() => String)
  roleDescription: string;

  @Field(() => Team)
  team: Team;

  teamName: string;

  constructor(entity: UserEntity) {
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.email = entity.email;
    this.roleDescription = entity.roleDescription;
    this.teamName = entity.teamName;
    if (entity.team) {
      this.team = new Team(entity.team);
    }
  }
}
