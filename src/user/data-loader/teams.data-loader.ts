import * as DataLoader from 'dataloader';
import { TeamService } from '../service/team.service';
import { Team } from '../model/team.model';
import { keyBy } from 'lodash';

export function createTeamsDataLoader(service: TeamService) {
  return new DataLoader<string, Team>(async (teamNames: string[]) => {
    const teams = await service.findByNames(teamNames);

    const teamMap = keyBy(teams, (team) => team.name);

    return teamNames.map((teamName) => teamMap[teamName]);
  });
}
