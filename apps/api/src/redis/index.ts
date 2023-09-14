import { Redis } from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT as unknown as number, // or your Redis port
    password: 'secret', // optional, if Redis requires authentication
});
export default redis;
