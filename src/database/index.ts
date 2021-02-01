import { Pool, QueryResult } from 'pg';
import { dbConfig } from '../config';

const pool = new Pool(dbConfig);

export interface DbInterface {
  query(text: string, params?: any): Promise<QueryResult<any>>,
  close(): Promise<void>,
}

export const db: DbInterface = {
  async query(text: string, params?: any): Promise<QueryResult<any>> {
    return pool.query(text, params);
  },
  close(): Promise<void> {
    console.log('Disconnecting from the database...');
    return pool.end();
  },
};
