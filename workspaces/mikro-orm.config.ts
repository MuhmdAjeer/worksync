import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { defineConfig } from '@mikro-orm/core';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig<PostgreSqlDriver>({
  allowGlobalContext: true,
  dbName: 'worksync_db',
  driver: PostgreSqlDriver,
  host: 'psql-db-srv',
  port: 5432,
  user: 'myuser',
  password: 'mypassword',
  debug: true,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
    glob: '!(*.d).{js,ts}',
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    emit: 'ts',
    generator: TSMigrationGenerator,
  },
  seeder: {
    path: 'dist/seeds',
    pathTs: 'src/seeds',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
  extensions: [Migrator, SeedManager],
});
