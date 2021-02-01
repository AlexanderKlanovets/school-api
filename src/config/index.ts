import dotenv from 'dotenv';
import { PoolConfig } from 'pg';
import { parseIntOrDefault } from '../utils';
import { AppConfig } from './appConfigInterface';

dotenv.config();

export const appConfig: AppConfig = {
  PORT: parseIntOrDefault(process.env.PORT, 3000),
  SHUTDOWN_TIMEOUT: parseIntOrDefault(process.env.SHUTDOWN_TIMEOUT, 5000),
};

export const dbConfig: PoolConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseIntOrDefault(process.env.DB_PORT, 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
};
