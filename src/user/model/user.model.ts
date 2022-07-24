import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Team } from './team.model';
import { UserEntity } from './entity/user.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

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

  teamId: string;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.email = entity.email;
    this.roleDescription = entity.roleDescription;
    this.teamId = entity.teamId;
    if (entity.team) {
      this.team = new Team(entity.team);
    }
  }
}
