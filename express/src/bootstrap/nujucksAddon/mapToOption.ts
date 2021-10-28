import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addFilter('mapToOption', function (value, selected: boolean) {
        if (typeof value == "string") {
            return `<option value="${value}" ${selected ? 'selected' : ''}>${value}</option>`;
        }
        else if (Array.isArray(value)) {
            return value.map(k => {
                return `<option value="${k}" ${selected ? 'selected' : ''}>${k}</option>`;
            });
        }
        else {
            return value;
        }
    });
    return;
}