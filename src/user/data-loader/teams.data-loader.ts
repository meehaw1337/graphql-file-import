import * as DataLoader from 'dataloader';
import { TeamService } from '../service/team.service';
import { Team } from '../model/team.model';
import { keyBy } from 'lodash';

export function createTeamsDataLoader(service: TeamService) {
  return new DataLoader<string, Team>(async (teamIds: string[]) => {
    const teams = await service.findByIds(teamIds);

    const teamMap = keyBy(teams, (team) => team.id);

    return teamIds.map((id) => teamMap[id]);
  });
}
