import mysql from 'mysql2/promise';
import { env } from './env';

export const mysqlPool = mysql.createPool({
  uri: env.MYSQL_URL,
  connectionLimit: 10,
});
