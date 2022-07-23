import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import type { FileUpload } from 'graphql-upload/processRequest.js';
import { pipeline } from 'stream/promises';
import { createCsvParser } from '../util/csv.parser';
import { FileImportService } from '../service/file-import.service';

@Resolver()
export class FileImportResolver {
  constructor(private readonly service: FileImportService) {}
  @Mutation(() => Boolean)
  async importFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream }: FileUpload,
  ): Promise<boolean> {
    const stream = createReadStream();
    const parser = createCsvParser();
    const importStream = this.service.importUsersStream();

    await pipeline(stream, parser, importStream);

    return true;
  }
}
