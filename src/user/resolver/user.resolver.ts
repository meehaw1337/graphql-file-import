import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Team } from '../model/team.model';
import { User } from '../model/user.model';
import DataLoader from 'dataloader';
import { UserService } from '../service/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly service: UserService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.service.findAll();
  }

  @ResolveField(() => Team)
  team(
    @Parent() user: User,
    @Context('teamsLoader') teamsLoader: DataLoader<string, Team>,
  ): Promise<Team> {
    const { teamId } = user;
    return teamsLoader.load(teamId);
  }
}
