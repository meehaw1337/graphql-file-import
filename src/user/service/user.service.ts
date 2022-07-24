import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/entity/user.entity';
import { In, Repository } from 'typeorm';
import { User } from '../model/user.model';
import { CreateUserInterface } from '../model/interface/create-user.interface';
import { TeamEntity } from '../model/entity/team.entity';
import { generateUuid } from '../../file-import/util/generate-uuid.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const entities = await this.repository.find();

    return entities.map((entity) => new User(entity));
  }

  async findByTeamIds(teamIds: string[]): Promise<User[]> {
    const entities = await this.repository.findBy({ teamId: In(teamIds) });

    return entities.map((entity) => new User(entity));
  }

  async createMany(users: CreateUserInterface[]): Promise<void> {
    const entities = users.map((user) => {
      const entity = new UserEntity();

      entity.firstName = user.firstName;
      entity.lastName = user.lastName;
      entity.email = user.email;
      entity.roleDescription = user.roleDescription;
      entity.team = new TeamEntity();
      entity.team.name = user.teamName;
      entity.team.id = generateUuid(user.teamName);

      return entity;
    });

    await this.repository.save(entities);
  }
}
