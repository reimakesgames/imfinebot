import { env } from 'process';
import { createClient } from 'redis';
import { RedisCommandArgument } from '@redis/client/dist/lib/commands';

const redis = createClient({
	url: env.REDIS_URL!
});

redis.on('error', error => console.error(error));
redis.on('ready', () => console.warn(`[RUNTIME]: Redis is now online.`));
console.log(`[RUNTIME]: Connecting to Redis...`);
redis.connect();
// wait for redis to connect

function disconnect() {
	redis.disconnect();
}

async function get(key: RedisCommandArgument) {
	await redis.get(key);
}

async function set(key: RedisCommandArgument, value: RedisCommandArgument) {
	await redis.set(key, value);
}

export default { disconnect, get, set }
