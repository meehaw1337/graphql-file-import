import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamEntity } from '../model/entity/team.entity';
import { In, Repository } from 'typeorm';
import { Team } from '../model/team.model';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly repository: Repository<TeamEntity>,
  ) {}

  async findAll(): Promise<Team[]> {
    const entities = await this.repository.find();

    return entities.map((entity) => new Team(entity));
  }

  async findByNames(names: string[]): Promise<Team[]> {
    const entities = await this.repository.findBy({ name: In(names) });

    return entities.map((entity) => new Team(entity));
  }
}
