import { Sequelize } from 'sequelize-typescript';
import { config as dotEnv } from 'dotenv';

dotEnv();

const dialect = 'mysql';

export const sequelize = new Sequelize({
  username: process.env.DATABASE_USER ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'Camargos123@',
  database: process.env.DATABASE_NAME ?? 'r4_dev_db',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_HOST ?? '3306'),
  dialect
});