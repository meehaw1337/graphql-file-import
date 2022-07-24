import { v5 as uuid } from 'uuid';

const NAMESPACE = 'c66c487b-a65f-460c-a682-279e24c06ccb';

export const generateUuid = (name: string) => uuid(name, NAMESPACE);
