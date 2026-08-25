import Redis from 'ioredis';
import { settings } from '../settings';

let _client: Redis | null = null;

export async function initResource(): Promise<void> {
  _client = new Redis(settings.redisUrl);
}

export async function closeResource(): Promise<void> {
  if (_client) {
    _client.disconnect();
    _client = null;
  }
}

export function getCache(): Redis {
  if (!_client) throw new Error('Cache not initialized');
  return _client;
}
