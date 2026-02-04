import { mysqlPool } from '../config/mysql';

export async function getProducts(params: any) {
  const { cursor, limit = 20, sort = 'createdAt' } = params;

  let query = `SELECT * FROM products WHERE 1=1`;
  const values: any[] = [];

  if (cursor) {
    query += ` AND id > ?`;
    values.push(cursor);
  }

  query += ` ORDER BY ${sort} LIMIT ?`;
  values.push(limit);

  const [rows] = await mysqlPool.query(query, values);
  return rows;
}
