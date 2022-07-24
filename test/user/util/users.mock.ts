import { UserEntity } from '../../../src/user/model/entity/user.entity';
import { TeamEntity } from '../../../src/user/model/entity/team.entity';
import { generateUuid } from '../../../src/file-import/util/generate-uuid.util';
import { v4 as uuid } from 'uuid';

export function createMockUserEntities(): UserEntity[] {
  const devTeam = new TeamEntity();
  devTeam.name = 'Developers';
  devTeam.id = generateUuid(devTeam.name);

  const designTeam = new TeamEntity();
  designTeam.name = 'Design';
  designTeam.id = generateUuid(designTeam.name);

  return [
    {
      id: uuid(),
      firstName: 'Abbey',
      lastName: 'Johnston',
      email: 'abbey@example.com',
      roleDescription:
        "Abbey's responsibilities:\n- main product\n- code reviews",
      team: devTeam,
      teamId: devTeam.id,
    },
    {
      id: uuid(),
      firstName: 'Ettie',
      lastName: 'Hauck',
      email: 'ettie@example.com',
      roleDescription: '',
      team: devTeam,
      teamId: devTeam.id,
    },
    {
      id: uuid(),
      firstName: 'Melissa',
      lastName: 'Wisozk',
      email: 'melissa@example.com',
      roleDescription: '',
      team: designTeam,
      teamId: designTeam.id,
    },
    {
      id: uuid(),
      firstName: 'Ramon',
      lastName: 'Lubowitz',
      email: 'ramon@example.com',
      roleDescription: '',
      team: designTeam,
      teamId: designTeam.id,
    },
    {
      id: uuid(),
      firstName: 'Tatum',
      lastName: 'Bergnaum',
      email: 'tatum@example.com',
      roleDescription: '',
      team: designTeam,
      teamId: designTeam.id,
    },
  ];
}

export const expectedUsersResponse = {
  data: {
    users: expect.arrayContaining([
      {
        id: expect.any(String),
        firstName: 'Abbey',
        lastName: 'Johnston',
        email: 'abbey@example.com',
        roleDescription:
          "Abbey's responsibilities:\n- main product\n- code reviews",
        team: { name: 'Developers', id: expect.any(String) },
      },
      {
        id: expect.any(String),
        firstName: 'Ettie',
        lastName: 'Hauck',
        email: 'ettie@example.com',
        roleDescription: '',
        team: { name: 'Developers', id: expect.any(String) },
      },
      {
        id: expect.any(String),
        firstName: 'Melissa',
        lastName: 'Wisozk',
        email: 'melissa@example.com',
        roleDescription: '',
        team: { name: 'Design', id: expect.any(String) },
      },
      {
        id: expect.any(String),
        firstName: 'Ramon',
        lastName: 'Lubowitz',
        email: 'ramon@example.com',
        roleDescription: '',
        team: { name: 'Design', id: expect.any(String) },
      },
      {
        id: expect.any(String),
        firstName: 'Tatum',
        lastName: 'Bergnaum',
        email: 'tatum@example.com',
        roleDescription: '',
        team: { name: 'Design', id: expect.any(String) },
      },
    ]),
  },
};

export const expectedTeamsResponse = {
  data: {
    teams: expect.arrayContaining([
      {
        id: expect.any(String),
        name: 'Developers',
        users: [
          {
            id: expect.any(String),
            firstName: 'Abbey',
            lastName: 'Johnston',
            email: 'abbey@example.com',
            roleDescription:
              "Abbey's responsibilities:\n- main product\n- code reviews",
          },
          {
            id: expect.any(String),
            firstName: 'Ettie',
            lastName: 'Hauck',
            email: 'ettie@example.com',
            roleDescription: '',
          },
        ],
      },
      {
        id: expect.any(String),
        name: 'Design',
        users: [
          {
            id: expect.any(String),
            firstName: 'Melissa',
            lastName: 'Wisozk',
            email: 'melissa@example.com',
            roleDescription: '',
          },
          {
            id: expect.any(String),
            firstName: 'Ramon',
            lastName: 'Lubowitz',
            email: 'ramon@example.com',
            roleDescription: '',
          },
          {
            id: expect.any(String),
            firstName: 'Tatum',
            lastName: 'Bergnaum',
            email: 'tatum@example.com',
            roleDescription: '',
          },
        ],
      },
    ]),
  },
};
