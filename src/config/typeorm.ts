import { type BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import 'dotenv/config';

const config: DataSourceOptions | BaseDataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'database-template',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  synchronize: false,
  migrationsRun: false,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  logging: process.env.LOGGING === 'true',
};

export default registerAs('database', () => config);
export const databaseConnect = new DataSource(config as DataSourceOptions);