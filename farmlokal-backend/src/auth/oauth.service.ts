import axios from 'axios';
import { redis } from '../config/redis';
import { env } from '../config/env';

const TOKEN_KEY = 'oauth:token';
const LOCK_KEY = 'oauth:lock';
const LOCK_TTL_SECONDS = 5;

export async function getAccessToken(): Promise<string> {
  const cachedToken = await redis.get(TOKEN_KEY);
  if (cachedToken) {
    return cachedToken;
  }

  // ✅ TypeScript-safe Redis lock (SETNX + EXPIRE)
  const lockAcquired = await redis.setnx(LOCK_KEY, '1');

  if (!lockAcquired) {
    await sleep(200);
    return getAccessToken();
  }

  await redis.expire(LOCK_KEY, LOCK_TTL_SECONDS);

  try {
    const response = await axios.post(env.OAUTH_TOKEN_URL, {
      client_id: env.OAUTH_CLIENT_ID,
      client_secret: env.OAUTH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    });

    const token: string = response.data.access_token;
    const expiresIn: number = response.data.expires_in;

    await redis.set(TOKEN_KEY, token, 'EX', expiresIn - 30);
    return token;
  } finally {
    await redis.del(LOCK_KEY);
  }
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
