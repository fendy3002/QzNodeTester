import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';
import * as type from '../types';

export default async (config: type.config.app) => {
    let getConnection = (name: string) => {
        let connectionConfig: any = {
            host: config.mysql[name].host,
            port: config.mysql[name].port,
            dialect: 'mysql',
            dialectOptions: {
                multipleStatements: true,
                supportBigNumbers: true,
                bigNumberStrings: true
            },
            logging: config.env == "development" ? console.log : false
        };
        if (config.sequelize_timezone) {
            connectionConfig.timezone = config.sequelize_timezone;
        }
        return new Sequelize(
            config.mysql[name].name,
            config.mysql[name].username,
            config.mysql[name].password,
            connectionConfig
        );
    };

    let dbList: any = {};
    for (let connectionName of Object.keys(config.mysql)) {
        dbList[connectionName] = getConnection(connectionName);
        await dbList[connectionName].authenticate();
        let modelFolder = path.resolve(__dirname, "..", "models", "sql", connectionName);
        if (fs.existsSync(modelFolder)) {
            let models = fs.readdirSync(modelFolder);
            for (let model of models) {
                if (path.extname(model) == ".js") {
                    let modelLoader = require(path.resolve(modelFolder, model)).default;
                    await modelLoader(dbList[connectionName]);
                }
                else if (path.extname(model) == ".ts") {
                    let modelLoader = require(path.resolve(modelFolder, model)).default;
                    await modelLoader(dbList[connectionName]);
                }
            }
        }
    }

    let getDb = (name) => {
        return dbList[name];
    };

    config.storage.set("sql", getDb);
    return getDb;
}