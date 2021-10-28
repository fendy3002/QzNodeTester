import * as redis from "redis";
import * as coreTypes from '../types';

export default async (config: coreTypes.config.app) => {
    const client = redis.createClient({
        host: config.redis.default.host,
        port: config.redis.default.port,
    });
    config.storage.set("redis", client);
    return redis;
};