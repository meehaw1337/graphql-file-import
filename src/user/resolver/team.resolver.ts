import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Team } from '../model/team.model';
import { TeamService } from '../service/team.service';
import { User } from '../model/user.model';
import DataLoader from 'dataloader';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly service: TeamService) {}

  @Query(() => [Team])
  teams(): Promise<Team[]> {
    return this.service.findAll();
  }

  @ResolveField(() => [User])
  users(
    @Parent() team: Team,
    @Context('usersLoader') usersLoader: DataLoader<string, User[]>,
  ): Promise<User[]> {
    const { name } = team;
    return usersLoader.load(name);
  }
}
