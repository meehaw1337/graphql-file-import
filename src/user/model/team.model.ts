import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { TeamEntity } from './entity/team.entity';

@ObjectType()
export class Team {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [User])
  users: User[];

  constructor(entity: TeamEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.users = entity.users
      ? entity.users.map((userEntity) => new User(userEntity))
      : [];
  }
}
