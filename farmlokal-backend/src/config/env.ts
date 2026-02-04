import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  MYSQL_URL: process.env.MYSQL_URL!,
  REDIS_URL: process.env.REDIS_URL!,
  OAUTH_TOKEN_URL: process.env.OAUTH_TOKEN_URL!,
  OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID!,
  OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET!
};
