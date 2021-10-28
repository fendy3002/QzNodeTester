import * as coreType from '../../types';

function formatCurrency(value : any, currency : any) {
    let string = "";
    if (typeof (value) == "string") {
        string = value;
    } else {
        string = value.toString();
    }

    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    let parts = string.split(".");
    parts[0] = parts[0].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    return currency + parts.join(".");
}
export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addFilter('currencyFormat', function(string, format = null) {
        if(!string){ return string; }
        if(!format){
            format = formatCurrency(string.toString(),"")
        }
        return format;
    });
    return;
}