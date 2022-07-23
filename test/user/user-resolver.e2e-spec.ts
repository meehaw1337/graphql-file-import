import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { UserEntity } from '../../src/user/model/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockUserEntities,
  expectedUsersResponse,
} from './util/users.mock';
import { Team } from '../../src/user/model/team.model';
import { TeamEntity } from '../../src/user/model/entity/team.entity';

const gqlEndpoint = '/graphql';

describe('UserResolver E2E', () => {
  let app: INestApplication;
  let userRepository: Repository<UserEntity>;
  let teamRepository: Repository<Team>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get(getRepositoryToken(UserEntity));
    teamRepository = moduleFixture.get(getRepositoryToken(TeamEntity));

    await userRepository.save(createMockUserEntities());

    await app.init();
  });

  it('should return users', async () => {
    return request(app.getHttpServer())
      .post(gqlEndpoint)
      .send({
        query:
          '{ users { firstName lastName email roleDescription team { name }}}',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toMatchObject(expectedUsersResponse);
      });
  });

  afterAll(async () => {
    await userRepository.delete({});
    await teamRepository.delete({});
    await app.close();
  });
});
