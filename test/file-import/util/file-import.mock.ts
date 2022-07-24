export const expectedSavedUserEntities = expect.arrayContaining([
  {
    id: expect.any(String),
    firstName: 'Abbey',
    lastName: 'Johnston',
    email: 'abbey@example.com',
    roleDescription:
      "Abbey's responsibilities:\n- main product\n- code reviews",
    teamId: expect.any(String),
    team: {
      id: expect.any(String),
      name: 'Developers',
    },
  },
  {
    id: expect.any(String),
    firstName: 'Ettie',
    lastName: 'Hauck',
    email: 'ettie@example.com',
    roleDescription: '',
    teamId: expect.any(String),
    team: {
      id: expect.any(String),
      name: 'Developers',
    },
  },
  {
    id: expect.any(String),
    firstName: 'Melissa',
    lastName: 'Wisozk',
    email: 'melissa@example.com',
    roleDescription: '',
    teamId: expect.any(String),
    team: {
      id: expect.any(String),
      name: 'Design',
    },
  },
  {
    id: expect.any(String),
    firstName: 'Ram�n',
    lastName: 'Lubowitz',
    email: 'ramon@example.com',
    roleDescription: '',
    teamId: expect.any(String),
    team: {
      id: expect.any(String),
      name: 'Design',
    },
  },
  {
    id: expect.any(String),
    firstName: 'Tatum',
    lastName: 'B�rgnaum',
    email: 'tatum@example.com',
    roleDescription: '',
    teamId: expect.any(String),
    team: {
      id: expect.any(String),
      name: 'Developers',
    },
  },
]);

export const expectedFailedToImportUsers = expect.arrayContaining([
  {
    firstName: 'Caitlyn',
    lastName: '',
    email: '',
    roleDescription: '',
    team: 'Design',
    reasons: ['email must be an email', 'lastName should not be empty'],
  },
  {
    firstName: 'Vladimir',
    lastName: 'Vladimirovich',
    email: '',
    roleDescription: '',
    team: 'Management',
    reasons: ['email must be an email'],
  },
]);
