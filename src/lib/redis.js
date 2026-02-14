import Redis from 'ioredis';

const redisClientSingleton = () => {
    // If REDIS_URL is provided in .env, use it. Otherwise, defaults to localhost:6379
    const redisUrl = process.env.REDIS_URL;

    if (redisUrl) {
        return new Redis(redisUrl, {
            maxRetriesPerRequest: 3,
        });
    }

    // Fallback for local development if Redis is running locally
    return new Redis({
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
        maxRetriesPerRequest: 3,
    });
};

const globalForRedis = global;

const redis = globalForRedis.redis ?? redisClientSingleton();

export default redis;

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;
