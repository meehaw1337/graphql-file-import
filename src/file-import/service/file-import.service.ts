import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { Stream, Writable } from 'stream';
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

  importUsersStream(): Writable {
    const stream = new Stream.Writable({ objectMode: true });

    let batch = [];

    stream._write = async (csvUsers, _, next) => {
      try {
        const dto = await this.csvUserToUserDto(csvUsers);
        batch.push(dto);

        if (batch.length === this.fileImportConfig.getBatchSize()) {
          await this.userService.createMany(batch);
          batch = [];
        }
      } catch (errors) {
        console.error(
          'Validation failed for the following record and it will not be inserted ',
          csvUsers,
          errors.map((e) => e.constraints),
        );
      }
      next();
    };

    stream.on('finish', async () => {
      await this.userService.createMany(batch);
    });

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
