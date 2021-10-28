let enumList = {
    "pageOperation": {
        "I": "add",
        "U": "update",
        "D": "delete",
        "V": "view",
    },
};
let get = (section, key = null) => {
    if (key) {
        return enumList[section][key];
    } else {
        return enumList[section];
    }
};
let safe = (section, key) => {
    return enumList[section]?.[key] ?? "";
};
export default {
    get: get,
    safe: safe
};