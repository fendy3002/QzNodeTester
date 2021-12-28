export namespace config {
    export interface app {
        "appName"           : string,
        "hostName"          : string,
        "env"               : string,
        "ignoreRole"        : boolean,
        "appSecret"         : string,
        "appDescription"    : string,
        "dateTimeFullFormat": string,
        "timezone"          : string,
        "sequelize_timezone": string,
        "corsOrigin"        : string,
        "upload"            : {
            "fileSizeLimit" : number,
            "storagePath"   : string
        },
        "port"              : number,
        "mysql"             : {
            "default": mysql
        },
        "cors"              : {
            "origin": string[]
        },
        "storage"           : {
            set: (key: string, value: any) => void,
            get: (key: string) => any,
        },
        "filter"            : {
            "defaultDaysBefore": number
        },
        "redis"             : {
            [key: string]: redis
        },
        "loggingLevel"      : string,
    };
    export interface mysql {
        "host"      : string,
        "port"      : string,
        "name"      : string,
        "username"  : string,
        "password"  : string
    };
    export interface redis {
        "host": string
        "port": string
    };
};