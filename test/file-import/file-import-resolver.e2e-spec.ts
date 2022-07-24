import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { UserEntity } from '../../src/user/model/entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Team } from '../../src/user/model/team.model';
import { TeamEntity } from '../../src/user/model/entity/team.entity';
import { join } from 'path';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress';
import { expectedSavedUserEntities } from './util/file-import.mock';

describe('FileImportResolver E2E', () => {
  let app: INestApplication;
  let userRepository: Repository<UserEntity>;
  let teamRepository: Repository<Team>;
  const gqlEndpoint = '/graphql';
  const query = {
    query: 'mutation ($file: Upload!) { importFile(file: $file) }',
    variables: { file: null },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get(getRepositoryToken(UserEntity));
    teamRepository = moduleFixture.get(getRepositoryToken(TeamEntity));

    app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));

    await app.init();
  });

  it('should import file', async () => {
    const file = join(__dirname, './util/mock-files/users.csv');

    await request(app.getHttpServer())
      .post(gqlEndpoint)
      .field('operations', JSON.stringify(query))
      .field('map', JSON.stringify({ '0': ['variables.file'] }))
      .attach('0', file)
      .expect(200);

    const userEntities = await userRepository.find({ relations: ['team'] });
    expect(userEntities).toMatchObject(expectedSavedUserEntities);
  });

  it('should not import file because its not a CSV', async () => {
    const file = join(__dirname, './util/mock-files/img.png');

    await request(app.getHttpServer())
      .post(gqlEndpoint)
      .field('operations', JSON.stringify(query))
      .field('map', JSON.stringify({ '0': ['variables.file'] }))
      .attach('0', file)
      .expect(200)
      .expect((response) => {
        expect(response.body.errors.length).toBe(1);
      });
  });

  afterAll(async () => {
    await userRepository.delete({});
    await teamRepository.delete({});
    await app.close();
  });
});
