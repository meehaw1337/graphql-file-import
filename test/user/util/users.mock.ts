import { UserEntity } from '../../../src/user/model/entity/user.entity';
import { TeamEntity } from '../../../src/user/model/entity/team.entity';

export function createMockUserEntities(): UserEntity[] {
  const devTeam = new TeamEntity();
  devTeam.name = 'Developers';

  const designTeam = new TeamEntity();
  designTeam.name = 'Design';

  return [
    {
      firstName: 'Abbey',
      lastName: 'Johnston',
      email: 'abbey@example.com',
      roleDescription:
        "Abbey's responsibilities:\n- main product\n- code reviews",
      team: devTeam,
      teamName: devTeam.name,
    },
    {
      firstName: 'Ettie',
      lastName: 'Hauck',
      email: 'ettie@example.com',
      roleDescription: '',
      team: devTeam,
      teamName: devTeam.name,
    },
    {
      firstName: 'Melissa',
      lastName: 'Wisozk',
      email: 'melissa@example.com',
      roleDescription: '',
      team: designTeam,
      teamName: designTeam.name,
    },
    {
      firstName: 'Ramon',
      lastName: 'Lubowitz',
      email: 'ramon@example.com',
      roleDescription: '',
      team: designTeam,
      teamName: designTeam.name,
    },
    {
      firstName: 'Tatum',
      lastName: 'Bergnaum',
      email: 'tatum@example.com',
      roleDescription: '',
      team: designTeam,
      teamName: designTeam.name,
    },
  ];
}

export const expectedUsersResponse = {
  data: {
    users: [
      {
        firstName: 'Abbey',
        lastName: 'Johnston',
        email: 'abbey@example.com',
        roleDescription:
          "Abbey's responsibilities:\n- main product\n- code reviews",
        team: { name: 'Developers' },
      },
      {
        firstName: 'Ettie',
        lastName: 'Hauck',
        email: 'ettie@example.com',
        roleDescription: '',
        team: { name: 'Developers' },
      },
      {
        firstName: 'Melissa',
        lastName: 'Wisozk',
        email: 'melissa@example.com',
        roleDescription: '',
        team: { name: 'Design' },
      },
      {
        firstName: 'Ramon',
        lastName: 'Lubowitz',
        email: 'ramon@example.com',
        roleDescription: '',
        team: { name: 'Design' },
      },
      {
        firstName: 'Tatum',
        lastName: 'Bergnaum',
        email: 'tatum@example.com',
        roleDescription: '',
        team: { name: 'Design' },
      },
    ],
  },
};

export const expectedTeamsResponse = {
  data: {
    teams: [
      {
        name: 'Developers',
        users: [
          {
            firstName: 'Abbey',
            lastName: 'Johnston',
            email: 'abbey@example.com',
            roleDescription:
              "Abbey's responsibilities:\n- main product\n- code reviews",
          },
          {
            firstName: 'Ettie',
            lastName: 'Hauck',
            email: 'ettie@example.com',
            roleDescription: '',
          },
        ],
      },
      {
        name: 'Design',
        users: [
          {
            firstName: 'Melissa',
            lastName: 'Wisozk',
            email: 'melissa@example.com',
            roleDescription: '',
          },
          {
            firstName: 'Ramon',
            lastName: 'Lubowitz',
            email: 'ramon@example.com',
            roleDescription: '',
          },
          {
            firstName: 'Tatum',
            lastName: 'Bergnaum',
            email: 'tatum@example.com',
            roleDescription: '',
          },
        ],
      },
    ],
  },
};
