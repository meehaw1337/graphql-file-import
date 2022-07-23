import { DynamicModule, Module } from '@nestjs/common';
import { FileImportResolver } from './resolver/file-import.resolver';
import { UserModule } from '../user/user.module';
import { FileImportService } from './service/file-import.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [UserModule, ConfigModule],
  providers: [FileImportService],
})
export class FileImportModule {
  public static registerWithResolversAsync(): DynamicModule {
    return {
      module: FileImportModule,
      providers: [FileImportResolver],
    };
  }
}
