import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Environment, EnvironmentVariables } from './environment.variables';
import { TeamEntity } from '../user/model/entity/team.entity';
import { UserEntity } from '../user/model/entity/user.entity';

@Injectable()
export class DbConfig implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService<EnvironmentVariables>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isTest = this.config.get('ENV') === Environment.TEST;
    const port = this.config.get(isTest ? 'TEST_DB_PORT' : 'DB_PORT');

    return {
      type: 'postgres',
      host: this.config.get('DB_HOST'),
      port,
      username: this.config.get('DB_USERNAME'),
      password: this.config.get('DB_PASSWORD'),
      database: this.config.get('DB_DATABASE'),
      entities: [TeamEntity, UserEntity],
      synchronize: true,
      logging: this.config.get('DEBUG'),
    };
  }
}
