import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { User } from './src/entities/User';

export default defineConfig<PostgreSqlDriver>({
  entities: [User],
  dbName: 'auth_db',
  driver: PostgreSqlDriver,
  host: 'auth-psql-srv',
  port: 5432,
  user: 'myuser',
  password: 'mypassword',
  debug: true,
  extensions: [Migrator],
  migrations: {
    tableName: 'migrations', // Change if needed
    path: './src/migrations', // Adjust the path to your migrations directory
  },
});
