import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { validate } from './environment.variables';
import { DbConfig } from './db.config';
import { FileImportConfig } from './file-import.config';

@Module({
  imports: [NestConfigModule.forRoot({ validate })],
  providers: [DbConfig, FileImportConfig],
  exports: [DbConfig, FileImportConfig],
})
export class ConfigModule {}
