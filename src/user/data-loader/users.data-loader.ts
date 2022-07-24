import * as DataLoader from 'dataloader';
import { groupBy } from 'lodash';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

export function createUsersDataLoader(service: UserService) {
  return new DataLoader<string, User[]>(async (teamIds: string[]) => {
    const users = await service.findByTeamIds(teamIds);

    const usersMap = groupBy(users, (user) => user.teamId);

    return teamIds.map((teamName) => usersMap[teamName]);
  });
}
