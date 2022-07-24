import { Writable } from 'stream';
import { FailedUser } from '../model/failed-user.model';
import { ImportResult } from '../model/import-result.model';

export class ImportResponseStream extends Writable {
  private importedUsersCount = 0;
  private readonly failedUsers: FailedUser[] = [];

  constructor() {
    super({ objectMode: true });
  }

  _write(data, _, next) {
    if (data.importedUsersCount) {
      this.importedUsersCount = data.importedUsersCount;
    }
    if (data.csvUser && data.reasons) {
      const failedUser = new FailedUser(
        data.csvUser,
        data.reasons.map((reason) => Object.values(reason)).flat(),
      );
      this.failedUsers.push(failedUser);
    }
    next();
  }

  getResponse(): ImportResult {
    return new ImportResult(this.importedUsersCount, this.failedUsers);
  }
}
