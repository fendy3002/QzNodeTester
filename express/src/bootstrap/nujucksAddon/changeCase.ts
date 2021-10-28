import changeCase = require('change-case');
import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addFilter('changeCase', function(text, stringCase = "sentenceCase") {
        return changeCase[stringCase](text);
    });
    return;
}