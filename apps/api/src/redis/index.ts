import ioredis from 'ioredis';

// create a new redis connection
const redis = new ioredis({
  host: '127.0.0.1',
  port: process.env.REDIS_PORT as unknown as number,
  password: process.env.REDIS_PASS,
});
// define redis events
redis.on('connect', () => {
  console.log('Redis connected');
});
redis.on('ready', () => {
  console.log('Redis ready');
});
redis.on('error', (error) => {
  console.error(error);
});
redis.on('close', () => {
  console.log('Redis connection closed');
});
redis.on('reconnecting', () => {
  console.log('Redis reconnecting');
});
redis.on('end', () => {
  console.log('Redis connection ended');
});


export default redis;
