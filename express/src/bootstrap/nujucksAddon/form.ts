import lo = require('lodash');
import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    let requiredIcon = function() {
        return `<i class="required"></i>`;
    };
    nunjucksEnv.addGlobal('_form', {
        label: function (text, option = null) {
            let useOption = lo.merge({
                cssClass: "",
                attr: {},
                required: false
            }, option);

            let attr = "";
            for(let key of Object.keys(useOption.attr)){
                attr += `${key}="${useOption.attr[key]}" `;
            }
            let cssClass = useOption.cssClass;
            let content = text;
            if(useOption.required){
                cssClass += " required";
                content += requiredIcon();
            }
            return `<label class="${cssClass}" ${attr}>${content}</label>`;
        },
        requiredIcon: requiredIcon,
        operation: function (operation) {
            let map = {
                "": "CREATE",
                "I": "CREATE",
                "U": "UPDATE",
                "D": "DELETE",
                "V": "VIEW"
            };
            return map[operation || ""] || "";
        }
    });
    return;
}
