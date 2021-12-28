import { promise } from '@fendy3002/qz-node';
import * as coreTypes from '../types';

export default async (config: coreTypes.config.app) => {
    let lockableSpawner = await promise.lockable(config.storage.get("redis"), {
        redlock: {
            ttl: 2 * 60 * 1000
        }
    });

    config.storage.set("lockable", lockableSpawner);
    return lockableSpawner;
};