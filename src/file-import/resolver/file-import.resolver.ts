import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import type { FileUpload } from 'graphql-upload/processRequest.js';
import { pipeline } from 'stream/promises';
import { createCsvParser } from '../util/csv.parser';
import { FileImportService } from '../service/file-import.service';
import { ImportResponseStream } from '../util/import-response.stream';
import { ImportResult } from '../model/import-result.model';

@Resolver()
export class FileImportResolver {
  constructor(private readonly service: FileImportService) {}

  @Mutation(() => ImportResult)
  async importFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ): Promise<ImportResult> {
    const stream = createReadStream();
    const parser = createCsvParser();
    const importStream = this.service.importUsersStream();
    const resultStream = new ImportResponseStream();

    await pipeline(stream, parser, importStream, resultStream);

    return resultStream.getResponse();
  }
}
