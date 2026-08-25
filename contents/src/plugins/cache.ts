import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';
import Redis from 'ioredis';
import { settings } from '../settings';

declare module 'fastify' {
  interface FastifyInstance {
    cache: Redis;
  }
}

const cachePlugin: FastifyPluginAsync = async (fastify) => {
  const client = new Redis(settings.redisUrl);
  fastify.decorate('cache', client);
  fastify.addHook('onClose', async () => {
    client.disconnect();
  });
};

export default fp(cachePlugin, { name: 'cache' });
