import * as redis from "redis";
import * as coreTypes from '../types';

export default async (config: coreTypes.config.app) => {
    console.log(config.redis.default);
    const client = redis.createClient({
        url: `redis://${config.redis.default.host}:${config.redis.default.port}`
    });
    await client.connect();
    await client.ping();

    config.storage.set("redis", client);
    return redis;
};