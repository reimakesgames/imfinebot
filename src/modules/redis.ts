import dotenv from 'dotenv';
dotenv.config();
import { createClient } from 'redis';

const redis = createClient({
	url: process.env.REDIS_URL!
});

redis.on('error', error => console.error(error));
console.log(`[RUNTIME]: Redis activated and ready for use.`);

function get(key: string) {
	redis.connect();
	const value = redis.get(key);
	redis.disconnect();
	return value
}

function set(key: string, value: string) {
	redis.connect();
	const result = redis.set(key, value);
	redis.disconnect();
	return result
}

function del(key: string) {
	redis.connect();
	const result = redis.del(key);
	redis.disconnect();
	return result
}

function hGet(key: string, field: string) {
	redis.connect();
	const value = redis.hGet(key, field);
	redis.disconnect();
	return value
}

function hGetAll(key: string) {
	redis.connect();
	const value = redis.hGetAll(key);
	redis.disconnect();
	return value
}

function hSet(key: string, field: string, value: string) {
	redis.connect();
	const result = redis.hSet(key, field, value);
	redis.disconnect();
	return result
}

function hDel(key: string, field: string) {
	redis.connect();
	const result = redis.hDel(key, field);
	redis.disconnect();
	return result
}

function disconnect() {
	redis.disconnect();
	console.log("Disconnected from Redis.")
}

export default { redis, get, set, del, hGet, hGetAll, hSet, hDel, disconnect };
