import { mysqlPool } from '../src/config/mysql';

async function seed() {
  const batchSize = 1000;
  const total = 1_000_000;

  for (let i = 0; i < total; i += batchSize) {
    const values = [];

    for (let j = 0; j < batchSize; j++) {
      values.push([
        `Milk ${i + j}`,
        'Fresh farm milk',
        (Math.random() * 100).toFixed(2),
        'dairy',
        new Date(),
      ]);
    }

    await mysqlPool.query(
      'INSERT INTO products (name, description, price, category, createdAt) VALUES ?',
      [values]
    );

    console.log(`Inserted ${i + batchSize}`);
  }

  process.exit(0);
}

seed();
