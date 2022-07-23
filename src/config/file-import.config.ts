import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './environment.variables';

@Injectable()
export class FileImportConfig {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  getBatchSize() {
    return this.configService.get<number>('IMPORT_BATCH_SIZE');
  }
}
