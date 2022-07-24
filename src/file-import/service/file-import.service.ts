import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { Duplex, Stream } from 'stream';
import { CsvUserInterface } from '../model/interface/csv-user.interface';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { validateOrReject } from 'class-validator';
import { FileImportConfig } from '../../config/file-import.config';

@Injectable()
export class FileImportService {
  constructor(
    private readonly userService: UserService,
    private readonly fileImportConfig: FileImportConfig,
  ) {}

  importUsersStream(): Duplex {
    const stream = new Stream.Duplex({ objectMode: true });

    let batch = [];
    let importedUsersCount = 0;

    stream._write = async (csvUser, _, next) => {
      try {
        const dto = await this.csvUserToUserDto(csvUser);
        batch.push(dto);

        if (batch.length === this.fileImportConfig.getBatchSize()) {
          await this.userService.createMany(batch);
          importedUsersCount += batch.length;
          batch = [];
        }
      } catch (errors) {
        stream.push({
          csvUser,
          reasons: errors.map((e) => e.constraints),
        });
      }
      next();
    };

    stream._read = () => ({});

    stream._final = async () => {
      importedUsersCount += batch.length;
      stream.push({ importedUsersCount });
      await this.userService.createMany(batch);
      stream.push(null);
    };

    return stream;
  }

  private async csvUserToUserDto(
    csvUser: CsvUserInterface,
  ): Promise<CreateUserDto> {
    const dto = new CreateUserDto();

    dto.firstName = csvUser['first name'];
    dto.lastName = csvUser['last name'];
    dto.email = csvUser.email;
    dto.roleDescription = csvUser['role description'];
    dto.teamName = csvUser.team;

    await validateOrReject(dto);

    return dto;
  }
}
