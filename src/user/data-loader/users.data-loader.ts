import * as DataLoader from 'dataloader';
import { groupBy } from 'lodash';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

export function createUsersDataLoader(service: UserService) {
  return new DataLoader<string, User[]>(async (teamNames: string[]) => {
    const users = await service.findByTeamNames(teamNames);

    const usersMap = groupBy(users, (user) => user.teamName);

    return teamNames.map((teamName) => usersMap[teamName]);
  });
}
