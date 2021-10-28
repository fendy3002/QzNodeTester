import sa = require("superagent");
import * as type from '../types';

export default async (config: type.config.app) => {
    let agent = sa.agent();
    agent.timeout({
        response: 60000,  // Wait 60 seconds for the server to start sending,
        deadline: 120000, // but allow 2 minutes for the file to finish loading.
    });
    config.storage.set("superagent", agent);
    return agent;
}