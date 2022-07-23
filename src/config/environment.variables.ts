import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

export enum Environment {
  PROD = 'prod',
  DEV = 'dev',
  TEST = 'test',
}

export class EnvironmentVariables {
  @IsString()
  DB_HOST: string;

  @IsInt()
  DB_PORT: number;

  @IsInt()
  TEST_DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  @IsInt()
  @IsOptional()
  IMPORT_BATCH_SIZE = 1000;

  @IsBoolean()
  @IsOptional()
  DEBUG = false;

  @IsEnum(Environment)
  ENV: Environment;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
