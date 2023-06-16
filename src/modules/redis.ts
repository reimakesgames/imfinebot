import dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';

const redis = createClient({
	url: process.env.REDIS_URL!
});

redis.on('error', error => console.warn(error));
console.log(`[RUNTIME]: Redis activated and ready for use.`);

async function get(key: string) {
	await redis.connect();
	const value = await redis.get(key);
	await redis.disconnect();
	return value
}

async function set(key: string, value: string) {
	await redis.connect();
	const result = await redis.set(key, value);
	await redis.disconnect();
	return result
}

async function del(key: string) {
	await redis.connect();
	const result = await redis.del(key);
	await redis.disconnect();
	return result
}

async function hGet(key: string, field: string) {
	await redis.connect();
	const value = await redis.hGet(key, field);
	await redis.disconnect();
	return value
}

async function hGetAll(key: string) {
	await redis.connect();
	const value = await redis.hGetAll(key);
	await redis.disconnect();
	return value
}

async function hSet(key: string, field: string, value: string) {
	await redis.connect();
	const result = await redis.hSet(key, field, value);
	await redis.disconnect();
	return result
}

async function hDel(key: string, field: string) {
	await redis.connect();
	const result = await redis.hDel(key, field);
	await redis.disconnect();
	return result
}

async function disconnect() {
	await redis.disconnect();
	console.log("Disconnected from Redis.")
}

export default { redis, get, set, del, hGet, hGetAll, hSet, hDel, disconnect };
